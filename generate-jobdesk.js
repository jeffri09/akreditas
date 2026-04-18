/**
 * generate-jobdesk.js
 * Script untuk membuat file DOCX berisi pembagian tugas Tim 1 Akreditasi
 * PKBM Miftahul Khoir — Komponen 1 (Butir 1-4), Paket A, B, C
 * 
 * Jalankan: node generate-jobdesk.js
 */

const docx = require("docx");
const fs = require("fs");

const {
  Document, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, WidthType, VerticalAlign, BorderStyle,
  HeadingLevel, PageBreak, ShadingType, TableLayoutType,
  Header, Footer, PageNumber, NumberFormat
} = docx;

// ============================================================
// STYLE HELPERS
// ============================================================
const FONT = "Calibri";
const COLOR_PRIMARY = "1B4F72";   // dark blue
const COLOR_ACCENT = "2E86C1";    // medium blue  
const COLOR_HEADER_BG = "1B4F72"; // dark blue bg
const COLOR_LIGHT_BG = "EBF5FB";  // light blue bg
const COLOR_WHITE = "FFFFFF";
const COLOR_TEXT = "2C3E50";
const COLOR_MUTED = "7F8C8D";
const COLOR_RED = "E74C3C";
const COLOR_GREEN = "27AE60";
const COLOR_ORANGE = "F39C12";

function title(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 100, after: 100 },
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, size: 32, font: FONT, color: COLOR_PRIMARY })
    ]
  });
}

function subtitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [
      new TextRun({ text, size: 22, font: FONT, color: COLOR_ACCENT, italics: true })
    ]
  });
}

function heading1(text) {
  return new Paragraph({
    spacing: { before: 300, after: 100 },
    shading: { type: ShadingType.CLEAR, fill: COLOR_HEADER_BG },
    children: [
      new TextRun({ text: `  ${text}`, bold: true, size: 26, font: FONT, color: COLOR_WHITE })
    ]
  });
}

function heading2(text) {
  return new Paragraph({
    spacing: { before: 200, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: COLOR_ACCENT } },
    children: [
      new TextRun({ text, bold: true, size: 24, font: FONT, color: COLOR_PRIMARY })
    ]
  });
}

function heading3(text) {
  return new Paragraph({
    spacing: { before: 160, after: 60 },
    children: [
      new TextRun({ text, bold: true, size: 22, font: FONT, color: COLOR_ACCENT })
    ]
  });
}

function para(text, opts = {}) {
  return new Paragraph({
    alignment: opts.align || AlignmentType.JUSTIFIED,
    spacing: { after: opts.spacing || 80 },
    indent: opts.indent ? { firstLine: 480 } : undefined,
    children: [
      new TextRun({
        text,
        size: opts.size || 21,
        font: FONT,
        bold: opts.bold || false,
        italics: opts.italic || false,
        color: opts.color || COLOR_TEXT
      })
    ]
  });
}

function bullet(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 40 },
    indent: { left: opts.left || 480, hanging: 240 },
    children: [
      new TextRun({ text: "•  ", size: 21, font: FONT, color: COLOR_ACCENT }),
      new TextRun({ text, size: 21, font: FONT, bold: opts.bold || false, color: opts.color || COLOR_TEXT })
    ]
  });
}

function numbered(text, num) {
  return new Paragraph({
    spacing: { after: 40 },
    indent: { left: 480, hanging: 300 },
    children: [
      new TextRun({ text: `${num}. `, size: 21, font: FONT, bold: true, color: COLOR_ACCENT }),
      new TextRun({ text, size: 21, font: FONT, color: COLOR_TEXT })
    ]
  });
}

function empty(height) {
  return new Paragraph({ spacing: { after: height || 80 }, children: [] });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

// Table helper
function makeTable(headers, rows, opts = {}) {
  const colWidths = opts.colWidths || null;
  
  const headerCells = headers.map((h, i) => new TableCell({
    shading: { type: ShadingType.CLEAR, fill: COLOR_HEADER_BG },
    width: colWidths ? { size: colWidths[i], type: WidthType.PERCENTAGE } : undefined,
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 40, after: 40 },
      children: [new TextRun({ text: h, bold: true, size: 19, font: FONT, color: COLOR_WHITE })]
    })],
    verticalAlign: VerticalAlign.CENTER
  }));

  const dataRows = rows.map((row, rowIdx) => new TableRow({
    children: row.map((cell, i) => new TableCell({
      shading: rowIdx % 2 === 0 ? { type: ShadingType.CLEAR, fill: COLOR_LIGHT_BG } : undefined,
      width: colWidths ? { size: colWidths[i], type: WidthType.PERCENTAGE } : undefined,
      children: [new Paragraph({
        spacing: { before: 30, after: 30 },
        children: [new TextRun({ text: String(cell), size: 19, font: FONT, color: COLOR_TEXT })]
      })],
      verticalAlign: VerticalAlign.CENTER
    }))
  }));

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    rows: [
      new TableRow({ children: headerCells, tableHeader: true }),
      ...dataRows
    ]
  });
}

// Info box
function infoBox(label, text) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    shading: { type: ShadingType.CLEAR, fill: "FEF9E7" },
    border: {
      left: { style: BorderStyle.SINGLE, size: 12, color: COLOR_ORANGE }
    },
    indent: { left: 120 },
    children: [
      new TextRun({ text: `⚠ ${label}: `, bold: true, size: 20, font: FONT, color: COLOR_ORANGE }),
      new TextRun({ text, size: 20, font: FONT, color: COLOR_TEXT })
    ]
  });
}

function tipBox(text) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    shading: { type: ShadingType.CLEAR, fill: "EAFAF1" },
    border: {
      left: { style: BorderStyle.SINGLE, size: 12, color: COLOR_GREEN }
    },
    indent: { left: 120 },
    children: [
      new TextRun({ text: `💡 Tips: `, bold: true, size: 20, font: FONT, color: COLOR_GREEN }),
      new TextRun({ text, size: 20, font: FONT, color: COLOR_TEXT })
    ]
  });
}

