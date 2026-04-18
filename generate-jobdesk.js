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
      children: [new TextRun({ text: "Paket A & B: B.Indo, Matematika, PAI, Pancasila, IPA/IPAS", size: 21, font: FONT, color: COLOR_TEXT })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({ text: "Paket C: B.Indo, Mat, B.Ing, PAI, Pancasila, Geografi", size: 21, font: FONT, color: COLOR_TEXT })]
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
    numbered("Buka website: https://akreditas.vercel.app lalu pilih paket Anda di navigasi.", 1),
    numbered("PENTING: Masuk ke Tab Profil, masukkan API Key Gemini Anda di Pengaturan AI, lalu simpan.", 2),
    numbered("Tuju Tab 'Generate Dokumen' dan centang berkas Butir yang menjadi tugas Anda.", 3),
    numbered("Aktifkan fitur '✨ Gunakan Gemini AI untuk Melengkapi RPP & Soal'.", 4),
    numbered("Klik tombol 'Generate & Download ZIP' → Sistem Auto-Pilot mulai bekerja (berjeda jika antre).", 5),
    numbered("Ekstrak ZIP dan buka file .docx di Microsoft Word / WPS Office.", 6),
    numbered("TUGAS REVISI: Anda tidak perlu menulis RPP/Soal secara manual dari nol. Cukup Review dan Evaluasi kepantasan hasil rumusan AI.", 7),
    numbered("Lengkapi data identitas kosong (nama, tanggal) yang tidak bisa dijangkau sistem.", 8),
    numbered("PENTING: RPP/Soal telah OTOMATIS digandakan *per mapel wajib*. Cek folder hasil ZIP!", 9),
    numbered("Print dan serahkan susunan map lengkap ke Ketua Tim untuk ditandatangani.", 10),
    empty(),
    infoBox("PENTING", "Sistem sudah otomatis membedakan konten per jenjang (JP, Fase, Level HOTS). Anda tinggal isi kolom kosong saja!"),
    empty(),
    heading2("Mapel Wajib yang Harus Ada Dokumennya"),
    empty(),
    makeTable(
      ["Jenjang", "Mapel TKA", "Mapel Tambahan", "Total Mapel Sampel"],
      [
        ["Paket A (SD)", "B.Indo, Mat", "PAI, Pancasila, IPAS", "5 mapel"],
        ["Paket B (SMP)", "B.Indo, Mat", "PAI, Pancasila, IPA", "5 mapel"],
        ["Paket C (SMA)", "B.Indo, Mat, B.Ing", "PAI, Pancasila, Geografi", "6 mapel"],
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
        ["Total Mapel Wajib", "5 Mapel (IPAS)", "5 Mapel (IPA)", "6 Mapel (Geografi)"],
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
    heading2("Paket A — 6 Orang (Fase C | 35 mnt | 5 Mapel Wajib)"),
    makeTable(
      ["Anggota", "PJ Butir", "Jumlah Dok", "Fokus Utama"],
      [
        ["Naela", "Butir 3 (3.1 & 3.5)", "9 dok", "RPP/Modul Ajar & Turunannya"],
        ["Abdul Hadi", "Butir 3 (3.2 - 3.4)", "11 dok", "Soal Evaluasi AI & Penilaian"],
        ["Anita", "Butir 1 (1.1 & 1.2)", "6 dok", "Diskusi Kelas & Laporan Ortu"],
        ["Asandri", "Butir 1 (1.3 & 1.4)", "7 dok", "Asesmen Diagnostik & Pendampingan"],
        ["Nafis", "Butir 2 (Semua)", "9 dok", "Tata Tertib & Rasa Aman Siswa"],
        ["Rika", "Butir 4 (Semua)", "13 dok", "Visi-Misi & Kegiatan Keagamaan"],
      ],
      { colWidths: [18, 28, 14, 40] }
    ),
    empty(),
    heading2("Paket B — 11 Orang (Fase D | 40 mnt | 5 Mapel Wajib)"),
    makeTable(
      ["Anggota", "PJ Butir", "Jumlah Dok", "Fokus Utama"],
      [
        ["Siska", "Butir 3 (3.1 & 3.5)", "9 dok", "RPP Tingkat SMP & Turunannya"],
        ["Handry", "Butir 3 (3.2 & 3.3)", "6 dok", "Kisi-kisi & Soal HOTS (C5)"],
        ["Husen", "Butir 3 (3.4)", "5 dok", "Rubrik Penilaian & Remedial"],
        ["Salim", "Butir 1 (1.1)", "3 dok", "Angket Kepuasan Siswa"],
        ["Romadi", "Butir 1 (1.2)", "3 dok", "Lembar Refleksi"],
        ["Eva", "Butir 1 (1.3 & 1.4)", "7 dok", "Buku Penghubung Ortu"],
        ["Gati", "Butir 2 (2.1)", "3 dok", "Kesepakatan Kelas"],
        ["Zalfa", "Butir 2 (2.2 & 2.3)", "6 dok", "Supervisi Kelas & LKPD"],
        ["Adi", "Butir 4 (4.1)", "3 dok", "Jadwal Agama & Jurnal Keimanan"],
        ["Apriyanto", "Butir 4 (4.2)", "3 dok", "Program Hari Besar Nasional"],
        ["Nadia", "Butir 4 (4.3 & 4.4)", "7 dok", "Portofolio Siswa & Kegiatan P5"],
      ],
      { colWidths: [16, 25, 14, 45] }
    ),
    empty(),
    heading2("Paket C — 10 Orang (Fase E | 45 mnt | 6 Mapel Wajib)"),
    makeTable(
      ["Anggota", "PJ Butir", "Jumlah Dok", "Fokus Utama"],
      [
        ["Dea", "Butir 3 (3.1 & 3.5)", "9 dok", "RPP Tingkat SMA/Vokasi"],
        ["Jufri", "Butir 3 (3.2 & 3.3)", "6 dok", "Kisi-kisi & Soal Analitis (C6)"],
        ["Lilik", "Butir 3 (3.4)", "5 dok", "Evaluasi & Daftar Nilai"],
        ["Riki", "Butir 1 (1.1 & 1.2)", "6 dok", "Asesmen Kognitif Awal"],
        ["Dia", "Butir 1 (1.3 & 1.4)", "7 dok", "Pengawasan Laporan & Jurnal"],
        ["Ronald", "Butir 2 (2.1 & 2.2)", "6 dok", "Kontrak Belajar Dewasa & Tata Tertib"],
        ["Ulfa", "Butir 2 (2.3)", "3 dok", "Dokumentasi Belajar & LKPD"],
        ["Leo", "Butir 4 (4.1)", "3 dok", "RPP Integrasi Keimanan"],
        ["Imam", "Butir 4 (4.2 & 4.3)", "6 dok", "Karya Budaya & LKPD HOTS"],
        ["Laila", "Butir 4 (4.4)", "4 dok", "Karya Vokasional & Portofolio"],
      ],
      { colWidths: [16, 25, 14, 45] }
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
        ["1", "Setup Profil PKBM di Sistem", "19 April", "Buka sistem → Tab Profile → Isi Data"],
        ["2", "Input Data Tutor", "19 April", "Tab Profile → Tambah Tutor"],
        ["3", "Briefing Tugas", "20 April", "Share dokumen ini ke WA Group"],
        ["4", "QC Kop Surat", "Rolling", "Pastikan kop ada tulisan PKBM MIFTAHUL KHOIR"],
        ["5", "QC Alokasi Jam", "Rolling", "Cek kolom JP sesuai aturan"],
        ["6", "Follow-up", "Setiap hari", "WA PJ: 'Ada kendala?'"],
        ["7", "Konsolidasi", "29 April", "Organisir Folder Paket A/B/C dan siap print"],
      ],
      { colWidths: [5, 25, 12, 58] }
    ),
    empty(),
    infoBox("PENTING", "Beritahu semua anggota untuk MEMAKAI FILTER 'PILIH MATA PELAJARAN' di tab Generate agar pemrosesan lancar dan cepat.")
  );

  // ========== PAKET A MEMBERS ==========
  const aDocs = {
    "Naela": [
      ["1", "B3-3.1-01 s.d 06", "RPP, Prota, Prosem, ATP, Kalender, LKPD", "TINGGI", "Generate per mapel. Isi TP/CP"],
      ["2", "B3-3.5-01 s.d 03", "RPP HOTS, LKPD Kritis, Template Proyek", "TINGGI", "Generate per mapel. Lanjutkan rumusan AI"]
    ],
    "Abdul Hadi": [
      ["1", "B3-3.2-01 s.d 04", "Soal Formatif, Jurnal, Umpan Balik", "TINGGI", "Generate & review 5-10 soal PG/Essay dari AI"],
      ["2", "B3-3.3-01 s.d 04", "Soal Sumatif, Kisi-kisi, Rubrik", "TINGGI", "Review 20 PG + 5 Uraian Sumatif dari AI"],
      ["3", "B3-3.4-02", "Rekapitulasi", "SEDANG", "Evaluasi"]
    ],
    "Anita": [
      ["1", "B1-1.1-01 s.d 03", "Dok diskusi, Angket Kepuasan, Catatan Supervisi", "TINGGI", "Minta kepsek isi catatan observasi"],
      ["2", "B1-1.2-01 s.d 03", "RPP Growth Mindset, Portofolio, Umpan Balik Tutor", "TINGGI", "Generate per mapel & kumpulkan jurnal siswa"]
    ],
    "Asandri": [
      ["1", "B1-1.3-01 s.d 04", "Proker Remedial, Jurnal Pendampingan, Asesmen Diagnostik, Buku Ortu", "TINGGI", "Gali data siswa remedial dan gaya belajar"],
      ["2", "B1-1.4-01 s.d 03", "RPP PBL, LKPD Empati, Angket", "TINGGI", "Buat RPP yg berfokus pada kolaborasi antar kelompok"]
    ],
    "Nafis": [
      ["1", "B2-2.1-01 s.d 03", "Kesepakatan, Poster Aturan, Jurnal Kelas", "TINGGI", "Buat poster menarik bergambar untuk siswa SD"],
      ["2", "B2-2.2-01 s.d 03", "Tata Tertib, Supervisi Kelas, Angket Aman", "TINGGI", "Cetak tata tertib bahasa positif tanpa hukuman fisik"],
      ["3", "B2-2.3-01 s.d 03", "RPP Belajar Aktif, LKPD, Dok Belajar", "TINGGI", "Lampirkan banyak foto siswa SD belajar"]
    ],
    "Rika": [
      ["1", "B4-4.1-01 s.d 03", "Jadwal Agama, RPP Iman, Jurnal Akhlak", "TINGGI", "Data pembiasaan agama/shalat Dhuha di PKBM"],
      ["2", "B4-4.2-01 s.d 03", "RPP Budaya, Peringatan Hari Besar, Karya Budaya", "TINGGI", "Data lomba 17 Agustus atau Maulid Nabi"],
      ["3", "B4-4.3-01 s.d 03", "LKPD HOTS, Penilaian Kritis, Template Proyek", "TINGGI", "LKPD spesifik berbasis penalaran SD"],
      ["4", "B4-4.4-01 s.d 04", "Visi Misi, Ekskul, Projek Karakter, Portofolio", "TINGGI", "Deskripsikan cita-cita karakter SD Miftahul Khoir"]
    ]
  };

  Object.keys(aDocs).forEach(name => {
    children.push(
      pageBreak(),
      heading1("📦 PAKET A — " + name.toUpperCase()),
      para("Fase C | 35 mnt/JP | B.Indo, Mat, PAI, Pancasila, IPAS", { italic: true, color: COLOR_MUTED }),
      empty(),
      heading3("Daftar Dokumen (" + aDocs[name].length + " Indikator/Fokus)"),
      makeTable(["No", "Target Generasi", "Berisi Dokumen", "Prioritas", "Aksi"], aDocs[name], { colWidths: [5, 20, 25, 10, 40] })
    );
  });

  // ========== PAKET B MEMBERS ==========
  const bDocs = {
    "Siska": [
      ["1", "B3-3.1-01 s.d 06", "RPP, Prota, Prosem, ATP, Kalender, LKPD", "TINGGI", "Cetak RPP level SMP/Sederajat per mata pelajaran"],
      ["2", "B3-3.5-01 s.d 03", "RPP HOTS, LKPD Kritis, Template Proyek", "TINGGI", "Rancang Modul Ajar level C5 (Mengevaluasi)"]
    ],
    "Handry": [
      ["1", "B3-3.2-01 s.d 04", "Soal Formatif, Jurnal, Umpan Balik", "TINGGI", "Rumuskan formatif C5 yg ditembak AI"],
      ["2", "B3-3.3-01 & 02", "Soal Sumatif, Kisi-kisi", "TINGGI", "Uji kualitas Kisi-kisi dan Butir Soal"]
    ],
    "Husen": [
      ["1", "B3-3.3-03 & 04", "Rubrik Penilaian, Daftar Nilai", "SEDANG", "Susun perhitungan Kriteria Ketercapaian Tujuan Pembelajaran"],
      ["2", "B3-3.4-01 s.d 04", "Rapor, Rekapitulasi, Program Remedial, Ortu", "TINGGI", "Rekap daftar nilai dan cetak Rapor"]
    ],
    "Salim": [
      ["1", "B1-1.1-01 s.d 03", "Dok diskusi, Angket Kepuasan, Catatan Supervisi", "TINGGI", "Print angket kepuasan siswa SMP, minta mereka isi"]
    ],
    "Romadi": [
      ["1", "B1-1.2-01 s.d 03", "RPP Growth Mindset, Portofolio, Umpan Balik Tutor", "TINGGI", "Buat portofolio jurnal pendirian mental diri siswa SMP"]
    ],
    "Eva": [
      ["1", "B1-1.3-01 s.d 04", "Proker Remedial, Jurnal Pendampingan, Asesmen Diagnostik, Buku Ortu", "TINGGI", "Deteksi siswa yg tak lulus CP dan tulis di jurnal pendampingan"],
      ["2", "B1-1.4-01 s.d 03", "RPP PBL, LKPD Empati, Angket", "TINGGI", "Cetak angket keterampilan sosial SMP"]
    ],
    "Gati": [
      ["1", "B2-2.1-01 s.d 03", "Kesepakatan, Poster Aturan, Jurnal Kelas", "TINGGI", "Susun draf kesepakatan tertulis bagi ABG SMP"]
    ],
    "Zalfa": [
      ["1", "B2-2.2-01 s.d 03", "Tata Tertib, Supervisi Kelas, Angket Aman", "TINGGI", "Fokus aturan pencegahan perundungan (Anti-Bullying)"],
      ["2", "B2-2.3-01 s.d 03", "RPP Belajar Aktif, LKPD, Dok Belajar", "TINGGI", "Kegiatan Diskusi Kelompok dan presentasi ABG"]
    ],
    "Adi": [
      ["1", "B4-4.1-01 s.d 03", "Jadwal Agama, RPP Iman, Jurnal Akhlak", "TINGGI", "Cetak jadwal dan tata tertib tadarus/sholat berjamaah"]
    ],
    "Apriyanto": [
      ["1", "B4-4.2-01 s.d 03", "RPP Budaya, Peringatan Hari Besar, Karya Budaya", "TINGGI", "Catat partisipasi siswa PKBM dalam Pentas Seni"]
    ],
    "Nadia": [
      ["1", "B4-4.3-01 s.d 03", "LKPD HOTS, Penilaian Kritis, Template Proyek", "TINGGI", "Rubrik P5 tahap 1"],
      ["2", "B4-4.4-01 s.d 04", "Visi Misi, Ekskul, Projek Karakter, Portofolio", "TINGGI", "Tema pengenalan Wirausaha di usia SMP"]
    ]
  };

  Object.keys(bDocs).forEach(name => {
    children.push(
      pageBreak(),
      heading1("📦 PAKET B — " + name.toUpperCase()),
      para("Fase D | 40 mnt/JP | B.Indo, Mat, PAI, Pancasila, IPA", { italic: true, color: COLOR_MUTED }),
      empty(),
      heading3("Daftar Dokumen (" + bDocs[name].length + " Indikator/Fokus)"),
      makeTable(["No", "Target Generasi", "Berisi Dokumen", "Prioritas", "Aksi"], bDocs[name], { colWidths: [5, 20, 25, 10, 40] })
    );
  });

  // ========== PAKET C MEMBERS ==========
  const cDocs = {
    "Dea": [
      ["1", "B3-3.1-01 s.d 06", "RPP, Prota, Prosem, ATP, Kalender, LKPD", "TINGGI", "Pengayaan RPP level Tinggi (SMA/Sederajat) arah Vokasi/Karier"],
      ["2", "B3-3.5-01 s.d 03", "RPP HOTS, LKPD Kritis, Template Proyek", "TINGGI", "Modul C6 (Mencipta/Mendesain/Merancang) via AI"]
    ],
    "Jufri": [
      ["1", "B3-3.2-01 s.d 04", "Soal Formatif, Jurnal, Umpan Balik", "TINGGI", "Review kualitas soal evaluasi yang diciptakan Gemini AI"],
      ["2", "B3-3.3-01 & 02", "Soal Sumatif, Kisi-kisi", "TINGGI", "Soal harus ada Analisis SWOT atau Problem Solving"]
    ],
    "Lilik": [
      ["1", "B3-3.3-03 & 04", "Rubrik Penilaian, Daftar Nilai", "SEDANG", "Rubrik Penilaian Presentasi / Praktek Bisnis"],
      ["2", "B3-3.4-01 s.d 04", "Rapor, Rekapitulasi, Program Remedial, Ortu", "TINGGI", "Cetak transkrip evaluasi Rapor SMA/Sederajat"]
    ],
    "Riki": [
      ["1", "B1-1.1-01 s.d 03", "Dok diskusi, Angket Kepuasan, Catatan Supervisi", "TINGGI", "Lampirkan bukti foto siswa pekerja dan fleksibilitas jadwal"],
      ["2", "B1-1.2-01 s.d 03", "RPP Growth Mindset, Portofolio, Umpan Balik Tutor", "TINGGI", "Catat portfolio mental kedewasaan belajar Paket C"]
    ],
    "Dia": [
      ["1", "B1-1.3-01 s.d 04", "Proker Remedial, Jurnal Pendampingan, Asesmen Diagnostik, Buku Ortu", "TINGGI", "Evaluasi bagi pemuda putus sekolah lama"],
      ["2", "B1-1.4-01 s.d 03", "RPP PBL, LKPD Empati, Angket", "TINGGI", "Membantu motivasi anak didik usia dewasa"]
    ],
    "Ronald": [
      ["1", "B2-2.1-01 s.d 03", "Kesepakatan, Poster Aturan, Jurnal Kelas", "TINGGI", "Disiplin Andragogi (Orang Dewasa) lewat Kontrak Belajar"],
      ["2", "B2-2.2-01 s.d 03", "Tata Tertib, Supervisi Kelas, Angket Aman", "TINGGI", "Regulasi profesional PKBM tingkat atas"]
    ],
    "Ulfa": [
      ["1", "B2-2.3-01 s.d 03", "RPP Belajar Aktif, LKPD, Dok Belajar", "TINGGI", "Cetak bukti belajar proyek nyata Paket C"]
    ],
    "Leo": [
      ["1", "B4-4.1-01 s.d 03", "Jadwal Agama, RPP Iman, Jurnal Akhlak", "TINGGI", "Integrasi kajian Islam dan Toleransi Dewasa"]
    ],
    "Imam": [
      ["1", "B4-4.2-01 s.d 03", "RPP Budaya, Peringatan Hari Besar, Karya Budaya", "TINGGI", "Partisipasi Panggung Seni Pemuda PKBM"],
      ["2", "B4-4.3-01 s.d 03", "LKPD HOTS, Penilaian Kritis, Template Proyek", "TINGGI", "Rubrik Proposal Karya Siswa Paket C"]
    ],
    "Laila": [
      ["1", "B4-4.4-01 s.d 04", "Visi Misi, Ekskul, Projek Karakter, Portofolio", "TINGGI", "Fokus Dokumentasi Produk Wirausaha Nyata Siap Kurikulum P5"]
    ]
  };

  Object.keys(cDocs).forEach(name => {
    children.push(
      pageBreak(),
      heading1("📦 PAKET C — " + name.toUpperCase()),
      para("Fase E | 45 mnt/JP | B.Indo, Mat, B.Ing, PAI, Pancasila, Geografi", { italic: true, color: COLOR_MUTED }),
      empty(),
      heading3("Daftar Dokumen (" + cDocs[name].length + " Indikator/Fokus)"),
      makeTable(["No", "Target Generasi", "Berisi Dokumen", "Prioritas", "Aksi"], cDocs[name], { colWidths: [5, 20, 25, 10, 40] })
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
