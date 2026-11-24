/**
 * Redemption intake without a backend.
 *
 * The form verifies the referenced token transfer directly on the selected
 * chain, fills the amount from the transaction, and prepares a mailto draft.
 * Nothing is transmitted from this page; the request only exists once the
 * visitor sends the email from their own mail app.
 */

import { CHAINS, CONTRACTS, REDEMPTION_VAULTS } from '@data/site';
import { rpc } from './chain';
import { safeEndpoint } from './net';

type Network = 'optimism' | 'kubchain';

type Transfer = {
  amount: bigint;
  decimals: number;
  from: string;
  to: string;
};

type VerifiedTransfer = Transfer & {
  network: Network;
  hash: string;
};

const TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const MIN_REC = 100;
const HASH_PATTERN = /^0x[a-fA-F0-9]{64}$/;

async function fetchJson<T>(url: string, timeout = 10_000): Promise<T> {
  const endpoint = safeEndpoint(url);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(endpoint, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return (await response.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

function addressFromTopic(topic: string): string {
  const clean = topic.startsWith('0x') ? topic.slice(2) : topic;
  return `0x${clean.slice(-40)}`.toLowerCase();
}

function unitsToDecimal(value: bigint, decimals: number): string {
  const base = 10n ** BigInt(decimals);
  const whole = value / base;
  const fraction = (value % base).toString().padStart(decimals, '0').replace(/0+$/, '');
  return fraction ? `${whole}.${fraction}` : `${whole}`;
}

function shortAddress(address: string): string {
  return address ? `${address.slice(0, 6)}…${address.slice(-4)}` : '-';
}

async function verifyOptimism(hash: string): Promise<Transfer> {
  const receipt = await rpc<any>(CHAINS.optimism.rpc, 'eth_getTransactionReceipt', [hash]);
  if (!receipt) throw new Error('TX_NOT_FOUND');
  if (receipt.status !== '0x1') throw new Error('TX_FAILED');

  const token = CONTRACTS.poolOptimism.toLowerCase();
  const vault = REDEMPTION_VAULTS.optimism.toLowerCase();
  let amount = 0n;
  let from = '';
  let to = '';

  for (const log of receipt.logs || []) {
    if ((log?.address || '').toLowerCase() !== token) continue;
    if ((log?.topics?.[0] || '').toLowerCase() !== TRANSFER_TOPIC) continue;
    const recipient = addressFromTopic(log.topics?.[2] || '');
    if (recipient !== vault && recipient !== ZERO_ADDRESS) continue;
    if (!log.data || log.data === '0x') continue;
    amount += BigInt(log.data);
    if (!from) from = addressFromTopic(log.topics?.[1] || '');
    to = recipient;
  }

  if (amount === 0n) throw new Error('NO_VAULT_TRANSFER');
  return { amount, decimals: 18, from, to };
}

async function verifyKubchain(hash: string): Promise<Transfer> {
  let tx: any;
  try {
    tx = await fetchJson<any>(`${CHAINS.kubchain.api}/transactions/${hash}`);
  } catch {
    throw new Error('TX_NOT_FOUND');
  }
  if (!tx || (tx.status !== 'ok' && tx.result !== 'success')) throw new Error('TX_FAILED');

  const transfers = await fetchJson<any>(
    `${CHAINS.kubchain.api}/transactions/${hash}/token-transfers`
  );
  const token = CONTRACTS.poolKubchain.toLowerCase();
  const vault = REDEMPTION_VAULTS.kubchain.toLowerCase();
  const items = Array.isArray(transfers?.items) ? transfers.items : [];
  let amount = 0n;
  let decimals = 18;
  let from = '';
  let to = '';

  for (const item of items) {
    if ((item?.token?.address || '').toLowerCase() !== token) continue;
    const recipient = (item?.to?.hash || '').toLowerCase();
    if (recipient !== vault && recipient !== ZERO_ADDRESS) continue;
    amount += BigInt(item?.total?.value || '0');
    decimals = Number(item?.total?.decimals ?? item?.token?.decimals ?? 18);
    if (!from) from = item?.from?.hash || '';
    to = recipient;
  }

  if (amount === 0n) throw new Error('NO_VAULT_TRANSFER');
  return { amount, decimals, from, to };
}

async function verifyTransaction(network: Network, hash: string): Promise<Transfer> {
  return network === 'optimism' ? verifyOptimism(hash) : verifyKubchain(hash);
}

export function initRedeem(lang: string): void {
  const root = document.querySelector<HTMLElement>('[data-redeem]');
  if (!root) return;

  const formWrap = root.querySelector<HTMLElement>('[data-redeem-form-wrap]');
  const form = root.querySelector<HTMLFormElement>('[data-redeem-form]');
  const draft = root.querySelector<HTMLElement>('[data-redeem-draft]');
  const errorEl = root.querySelector<HTMLElement>('[data-redeem-error]');
  const submit = root.querySelector<HTMLButtonElement>('[data-redeem-submit]');
  const mailto = root.querySelector<HTMLAnchorElement>('[data-redeem-mailto]');

  const nameInput = root.querySelector<HTMLInputElement>('[data-redeem-name]');
  const emailInput = root.querySelector<HTMLInputElement>('[data-redeem-email]');
  const phoneInput = root.querySelector<HTMLInputElement>('[data-redeem-phone]');
  const rehashField = root.querySelector<HTMLElement>('[data-redeem-rehash-field]');
  const rehashInput = root.querySelector<HTMLInputElement>('[data-redeem-rehash]');
  const individualFields = root.querySelector<HTMLElement>('[data-redeem-individual-fields]');
  const beneficialInput = root.querySelector<HTMLInputElement>('[data-redeem-beneficial]');
  const reasonInput = root.querySelector<HTMLTextAreaElement>('[data-redeem-reason]');
  const amountInput = root.querySelector<HTMLInputElement>('[data-redeem-amount]');
  const networkInput = root.querySelector<HTMLSelectElement>('[data-redeem-network]');
  const hashInput = root.querySelector<HTMLInputElement>('[data-redeem-hash]');
  const optionInput = root.querySelector<HTMLSelectElement>('[data-redeem-option]');
  const notesInput = root.querySelector<HTMLTextAreaElement>('[data-redeem-notes]');
  const txStatus = root.querySelector<HTMLElement>('[data-redeem-tx-status]');
  const checkButton = root.querySelector<HTMLButtonElement>('[data-redeem-check]');

  const statusHint = txStatus?.textContent?.trim() || '';
  let verified: VerifiedTransfer | null = null;
  let verifySequence = 0;
  let verifyTimer: number | undefined;

  const setError = (message: string) => {
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.hidden = !message;
  };

  const setStatus = (message: string, tone: '' | 'pending' | 'ok' | 'error') => {
    if (!txStatus) return;
    txStatus.textContent = message;
    if (tone) txStatus.dataset.tone = tone;
    else delete txStatus.dataset.tone;
  };

  const name = () => nameInput?.value.trim() || '';
  const email = () => emailInput?.value.trim() || '';
  const phone = () => phoneInput?.value.trim() || '';
  const rehashAccount = () => rehashInput?.value.trim() || '';
  const beneficialName = () => beneficialInput?.value.trim() || '';
  const retirementReason = () => reasonInput?.value.trim() || '';
  const amount = () => amountInput?.value.trim() || '';
  const network = (): Network => (networkInput?.value === 'kubchain' ? 'kubchain' : 'optimism');
  const hash = () => hashInput?.value.trim() || '';
  const option = () => optionInput?.value || 'rehash';
  const notes = () => notesInput?.value.trim() || '';

  const supportEmail = (mailto?.getAttribute('href') || 'mailto:info@blockedge.earth')
    .replace(/^mailto:/, '')
    .split('?')[0];

  const optionLabel = () =>
    option() === 'rehash'
      ? lang === 'th'
        ? 'รับ I-REC บน REHASH'
        : 'Receive I-REC on REHASH'
      : lang === 'th'
        ? 'ไถ่ถอนในนามบุคคลธรรมดา'
        : 'Retire on behalf of an individual';

  const syncOptionFields = () => {
    const isRehash = option() === 'rehash';
    if (rehashField) rehashField.hidden = !isRehash;
    if (individualFields) individualFields.hidden = isRehash;
    if (rehashInput) rehashInput.required = isRehash;
    if (beneficialInput) beneficialInput.required = !isRehash;
    if (reasonInput) reasonInput.required = !isRehash;
  };

  const resetVerification = () => {
    verified = null;
    verifySequence += 1;
    if (amountInput) amountInput.value = '';
  };

  const verify = async (): Promise<boolean> => {
    const txHash = hash();
    const selectedNetwork = network();

    if (!HASH_PATTERN.test(txHash)) {
      resetVerification();
      setStatus(lang === 'th' ? 'แฮชธุรกรรมไม่ถูกต้อง' : 'Enter a valid transaction hash.', 'error');
      return false;
    }

    const sequence = ++verifySequence;
    verified = null;
    if (amountInput) amountInput.value = '';
    setStatus(lang === 'th' ? 'กำลังตรวจสอบธุรกรรม…' : 'Checking the transaction…', 'pending');

    try {
      const result = await verifyTransaction(selectedNetwork, txHash);
      if (sequence !== verifySequence) return false;

      const minimum = BigInt(MIN_REC) * 10n ** BigInt(result.decimals);
      if (result.amount < minimum) {
        setStatus(
          lang === 'th'
            ? `ยอดในธุรกรรมต่ำกว่าขั้นต่ำ ${MIN_REC} REC`
            : `The transaction amount is below the ${MIN_REC} REC minimum.`,
          'error'
        );
        return false;
      }

      verified = { ...result, network: selectedNetwork, hash: txHash.toLowerCase() };
      const decimalAmount = unitsToDecimal(result.amount, result.decimals);
      if (amountInput) amountInput.value = decimalAmount;

      const displayAmount = Number(decimalAmount).toLocaleString(
        lang === 'th' ? 'th-TH' : 'en-US',
        { maximumFractionDigits: 6 }
      );
      setStatus(
        lang === 'th'
          ? `ยืนยันแล้ว: ${displayAmount} REC โอนเข้าห้องนิรภัย · ผู้ส่ง ${shortAddress(result.from)}`
          : `Verified: ${displayAmount} REC transferred to the vault · sender ${shortAddress(result.from)}`,
        'ok'
      );
      return true;
    } catch (error) {
      if (sequence !== verifySequence) return false;
      const code = error instanceof Error ? error.message : '';
      const messages: Record<string, string> = {
        TX_NOT_FOUND:
          lang === 'th'
            ? 'ไม่พบธุรกรรมบนเครือข่ายที่เลือก'
            : 'Transaction not found on the selected network.',
        TX_FAILED:
          lang === 'th' ? 'ธุรกรรมล้มเหลวบนเชน' : 'The transaction failed on-chain.',
        NO_VAULT_TRANSFER:
          lang === 'th'
            ? 'ไม่พบการโอน REC Token เข้าห้องนิรภัยของ BlockEdge ในธุรกรรมนี้'
            : 'No REC Token transfer to the BlockEdge vault was found in this transaction.',
      };
      setStatus(
        messages[code] ||
          (lang === 'th'
            ? 'อ่านธุรกรรมไม่สำเร็จ ตรวจสอบเครือข่ายและแฮชอีกครั้ง'
            : 'Could not read the transaction. Check the network and hash.'),
        'error'
      );
      return false;
    }
  };

  const scheduleVerify = () => {
    window.clearTimeout(verifyTimer);
    verifyTimer = window.setTimeout(() => void verify(), 600);
  };

  optionInput?.addEventListener('change', syncOptionFields);

  hashInput?.addEventListener('input', () => {
    resetVerification();
    setStatus(statusHint, '');
    if (HASH_PATTERN.test(hash())) scheduleVerify();
  });

  hashInput?.addEventListener('change', () => {
    if (HASH_PATTERN.test(hash())) void verify();
  });

  networkInput?.addEventListener('change', () => {
    resetVerification();
    setStatus(statusHint, '');
    if (HASH_PATTERN.test(hash())) void verify();
  });

  checkButton?.addEventListener('click', () => void verify());

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    setError('');

    if (name().length < 2) {
      setError(lang === 'th' ? 'กรุณากรอกชื่อผู้ติดต่อ' : 'Enter the contact name.');
      return;
    }
    if (!email() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email())) {
      setError(lang === 'th' ? 'กรุณากรอกอีเมลที่ถูกต้อง' : 'Enter a valid email address.');
      return;
    }
    const phoneDigits = phone().replace(/\D/g, '');
    if (!phone() || phoneDigits.length < 7 || phoneDigits.length > 15) {
      setError(lang === 'th' ? 'กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง' : 'Enter a valid phone number.');
      return;
    }

    if (option() === 'rehash') {
      if (!rehashAccount()) {
        setError(lang === 'th' ? 'กรุณากรอกบัญชี REHASH' : 'Enter your REHASH account.');
        return;
      }
    } else {
      if (!beneficialName()) {
        setError(lang === 'th' ? 'กรุณากรอกชื่อผู้รับประโยชน์' : 'Enter the beneficial name.');
        return;
      }
      if (!retirementReason()) {
        setError(lang === 'th' ? 'กรุณากรอกเหตุผลในการไถ่ถอน' : 'Enter the reason for retirement.');
        return;
      }
    }

    const currentHash = hash().toLowerCase();
    if (
      !verified ||
      verified.hash !== currentHash ||
      verified.network !== network()
    ) {
      const ok = await verify();
      if (!ok) {
        setError(
          lang === 'th'
            ? 'กรุณาตรวจสอบธุรกรรมให้สำเร็จก่อนส่งคำขอ'
            : 'Verify the transaction successfully before submitting.'
        );
        return;
      }
    }

    const verifiedTransfer = verified;
    if (!verifiedTransfer) {
      setError(lang === 'th' ? 'ไม่พบข้อมูลธุรกรรมที่ยืนยันแล้ว' : 'No verified transaction data.');
      return;
    }

    const value = Number(amount());
    if (!Number.isFinite(value) || value < MIN_REC) {
      setError(lang === 'th' ? `จำนวนขั้นต่ำคือ ${MIN_REC} REC` : `The minimum amount is ${MIN_REC} REC.`);
      return;
    }

    const bodyLines = [
      `Contact name: ${name()}`,
      `Email: ${email()}`,
      `Phone: ${phone()}`,
      `Option: ${optionLabel()}`,
    ];

    if (option() === 'rehash') {
      bodyLines.push(`REHASH account: ${rehashAccount()}`);
    } else {
      bodyLines.push(`Beneficial name: ${beneficialName()}`);
      bodyLines.push(`Reason for retirement: ${retirementReason()}`);
    }

    bodyLines.push(
      `Amount: ${amount()} REC`,
      `Network: ${network() === 'optimism' ? 'Optimism' : 'Kubchain'}`,
      `Transaction hash: ${hash()}`,
      `Sender: ${verifiedTransfer.from || '-'}`,
      `Vault: ${verifiedTransfer.to || '-'}`,
      `Notes: ${notes()}`
    );

    const body = bodyLines.join('\n');
    const subject = lang === 'th' ? 'คำขอแลกคืน REC Token' : 'REC Token redemption request';
    const href = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (mailto) mailto.href = href;
    if (formWrap) formWrap.hidden = true;
    if (draft) draft.hidden = false;
    if (submit) submit.blur();
    window.location.href = href;
  });

  root.querySelector('[data-redeem-another]')?.addEventListener('click', () => {
    if (draft) draft.hidden = true;
    if (formWrap) formWrap.hidden = false;
    setError('');
  });

  syncOptionFields();
  setStatus(statusHint, '');
}