// ============================================================
// DOCUMENT CONTENT BUILDER
// ============================================================
function buildContent() {
  const children = [];

  // ========== COVER PAGE ==========
  children.push(
    empty(600),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [new TextRun({ text: "PKBM MIFTAHUL KHOIR", bold: true, size: 36, font: FONT, color: COLOR_PRIMARY })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      border: { bottom: { style: BorderStyle.DOUBLE, size: 6, color: COLOR_PRIMARY } },
      children: []
    }),
    empty(200),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [new TextRun({ text: "PEMBAGIAN TUGAS TIM 1", bold: true, size: 40, font: FONT, color: COLOR_PRIMARY })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({ text: "AKREDITASI BAN-PDM 2026", bold: true, size: 34, font: FONT, color: COLOR_ACCENT })]
    }),
    empty(100),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [new TextRun({ text: "Komponen 1: Kinerja Pendidik dalam Mengelola Proses Pembelajaran", size: 24, font: FONT, color: COLOR_TEXT })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [new TextRun({ text: "Butir 1 s.d. 4 | Paket A, B, C", size: 24, font: FONT, color: COLOR_TEXT })]
    }),
    empty(100),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [new TextRun({ text: "Mapel Wajib TKA:", bold: true, size: 22, font: FONT, color: COLOR_RED })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 20 },
      children: [new TextRun({ text: "Paket A & B: Bahasa Indonesia, Matematika + PAI", size: 21, font: FONT, color: COLOR_TEXT })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({ text: "Paket C: Bahasa Indonesia, Matematika, Bahasa Inggris + PAI", size: 21, font: FONT, color: COLOR_TEXT })]
    }),
    empty(200),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 20 },
      children: [new TextRun({ text: "⏰ DEADLINE: 30 APRIL 2026", bold: true, size: 30, font: FONT, color: COLOR_RED })]
    }),
    empty(200),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Ketua Tim: Jeffri P. (Ikhwan) & Marisa (Akhwat)", size: 22, font: FONT, color: COLOR_MUTED })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `Dokumen ini diterbitkan: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, size: 20, font: FONT, color: COLOR_MUTED, italics: true })]
    }),
  );

  // ========== PAGE BREAK → CARA MENGGUNAKAN SISTEM ==========
  children.push(
    pageBreak(),
    title("PANDUAN UMUM PENGGUNAAN SISTEM"),
    subtitle("Akreditasi Doc Generator — https://akreditas.vercel.app"),
    empty(),
    heading2("Alur Kerja Setiap Anggota Tim"),
    empty(),
    numbered("Buka website: https://akreditas.vercel.app", 1),
    numbered("Pilih paket yang menjadi tanggung jawab Anda di header (Paket A / B / C)", 2),
    numbered("Klik tab \"Komponen 1\" di navigasi atas", 3),
    numbered("Klik sub-tab Butir yang menjadi tugas Anda (Butir 1, 2, 3, atau 4)", 4),
    numbered("Centang dokumen yang ingin di-generate, atau klik \"Generate Semua Butir X\"", 5),
    numbered("Klik tombol \"Generate\" → File .docx otomatis ter-download", 6),
    numbered("Buka file .docx di Microsoft Word / WPS Office", 7),
    numbered("ISI SEMUA KOLOM KOSONG / GARIS BAWAH dengan data riil PKBM", 8),
    numbered("PENTING: Sistem kini OTOMATIS menggandakan dokumen (RPP, Soal, LKPD) untuk *semua mapel wajib*. Buka folder hasil ZIP dan isi file masing-masing!", 9),
    numbered("Serahkan file yang sudah lengkap ke Ketua Tim untuk di-review", 10),
    empty(),
    infoBox("PENTING", "Sistem sudah otomatis membedakan konten per jenjang (JP, Fase, Level HOTS). Anda tinggal isi kolom kosong saja!"),
    empty(),
    heading2("Mapel Wajib yang Harus Ada Dokumennya"),
    empty(),
    makeTable(
      ["Jenjang", "Mapel TKA", "Mapel Tambahan", "Total Mapel Sampel"],
      [
        ["Paket A (SD/MI)", "Bahasa Indonesia, Matematika", "PAI dan Budi Pekerti", "3 mapel"],
        ["Paket B (SMP/MTs)", "Bahasa Indonesia, Matematika", "PAI dan Budi Pekerti", "3 mapel"],
        ["Paket C (SMA/MA)", "Bahasa Indonesia, Matematika, B. Inggris", "PAI dan Budi Pekerti", "4 mapel"],
      ],
      { colWidths: [20, 30, 25, 25] }
    ),
    empty(),
    tipBox("Untuk dokumen RPP, Soal, LKPD, Prota, Prosem — file akan tergandakan secara otomatis di dalam ZIP sesuai mapel wajib (seperti Matematika, B. Indo, PAI). Anda tinggal membukanya satu per satu.") ,
    empty(),
    heading2("Diferensiasi Otomatis Per Paket"),
    empty(),
    makeTable(
      ["Aspek", "Paket A (SD)", "Paket B (SMP)", "Paket C (SMA)"],
      [
        ["Jam Pelajaran (JP)", "35 menit", "40 menit", "45 menit"],
        ["Fase Kurikulum", "Fase C", "Fase D", "Fase E"],
        ["Level HOTS", "Menganalisis (C4)", "Mengevaluasi (C5)", "Mencipta (C6)"],
        ["Fokus Keterampilan", "Literasi & Numerasi", "Eksplorasi & Wirausaha", "Vokasional & Kerja"],
        ["Mapel TKA", "B.Indo + Mat", "B.Indo + Mat", "B.Indo + Mat + B.Ing"],
      ],
      { colWidths: [22, 26, 26, 26] }
    ),
  );

  // ========== PAGE BREAK → TIMELINE ==========
  children.push(
    pageBreak(),
    title("TIMELINE EKSEKUSI"),
    subtitle("18 April — 30 April 2026 (12 Hari Kerja)"),
    empty(),
    makeTable(
      ["Tanggal", "Kegiatan", "PIC"],
      [
        ["18-19 Apr", "Setup profil PKBM + data tutor di sistem", "Ketua Tim"],
        ["19-20 Apr", "Briefing tim + distribusi dokumen tugas ini", "Ketua Tim"],
        ["20-22 Apr", "GENERATE semua dokumen via sistem (klik-download)", "Semua PJ"],
        ["22-25 Apr", "PENGISIAN kolom kosong + kumpulkan foto/bukti fisik", "Semua PJ"],
        ["25-27 Apr", "REVIEW & QC oleh Ketua Tim per jenjang", "Ketua Tim"],
        ["27-28 Apr", "REVISI berdasarkan feedback QC", "PJ terkait"],
        ["28-29 Apr", "PRINT + tanda tangan + arsip per Butir", "Semua"],
        ["30 Apr", "✅ DEADLINE — Semua dokumen SIAP", "Semua"],
      ],
      { colWidths: [18, 55, 27] }
    ),
    empty(),
    infoBox("CATATAN", "Jika ada kendala teknis menggunakan sistem, hubungi Ketua Tim via WA Group masing-masing paket."),
  );

  // ========== RINGKASAN STRUKTUR TIM ==========
  children.push(
    pageBreak(),
    title("STRUKTUR TIM & RINGKASAN TUGAS"),
    empty(),
    heading2("Ketua Tim — Jeffri P. & Marisa"),
    para("Peran: Quality Control, Follow-up, Checklist — BUKAN membuat dokumen dari nol.", { bold: true }),
    empty(),
    heading2("Paket A — 3 Orang (Fase C | 35 mnt | TKA: B.Indo + Mat + PAI)"),
    makeTable(
      ["Anggota", "PJ Butir", "Jumlah Dok", "Fokus Utama"],
      [
        ["Nafis", "Butir 1 (Sosial Emosional)", "13 dok", "Angket, jurnal, RPP growth mindset, remedial"],
        ["Asandri", "Butir 3 (Pembelajaran Efektif)", "16 dok", "RPP, Prota, Prosem, soal, rapor — PER MAPEL"],
        ["Abdul Hadi", "Butir 2 + Butir 4", "19 dok", "Tata tertib, kesepakatan kelas, Projek Karakter, keagamaan"],
      ],
      { colWidths: [18, 28, 14, 40] }
    ),
    empty(),
    heading2("Paket B — 7 Orang (Fase D | 40 mnt | TKA: B.Indo + Mat + PAI)"),
    makeTable(
      ["Anggota", "PJ Butir", "Jumlah Dok", "Fokus Utama"],
      [
        ["Handry", "Butir 1 (Ind 1.1 + 1.2)", "6 dok", "Dokumentasi diskusi, angket, RPP growth mindset"],
        ["Apriyanto", "Butir 1 (Ind 1.3 + 1.4)", "7 dok", "Remedial, buku penghubung, RPP kolaboratif"],
        ["Salim", "Butir 2 (Semua)", "9 dok", "Kesepakatan kelas, tata tertib, angket rasa aman"],
        ["Romadi", "Butir 3 (Ind 3.1 + 3.5)", "9 dok", "RPP, Prota, Prosem, LKPD HOTS, PBL"],
        ["Gati", "Butir 3 (Ind 3.2-3.4)", "11 dok", "Soal formatif/sumatif, kisi-kisi, rubrik, rapor"],
        ["Leo", "Butir 4 (Ind 4.1 + 4.2)", "6 dok", "Jadwal keagamaan, RPP budaya, hari besar"],
        ["Adi", "Butir 4 (Ind 4.3 + 4.4)", "7 dok", "LKPD HOTS, Projek Karakter, ekskul, visi-misi, portofolio"],
      ],
      { colWidths: [16, 25, 14, 45] }
    ),
    empty(),
    heading2("Paket C — 6 Orang Berpasangan (Fase E | 45 mnt | TKA: B.Indo + Mat + B.Ing + PAI)"),
    makeTable(
      ["Tim", "Anggota", "PJ Butir", "Jumlah Dok", "Fokus Utama"],
      [
        ["Suasana", "Husen", "Butir 1 (Semua)", "13 dok", "RPP, jurnal, asesmen diagnostik"],
        ["Suasana", "Imam", "Butir 2 (Semua)", "9 dok", "Kontrak belajar, tata tertib dewasa"],
        ["Evaluasi", "Lilik", "Butir 3 (3.1+3.5)", "9 dok", "RPP vokasional, Prota, Prosem, PBL"],
        ["Evaluasi", "Riki", "Butir 3 (3.2-3.4)", "11 dok", "Bank soal, kisi-kisi, rubrik, rapor"],
        ["Karakter", "Ronald", "Butir 4 (4.1+4.2)", "6 dok", "Keagamaan, budaya, hari besar"],
        ["Karakter", "Jufri", "Butir 4 (4.3+4.4)", "7 dok", "LKPD HOTS C6, Projek Karakter, visi-misi, portofolio"],
      ],
      { colWidths: [12, 14, 22, 12, 40] }
    ),
  );

  // ================================================================
  // DETAIL PER ANGGOTA MULAI DI SINI
  // ================================================================

  // ========== KETUA TIM ==========
  children.push(
    pageBreak(),
    heading1("👑 KETUA TIM: JEFFRI P. & MARISA"),
    para("Peran: Quality Control, Checklist, Follow-up Progress Tim", { bold: true, color: COLOR_PRIMARY }),
    empty(),
    heading3("Tugas Utama"),
    makeTable(
      ["No", "Tugas", "Deadline", "Cara Eksekusi"],
      [
        ["1", "Setup Profil PKBM di Sistem", "19 April", "Buka sistem → Tab \"Profil PKBM\" → Isi: Nama PKBM, NPSN, Alamat, Kepala, Visi-Misi-Tujuan → Klik \"Simpan\""],
        ["2", "Input Data Semua Tutor", "19 April", "Tab \"Profil PKBM\" → Klik \"Tambah Tutor\" → Isi nama, mapel, paket. Ulangi untuk semua tutor (18 orang)"],
        ["3", "Briefing & Distribusi Tugas", "20 April", "Share dokumen ini + link sistem ke WA Group per paket"],
        ["4", "QC: Cek Kop Surat", "Rolling", "Buka setiap file .docx → Pastikan kop = PKBM MIFTAHUL KHOIR + NPSN + Alamat lengkap"],
        ["5", "QC: Cek Alokasi Jam", "Rolling", "Cek kolom JP: Paket A=35 mnt, B=40 mnt, C=45 mnt — sudah otomatis, tapi verifikasi"],
        ["6", "QC: Cek Mapel TKA + PAI", "Rolling", "Pastikan RPP/Soal tersedia untuk: B.Indo, Mat, PAI (semua paket) + B.Ing (Paket C)"],
        ["7", "Follow-up Progress Harian", "Setiap hari", "Tanya via WA: \"Sudah generate berapa dokumen? Ada kendala?\""],
        ["8", "Konsolidasi Final", "28-29 April", "Kumpulkan semua file → Organisir folder: Paket A/B/C → Butir 1/2/3/4 → Print"],
      ],
      { colWidths: [5, 25, 12, 58] }
    ),
    empty(),
    infoBox("BUKAN TUGAS KETUA", "Membuat dokumen dari nol. Ketua hanya mengecek dan memastikan semua dokumen lengkap + format benar."),
  );

  // ========== PAKET A — NAFIS ==========
  children.push(
    pageBreak(),
    heading1("📦 PAKET A — NAFIS"),
    para("PJ Butir 1: Dukungan Sosial Emosional bagi Peserta Didik", { bold: true, color: COLOR_PRIMARY }),
    para("Paket A (SD/MI) | Fase C | 35 mnt/JP | Mapel: B.Indo, Matematika, PAI", { italic: true, color: COLOR_MUTED }),
    empty(),
    heading3("Langkah di Sistem"),
    numbered("Buka https://akreditas.vercel.app", 1),
    numbered("Klik \"Paket A\" di header atas", 2),
    numbered("Klik tab \"Komponen 1\" → sub-tab \"Butir 1\"", 3),
    numbered("Klik tombol \"📦 Generate Semua Butir 1\" di bagian bawah", 4),
    numbered("Download file ZIP → Ekstrak → Dapat 13 file .docx", 5),
    numbered("Buka setiap file → Isi kolom kosong dengan data PKBM", 6),
    empty(),
    heading3("Daftar 13 Dokumen yang Harus Diselesaikan"),
    makeTable(
      ["No", "Kode", "Nama Dokumen", "Prioritas", "Yang Harus Diisi Manual"],
      [
        ["1", "B1-1.1-01", "Format Dokumentasi Diskusi Kelas", "TINGGI", "Nama mapel, tanggal, topik, centang indikator, tempel foto"],
        ["2", "B1-1.1-02", "Angket Kepuasan Siswa", "SEDANG", "Print → bagi ke 10 siswa → kumpulkan"],
        ["3", "B1-1.1-03", "Catatan Supervisi Pembelajaran", "TINGGI", "Minta Kepala PKBM isi skor 1-4 saat observasi"],
        ["4", "B1-1.2-01", "RPP Growth Mindset", "TINGGI", "Buat untuk tiap mapel TKA+PAI: isi CP, tujuan, kegiatan"],
        ["5", "B1-1.2-02", "Portofolio Refleksi Siswa", "SEDANG", "Bagi ke siswa, minta isi per bulan (Jul-Des)"],
        ["6", "B1-1.2-03", "Lembar Umpan Balik Tutor", "SEDANG", "Tutor isi: nama siswa, usaha terlihat, umpan balik"],
        ["7", "B1-1.3-01", "Program Remedial & Pengayaan", "TINGGI", "Isi nama siswa yg remedial + bentuk remedialnya"],
        ["8", "B1-1.3-02", "Jurnal Pendampingan Khusus", "SEDANG", "Isi 4-8 pertemuan pendampingan"],
        ["9", "B1-1.3-03", "Asesmen Diagnostik Awal", "TINGGI", "Isi: gaya belajar siswa, skor kognitif awal, rekomendasi"],
        ["10", "B1-1.3-04", "Buku Penghubung Orang Tua", "SEDANG", "Isi 3-6 catatan komunikasi dengan ortu"],
        ["11", "B1-1.4-01", "RPP Kolaboratif (Role Play)", "TINGGI", "Buat per mapel: sesuaikan tema, tutor, kelas"],
        ["12", "B1-1.4-02", "LKPD Kerja Sama & Empati", "SEDANG", "Siap pakai — fotokopi untuk siswa"],
        ["13", "B1-1.4-03", "Angket Keterampilan Sosial", "SEDANG", "Print → bagi ke siswa untuk diisi"],
      ],
      { colWidths: [5, 10, 25, 10, 50] }
    ),
    empty(),
    tipBox("Untuk RPP (no. 4, 11): generate 3 kali — sekali untuk B.Indo, sekali untuk Matematika, sekali untuk PAI. Download file-nya, ganti nama mapel di dalam dokumen."),
    infoBox("PRIORITAS", "Kerjakan dokumen bertanda TINGGI lebih dulu (7 dokumen). Estimasi total: 3-4 hari kerja."),
  );

  // ========== PAKET A — ASANDRI ==========
  children.push(
    pageBreak(),
    heading1("📦 PAKET A — ASANDRI"),
    para("PJ Butir 3: Pengelolaan Proses Pembelajaran Efektif & Bermakna", { bold: true, color: COLOR_PRIMARY }),
    para("Paket A (SD/MI) | Fase C | 35 mnt/JP | Mapel: B.Indo, Matematika, PAI", { italic: true, color: COLOR_MUTED }),
    empty(),
    heading3("Langkah di Sistem"),
    numbered("Buka sistem → Klik \"Paket A\" di header", 1),
    numbered("Tab \"Komponen 1\" → sub-tab \"Butir 3\"", 2),
    numbered("Klik \"📦 Generate Semua Butir 3\" → Download ZIP (16 file)", 3),
    numbered("Buka setiap file → Isi kolom kosong", 4),
    empty(),
    infoBox("BEBAN TERBERAT", "Butir 3 punya 16 dokumen, TAPI 2 dokumen bisa di-SKIP karena sudah dihandle Nafis. Jadi efektif 14 dokumen."),
    empty(),
    heading3("Daftar Dokumen"),
    makeTable(
      ["No", "Kode", "Nama Dokumen", "Prioritas", "Yang Harus Diisi"],
      [
        ["1", "B3-3.1-01", "RPP/Modul Ajar Lengkap", "TINGGI", "Buat PER MAPEL (B.Indo, Mat, PAI). Isi CP, tujuan, kegiatan"],
        ["2", "B3-3.1-02", "Kalender Akademik", "TINGGI", "Isi tanggal libur, UTS, UAS, kegiatan PKBM"],
        ["3", "B3-3.1-03", "Program Tahunan (Prota)", "TINGGI", "Buat PER MAPEL: alokasi JP per bab selama 1 tahun"],
        ["4", "B3-3.1-04", "Program Semester (Prosem)", "TINGGI", "Buat PER MAPEL: distribusi minggu per topik"],
        ["5", "B3-3.1-05", "Silabus / ATP", "TINGGI", "Buat PER MAPEL: elemen CP → TP → kegiatan → asesmen"],
        ["6", "B3-3.1-06", "LKPD Kontekstual", "SEDANG", "Siap pakai — fotokopi untuk siswa"],
        ["7", "B3-3.2-01", "Soal Formatif", "TINGGI", "Buat 5-10 soal PER MAPEL (PG + isian singkat)"],
        ["8", "B3-3.2-02", "Catatan Hasil Formatif", "SEDANG", "Isi nama siswa + skor per pertemuan"],
        ["9", "B3-3.2-03", "Jurnal Perkembangan Siswa", "SEDANG", "Isi catatan per bulan"],
        ["10", "B3-3.2-04", "Template Umpan Balik", "SEDANG", "Tutor isi feedback per siswa"],
        ["11", "B3-3.3-01", "Soal Ujian Sumatif (PG+Uraian)", "TINGGI", "Buat PER MAPEL: min 20 PG + 5 uraian"],
        ["12", "B3-3.3-02", "Kisi-Kisi Soal", "TINGGI", "Buat PER MAPEL: Indikator|Level Kognitif|No Soal"],
        ["13", "B3-3.3-03", "Rubrik Penilaian", "SEDANG", "Isi kriteria per aspek penilaian"],
        ["14", "B3-3.3-04", "Daftar Nilai Siswa", "SEDANG", "Isi nama + nilai per tugas/ujian"],
        ["15", "B3-3.4-01", "Template Rapor", "DIBATALKAN", "SKIP — Gunakan format rapor milik operator PKBM"],
        ["16", "B3-3.4-02", "Rekapitulasi & Analisis", "SEDANG", "Isi setelah nilai terkumpul lengkap"],
        ["—", "B3-3.4-03", "Program Remedial", "SKIP", "Sudah dihandle NAFIS di B1-1.3-01"],
        ["—", "B3-3.4-04", "Komunikasi Orang Tua", "SKIP", "Sudah dihandle NAFIS di B1-1.3-04"],
        ["17", "B3-3.5-01", "RPP Berbasis HOTS", "TINGGI", "Isi kegiatan level C4 (Menganalisis)"],
        ["18", "B3-3.5-02", "LKPD Berpikir Kritis", "SEDANG", "Siap pakai untuk siswa"],
        ["19", "B3-3.5-03", "Template Proyek PBL", "SEDANG", "Isi tema proyek + langkah-langkah"],
      ],
      { colWidths: [5, 10, 24, 10, 51] }
    ),
    empty(),
    tipBox("Strategi Otomatisasi: Update terbaru memungkinkan sistem membuat seluruh file MATA PELAJARAN secara massal. Anda tidak perlu repot Copy-Paste file RPP satu persatu!"),
  );

  // ========== PAKET A — ABDUL HADI ==========
  children.push(
    pageBreak(),
    heading1("📦 PAKET A — ABDUL HADI"),
    para("PJ Butir 2 (Pengelolaan Kelas) + Butir 4 (Iman, Bangsa, Nalar, Karakter)", { bold: true, color: COLOR_PRIMARY }),
    para("Paket A (SD/MI) | Fase C | 35 mnt/JP | Mapel: B.Indo, Matematika, PAI", { italic: true, color: COLOR_MUTED }),
    empty(),
    heading3("Langkah di Sistem"),
    numbered("Buka sistem → Klik \"Paket A\"", 1),
    numbered("Tab \"Komponen 1\" → sub-tab \"Butir 2\" → \"📦 Generate Semua Butir 2\" → 9 file", 2),
    numbered("Sub-tab \"Butir 4\" → \"📦 Generate Semua Butir 4\" → 10 file", 3),
    numbered("Total: 19 file .docx dalam 2 ZIP terpisah", 4),
    empty(),
    heading3("Butir 2 — 9 Dokumen"),
    makeTable(
      ["No", "Kode", "Nama Dokumen", "Prioritas", "Yang Harus Diisi"],
      [
        ["1", "B2-2.1-01", "Kesepakatan Kelas", "TINGGI", "Buat versi VISUAL (gambar + simbol) untuk usia SD"],
        ["2", "B2-2.1-02", "Poster Aturan Kelas", "SEDANG", "Desain sederhana → print & tempel di kelas"],
        ["3", "B2-2.1-03", "Jurnal Penerapan Kesepakatan", "SEDANG", "Isi catatan penerapan per minggu"],
        ["4", "B2-2.2-01", "Tata Tertib (Disiplin Positif)", "TINGGI", "Isi aturan tanpa hukuman fisik, bahasa positif"],
        ["5", "B2-2.2-02", "Catatan Supervisi Kelas", "SEDANG", "Minta Kepala PKBM isi saat observasi"],
        ["6", "B2-2.2-03", "Angket Rasa Aman Siswa", "SEDANG", "Print → bagi ke 10 siswa → kumpulkan"],
        ["7", "B2-2.3-01", "RPP Pembelajaran Aktif", "TINGGI", "Buat per mapel TKA+PAI (gallery walk, jigsaw)"],
        ["8", "B2-2.3-02", "LKPD Belajar Aktif", "SEDANG", "Fotokopi untuk siswa"],
        ["9", "B2-2.3-03", "Dokumentasi Belajar Siswa", "SEDANG", "Kumpulkan 5+ foto kegiatan belajar"],
      ],
      { colWidths: [5, 10, 24, 10, 51] }
    ),
    empty(),
    heading3("Butir 4 — 10 Dokumen"),
    makeTable(
      ["No", "Kode", "Nama Dokumen", "Prioritas", "Yang Harus Diisi"],
      [
        ["1", "B4-4.1-01", "Jadwal Kegiatan Keagamaan", "TINGGI", "Isi jadwal sholat berjamaah, mengaji, kultum"],
        ["2", "B4-4.1-02", "RPP Integrasi Keimanan", "TINGGI", "Integrasikan nilai iman di mapel TKA+PAI"],
        ["3", "B4-4.1-03", "Jurnal Pembiasaan Akhlak", "SEDANG", "Isi catatan harian akhlak siswa"],
        ["4", "B4-4.2-01", "RPP Muatan Lokal/Budaya", "SEDANG", "Isi tema budaya lokal daerah"],
        ["5", "B4-4.2-02", "Program Hari Besar Nasional", "SEDANG", "Isi jadwal + kegiatan peringatan (17 Agustus, Kartini, dll)"],
        ["6", "B4-4.2-03", "Karya Siswa Budaya", "SEDANG", "Kumpulkan gambar/poster hasil karya siswa"],
        ["7", "B4-4.3-01", "LKPD Berbasis HOTS", "TINGGI", "Isi soal level C4 (Menganalisis) sesuai mapel"],
        ["8", "B4-4.3-02", "Format Penilaian Berpikir Kritis", "SEDANG", "Isi rubrik penilaian"],
        ["9", "B4-4.3-03", "Template Proyek PBL", "SEDANG", "Isi tema proyek sederhana untuk anak SD"],
        ["10", "B4-4.4-01", "Visi Misi Tujuan PKBM", "TINGGI", "Salin visi-misi-tujuan resmi PKBM Miftahul Khoir"],
        ["11", "B4-4.4-02", "Program Projek Karakter", "TINGGI", "Isi tema projek karakter, timeline, output karya siswa"],
        ["12", "B4-4.4-03", "Program Ekstrakurikuler", "SEDANG", "Isi daftar ekskul + jadwal"],
        ["13", "B4-4.4-04", "Portofolio Pencapaian Siswa", "SEDANG", "Kumpulkan sampel karya/prestasi siswa"],
      ],
      { colWidths: [5, 10, 24, 10, 51] }
    ),
  );

  // ========== PAKET B MEMBERS ==========
  const paketBMembers = [
    {
      name: "HANDRY",
      butir: "PJ Butir 1 — Indikator 1.1 + 1.2 (Interaksi & Growth Mindset)",
      steps: [
        "Buka sistem → Klik \"Paket B\" di header",
        "Tab \"Komponen 1\" → sub-tab \"Butir 1\"",
        "Expand Indikator 1.1 → centang 3 dokumen → Klik \"Generate Indikator 1.1\"",
        "Expand Indikator 1.2 → centang 3 dokumen → Klik \"Generate Indikator 1.2\"",
        "Total: 6 file .docx ter-download",
      ],
      docs: [
        ["1", "B1-1.1-01", "Dokumentasi Diskusi Kelas", "TINGGI", "Isi mapel, tanggal, topik, centang indikator, TEMPEL FOTO"],
        ["2", "B1-1.1-02", "Angket Kepuasan Siswa", "SEDANG", "Print → bagi ke 10 siswa → kumpulkan isian"],
        ["3", "B1-1.1-03", "Catatan Supervisi Pembelajaran", "TINGGI", "Minta Kepsek isi skor 1-4"],
        ["4", "B1-1.2-01", "RPP Growth Mindset", "TINGGI", "Buat PER MAPEL (B.Indo, Mat, PAI). Isi CP + kegiatan inti"],
        ["5", "B1-1.2-02", "Portofolio Refleksi Siswa", "SEDANG", "Bagi ke siswa, minta isi refleksi per bulan"],
        ["6", "B1-1.2-03", "Lembar Umpan Balik Tutor", "SEDANG", "Tutor isi per pertemuan"],
      ]
    },
    {
      name: "APRIYANTO",
      butir: "PJ Butir 1 — Indikator 1.3 + 1.4 (Pendampingan & Kolaborasi)",
      steps: [
        "Buka sistem → Klik \"Paket B\"",
        "Tab \"Komponen 1\" → \"Butir 1\"",
        "Expand Indikator 1.3 → centang 4 dokumen → Generate",
        "Expand Indikator 1.4 → centang 3 dokumen → Generate",
        "Total: 7 file .docx",
      ],
      docs: [
        ["1", "B1-1.3-01", "Program Remedial & Pengayaan", "TINGGI", "Isi nama siswa remedial + bentuk kegiatan remedial"],
        ["2", "B1-1.3-02", "Jurnal Pendampingan Khusus", "SEDANG", "Isi 4-8 catatan pertemuan pendampingan"],
        ["3", "B1-1.3-03", "Asesmen Diagnostik Awal", "TINGGI", "Isi gaya belajar + skor kognitif awal siswa"],
        ["4", "B1-1.3-04", "Buku Penghubung Orang Tua", "SEDANG", "Isi 3-6 catatan komunikasi"],
        ["5", "B1-1.4-01", "RPP Kolaboratif (PBL)", "TINGGI", "Buat per mapel TKA+PAI: tema Lingkungan Belajar Inklusif"],
        ["6", "B1-1.4-02", "LKPD Kerja Sama & Empati", "SEDANG", "Siap pakai — fotokopi untuk siswa"],
        ["7", "B1-1.4-03", "Angket Keterampilan Sosial", "SEDANG", "Print → bagi ke siswa"],
      ]
    },
    {
      name: "SALIM",
      butir: "PJ Butir 2 — Semua Indikator (2.1, 2.2, 2.3 — Pengelolaan Kelas)",
      steps: [
        "Buka sistem → Klik \"Paket B\"",
        "Tab \"Komponen 1\" → sub-tab \"Butir 2\"",
        "Klik \"📦 Generate Semua Butir 2\"",
        "Download ZIP → Ekstrak → 9 file .docx",
      ],
      docs: [
        ["1", "B2-2.1-01", "Kesepakatan Kelas", "TINGGI", "Format NORMATIF (tertulis bersama) sesuai usia SMP"],
        ["2", "B2-2.1-02", "Poster Aturan Kelas", "SEDANG", "Desain poster → print → tempel di kelas"],
        ["3", "B2-2.1-03", "Jurnal Penerapan Kesepakatan", "SEDANG", "Isi catatan mingguan"],
        ["4", "B2-2.2-01", "Tata Tertib (Disiplin Positif)", "TINGGI", "Bahasa positif, tanpa hukuman fisik"],
        ["5", "B2-2.2-02", "Catatan Supervisi Kelas", "SEDANG", "Minta Kepsek isi saat observasi"],
        ["6", "B2-2.2-03", "Angket Rasa Aman Siswa", "SEDANG", "Print → bagi ke 10-15 siswa"],
        ["7", "B2-2.3-01", "RPP Pembelajaran Aktif", "TINGGI", "Buat per mapel TKA+PAI (diskusi, jigsaw)"],
        ["8", "B2-2.3-02", "LKPD Belajar Aktif", "SEDANG", "Fotokopi untuk siswa"],
        ["9", "B2-2.3-03", "Dokumentasi Belajar Siswa", "SEDANG", "Kumpulkan 5+ foto kegiatan belajar"],
      ]
    },
    {
      name: "ROMADI",
      butir: "PJ Butir 3 — Indikator 3.1 + 3.5 (Perencanaan & HOTS)",
      steps: [
        "Buka sistem → Klik \"Paket B\"",
        "Tab \"Komponen 1\" → \"Butir 3\"",
        "Expand Indikator 3.1 → centang 6 dokumen → Generate",
        "Expand Indikator 3.5 → centang 3 dokumen → Generate",
        "Total: 9 file .docx",
      ],
      docs: [
        ["1", "B3-3.1-01", "RPP/Modul Ajar Lengkap", "TINGGI", "Buat PER MAPEL (B.Indo, Mat, PAI). Isi CP + kegiatan"],
        ["2", "B3-3.1-02", "Kalender Akademik", "TINGGI", "Isi jadwal TA 2025/2026: libur, UTS, UAS"],
        ["3", "B3-3.1-03", "Program Tahunan (Prota)", "TINGGI", "Buat PER MAPEL: alokasi JP per bab 1 tahun"],
        ["4", "B3-3.1-04", "Program Semester (Prosem)", "TINGGI", "Buat PER MAPEL: distribusi minggu per topik"],
        ["5", "B3-3.1-05", "Silabus / ATP", "TINGGI", "Buat PER MAPEL: elemen CP → TP → kegiatan"],
        ["6", "B3-3.1-06", "LKPD Kontekstual", "SEDANG", "Fotokopi untuk siswa"],
        ["7", "B3-3.5-01", "RPP Berbasis HOTS", "TINGGI", "Isi kegiatan level C5 (Mengevaluasi)"],
        ["8", "B3-3.5-02", "LKPD Berpikir Kritis", "SEDANG", "Siap pakai untuk siswa"],
        ["9", "B3-3.5-03", "Template Proyek PBL", "SEDANG", "Isi tema: wirausaha dasar"],
      ]
    },
    {
      name: "GATI",
      butir: "PJ Butir 3 — Indikator 3.2, 3.3, 3.4 (Evaluasi & Penilaian)",
      steps: [
        "Buka sistem → \"Paket B\"",
        "Tab \"Komponen 1\" → \"Butir 3\"",
        "Expand Indikator 3.2 → centang 4 dok → Generate",
        "Expand Indikator 3.3 → centang 4 dok → Generate",
        "Expand Indikator 3.4 → centang 4 dok → Generate (skip yg overlap)",
        "Total: ~11 file .docx",
      ],
      docs: [
        ["1", "B3-3.2-01", "Soal Formatif", "TINGGI", "Buat 5-10 soal PER MAPEL (PG + isian)"],
        ["2", "B3-3.2-02", "Catatan Hasil Formatif", "SEDANG", "Isi nama siswa + skor"],
        ["3", "B3-3.2-03", "Jurnal Perkembangan Siswa", "SEDANG", "Isi catatan per bulan"],
        ["4", "B3-3.2-04", "Template Umpan Balik", "SEDANG", "Tutor isi per pertemuan"],
        ["5", "B3-3.3-01", "Soal Sumatif (PG+Uraian)", "TINGGI", "Buat PER MAPEL: min 20 PG + 5 uraian"],
        ["6", "B3-3.3-02", "Kisi-Kisi Soal", "TINGGI", "Buat PER MAPEL: Indikator|Level Bloom|No Soal"],
        ["7", "B3-3.3-03", "Rubrik Penilaian", "SEDANG", "Isi kriteria per aspek"],
        ["8", "B3-3.3-04", "Daftar Nilai Siswa", "SEDANG", "Isi nama + nilai per tugas/ujian"],
        ["9", "B3-3.4-01", "Template Rapor", "TINGGI", "Isi deskripsi naratif per mapel"],
        ["10", "B3-3.4-02", "Rekapitulasi & Analisis", "SEDANG", "Isi setelah nilai lengkap"],
        ["11", "B3-3.4-03", "Program Remedial", "RENDAH", "Koordinasi dgn Apriyanto (overlap B1-1.3-01)"],
        ["12", "B3-3.4-04", "Komunikasi Orang Tua", "RENDAH", "Koordinasi dgn Apriyanto (overlap B1-1.3-04)"],
      ]
    },
    {
      name: "LEO",
      butir: "PJ Butir 4 — Indikator 4.1 + 4.2 (Keimanan & Kebangsaan)",
      steps: [
        "Buka sistem → \"Paket B\"",
        "Tab \"Komponen 1\" → sub-tab \"Butir 4\"",
        "Expand Indikator 4.1 → centang 3 dok → Generate",
        "Expand Indikator 4.2 → centang 3 dok → Generate",
        "Total: 6 file .docx",
      ],
      docs: [
        ["1", "B4-4.1-01", "Jadwal Kegiatan Keagamaan", "TINGGI", "Isi jadwal sholat dhuha, kultur, mengaji"],
        ["2", "B4-4.1-02", "RPP Integrasi Keimanan", "TINGGI", "Integrasikan nilai iman di mapel TKA+PAI"],
        ["3", "B4-4.1-03", "Jurnal Pembiasaan Akhlak", "SEDANG", "Isi catatan harian siswa"],
        ["4", "B4-4.2-01", "RPP Muatan Lokal/Budaya", "SEDANG", "Isi tema sejarah/budaya lokal daerah"],
        ["5", "B4-4.2-02", "Program Hari Besar Nasional", "SEDANG", "Isi jadwal peringatan + kegiatan"],
        ["6", "B4-4.2-03", "Karya Siswa Budaya", "SEDANG", "Kumpulkan poster/gambar karya siswa"],
      ]
    },
    {
      name: "ADI",
      butir: "PJ Butir 4 — Indikator 4.3 + 4.4 (Nalar, Karakter, P5)",
      steps: [
        "Buka sistem → \"Paket B\"",
        "Tab \"Komponen 1\" → sub-tab \"Butir 4\"",
        "Expand Indikator 4.3 → centang 3 dok → Generate",
        "Expand Indikator 4.4 → centang 4 dok → Generate",
        "Total: 7 file .docx",
      ],
      docs: [
        ["1", "B4-4.3-01", "LKPD Berbasis HOTS", "TINGGI", "Isi soal level C5 (Mengevaluasi) sesuai mapel"],
        ["2", "B4-4.3-02", "Penilaian Berpikir Kritis", "SEDANG", "Isi rubrik penilaian"],
        ["3", "B4-4.3-03", "Template Proyek PBL", "SEDANG", "Isi tema proyek tingkat SMP"],
        ["4", "B4-4.4-01", "Visi Misi Tujuan PKBM", "TINGGI", "Salin visi-misi-tujuan resmi PKBM"],
        ["5", "B4-4.4-02", "Program Projek Karakter", "TINGGI", "Pilih tema Kewirausahaan → isi timeline + output"],
        ["6", "B4-4.4-03", "Program Ekskul", "SEDANG", "Isi daftar ekskul + jadwal"],
        ["7", "B4-4.4-04", "Portofolio Siswa", "SEDANG", "Kumpulkan karya/prestasi siswa"],
      ]
    },
  ];

  paketBMembers.forEach(member => {
    children.push(
      pageBreak(),
      heading1(`📦 PAKET B — ${member.name}`),
      para(member.butir, { bold: true, color: COLOR_PRIMARY }),
      para("Paket B (SMP/MTs) | Fase D | 40 mnt/JP | Mapel: B.Indo, Matematika, PAI", { italic: true, color: COLOR_MUTED }),
      empty(),
      heading3("Langkah di Sistem"),
    );
    member.steps.forEach((s, i) => children.push(numbered(s, i + 1)));
    children.push(
      empty(),
      heading3("Daftar Dokumen"),
      makeTable(
        ["No", "Kode", "Nama Dokumen", "Prioritas", "Yang Harus Diisi"],
        member.docs,
        { colWidths: [5, 10, 22, 10, 53] }
      ),
      empty(),
      tipBox("Untuk dokumen Spesifik Mapel: Semua file sudah tercetak otomatis menjadi file terpisah di dalam ZIP hasil download.")
    );
  });

  // ========== PAKET C MEMBERS ==========
  const paketCMembers = [
    {
      name: "HUSEN",
      tim: "Tim Suasana & Karakter",
      butir: "PJ Butir 1 — Semua Indikator (Dukungan Sosial Emosional)",
      steps: [
        "Buka sistem → Klik \"Paket C\" di header",
        "Tab \"Komponen 1\" → sub-tab \"Butir 1\"",
        "Klik \"📦 Generate Semua Butir 1\" → Download ZIP",
        "Ekstrak → 13 file .docx → Isi semua kolom kosong",
      ],
      docs: [
        ["1", "B1-1.1-01", "Dokumentasi Diskusi Kelas", "TINGGI", "Isi topik diskusi/presentasi level SMA"],
        ["2", "B1-1.1-02", "Angket Kepuasan Siswa", "SEDANG", "Print → bagi ke 10 siswa → kumpulkan"],
        ["3", "B1-1.1-03", "Catatan Supervisi", "TINGGI", "Minta Kepsek isi skor observasi"],
        ["4", "B1-1.2-01", "RPP Growth Mindset", "TINGGI", "Buat PER MAPEL (B.Indo, Mat, B.Ing, PAI)"],
        ["5", "B1-1.2-02", "Portofolio Refleksi Siswa", "SEDANG", "Siswa isi refleksi bulanan"],
        ["6", "B1-1.2-03", "Umpan Balik Tutor", "SEDANG", "Tutor isi per pertemuan"],
        ["7", "B1-1.3-01", "Program Remedial", "TINGGI", "Fokus: kesiapan kompetensi kelulusan & vokasi"],
        ["8", "B1-1.3-02", "Jurnal Pendampingan", "SEDANG", "Isi 4-8 pertemuan"],
        ["9", "B1-1.3-03", "Asesmen Diagnostik", "TINGGI", "Isi gaya belajar + skor awal (usia 16+)"],
        ["10", "B1-1.3-04", "Buku Penghubung Ortu", "SEDANG", "Isi 3-6 komunikasi"],
        ["11", "B1-1.4-01", "RPP Kolaboratif (PBL)", "TINGGI", "Buat per mapel: Wirausaha Sosial Pemberdayaan"],
        ["12", "B1-1.4-02", "LKPD Kerja Sama", "SEDANG", "Siap pakai"],
        ["13", "B1-1.4-03", "Angket Sosial Emosional", "SEDANG", "Bagi ke siswa"],
      ]
    },
    {
      name: "IMAM",
      tim: "Tim Suasana & Karakter",
      butir: "PJ Butir 2 — Semua Indikator (Pengelolaan Kelas)",
      steps: [
        "Buka sistem → \"Paket C\"",
        "Tab \"Komponen 1\" → \"Butir 2\"",
        "\"📦 Generate Semua Butir 2\" → 9 file",
      ],
      docs: [
        ["1", "B2-2.1-01", "Kesepakatan Kelas", "TINGGI", "Format KONTRAK BELAJAR FLEKSIBEL (usia dewasa/pekerja)"],
        ["2", "B2-2.1-02", "Poster Aturan Kelas", "SEDANG", "Desain profesional → print & tempel"],
        ["3", "B2-2.1-03", "Jurnal Penerapan", "SEDANG", "Isi catatan mingguan"],
        ["4", "B2-2.2-01", "Tata Tertib", "TINGGI", "Bahasa profesional cocok usia dewasa/pekerja"],
        ["5", "B2-2.2-02", "Catatan Supervisi", "SEDANG", "Minta Kepsek isi"],
        ["6", "B2-2.2-03", "Angket Rasa Aman", "SEDANG", "Print → bagi ke siswa"],
        ["7", "B2-2.3-01", "RPP Pembelajaran Aktif", "TINGGI", "Buat per mapel: debat, presentasi, panel diskusi"],
        ["8", "B2-2.3-02", "LKPD Belajar Aktif", "SEDANG", "Fotokopi untuk siswa"],
        ["9", "B2-2.3-03", "Dokumentasi Belajar", "SEDANG", "Kumpulkan 5+ foto kegiatan"],
      ]
    },
    {
      name: "LILIK",
      tim: "Tim Pembelajaran & Evaluasi",
      butir: "PJ Butir 3 — Indikator 3.1 + 3.5 (Perencanaan & HOTS)",
      steps: [
        "Buka sistem → \"Paket C\"",
        "\"Butir 3\" → Expand 3.1 (6 dok) + 3.5 (3 dok) → Generate",
        "Total: 9 file",
      ],
      docs: [
        ["1", "B3-3.1-01", "RPP/Modul Ajar", "TINGGI", "Buat PER MAPEL (B.Indo, Mat, B.Ing, PAI). Vokasional/kesiapan kerja"],
        ["2", "B3-3.1-02", "Kalender Akademik", "TINGGI", "Isi jadwal TA 2025/2026"],
        ["3", "B3-3.1-03", "Prota", "TINGGI", "Buat PER MAPEL: alokasi JP 1 tahun"],
        ["4", "B3-3.1-04", "Prosem", "TINGGI", "Buat PER MAPEL: distribusi minggu per topik"],
        ["5", "B3-3.1-05", "Silabus / ATP", "TINGGI", "Buat PER MAPEL"],
        ["6", "B3-3.1-06", "LKPD Kontekstual", "SEDANG", "Fotokopi untuk siswa"],
        ["7", "B3-3.5-01", "RPP HOTS", "TINGGI", "Level C6 (MENCIPTA): proposal usaha, produk karya"],
        ["8", "B3-3.5-02", "LKPD Berpikir Kritis", "SEDANG", "Siap pakai"],
        ["9", "B3-3.5-03", "Template PBL", "SEDANG", "Tema: studi kelayakan usaha sederhana"],
      ]
    },
    {
      name: "RIKI",
      tim: "Tim Pembelajaran & Evaluasi",
      butir: "PJ Butir 3 — Indikator 3.2, 3.3, 3.4 (Evaluasi & Penilaian)",
      steps: [
        "Buka sistem → \"Paket C\"",
        "\"Butir 3\" → Centang 3.2 + 3.3 + 3.4 → Generate",
        "Total: ~11 file (skip overlap)",
      ],
      docs: [
        ["1", "B3-3.2-01", "Soal Formatif", "TINGGI", "Buat PER MAPEL (B.Indo, Mat, B.Ing, PAI)"],
        ["2", "B3-3.2-02", "Catatan Hasil Formatif", "SEDANG", "Isi nama + skor"],
        ["3", "B3-3.2-03", "Jurnal Perkembangan", "SEDANG", "Isi per bulan"],
        ["4", "B3-3.2-04", "Umpan Balik", "SEDANG", "Tutor isi per pertemuan"],
        ["5", "B3-3.3-01", "Soal Sumatif", "TINGGI", "Buat PER MAPEL: analisis, evaluasi, kreasi level SMA"],
        ["6", "B3-3.3-02", "Kisi-Kisi", "TINGGI", "Buat PER MAPEL"],
        ["7", "B3-3.3-03", "Rubrik Penilaian", "SEDANG", "Termasuk rubrik penilaian PROYEK"],
        ["8", "B3-3.3-04", "Daftar Nilai", "SEDANG", "Isi per tugas/ujian"],
        ["9", "B3-3.4-01", "Template Rapor", "TINGGI", "Deskripsi naratif per mapel"],
        ["10", "B3-3.4-02", "Rekapitulasi", "SEDANG", "Isi setelah nilai lengkap"],
        ["11", "B3-3.4-03", "Program Remedial", "RENDAH", "Koordinasi dgn Husen"],
        ["12", "B3-3.4-04", "Komunikasi Ortu", "RENDAH", "Koordinasi dgn Husen"],
      ]
    },
    {
      name: "RONALD",
      tim: "Tim Visi, Nilai & HOTS",
      butir: "PJ Butir 4 — Indikator 4.1 + 4.2 (Keimanan & Kebangsaan)",
      steps: [
        "Buka sistem → \"Paket C\"",
        "\"Butir 4\" → Expand 4.1 + 4.2 → Generate",
        "Total: 6 file",
      ],
      docs: [
        ["1", "B4-4.1-01", "Jadwal Keagamaan", "TINGGI", "Isi kegiatan rutin + insidental"],
        ["2", "B4-4.1-02", "RPP Integrasi Keimanan", "TINGGI", "Integrasikan di mapel TKA+PAI"],
        ["3", "B4-4.1-03", "Jurnal Pembiasaan Akhlak", "SEDANG", "Isi catatan harian"],
        ["4", "B4-4.2-01", "RPP Muatan Lokal", "SEDANG", "Tema sejarah/budaya lokal"],
        ["5", "B4-4.2-02", "Program Hari Besar", "SEDANG", "Isi jadwal + kegiatan peringatan"],
        ["6", "B4-4.2-03", "Karya Siswa Budaya", "SEDANG", "Kumpulkan esai/pameran budaya karya siswa"],
      ]
    },
    {
      name: "JUFRI",
      tim: "Tim Visi, Nilai & HOTS",
      butir: "PJ Butir 4 — Indikator 4.3 + 4.4 (Nalar, Karakter, P5)",
      steps: [
        "Buka sistem → \"Paket C\"",
        "\"Butir 4\" → Expand 4.3 + 4.4 → Generate",
        "Total: 7 file",
      ],
      docs: [
        ["1", "B4-4.3-01", "LKPD HOTS", "TINGGI", "Level C6 (Mencipta): desain produk, buat proposal"],
        ["2", "B4-4.3-02", "Penilaian Berpikir Kritis", "SEDANG", "Isi rubrik evaluasi"],
        ["3", "B4-4.3-03", "Template PBL", "SEDANG", "Tema proyek tingkat SMA"],
        ["4", "B4-4.4-01", "Visi Misi PKBM", "TINGGI", "Salin visi-misi-tujuan resmi PKBM"],
        ["5", "B4-4.4-02", "Program Projek Karakter", "TINGGI", "Tema: Kewirausahaan / Berekayasa & Berteknologi"],
        ["6", "B4-4.4-03", "Program Ekskul", "SEDANG", "Isi daftar kegiatan + jadwal"],
        ["7", "B4-4.4-04", "Portofolio Siswa", "SEDANG", "Kumpulkan karya: proposal usaha, esai, rancangan"],
      ]
    },
  ];

  paketCMembers.forEach(member => {
    children.push(
      pageBreak(),
      heading1(`📦 PAKET C — ${member.name}`),
      para(`${member.tim}`, { bold: true, size: 20, color: COLOR_ACCENT }),
      para(member.butir, { bold: true, color: COLOR_PRIMARY }),
      para("Paket C (SMA/MA) | Fase E | 45 mnt/JP | Mapel: B.Indo, Matematika, B.Inggris, PAI", { italic: true, color: COLOR_MUTED }),
      empty(),
      heading3("Langkah di Sistem"),
    );
    member.steps.forEach((s, i) => children.push(numbered(s, i + 1)));
    children.push(
      empty(),
      heading3("Daftar Dokumen"),
      makeTable(
        ["No", "Kode", "Nama Dokumen", "Prioritas", "Yang Harus Diisi"],
        member.docs,
        { colWidths: [5, 10, 20, 10, 55] }
      ),
      empty(),
      tipBox("Paket C punya 4 mapel wajib (B.Indo, Mat, B.Ing, PAI). Untuk RPP/Soal: generate 1× lalu duplikasi file .docx untuk setiap mapel.")
    );
  });

  // ========== HALAMAN PENUTUP ==========
  children.push(
    pageBreak(),
    title("CHECKLIST BUKTI FISIK TAMBAHAN"),
    subtitle("Selain dokumen dari sistem, siapkan juga:"),
    empty(),
    makeTable(
      ["No", "Bukti Fisik", "PIC", "Keterangan"],
      [
        ["1", "Foto/video kegiatan pembelajaran", "Semua PJ", "Min. 5 foto per jenjang, TEMPEL di dok B1-1.1-01"],
        ["2", "Angket yang sudah diisi siswa", "PJ Butir 1 & 2", "Min. 10 responden per jenjang"],
        ["3", "Karya siswa asli (gambar, poster, esai)", "PJ Butir 4", "Kumpulkan di map per kelas"],
        ["4", "Poster kesepakatan kelas di dinding", "PJ Butir 2", "Cetak & tempel SEBELUM visitasi"],
        ["5", "Briefing tutor — siap wawancara asesor", "Ketua Tim", "Setiap tutor harus bisa jelaskan RPP-nya"],
        ["6", "Sinkronisasi SISPENA (DKA)", "Ketua Tim", "DKA harus konsisten dengan bukti fisik"],
      ],
      { colWidths: [5, 30, 20, 45] }
    ),
    empty(200),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200 },
      children: [new TextRun({ text: "— Bismillah, Semoga Akreditasi Berjalan Lancar —", bold: true, size: 24, font: FONT, color: COLOR_PRIMARY, italics: true })]
    }),
    empty(100),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "PKBM Miftahul Khoir | Tim 1 Akreditasi BAN-PDM 2026", size: 20, font: FONT, color: COLOR_MUTED })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Deadline: 30 April 2026 ⏰", size: 20, font: FONT, color: COLOR_RED, bold: true })]
    }),
  );

  return children;
}

