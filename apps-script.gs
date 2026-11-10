/**
 * Dice-cise Obes — penerima rekod ke Google Sheet (PILIHAN).
 * Guna ini jika pesakit main di peranti berbeza dan admin mahu lihat semua rekod di satu tempat.
 *
 * Cara pasang (guna komputer / mod desktop):
 * 1. Buat Google Sheet baharu.
 * 2. Extensions → Apps Script. Padam kod sedia ada, tampal SEMUA kod ini.
 * 3. Tukar ADMIN_KEY di bawah supaya SAMA dengan CONFIG.adminPin dalam index.html.
 * 4. Deploy → New deployment → Type: Web app
 *      Execute as: Me   |   Who has access: Anyone
 *    Tekan Deploy, benarkan (Authorize) akses, salin "Web app URL".
 * 5. Tampal URL itu ke CONFIG.sheetUrl dalam index.html.
 */
const ADMIN_KEY = '1234';
const SHEET_NAME = 'Rekod';

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['Masa', 'Nama', 'Kategori', 'Perkataan', 'Status', 'Tekaan Salah',
                  'Bil. Hukuman', 'Reps', 'Saat', 'Senarai Hukuman', 'ID', 'JSON']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const r = JSON.parse(e.postData.contents);
    if (!r || !r.id || !r.name) return text_('invalid');
    const p = Array.isArray(r.punishments) ? r.punishments : [];
    sheet_().appendRow([
      new Date(r.ts), String(r.name).slice(0, 40), r.category, r.word, r.status, r.wrong,
      p.length, r.reps, r.secs,
      p.map(function (x) { return x.name + ' ×' + x.amount + (x.unit === 'saat' ? ' s' : ''); }).join('; '),
      r.id, JSON.stringify(r)
    ]);
    return text_('ok');
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  if (String((e.parameter && e.parameter.key) || '') !== ADMIN_KEY) return json_({ error: 'PIN salah' });
  const values = sheet_().getDataRange().getValues().slice(1);
  const records = values.map(function (row) {
    try { return JSON.parse(row[11]); } catch (err) { return null; }
  }).filter(Boolean);
  return json_({ records: records });
}

function text_(s) { return ContentService.createTextOutput(s); }
function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
