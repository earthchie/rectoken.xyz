# Untokenised I-REC inventory - 24 November 2026

Source: REHash (REDEX) I-REC inventory for **บริษัท บล็อกเอจ จำกัด (BlockEdge)**.
This is an internal reconciliation note, not a page published on the website.

## Position

| Item | Balance |
|---|---:|
| Total I-REC balance on REHash | 2,906,866.9911 MWh |
| Tokenised (2025 vintage, 10 projects) | 1,453,422.4400 MWh |
| Untokenised inventory | 1,453,444.5511 MWh |
| - 2024 vintage | 1,453,422.4410 MWh |
| - 2023 vintage | 22.1101 MWh |

The 2024 project token contracts report `totalSupply() = 0` on ThaiFi. The balances below are
therefore inventory held in REHash, not tokenised supply. The 2025 vintage is tokenised and is the
set published on the website.

## Untokenised holdings by device

Balances are the sum of every REHash line item for that device and vintage.

| Device | Project ID | Project | Province | Vintage | Balance (MWh) | 2025 tokenised? |
|---|---|---|---:|---:|---:|---|
| VN-HYDRO-10142010-1873450964 | HUONHYDR001 | Huong Dien | Thừa Thiên Huế | 2024 | 224,574.228 | Yes |
| VN-HYDRO-11062014-0875939463 | DONGES30002 | Dong Nai 2 | Lâm Đồng | 2024 | 184,248.033 | **No** |
| VN-HYDRO-12082009-9038368016 | BAOLHYDR001 | Bao Loc | Lâm Đồng | 2024 | 95,557.462 | **No** |
| VN-HYDRO-12282006-6603223782 | SESAES30001 | Sesan 3A | Gia Lai | 2024 | 253,639.108 | Yes |
| VN-HYDRO-08102010-9189616442 | DAKSHYDR005 | Dak Srong | Gia Lai | 2024 | 39,003.366 | Yes |
| VN-HYDRO-07182011-6371924978 | SESAHYDR002 | Sesan 4A | Gia Lai | 2024 | 194,740.082 | Yes |
| VN-HYDRO-06212015-0071019968 | HATAHYDR001 | Ha Tay | Gia Lai | 2024 | 19,002.398 | Yes |
| VN-HYDRO-07032010-9621112354 | SREPHYDR001 | Srepok 4 | Đắk Lắk | 2024 | 228,272.742 | Yes |
| VN-HYDRO-07032010-9621112354 | SREPHYDR001 | Srepok 4 | Đắk Lắk | 2023 | 22.1101 | Yes (2025 vintage) |
| VN-HYDRO-09302019-2830920567 | SONTES30001 | Son Tay | Quảng Ngãi | 2024 | 54,409.078 | Yes |
| VN-HYDRO-04072018-0918365711 | MINHES30001 | Minh Luong | Lào Cai | 2024 | 79,979.663 | Yes |
| VN-HYDRO-06302012-6844209282 | BACHES30001 | Bac Ha | Lào Cai | 2024 | 39,662.462 | Yes |
| VN-HYDRO-02092018-8350452407 | DADAHYDR001 | Da Dang 3 | Lâm Đồng | 2024 | 40,333.819 | Yes |
| **Total** | | | | | **1,453,444.5511** | |

## Missing from the tokenised set

Two 2024 devices have no 2025-vintage tokenised project:

1. **Bao Loc** (`BAOLHYDR001`) - 95,557.462 MWh, Lâm Đồng.
2. **Dong Nai 2** (`DONGES30002`) - 184,248.033 MWh, Lâm Đồng.

Every other device in the untokenised list has a 2025 counterpart already in `rec-hydro.json`.

## Raw REHash line items

The 24 untokenised lines behind the totals above:

| Device | Vintage | Balance (MWh) |
|---|---|---:|
| VN-HYDRO-08102010-9189616442 | 2024 | 18,763.861 |
| VN-HYDRO-08102010-9189616442 | 2024 | 20,239.505 |
| VN-HYDRO-07182011-6371924978 | 2024 | 80,702.040 |
| VN-HYDRO-07182011-6371924978 | 2024 | 114,038.042 |
| VN-HYDRO-12282006-6603223782 | 2024 | 103,453.991 |
| VN-HYDRO-06212015-0071019968 | 2024 | 11,683.600 |
| VN-HYDRO-06212015-0071019968 | 2024 | 7,318.798 |
| VN-HYDRO-12282006-6603223782 | 2024 | 150,185.117 |
| VN-HYDRO-12082009-9038368016 | 2024 | 45,882.130 |
| VN-HYDRO-12082009-9038368016 | 2024 | 49,675.332 |
| VN-HYDRO-07032010-9621112354 | 2024 | 106,252.331 |
| VN-HYDRO-11062014-0875939463 | 2024 | 95,397.025 |
| VN-HYDRO-11062014-0875939463 | 2024 | 88,851.008 |
| VN-HYDRO-09302019-2830920567 | 2024 | 34,905.164 |
| VN-HYDRO-04072018-0918365711 | 2024 | 21,951.093 |
| VN-HYDRO-10142010-1873450964 | 2024 | 162,831.611 |
| VN-HYDRO-06302012-6844209282 | 2024 | 39,662.462 |
| VN-HYDRO-09302019-2830920567 | 2024 | 19,503.914 |
| VN-HYDRO-10142010-1873450964 | 2024 | 61,742.617 |
| VN-HYDRO-07032010-9621112354 | 2024 | 122,020.411 |
| VN-HYDRO-04072018-0918365711 | 2024 | 58,028.570 |
| VN-HYDRO-02092018-8350452407 | 2024 | 18,837.439 |
| VN-HYDRO-02092018-8350452407 | 2024 | 21,496.380 |
| VN-HYDRO-07032010-9621112354 | 2023 | 22.1101 |
| **Total** | | **1,453,444.5511** |
