-- Redemption intake requests. D1 (SQLite).
CREATE TABLE IF NOT EXISTS redemptions (
  id TEXT PRIMARY KEY,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  option TEXT NOT NULL CHECK (option IN ('rehash', 'retire-individual')),
  rehash_account TEXT,
  beneficial_name TEXT,
  retirement_reason TEXT,
  amount TEXT NOT NULL,
  network TEXT NOT NULL CHECK (network IN ('optimism', 'kubchain')),
  transaction_hash TEXT NOT NULL UNIQUE,
  sender_address TEXT,
  vault_address TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'received',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_redemptions_created_at ON redemptions(created_at);
CREATE INDEX IF NOT EXISTS idx_redemptions_email ON redemptions(email);
