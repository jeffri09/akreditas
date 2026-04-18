/**
 * butir2.js — Template Dokumen Butir 2
 * Pengelolaan Kelas Aman, Nyaman, Kondusif
 * Diferensiasi: Visual (A), Normatif (B), Profesional-Fleksibel (C)
 */

const Butir2Templates = {
  // =================================================
  // 2.1-01: Dokumen Kesepakatan Kelas
  // =================================================
  'B2-2.1-01': function(ctx) {
    const h = DocGenerator.h;

    const tipeKesepakatan = {
      A: {
        judul: 'Kesepakatan Kelas (Bergambar & Visual)',
        intro: 'Kesepakatan ini dibuat bersama-sama oleh seluruh peserta didik dan tutor dengan bahasa sederhana yang mudah dipahami anak-anak.',
        aturan: [
          '🤚 Angkat tangan sebelum berbicara',
          '👂 Dengarkan teman yang sedang berbicara',
          '🤝 Saling membantu teman yang kesulitan',
          '🧹 Menjaga kebersihan ruang belajar',
          '⏰ Datang tepat waktu',
          '💬 Berbicara dengan sopan dan santun',
          '📚 Merawat buku dan alat belajar',
          '😊 Bersikap ramah kepada semua orang'
        ]
      },
      B: {
        judul: 'Kesepakatan Kelas (Kesepakatan Normatif)',
        intro: 'Kesepakatan ini disusun bersama secara partisipatif oleh seluruh peserta didik dan tutor melalui diskusi kelas pada awal tahun ajaran.',
        aturan: [
          'Menghormati hak setiap peserta didik untuk berpendapat',
          'Hadir tepat waktu dan mengikuti kegiatan pembelajaran dengan serius',
          'Tidak menggunakan ponsel selama kegiatan pembelajaran berlangsung',
          'Menjaga suasana kelas yang kondusif dan saling menghargai',
          'Menyelesaikan tugas dengan jujur dan bertanggung jawab',
          'Menjaga kebersihan dan kerapian ruang belajar',
          'Tidak melakukan perundungan (bullying) dalam bentuk apapun',
          'Menyelesaikan perbedaan pendapat dengan cara diskusi, bukan kekerasan',
          'Konsekuensi pelanggaran disepakati bersama dan bersifat mendidik'
        ]
      },
      C: {
        judul: 'Kontrak Belajar (Profesional & Fleksibel)',
        intro: 'Kontrak belajar ini disusun secara kolaboratif untuk menciptakan lingkungan belajar yang profesional, saling menghargai, dan mendukung kemandirian peserta didik. Mengingat karakteristik peserta didik Paket C yang umumnya sudah dewasa dan memiliki kesibukan lain.',
        aturan: [
          'Setiap peserta didik bertanggung jawab atas proses belajarnya sendiri',
          'Menghormati jadwal dan komitmen belajar yang telah disepakati',
          'Berkontribusi aktif dalam setiap diskusi dan kegiatan kelompok',
          'Memberikan dan menerima umpan balik secara profesional',
          'Menjaga kerahasiaan informasi pribadi sesama peserta didik',
          'Mengkomunikasikan kendala belajar kepada tutor secara proaktif',
          'Fleksibilitas waktu difasilitasi melalui sistem SKK dengan kesepakatan tutor',
          'Menghargai keberagaman latar belakang, usia, dan pengalaman sesama peserta didik',
          'Konsekuensi pelanggaran bersifat restoratif (pemulihan), bukan punitif (hukuman)'
        ]
      }
    };

    const tk = tipeKesepakatan[ctx.paket];

    const content = [
      h.title(tk.judul),
      h.para(`${ctx.lembaga.nama} — ${ctx.pkg.nama} (Setara ${ctx.pkg.setara})`, { align: docx.AlignmentType.CENTER, bold: true }),
      h.para(`Tahun Ajaran ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER }),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('Latar Belakang'),
      h.para(tk.intro, { indent: true }),
      h.empty(),
      h.heading('Kesepakatan Kami'),
      h.para('Kami, seluruh peserta didik dan tutor, bersepakat untuk:', { indent: false })
    ];

    tk.aturan.forEach((a, i) => {
      content.push(h.numbered(a, i + 1));
    });

    content.push(
      h.empty(),
      h.heading('Konsekuensi yang Disepakati'),
      h.para('Apabila terjadi pelanggaran, maka konsekuensi berikut berlaku:', { indent: false }),
      h.numbered('Pelanggaran pertama: Teguran lisan dan refleksi diri', 1),
      h.numbered('Pelanggaran kedua: Diskusi dengan tutor dan penulisan komitmen perbaikan', 2),
      h.numbered('Pelanggaran ketiga: Komunikasi dengan orang tua/wali', 3),
      h.empty(),
      h.heading('Lembar Pengesahan'),
      h.para(`Disepakati bersama pada tanggal: ___________________, di ${ctx.lembaga.kabupaten || '________'}`, { indent: false }),
      h.empty(),
      h.para('Tanda tangan peserta didik:', { bold: true }),
      h.table(
        ['No', 'Nama', 'Tanda Tangan'],
        [
          ['1', '', ''], ['2', '', ''], ['3', '', ''],
          ['4', '', ''], ['5', '', ''], ['6', '', ''],
          ['7', '', ''], ['8', '', ''], ['9', '', ''], ['10', '', '']
        ]
      ),
      h.empty(),
      h.para('Mengetahui,', { indent: false }),
      h.table(
        ['Tutor Kelas', 'Kepala PKBM'],
        [
          ['', ''],
          ['', ''],
          ['(___________________)', `(${ctx.lembaga.kepala.nama || '___________________'})`]
        ]
      )
    );
    return content;
  },

  // =================================================
  // 2.1-02: Template Poster Aturan Kelas
  // =================================================
  'B2-2.1-02': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Panduan Desain Poster Aturan Kelas'),
      h.para(`Dokumen ini merupakan panduan konten untuk pembuatan poster aturan kelas yang akan ditempel di ruang belajar ${ctx.lembaga.nama}.`, { italic: true }),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('Spesifikasi Poster'),
      h.table(
        ['Komponen', 'Keterangan'],
        [
          ['Ukuran', 'A2 (420 × 594 mm) atau A3 (297 × 420 mm)'],
          ['Warna Dominan', 'Cerah dan menarik (biru, hijau, kuning)'],
          ['Font', 'Besar, mudah dibaca dari jarak 3 meter'],
          ['Bahasa', ctx.paket === 'A' ? 'Sederhana, dilengkapi gambar/ikon' : 'Formal namun mudah dipahami'],
          ['Penempatan', 'Dinding depan kelas, terlihat oleh semua peserta didik']
        ]
      ),
      h.empty(),
      h.heading('Konten Poster'),
      h.para('JUDUL: "KESEPAKATAN KELAS KITA"', { bold: true, align: docx.AlignmentType.CENTER }),
      h.empty(),
    ];

    const aturanPoster = ctx.paket === 'A' ? [
      { ikon: '🤚', teks: 'Angkat tangan sebelum bicara' },
      { ikon: '👂', teks: 'Dengarkan teman berbicara' },
      { ikon: '🤝', teks: 'Saling tolong-menolong' },
      { ikon: '😊', teks: 'Bersikap ramah dan sopan' },
      { ikon: '📚', teks: 'Merawat buku dan alat belajar' },
      { ikon: '🧹', teks: 'Jaga kebersihan kelas' }
    ] : [
      { ikon: '🗣️', teks: 'Hormati pendapat sesama' },
      { ikon: '⏰', teks: 'Tepat waktu' },
      { ikon: '📵', teks: 'HP mode silent saat belajar' },
      { ikon: '🤝', teks: 'Saling menghargai' },
      { ikon: '📝', teks: 'Jujur dan bertanggung jawab' },
      { ikon: '🚫', teks: 'Zero bullying' }
    ];

    content.push(
      h.table(
        ['Ikon', 'Teks Aturan'],
        aturanPoster.map(a => [a.ikon, a.teks])
      ),
      h.empty(),
      h.para('Footer poster: "Disepakati bersama oleh seluruh peserta didik dan tutor"', { italic: true }),
      h.para(`"${ctx.lembaga.nama} — T.A. ${ctx.tahunAjaran}"`, { italic: true }),
      h.empty(),
      h.heading('Catatan'),
      h.bullet('Poster ini merupakan visualisasi dari Dokumen Kesepakatan Kelas'),
      h.bullet('Diperbarui setiap awal tahun ajaran atau semester'),
      h.bullet('Peserta didik dilibatkan dalam proses desain dan pembuatan')
    );
    return content;
  },

  // =================================================
  // 2.1-03: Jurnal Penerapan Kesepakatan Kelas
  // =================================================
  'B2-2.1-03': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Jurnal Penerapan Kesepakatan Kelas'),
      h.referensiRegulasi(ctx),
      h.para(`${ctx.lembaga.nama} | ${ctx.pkg.nama} | T.A. ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER }),
      h.empty(),
      h.heading('Identitas'),
      h.para('Kelas / Rombel : ___________________________', { indent: false }),
      h.para('Tutor Kelas    : ___________________________', { indent: false }),
      h.para('Semester       : ___________________________', { indent: false }),
      h.empty(),
      h.heading('Catatan Penerapan Mingguan'),
      h.para('Diisi oleh tutor setiap minggu sebagai monitoring penerapan kesepakatan kelas:', { italic: true }),
      h.empty()
    ];

    for (let i = 1; i <= 12; i++) {
      content.push(
        h.heading(`Minggu ke-${i}`, 3),
        h.table(
          ['Aspek', 'Catatan'],
          [
            ['Tanggal', '___/___/_______ s.d. ___/___/_______'],
            ['Kesepakatan yang terlaksana baik', ''],
            ['Kesepakatan yang masih perlu ditingkatkan', ''],
            ['Pelanggaran yang terjadi (jika ada)', ''],
            ['Tindak lanjut yang dilakukan', ''],
            ['Refleksi dan evaluasi', '']
          ]
        ),
        h.empty()
      );
    }

    content.push(
      h.heading('Evaluasi Semester'),
      h.para('Ringkasan evaluasi penerapan kesepakatan kelas selama satu semester:', { indent: false }),
      h.table(
        ['Aspek Evaluasi', 'Deskripsi'],
        [
          ['Tingkat kepatuhan terhadap kesepakatan', '__________ %'],
          ['Kesepakatan yang paling efektif', ''],
          ['Kesepakatan yang perlu direvisi', ''],
          ['Rekomendasi untuk semester berikutnya', '']
        ]
      ),
      h.empty(),
      ...h.signatureTutor(ctx)
    );
    return content;
  },

  // =================================================
  // 2.2-01: Pedoman Tata Tertib PKBM (Disiplin Positif)
  // =================================================
  'B2-2.2-01': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Pedoman Tata Tertib PKBM'),
      h.heading('Pendekatan Disiplin Positif', 2),
      h.para(`${ctx.lembaga.nama}`, { align: docx.AlignmentType.CENTER, bold: true }),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('BAB I — Ketentuan Umum'),
      h.heading('Pasal 1: Pengertian', 3),
      h.numbered('Disiplin positif adalah pendekatan mendidik yang mengutamakan rasa hormat timbal balik, mendorong pemahaman, dan membangun keterampilan sosial-emosional.', 1),
      h.numbered('Tata tertib ini berlaku untuk seluruh peserta didik program Paket A, B, dan C di lingkungan PKBM.', 2),
      h.numbered('Pendekatan disiplin positif mengutamakan pencegahan, bukan penghukuman.', 3),
      h.empty(),
      h.heading('Pasal 2: Tujuan', 3),
      h.numbered('Menciptakan lingkungan belajar yang aman, nyaman, dan kondusif.', 1),
      h.numbered('Mengembangkan kedisiplinan internal peserta didik melalui pemahaman, bukan ketakutan.', 2),
      h.numbered('Membangun hubungan yang saling menghargai antara tutor dan peserta didik.', 3),
      h.empty(),
      h.heading('BAB II — Hak dan Kewajiban'),
      h.heading('Pasal 3: Hak Peserta Didik', 3),
      h.numbered('Mendapatkan layanan pendidikan yang berkualitas.', 1),
      h.numbered('Merasa aman dan nyaman selama berada di lingkungan PKBM.', 2),
      h.numbered('Menyampaikan pendapat dan aspirasi secara terbuka dan sopan.', 3),
      h.numbered('Mendapatkan perlakuan yang adil tanpa diskriminasi.', 4),
      h.numbered('Mendapatkan bimbingan dan konseling dari tutor.', 5),
      h.empty(),
      h.heading('Pasal 4: Kewajiban Peserta Didik', 3),
      h.numbered('Hadir tepat waktu sesuai jadwal yang telah disepakati.', 1),
      h.numbered('Mengikuti kegiatan pembelajaran dengan sungguh-sungguh.', 2),
      h.numbered('Menghormati tutor, sesama peserta didik, dan staf PKBM.', 3),
      h.numbered('Menjaga kebersihan dan kerapian lingkungan PKBM.', 4),
      h.numbered('Tidak melakukan tindakan yang merugikan diri sendiri atau orang lain.', 5),
      h.empty(),
      h.heading('BAB III — Pendekatan Disiplin Positif'),
      h.heading('Pasal 5: Prinsip Utama', 3),
      h.numbered('Bersifat tegas namun tetap menghargai (firm but kind).', 1),
      h.numbered('Mendorong peserta didik menemukan solusi atas permasalahannya sendiri.', 2),
      h.numbered('Menggunakan konsekuensi logis, bukan hukuman fisik atau verbal.', 3),
      h.numbered('Membangun rasa memiliki (belonging) dan kebermaknaan (significance).', 4),
      h.empty(),
      h.heading('Pasal 6: Prosedur Penanganan Pelanggaran', 3),
      h.table(
        ['Tahap', 'Tindakan', 'Pelaksana'],
        [
          ['1 — Pencegahan', 'Pembinaan rutin, kesepakatan kelas, teladan tutor', 'Semua tutor'],
          ['2 — Peringatan', 'Teguran lisan secara pribadi, refleksi diri', 'Tutor kelas'],
          ['3 — Diskusi', 'Dialog restoratif: apa yang terjadi, dampaknya, solusi', 'Tutor + peserta didik'],
          ['4 — Komitmen', 'Peserta didik menulis rencana perbaikan diri', 'Tutor + peserta didik'],
          ['5 — Koordinasi', 'Komunikasi dengan orang tua/wali', 'Tutor + Kepala PKBM'],
          ['6 — Evaluasi', 'Tinjauan bersama setelah 2 minggu', 'Tutor + Kepala PKBM']
        ]
      ),
      h.empty(),
      h.heading('Pasal 7: Larangan'),
      h.para('Dalam penerapan disiplin, tutor dan staf DILARANG:', { bold: true }),
      h.bullet('Memberikan hukuman fisik dalam bentuk apapun'),
      h.bullet('Menggunakan bahasa yang merendahkan, mempermalukan, atau mengancam'),
      h.bullet('Mengeluarkan peserta didik dari kelas tanpa proses dialog'),
      h.bullet('Mendiskriminasi peserta didik berdasarkan latar belakang'),
      h.empty(),
      h.heading('BAB IV — Penutup'),
      h.para('Pedoman tata tertib ini mulai berlaku sejak tanggal ditetapkan dan dapat ditinjau kembali setiap awal tahun ajaran baru.', { indent: true }),
      h.empty(),
      h.para(`Ditetapkan di: ${ctx.lembaga.kabupaten || '________'}`, { indent: false }),
      h.para(`Tanggal       : ${ctx.tanggal}`, { indent: false }),
      h.empty(),
      ...h.signature(ctx)
    ];
    return content;
  },

  // =================================================
  // 2.2-02: Format Catatan Supervisi Pengelolaan Kelas
  // =================================================
  'B2-2.2-02': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Format Catatan Supervisi Pengelolaan Kelas'),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('A. Data Supervisi'),
      h.table(
        ['Komponen', 'Isian'],
        [
          ['Nama Tutor', '___________________________'],
          ['Kelas / Program', `${ctx.pkg.nama} / ___________`],
          ['Mata Pelajaran', '___________________________'],
          ['Hari/Tanggal', '___________________________'],
          ['Waktu', '_____ s/d _____'],
          ['Supervisor', '___________________________']
        ]
      ),
      h.empty(),
      h.heading('B. Aspek Pengelolaan Kelas'),
      h.table(
        ['No', 'Aspek yang Diamati', 'Skor (1-4)', 'Catatan'],
        [
          ['1', 'Tutor memulai pembelajaran dengan menyenangkan dan terstruktur', '', ''],
          ['2', 'Kesepakatan kelas diterapkan secara konsisten', '', ''],
          ['3', 'Tutor menerapkan pendekatan disiplin positif (bukan punitif)', '', ''],
          ['4', 'Tidak ada tindakan agresif verbal maupun nonverbal', '', ''],
          ['5', 'Tutor merespon perilaku mengganggu dengan cara konstruktif', '', ''],
          ['6', 'Peserta didik menunjukkan rasa aman selama pembelajaran', '', ''],
          ['7', 'Transisi antar kegiatan berjalan lancar tanpa kehilangan waktu', '', ''],
          ['8', 'Tutor memberikan apresiasi terhadap perilaku positif peserta didik', '', ''],
          ['9', 'Pengelolaan ruang dan tempat duduk mendukung kegiatan belajar', '', ''],
          ['10', 'Suasana kelas secara keseluruhan kondusif dan positif', '', '']
        ]
      ),
      h.para('Skor: 1 = Kurang | 2 = Cukup | 3 = Baik | 4 = Sangat Baik', { italic: true, size: 20 }),
      h.empty(),
      h.heading('C. Catatan Deskriptif'),
      h.para('Kekuatan pengelolaan kelas:', { bold: true }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.para('Aspek yang perlu diperbaiki:', { bold: true }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.para('Rekomendasi:', { bold: true }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      h.table(
        ['Supervisor', 'Tutor yang Disupervisi'],
        [['', ''], ['', ''], ['Nama: ________________', 'Nama: ________________']]
      )
    ];
    return content;
  },

  // =================================================
  // 2.2-03: Template Angket Rasa Aman dan Nyaman Siswa
  // =================================================
  'B2-2.2-03': function(ctx) {
    const h = DocGenerator.h;

    const pernyataan = [
      'Saya merasa aman saat berada di lingkungan PKBM',
      'Saya tidak pernah mengalami kekerasan fisik di PKBM',
      'Saya tidak pernah mengalami kekerasan verbal (kata-kata kasar) di PKBM',
      'Saya tidak pernah menjadi korban perundungan (bullying)',
      'Tutor memperlakukan semua peserta didik dengan adil',
      'Tutor tidak pernah menggunakan hukuman fisik',
      'Saya merasa nyaman untuk bertanya dan menyampaikan pendapat',
      'Lingkungan belajar di PKBM bersih dan tertata rapi',
      'Saya memiliki teman yang bisa diajak berbagi cerita',
      'Jika ada masalah, saya tahu kepada siapa harus melapor'
    ];

    const content = [
      h.title('Angket Rasa Aman dan Nyaman Peserta Didik'),
      h.referensiRegulasi(ctx),
      h.para(`${ctx.lembaga.nama} | ${ctx.pkg.nama} | T.A. ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER }),
      h.empty(),
      h.heading('Identitas Responden'),
      h.para('Nama    : ___________________________ (boleh anonim)', { indent: false }),
      h.para('Kelas   : ___________________________', { indent: false }),
      h.para('Tanggal : ___________________________', { indent: false }),
      h.empty(),
      h.heading('Petunjuk'),
      h.para('Berilah tanda centang (✓) pada kolom yang sesuai. Jawaban Anda bersifat rahasia dan tidak mempengaruhi nilai.', { indent: true }),
      h.empty(),
      h.table(
        ['No', 'Pernyataan', 'SS', 'S', 'KS', 'TS'],
        pernyataan.map((p, i) => [String(i + 1), p, '', '', '', ''])
      ),
      h.para('SS = Sangat Setuju | S = Setuju | KS = Kurang Setuju | TS = Tidak Setuju', { italic: true, size: 20 }),
      h.empty(),
      h.heading('Pertanyaan Terbuka'),
      h.numbered('Apa yang membuat Anda merasa aman dan nyaman di PKBM?', 1),
      h.para('_______________________________________________________________________', { indent: false }),
      h.numbered('Apa yang membuat Anda kurang nyaman (jika ada)?', 2),
      h.para('_______________________________________________________________________', { indent: false }),
      h.numbered('Saran untuk meningkatkan kenyamanan di PKBM:', 3),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      h.para('Terima kasih atas kejujuran Anda!', { italic: true, align: docx.AlignmentType.CENTER })
    ];
    return content;
  },

  // =================================================
  // 2.3-01: RPP/Modul Ajar Model Pembelajaran Aktif
  // =================================================
  'B2-2.3-01': function(ctx) {
    const h = DocGenerator.h;

    const modelAktif = {
      A: { model: 'Cooperative Learning (Belajar Bersama)', strategi: 'Think-Pair-Share, jigsaw sederhana, belajar melalui permainan edukatif', contohKegiatan: 'Peserta didik bekerja berpasangan menyelesaikan puzzle kata/angka, lalu berbagi jawaban dengan kelas' },
      B: { model: 'Problem Based Learning (PBL)', strategi: 'Identifikasi masalah, investigasi, kolaborasi, presentasi solusi', contohKegiatan: 'Kelompok menganalisis masalah lingkungan di sekitar PKBM, kemudian merancang solusi sederhana' },
      C: { model: 'Project Based Learning dengan pendekatan Inquiry', strategi: 'Pertanyaan pemandu, penelitian mandiri, produk akhir, evaluasi sejawat', contohKegiatan: 'Peserta didik merancang proyek kewirausahaan sosial berbasis masalah lokal, menyusun proposal, dan mempresentasikannya' }
    };

    const ma = modelAktif[ctx.paket];

    const content = [
      h.title('Modul Ajar — Pembelajaran Aktif'),
      h.heading(`Model: ${ma.model}`, 2),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('A. Informasi Umum'),
      h.table(
        ['Komponen', 'Keterangan'],
        [
          ['Satuan Pendidikan', ctx.lembaga.nama],
          ['Program', `${ctx.pkg.nama} (Setara ${ctx.pkg.setara})`],
          ['Mata Pelajaran', ctx.mapel],
          ['Kelas / Fase', `_____ / Fase ${ctx.fase}`],
          ['Model Pembelajaran', ma.model],
          ['Alokasi Waktu', `4 JP × ${ctx.pkg.jpMenit} menit = ${4 * ctx.pkg.jpMenit} menit`],
          ['Tahun Ajaran', ctx.tahunAjaran]
        ]
      ),
      h.empty(),
      h.heading('B. Tujuan Pembelajaran'),
      h.numbered('Peserta didik terlibat aktif dalam kegiatan belajar yang bermakna', 1),
      h.numbered('Peserta didik mampu berkolaborasi dan berkomunikasi dengan efektif', 2),
      h.numbered('Peserta didik mampu mengkonstruksi pengetahuan melalui pengalaman langsung', 3),
      h.empty(),
      h.heading('C. Strategi Pembelajaran Aktif'),
      h.para(`Strategi: ${ma.strategi}`, { bold: true }),
      h.para(`Contoh kegiatan: ${ma.contohKegiatan}`, { indent: true }),
      h.empty(),
      h.heading('D. Langkah Kegiatan Pembelajaran'),
      h.heading('Pendahuluan (15 menit)', 3),
      h.bullet('Salam, doa, dan presensi'),
      h.bullet('Apersepsi: Menghubungkan materi dengan pengalaman/pengetahuan peserta didik'),
      h.bullet('Menyampaikan tujuan pembelajaran dan kegiatan yang akan dilakukan'),
      h.empty(),
      h.heading('Kegiatan Inti (sesuai alokasi)', 3),
      h.bullet('Tahap 1 — Orientasi: Tutor mengarahkan pada topik/masalah utama'),
      h.bullet('Tahap 2 — Eksplorasi: Peserta didik bekerja dalam kelompok/pasangan untuk mengeksplorasi materi'),
      h.bullet('Tahap 3 — Diskusi: Kelompok mendiskusikan temuan dan merumuskan jawaban/solusi'),
      h.bullet('Tahap 4 — Presentasi: Setiap kelompok mempresentasikan hasil kerja'),
      h.bullet('Tahap 5 — Konfirmasi: Tutor memberikan umpan balik dan penguatan'),
      h.empty(),
      h.heading('Penutup (15 menit)', 3),
      h.bullet('Refleksi bersama: apa yang dipelajari, bagaimana prosesnya'),
      h.bullet('Tugas tindak lanjut (jika ada)'),
      h.bullet('Doa penutup'),
      h.empty(),
      h.heading('E. Asesmen'),
      h.para('Formatif: Observasi partisipasi aktif, kualitas diskusi, dan hasil kerja kelompok.', { indent: true }),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
    return content;
  },

  // =================================================
  // 2.3-02: LKPD Kegiatan Belajar Aktif
  // =================================================
  'B2-2.3-02': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Lembar Kerja Peserta Didik (LKPD)'),
      h.heading('Kegiatan Belajar Aktif', 2),
      h.referensiRegulasi(ctx),
      h.para(`Program: ${ctx.pkg.nama} | Mata Pelajaran: ${ctx.mapel} | Fase: ${ctx.fase}`, { align: docx.AlignmentType.CENTER }),
      h.empty(),
      h.heading('Identitas'),
      h.para('Nama           : ___________________________', { indent: false }),
      h.para('Kelas / Rombel : ___________________________', { indent: false }),
      h.para('Tanggal        : ___________________________', { indent: false }),
      h.empty(),
      h.heading('Tujuan Kegiatan'),
      h.para('Melalui kegiatan ini, kamu akan belajar secara aktif dengan mengamati, berdiskusi, dan berkreasi bersama teman-teman.', { indent: true }),
      h.empty(),
      h.heading('Kegiatan 1 — Mengamati'),
      h.para(`${ctx.paket === 'A' ? 'Amatilah gambar/benda di bawah ini, lalu jawab pertanyaan!' : 'Baca dan amati teks/informasi berikut, kemudian identifikasi poin-poin penting!'}`, { indent: true }),
      h.para('[Ruang untuk stimulus: gambar, teks, tabel, atau infografis]', { italic: true }),
      h.empty(),
      h.para('Pertanyaan:', { bold: true }),
      h.numbered('Apa yang kamu amati?', 1),
      h.para('Jawaban: _______________________________________________________', { indent: false }),
      h.numbered('Apa yang menarik perhatianmu? Mengapa?', 2),
      h.para('Jawaban: _______________________________________________________', { indent: false }),
      h.empty(),
      h.heading('Kegiatan 2 — Berdiskusi'),
      h.para('Diskusikan bersama kelompokmu:', { indent: false }),
      h.numbered('Apa hubungan antara yang kalian amati dengan kehidupan sehari-hari?', 1),
      h.para('Jawaban: _______________________________________________________', { indent: false }),
      h.numbered('Bagaimana cara menerapkan konsep ini dalam kehidupan nyata?', 2),
      h.para('Jawaban: _______________________________________________________', { indent: false }),
      h.empty(),
      h.heading('Kegiatan 3 — Berkreasi/Mempraktikkan'),
      h.para(`${ctx.paket === 'A' ? 'Buatlah gambar atau tabel sederhana tentang apa yang sudah kamu pelajari!' : ctx.paket === 'B' ? 'Buatlah peta konsep atau poster mini tentang materi yang dipelajari!' : 'Susunlah analisis singkat atau proposal solusi berdasarkan diskusi kelompok!'}`, { indent: true }),
      h.para('[Ruang untuk berkreasi]', { italic: true }),
      h.empty(),
      h.heading('Refleksi Diri'),
      h.table(
        ['Pertanyaan', 'Jawaban'],
        [
          ['Apa yang sudah kamu pahami?', ''],
          ['Apa yang masih bingung?', ''],
          ['Bagaimana perasaanmu saat belajar hari ini?', '']
        ]
      )
    ];
    return content;
  },

  // =================================================
  // 2.3-03: Format Dokumentasi Kegiatan Belajar Siswa
  // =================================================
  'B2-2.3-03': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Format Dokumentasi Kegiatan Belajar Peserta Didik'),
      h.referensiRegulasi(ctx),
      h.para('Format ini digunakan untuk mendokumentasikan kegiatan belajar aktif peserta didik sebagai bukti fisik bahwa waktu di kelas terfokus pada kegiatan belajar.', { italic: true }),
      h.empty(),
      h.heading('Identitas Kegiatan'),
      h.table(
        ['Komponen', 'Isian'],
        [
          ['Mata Pelajaran', '___________________________'],
          ['Kelas / Program', `${ctx.pkg.nama}`],
          ['Tutor', '___________________________'],
          ['Hari/Tanggal', '___________________________'],
          ['Jam Pelajaran', `Ke-____ s/d Ke-____ (@ ${ctx.pkg.jpMenit} menit)`],
          ['Jenis Kegiatan', 'Diskusi / Presentasi / Praktik / Proyek / Eksperimen *']
        ]
      ),
      h.empty(),
      h.heading('Deskripsi Kegiatan Belajar'),
      h.table(
        ['Tahap', 'Waktu', 'Kegiatan', 'Keterangan'],
        [
          ['Pendahuluan', '____ menit', '', ''],
          ['Inti — Kegiatan 1', '____ menit', '', ''],
          ['Inti — Kegiatan 2', '____ menit', '', ''],
          ['Inti — Kegiatan 3', '____ menit', '', ''],
          ['Penutup', '____ menit', '', '']
        ]
      ),
      h.empty(),
      h.heading('Bukti Visual'),
      h.para('(Tempelkan foto kegiatan pembelajaran)', { indent: false }),
      h.para('[Foto 1: ________________] — Deskripsi: ________________', { indent: false }),
      h.para('[Foto 2: ________________] — Deskripsi: ________________', { indent: false }),
      h.para('[Foto 3: ________________] — Deskripsi: ________________', { indent: false }),
      h.empty(),
      h.heading('Hasil Karya Peserta Didik'),
      h.para('Lampirkan hasil karya peserta didik (poster, laporan, produk kreatif, dll):', { indent: false }),
      h.para('[Lampiran 1: ________________]', { indent: false }),
      h.para('[Lampiran 2: ________________]', { indent: false }),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
    return content;
  }
};
