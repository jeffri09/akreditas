const fs = require('fs');

let file = fs.readFileSync('generate-jobdesk.js', 'utf8');

// 1. Update instruksi Mapel
file = file.replace(
  'numbered("Lakukan untuk setiap mapel wajib (TKA + PAI) jika dokumennya berupa RPP/Soal/LKPD", 9),',
  'numbered("PENTING: Sistem kini OTOMATIS menggandakan dokumen (RPP, Soal, LKPD) untuk *semua mapel wajib*. Buka folder hasil ZIP dan isi file masing-masing!", 9),'
);
file = file.replace(
  'tipBox("Untuk dokumen RPP, Soal, LKPD, Prota, Prosem — buat masing-masing per mapel wajib di atas. Untuk dokumen lain (angket, jurnal, tata tertib) cukup 1 saja per jenjang."),',
  'tipBox("Untuk dokumen RPP, Soal, LKPD, Prota, Prosem — file akan tergandakan secara otomatis di dalam ZIP sesuai mapel wajib (seperti Matematika, B. Indo, PAI). Anda tinggal membukanya satu per satu.") ,'
);

file = file.replace(
  'tipBox("Strategi hemat waktu: Generate dokumen 1 kali → duplikasi file .docx → ganti isian mapel di dalamnya untuk setiap mapel TKA+PAI. Tidak perlu generate ulang dari sistem.")',
  'tipBox("Strategi Otomatisasi: Update terbaru memungkinkan sistem membuat seluruh file MATA PELAJARAN secara massal. Anda tidak perlu repot Copy-Paste file RPP satu persatu!")'
);

file = file.replace(
  'tipBox("Untuk RPP/Soal/LKPD: buat per mapel wajib (B.Indo, Matematika, PAI). Download 1× lalu duplikasi + ganti isian mapelnya.")',
  'tipBox("Untuk dokumen Spesifik Mapel: Semua file sudah tercetak otomatis menjadi file terpisah di dalam ZIP hasil download.")'
);

// 2. Update Rapor to be skipped
// using Regex to replace globally
file = file.replace(/\["(\d+)",\s*"B3-3\.4-01",\s*"Template Rapor",\s*"TINGGI",\s*"Isi format deskripsi naratif per mapel"\]/g, '["$1", "B3-3.4-01", "Template Rapor", "DIBATALKAN", "SKIP — Gunakan format rapor milik operator PKBM"]');

file = file.replace(/\["15", "B3-3\.4-01", "Template Rapor", "TINGGI", "Isi format deskripsi naratif per mapel"\]/, '["15", "B3-3.4-01", "Template Rapor", "DIBATALKAN", "SKIP — Format Rapor Siap Pakai dari Operator"]');


// 3. Update Terminologi SK BSKAP 058
file = file.replace(/Program P5/g, 'Program Projek Karakter');
file = file.replace(/Isi tema P5/g, 'Isi tema projek karakter');
file = file.replace(/P5,/g, 'Projek Karakter,');

fs.writeFileSync('generate-jobdesk.js', file);
console.log('Patch success!');
