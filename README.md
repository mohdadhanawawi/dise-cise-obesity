# Dice-cise Obes 🎲💪

Permainan teka perkataan + senaman untuk sesi fisioterapi pesakit obesiti.
Satu fail `index.html` sahaja — tiada backend, tiada build step.

**Live:** https://mohdadhanawawi.github.io/dise-cise-obesity/

## Edit perkataan / senaman / PIN
Buka `index.html` dan ubah objek `CONFIG` di bahagian atas fail:
- `adminPin` — PIN Panel Admin (default `1234`, **tukar**).
- `categories[].words` dan `exercises[]`.

## Panel Admin (🔐)
Tekan butang **🔐 Admin** di bar atas → masukkan PIN.
- Senarai pemain, game yang berjaya / tak habis, dan senarai hukuman setiap pusingan.
- Tapis ikut nama, tempoh (hari ini / 7 / 30 hari / semua), "Berjaya sahaja".
- Export CSV (boleh buka dalam Excel / Google Sheets).

Rekod disimpan dalam peranti (localStorage) dan **tidak** dipadam oleh butang "Reset".

### Kumpul rekod dari banyak peranti (pilihan)
Jika pesakit main guna phone masing-masing, sambungkan ke Google Sheet:
ikut arahan dalam `apps-script.gs`, kemudian isi `CONFIG.sheetUrl` dengan URL Web App.
Panel Admin akan papar rekod semua peranti.

> Nota: PIN disemak di pelayar — cukup untuk halang pesakit buka panel, tetapi bukan
> keselamatan tahap tinggi. Jangan simpan maklumat sensitif selain nama.

## Deploy
Setiap push ke branch utama di-deploy automatik ke GitHub Pages
(`.github/workflows/pages.yml`).