// ============================================================
// MAIN: Build and save DOCX
// ============================================================
async function main() {
  console.log("📝 Membuat file DOCX pembagian tugas...");

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: FONT, size: 21, color: COLOR_TEXT },
          paragraph: { spacing: { after: 60 } }
        }
      }
    },
    sections: [{
      properties: {
        page: {
          margin: { top: 720, right: 720, bottom: 720, left: 720 }, // 0.5 inch
          size: { width: 12240, height: 15840 } // Letter
        }
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({ text: "PKBM Miftahul Khoir — Pembagian Tugas Akreditasi Tim 1", size: 16, font: FONT, italics: true, color: COLOR_MUTED })
              ]
            })
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "Deadline: 30 April 2026 | ", size: 16, font: FONT, color: COLOR_RED }),
                new TextRun({ text: "Hal. ", size: 16, font: FONT, color: COLOR_MUTED }),
                new TextRun({ children: [PageNumber.CURRENT], size: 16, font: FONT, color: COLOR_MUTED }),
                new TextRun({ text: " / ", size: 16, font: FONT, color: COLOR_MUTED }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, font: FONT, color: COLOR_MUTED }),
              ]
            })
          ]
        })
      },
      children: buildContent()
    }]
  });

  const buffer = await docx.Packer.toBuffer(doc);
  const outputPath = "Pembagian_Tugas_Tim1_Akreditasi_PKBM.docx";
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ File berhasil dibuat: ${outputPath}`);
  console.log(`📄 Ukuran: ${(buffer.length / 1024).toFixed(1)} KB`);
  console.log(`📋 Total: 18 halaman deskripsi tugas per anggota`);
}

main().catch(err => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
