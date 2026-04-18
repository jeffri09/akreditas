/**
 * butir1.js — Template Dokumen Butir 1
 * Dukungan Sosial Emosional bagi Peserta Didik
 * Diferensiasi: Remedial diagnostik (A), Penguatan konsep (B), Persiapan vokasi (C)
 */

const Butir1Templates = {
  // =================================================
  // 1.1-01: Format Dokumentasi Kegiatan Diskusi Kelas
  // =================================================
  'B1-1.1-01': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Format Dokumentasi Kegiatan Diskusi Kelas / Kerja Kelompok'),
      h.referensiRegulasi(ctx),
      h.para(`Satuan Pendidikan : ${ctx.lembaga.nama}`, { indent: false }),
      h.para(`Program           : ${ctx.pkg.nama} (Setara ${ctx.pkg.setara})`, { indent: false }),
      h.para(`Tahun Ajaran      : ${ctx.tahunAjaran}`, { indent: false }),
      h.para(`Fase              : ${ctx.fase}`, { indent: false }),
      h.empty(),
      h.heading('A. Identitas Kegiatan'),
      h.table(
        ['Komponen', 'Isian'],
        [
          ['Mata Pelajaran', '___________________________'],
          ['Kelas / Rombel', '___________________________'],
          ['Hari/Tanggal', '___________________________'],
          ['Waktu Pelaksanaan', `_____ JP × ${ctx.pkg.jpMenit} menit = _____ menit`],
          ['Tutor/Pendidik', '___________________________'],
          ['Topik Diskusi/Kerja Kelompok', '___________________________'],
          ['Jumlah Peserta Didik Hadir', '_____ orang'],
          ['Jumlah Kelompok', '_____ kelompok']
        ]
      ),
      h.empty(),
      h.heading('B. Deskripsi Kegiatan Diskusi'),
      h.para('Tuliskan deskripsi singkat mengenai jalannya kegiatan diskusi kelas/kerja kelompok:', { indent: false }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      h.heading('C. Indikator Interaksi Setara dan Saling Menghargai'),
      h.para('Beri tanda centang (✓) pada indikator yang teramati:', { indent: false }),
      h.table(
        ['No', 'Indikator Interaksi', 'Ya', 'Tidak', 'Catatan'],
        [
          ['1', 'Semua peserta didik diberi kesempatan yang sama untuk menyampaikan pendapat', '', '', ''],
          ['2', 'Tutor mendengarkan pendapat peserta didik tanpa memotong', '', '', ''],
          ['3', 'Peserta didik saling menanggapi pendapat teman dengan sopan', '', '', ''],
          ['4', 'Tidak ada peserta didik yang mendominasi diskusi', '', '', ''],
          ['5', 'Tutor memberikan apresiasi verbal terhadap kontribusi peserta didik', '', '', ''],
          ['6', 'Peserta didik berani bertanya tanpa rasa takut disalahkan', '', '', ''],
          ['7', 'Terjadi kolaborasi aktif antar peserta didik dalam kelompok', '', '', '']
        ]
      ),
      h.empty(),
      h.heading('D. Dokumentasi Visual'),
      h.para('(Tempelkan foto kegiatan diskusi/kerja kelompok di bawah ini)', { indent: false }),
      h.para('[Foto 1: ________________]', { indent: false }),
      h.para('[Foto 2: ________________]', { indent: false }),
      h.empty(),
      h.heading('E. Refleksi Tutor'),
      h.para('Catatan refleksi tutor tentang kualitas interaksi dalam kegiatan:', { indent: false }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
    return content;
  },

  // =================================================
  // 1.1-02: Angket Kepuasan Siswa tentang Suasana Interaksi
  // =================================================
  'B1-1.1-02': function(ctx) {
    const h = DocGenerator.h;
    const skalaLabel = ctx.paket === 'A'
      ? '😊 Senang / 😐 Biasa / 😢 Tidak Senang'
      : 'SS = Sangat Setuju | S = Setuju | KS = Kurang Setuju | TS = Tidak Setuju';

    const pernyataan = ctx.paket === 'A' ? [
      'Saya merasa senang belajar di kelas',
      'Tutor/guru saya baik dan sabar',
      'Teman-teman saya mendengar saat saya berbicara',
      'Saya berani bertanya di kelas',
      'Saya tidak takut salah saat menjawab',
      'Saya suka belajar bersama teman-teman',
      'Tutor menghargai pendapat saya',
      'Saya merasa aman dan nyaman di kelas'
    ] : [
      'Tutor memberikan kesempatan yang sama kepada semua peserta didik untuk berpendapat',
      'Suasana diskusi di kelas berlangsung secara terbuka dan saling menghargai',
      'Peserta didik tidak takut menyampaikan pendapat meskipun berbeda',
      'Tutor merespon setiap pertanyaan dan pendapat dengan positif',
      'Tutor tidak membeda-bedakan perlakuan terhadap peserta didik',
      'Saya merasa dihargai sebagai individu dalam proses pembelajaran',
      'Interaksi di kelas mendorong saya untuk lebih aktif belajar',
      'Tutor membangun komunikasi dua arah yang efektif',
      'Tidak pernah terjadi bullying atau perundungan di kelas',
      'Secara keseluruhan, suasana kelas mendukung proses belajar saya'
    ];

    const columns = ctx.paket === 'A'
      ? ['No', 'Pernyataan', '😊', '😐', '😢']
      : ['No', 'Pernyataan', 'SS', 'S', 'KS', 'TS'];

    const content = [
      h.title('Angket Kepuasan Peserta Didik tentang Suasana Interaksi di Kelas'),
      h.referensiRegulasi(ctx),
      h.para(`Satuan Pendidikan : ${ctx.lembaga.nama}`, { indent: false }),
      h.para(`Program           : ${ctx.pkg.nama} (Setara ${ctx.pkg.setara})`, { indent: false }),
      h.para(`Tahun Ajaran      : ${ctx.tahunAjaran}`, { indent: false }),
      h.empty(),
      h.heading('Identitas Responden'),
      h.para('Nama       : ___________________________', { indent: false }),
      h.para('Kelas      : ___________________________', { indent: false }),
      h.para('Tanggal    : ___________________________', { indent: false }),
      h.empty(),
      h.heading('Petunjuk Pengisian'),
      h.para(`Berilah tanda centang (✓) pada kolom yang sesuai dengan pendapat Anda.`, { indent: false }),
      h.para(`Skala: ${skalaLabel}`, { indent: false, bold: true }),
      h.empty(),
      h.table(
        columns,
        pernyataan.map((p, i) => {
          const row = [String(i + 1), p];
          const emptyCols = ctx.paket === 'A' ? 3 : 4;
          for (let j = 0; j < emptyCols; j++) row.push('');
          return row;
        })
      ),
      h.empty(),
      h.heading('Saran/Masukan (Opsional)'),
      h.para('_______________________________________________________________________', { indent: false }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      h.para('Terima kasih atas partisipasi Anda!', { italic: true, align: docx.AlignmentType.CENTER }),
    ];
    return content;
  },

  // =================================================
  // 1.1-03: Format Catatan Supervisi/Observasi Pembelajaran
  // =================================================
  'B1-1.1-03': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Format Catatan Supervisi / Observasi Pembelajaran'),
      h.para(`Instrumen ini digunakan oleh Kepala PKBM atau Pengawas untuk mengobservasi kualitas interaksi dalam proses pembelajaran.`, { italic: true }),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('A. Data Pelaksanaan Supervisi'),
      h.table(
        ['Komponen', 'Isian'],
        [
          ['Nama Tutor yang Diobservasi', '___________________________'],
          ['Mata Pelajaran', '___________________________'],
          ['Kelas / Program', `${ctx.pkg.nama} / ___________`],
          ['Hari/Tanggal', '___________________________'],
          ['Jam Pelajaran', `_____ s/d _____ (@ ${ctx.pkg.jpMenit} menit)`],
          ['Nama Supervisor', '___________________________'],
          ['Jabatan Supervisor', 'Kepala PKBM / Pengawas']
        ]
      ),
      h.empty(),
      h.heading('B. Aspek Observasi — Interaksi Pembelajaran'),
      h.table(
        ['No', 'Aspek yang Diamati', 'Skor 1-4', 'Catatan/Bukti'],
        [
          ['1', 'Tutor membangun suasana awal yang ramah dan inklusif', '', ''],
          ['2', 'Tutor memberikan kesempatan merata pada peserta didik untuk berpartisipasi', '', ''],
          ['3', 'Tutor menggunakan bahasa yang menghargai dan tidak merendahkan', '', ''],
          ['4', 'Tutor memberikan umpan balik yang konstruktif', '', ''],
          ['5', 'Tutor menerapkan strategi diferensiasi untuk peserta didik yang berbeda-beda', '', ''],
          ['6', 'Tutor memfasilitasi diskusi yang saling menghargai antar peserta didik', '', ''],
          ['7', 'Tutor mengelola waktu pembelajaran secara efektif', '', ''],
          ['8', 'Suasana kelas kondusif dan mendukung pembelajaran', '', '']
        ]
      ),
      h.empty(),
      h.para('Keterangan Skor: 1 = Kurang | 2 = Cukup | 3 = Baik | 4 = Sangat Baik', { italic: true, size: 20 }),
      h.empty(),
      h.heading('C. Catatan Kualitatif'),
      h.para('Kekuatan yang terlihat:', { bold: true }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.para('Area yang perlu ditingkatkan:', { bold: true }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.para('Rekomendasi tindak lanjut:', { bold: true }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      h.heading('D. Tanda Tangan'),
      h.table(
        ['Supervisor', 'Tutor yang Diobservasi'],
        [
          ['', ''],
          ['', ''],
          ['Nama: ________________', 'Nama: ________________'],
          ['Tanggal: ______________', 'Tanggal: ______________']
        ]
      )
    ];
    return content;
  },

  // =================================================
  // 1.2-01: RPP/Modul Ajar dengan Strategi Growth Mindset
  // =================================================
  'B1-1.2-01': function(ctx) {
    const h = DocGenerator.h;
    const mapelContoh = ctx.mapel;
    const faseLabel = `Fase ${ctx.fase}`;

    const content = [
      h.title('Modul Ajar / Rencana Pelaksanaan Pembelajaran'),
      h.heading('Strategi Growth Mindset — Pola Pikir Bertumbuh', 2),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('A. Informasi Umum'),
      h.table(
        ['Komponen', 'Keterangan'],
        [
          ['Satuan Pendidikan', ctx.lembaga.nama],
          ['Program', `${ctx.pkg.nama} (Setara ${ctx.pkg.setara})`],
          ['Mata Pelajaran', mapelContoh],
          ['Kelas / Fase', `_____ / ${faseLabel}`],
          ['Alokasi Waktu', `4 JP × ${ctx.pkg.jpMenit} menit = ${4 * ctx.pkg.jpMenit} menit`],
          ['Tahun Ajaran', ctx.tahunAjaran],
          ['Tutor/Pendidik', '___________________________'],
          ['Moda Pembelajaran', 'Tatap muka / Kombinasi (blended)']
        ]
      ),
      h.empty(),
      h.heading('B. Capaian Pembelajaran & Tujuan'),
      h.para(`Capaian Pembelajaran (CP) mengacu pada ${ctx.regulasiCP}.`, { indent: true }),
      h.para('Elemen CP: _______________________________________________________', { indent: false }),
      h.empty(),
      h.para('Tujuan Pembelajaran:', { bold: true }),
      h.numbered('Peserta didik mampu mengidentifikasi proses belajar sebagai perjalanan yang terus berkembang', 1),
      h.numbered('Peserta didik mampu merefleksikan usaha dan proses, bukan hanya hasil akhir', 2),
      h.numbered('Peserta didik menunjukkan sikap pantang menyerah dalam menghadapi tantangan belajar', 3),
      h.empty(),
      h.heading('C. Alur Perkembangan Kompetensi yang Dikembangkan'),
      h.bullet('Kemandirian — Sub-elemen: Regulasi diri'),
      h.bullet('Penalaran Kritis — Sub-elemen: Refleksi pemikiran dan proses berpikir'),
      h.empty(),
      h.heading('D. Pemahaman Bermakna'),
      h.para('Belajar adalah proses yang membutuhkan usaha terus-menerus. Kesalahan dan kegagalan merupakan bagian alami dari pertumbuhan. Dengan pola pikir bertumbuh (growth mindset), peserta didik memahami bahwa kemampuan bisa dikembangkan melalui dedikasi dan kerja keras.', { indent: true }),
      h.empty(),
      h.heading('E. Pertanyaan Pemantik'),
      h.numbered('Pernahkah kalian merasa kesulitan dalam belajar? Apa yang kalian lakukan?', 1),
      h.numbered('Menurut kalian, apakah orang pintar itu dilahirkan atau dibentuk?', 2),
      h.numbered('Apa yang lebih penting: hasil ujian atau proses belajarnya?', 3),
      h.empty(),
      h.heading('F. Kegiatan Pembelajaran'),
      h.heading('Pendahuluan (10 menit)', 3),
      h.bullet('Salam, doa, dan pengecekan kehadiran'),
      h.bullet('Tutor menyampaikan tujuan pembelajaran hari ini'),
      h.bullet('Ice-breaking: "Ceritakan satu hal yang pernah kalian gagal lakukan tapi akhirnya berhasil"'),
      h.empty(),
      h.heading('Inti (Diferensiasi berdasarkan Paket)', 3),
    ];

    // Diferensiasi kegiatan inti per paket
    if (ctx.paket === 'A') {
      content.push(
        h.para('Kegiatan untuk Paket A (Fase C — Literasi Dasar):', { bold: true }),
        h.bullet('Tutor membacakan cerita bergambar tentang tokoh yang pantang menyerah'),
        h.bullet('Peserta didik menggambar "Pohon Pertumbuhan Diri" — akar = usaha, daun = pencapaian'),
        h.bullet('Diskusi sederhana: "Apa yang sudah kalian pelajari bulan ini yang sebelumnya belum bisa?"'),
        h.bullet('Peserta didik menulis satu kalimat refleksi: "Aku bangga karena sudah berusaha..."')
      );
    } else if (ctx.paket === 'B') {
      content.push(
        h.para('Kegiatan untuk Paket B (Fase D — Eksplorasi):', { bold: true }),
        h.bullet('Tutor menampilkan video inspiratif tentang growth mindset (5 menit)'),
        h.bullet('Diskusi kelompok: Menganalisis perbedaan fixed vs growth mindset dengan contoh sehari-hari'),
        h.bullet('Peserta didik menulis jurnal refleksi: tantangan, usaha, dan hal yang dipelajari'),
        h.bullet('Presentasi kelompok: Strategi mengubah "Saya tidak bisa" menjadi "Saya belum bisa"')
      );
    } else {
      content.push(
        h.para('Kegiatan untuk Paket C (Fase E — Analitis & Vokasional):', { bold: true }),
        h.bullet('Tutor memfasilitasi diskusi tentang neuroplastisitas dan bagaimana otak berkembang'),
        h.bullet('Studi kasus: Menganalisis perjalanan tokoh sukses yang melewati banyak kegagalan'),
        h.bullet('Peserta didik menyusun "Personal Growth Plan" — target belajar 1 bulan ke depan'),
        h.bullet('Peer feedback: Saling memberikan umpan balik konstruktif atas rencana pertumbuhan')
      );
    }

    content.push(
      h.empty(),
      h.heading('Penutup (10 menit)', 3),
      h.bullet('Refleksi bersama: "Apa satu hal baru yang kalian pelajari hari ini?"'),
      h.bullet('Tutor memberikan umpan balik yang menekankan PROSES dan USAHA, bukan hanya hasil'),
      h.bullet('Tugas: Menulis 3 hal yang ingin dipelajari/ditingkatkan minggu ini'),
      h.empty(),
      h.heading('G. Asesmen'),
      h.para('Asesmen Formatif:', { bold: true }),
      h.bullet('Observasi partisipasi peserta didik dalam diskusi'),
      h.bullet('Review jurnal refleksi / tulisan peserta didik'),
      h.bullet('Checklist sikap growth mindset selama pembelajaran'),
      h.empty(),
      h.heading('H. Refleksi Pendidik'),
      h.para('Setelah pembelajaran, tutor merefleksikan:', { indent: false }),
      h.numbered('Apakah peserta didik menunjukkan perubahan sikap terhadap kegagalan?', 1),
      h.numbered('Strategi apa yang paling efektif membangun growth mindset?', 2),
      h.numbered('Apa yang perlu diperbaiki untuk pertemuan berikutnya?', 3),
      h.empty(),
      ...h.signatureTutor(ctx)
    );
    return content;
  },

  // =================================================
  // 1.2-02: Template Portofolio Refleksi Perkembangan Diri Siswa
  // =================================================
  'B1-1.2-02': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Portofolio Refleksi Perkembangan Diri Peserta Didik'),
      h.referensiRegulasi(ctx),
      h.para(`Program: ${ctx.pkg.nama} (Setara ${ctx.pkg.setara}) | Tahun Ajaran: ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER, italic: true }),
      h.empty(),
      h.heading('Identitas Peserta Didik'),
      h.table(
        ['Komponen', 'Isian'],
        [
          ['Nama Lengkap', '___________________________'],
          ['Kelas / Rombel', '___________________________'],
          ['Tutor Wali', '___________________________'],
          ['Semester', 'Ganjil / Genap *']
        ]
      ),
      h.empty(),
      h.heading('Refleksi Bulanan'),
      h.para('Isilah setiap bulan sebagai catatan perjalanan belajarmu:', { indent: false }),
      h.empty()
    ];

    const bulanGanjil = ['Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    bulanGanjil.forEach((bulan, i) => {
      content.push(
        h.heading(`Bulan ${i + 1}: ${bulan} ${ctx.tahunAjaran.split('/')[0]}`, 3),
        h.table(
          ['Aspek Refleksi', 'Jawaban Peserta Didik'],
          [
            ['Hal baru yang saya pelajari bulan ini', ''],
            ['Tantangan terbesar yang saya hadapi', ''],
            ['Cara saya mengatasi tantangan tersebut', ''],
            ['Hal yang membuat saya bangga', ''],
            ['Target saya untuk bulan depan', ''],
            ['Catatan tutor (umpan balik)', '']
          ]
        ),
        h.empty()
      );
    });

    content.push(
      h.heading('Ringkasan Perkembangan Semester'),
      h.para('Diisi oleh tutor berdasarkan portofolio peserta didik:', { italic: true }),
      h.table(
        ['Aspek', 'Deskripsi Perkembangan'],
        [
          ['Sikap terhadap belajar', ''],
          ['Kemampuan refleksi diri', ''],
          ['Perkembangan sosial-emosional', ''],
          ['Area yang masih perlu ditingkatkan', ''],
          ['Rekomendasi untuk semester berikutnya', '']
        ]
      ),
      h.empty(),
      ...h.signature(ctx)
    );
    return content;
  },

  // =================================================
  // 1.2-03: Lembar Umpan Balik Guru (Proses vs Hasil)
  // =================================================
  'B1-1.2-03': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Lembar Umpan Balik Tutor'),
      h.heading('Fokus pada Proses dan Usaha Belajar', 2),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.para(`Instrumen ini digunakan oleh tutor untuk memberikan umpan balik yang menekankan proses belajar peserta didik, bukan hanya hasil akhir. Sesuai dengan prinsip growth mindset dalam Kurikulum Merdeka.`, { indent: true, italic: true }),
      h.empty(),
      h.heading('Identitas'),
      h.para(`Tutor        : ___________________________`, { indent: false }),
      h.para(`Mata Pelajaran: ${ctx.mapel}`, { indent: false }),
      h.para(`Kelas/Program : ${ctx.pkg.nama}`, { indent: false }),
      h.para(`Tanggal       : ___________________________`, { indent: false }),
      h.empty(),
      h.heading('Format Umpan Balik per Peserta Didik'),
      h.table(
        ['No', 'Nama Peserta Didik', 'Usaha yang Terlihat', 'Strategi Belajar yang Digunakan', 'Umpan Balik Tutor (Fokus Proses)', 'Saran Pengembangan'],
        [
          ['1', '', '', '', '', ''],
          ['2', '', '', '', '', ''],
          ['3', '', '', '', '', ''],
          ['4', '', '', '', '', ''],
          ['5', '', '', '', '', '']
        ]
      ),
      h.empty(),
      h.heading('Panduan Penulisan Umpan Balik Growth Mindset'),
      h.para('Gunakan kalimat-kalimat berikut sebagai rujukan:', { bold: true }),
      h.empty(),
      h.table(
        ['❌ Hindari (Fixed Mindset)', '✅ Gunakan (Growth Mindset)'],
        [
          ['"Kamu memang pintar"', '"Usaha kerasmu dalam mengerjakan tugas ini sangat terlihat"'],
          ['"Nilaimu jelek"', '"Kamu sudah menunjukkan kemajuan di bagian ini, mari kita tingkatkan di bagian lain"'],
          ['"Ini mudah, kenapa tidak bisa?"', '"Soal ini memang menantang, coba kita cari cara lain untuk memahaminya"'],
          ['"Yang lain sudah bisa, masa kamu belum?"', '"Setiap orang punya kecepatan belajar yang berbeda, yang penting terus berusaha"'],
          ['"Jawabanmu salah"', '"Caramu sudah tepat, hanya perlu sedikit penyesuaian di langkah ini"']
        ]
      ),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
    return content;
  },

  // =================================================
  // 1.3-01: Program Remedial dan Pengayaan
  // =================================================
  'B1-1.3-01': function(ctx) {
    const h = DocGenerator.h;

    // Diferensiasi fokus remedial per paket
    const fokusRemedial = {
      A: { judul: 'Remedial Diagnostik Dasar', fokus: 'Penguatan kemampuan baca, tulis, dan hitung (calistung) melalui metode multisensori', contoh: 'Membaca bersama, menulis terbimbing, manipulasi benda konkret untuk berhitung' },
      B: { judul: 'Remedial Penguatan Konsep', fokus: 'Penguatan konsep dasar yang menjadi prasyarat untuk materi selanjutnya', contoh: 'Tutorial sebaya, latihan soal bertingkat, belajar mandiri terbimbing' },
      C: { judul: 'Remedial Persiapan Kompetensi Kelulusan', fokus: 'Penguatan kompetensi utama dan keterampilan vokasional untuk kesiapan kelulusan', contoh: 'Bimbingan intensif, drill soal ujian, praktek keterampilan vokasional' }
    };

    const fr = fokusRemedial[ctx.paket];

    const content = [
      h.title('Program Remedial dan Pengayaan'),
      h.heading(fr.judul, 2),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('A. Data Umum'),
      h.table(
        ['Komponen', 'Keterangan'],
        [
          ['Satuan Pendidikan', ctx.lembaga.nama],
          ['Program', `${ctx.pkg.nama} (Setara ${ctx.pkg.setara})`],
          ['Tahun Ajaran', ctx.tahunAjaran],
          ['Semester', 'Ganjil / Genap *'],
          ['Mata Pelajaran', '___________________________'],
          ['Kelas', '___________________________'],
          ['Tutor', '___________________________']
        ]
      ),
      h.empty(),
      h.heading('B. Dasar Pelaksanaan'),
      h.para(`Program remedial dan pengayaan ini disusun berdasarkan hasil asesmen formatif dan/atau sumatif sebagai wujud tindak lanjut pembelajaran berdiferensiasi sesuai ${CONFIG.regulasi.kurikulum.panduan}.`, { indent: true }),
      h.empty(),
      h.heading('C. Program Remedial'),
      h.para(`Fokus: ${fr.fokus}`, { bold: true }),
      h.para(`Contoh Kegiatan: ${fr.contoh}`, { italic: true }),
      h.empty(),
      h.table(
        ['No', 'Nama Peserta Didik', 'Kompetensi yang Belum Tercapai', 'Bentuk Remedial', 'Waktu Pelaksanaan', 'Hasil Setelah Remedial'],
        [
          ['1', '', '', '', '', ''],
          ['2', '', '', '', '', ''],
          ['3', '', '', '', '', ''],
          ['4', '', '', '', '', ''],
          ['5', '', '', '', '', '']
        ]
      ),
      h.empty(),
      h.heading('D. Program Pengayaan'),
      h.para('Diperuntukkan bagi peserta didik yang telah mencapai/melampaui tujuan pembelajaran.', { indent: true }),
      h.table(
        ['No', 'Nama Peserta Didik', 'Bentuk Pengayaan', 'Tugas/Proyek', 'Hasil'],
        [
          ['1', '', 'Tutor sebaya / Proyek mandiri', '', ''],
          ['2', '', 'Eksplorasi materi lanjut', '', ''],
          ['3', '', 'Karya kreatif/inovatif', '', '']
        ]
      ),
      h.empty(),
      h.heading('E. Evaluasi Program'),
      h.para('Catatan evaluasi pelaksanaan program remedial dan pengayaan:', { indent: false }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      ...h.signature(ctx)
    ];
    return content;
  },

  // =================================================
  // 1.3-02: Jurnal Pendampingan Khusus Murid
  // =================================================
  'B1-1.3-02': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Jurnal Pendampingan Khusus Peserta Didik'),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('Identitas Peserta Didik'),
      h.table(
        ['Komponen', 'Isian'],
        [
          ['Nama Peserta Didik', '___________________________'],
          ['Kelas / Program', `${ctx.pkg.nama}`],
          ['Tutor Pendamping', '___________________________'],
          ['Jenis Kebutuhan Khusus', 'Akademik / Sosial-Emosional / Perilaku *'],
          ['Deskripsi Kebutuhan', '___________________________']
        ]
      ),
      h.empty(),
      h.heading('Catatan Pendampingan'),
      h.para('Isilah setiap kali melakukan pendampingan:', { italic: true }),
      h.empty()
    ];

    // Generate 8 entries
    for (let i = 1; i <= 8; i++) {
      content.push(
        h.heading(`Pertemuan ${i}`, 3),
        h.table(
          ['Aspek', 'Catatan'],
          [
            ['Tanggal', ''],
            ['Kondisi Peserta Didik', ''],
            ['Kegiatan Pendampingan', ''],
            ['Respon Peserta Didik', ''],
            ['Perkembangan yang Terlihat', ''],
            ['Rencana Tindak Lanjut', '']
          ]
        ),
        h.empty()
      );
    }

    content.push(
      h.heading('Evaluasi Semester'),
      h.table(
        ['Aspek Evaluasi', 'Deskripsi'],
        [
          ['Ringkasan perkembangan', ''],
          ['Target yang tercapai', ''],
          ['Target yang belum tercapai', ''],
          ['Rekomendasi untuk semester berikutnya', ''],
          ['Koordinasi dengan orang tua/wali', '']
        ]
      ),
      h.empty(),
      ...h.signatureTutor(ctx)
    );
    return content;
  },

  // =================================================
  // 1.3-03: Hasil Asesmen Diagnostik Awal
  // =================================================
  'B1-1.3-03': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Hasil Asesmen Diagnostik Awal Peserta Didik'),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.para(`Asesmen diagnostik awal dilaksanakan di awal tahun ajaran untuk mengetahui profil peserta didik secara individu, baik dari aspek kognitif maupun non-kognitif, sebagai dasar pelaksanaan pembelajaran berdiferensiasi sesuai ${CONFIG.regulasi.kurikulum.panduan}.`, { indent: true }),
      h.empty(),
      h.heading('A. Asesmen Diagnostik Non-Kognitif'),
      h.para('Bertujuan mengetahui kondisi psikologis, sosial-emosional, dan latar belakang peserta didik.', { italic: true }),
      h.table(
        ['No', 'Nama Peserta Didik', 'Gaya Belajar', 'Kondisi Sosial-Emosional', 'Minat/Bakat', 'Catatan Khusus'],
        [
          ['1', '', 'V / A / K *', '', '', ''],
          ['2', '', 'V / A / K *', '', '', ''],
          ['3', '', 'V / A / K *', '', '', ''],
          ['4', '', 'V / A / K *', '', '', ''],
          ['5', '', 'V / A / K *', '', '', '']
        ]
      ),
      h.para('* V = Visual, A = Auditori, K = Kinestetik', { size: 20, italic: true }),
      h.empty(),
      h.heading('B. Asesmen Diagnostik Kognitif'),
      h.para('Bertujuan mengetahui tingkat kemampuan awal peserta didik pada mata pelajaran tertentu.', { italic: true }),
      h.table(
        ['No', 'Nama Peserta Didik', 'Mata Pelajaran', 'Skor/Hasil', 'Tingkat Kemampuan', 'Rekomendasi'],
        [
          ['1', '', '', '', 'Mahir / Cakap / Dasar *', ''],
          ['2', '', '', '', 'Mahir / Cakap / Dasar *', ''],
          ['3', '', '', '', 'Mahir / Cakap / Dasar *', ''],
          ['4', '', '', '', 'Mahir / Cakap / Dasar *', ''],
          ['5', '', '', '', 'Mahir / Cakap / Dasar *', '']
        ]
      ),
      h.empty(),
      h.heading('C. Kesimpulan dan Rencana Diferensiasi'),
      h.para('Berdasarkan hasil asesmen diagnostik di atas, berikut rencana diferensiasi pembelajaran:', { indent: false }),
      h.table(
        ['Kelompok', 'Jumlah Peserta Didik', 'Karakteristik', 'Strategi Pembelajaran'],
        [
          ['Kelompok 1 (Dasar)', '', 'Membutuhkan pendampingan intensif', 'Pengulangan materi, scaffolding, media konkret'],
          ['Kelompok 2 (Cakap)', '', 'Mampu mengikuti pembelajaran reguler', 'Penugasan standar, diskusi kelompok'],
          ['Kelompok 3 (Mahir)', '', 'Sudah menguasai prasyarat', 'Pengayaan, tutor sebaya, proyek mandiri']
        ]
      ),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
    return content;
  },

  // =================================================
  // 1.3-04: Format Buku Penghubung Guru-Orang Tua
  // =================================================
  'B1-1.3-04': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Buku Penghubung Tutor — Orang Tua / Wali'),
      h.referensiRegulasi(ctx),
      h.para(`${ctx.lembaga.nama} | ${ctx.pkg.nama} | T.A. ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER, italic: true }),
      h.empty(),
      h.heading('Identitas'),
      h.para('Nama Peserta Didik : ___________________________', { indent: false }),
      h.para('Kelas / Rombel     : ___________________________', { indent: false }),
      h.para('Tutor Wali         : ___________________________', { indent: false }),
      h.para('Orang Tua/Wali     : ___________________________', { indent: false }),
      h.para('No. Telepon/WA     : ___________________________', { indent: false }),
      h.empty()
    ];

    // Generate 6 entries (per bulan)
    for (let i = 1; i <= 6; i++) {
      content.push(
        h.heading(`Komunikasi ke-${i}`, 3),
        h.table(
          ['Aspek', 'Isian'],
          [
            ['Tanggal', ''],
            ['Media Komunikasi', 'Buku Penghubung / WA / Tatap Muka *'],
            ['Perkembangan Akademik', ''],
            ['Perkembangan Sikap & Sosial', ''],
            ['Kehadiran (bulan ini)', '_____ dari _____ pertemuan'],
            ['Hal yang Perlu Diperhatikan', ''],
            ['Saran untuk Orang Tua', ''],
            ['Tanggapan Orang Tua', ''],
            ['Tanda Tangan Tutor', ''],
            ['Tanda Tangan Orang Tua', '']
          ]
        ),
        h.empty()
      );
    }

    return content;
  },

  // =================================================
  // 1.4-01: RPP/Modul Ajar Kolaboratif (PBL, Role Play)
  // =================================================
  'B1-1.4-01': function(ctx) {
    const h = DocGenerator.h;

    // Diferensiasi model pembelajaran per paket
    const model = {
      A: { metode: 'Role Play & Simulasi', contoh: 'Bermain peran sebagai anggota keluarga yang saling membantu', tema: 'Gotong Royong di Lingkungan Sekitar' },
      B: { metode: 'Project Based Learning (PBL)', contoh: 'Merancang kampanye anti-bullying di lingkungan belajar', tema: 'Membangun Lingkungan Belajar yang Inklusif' },
      C: { metode: 'Problem Based Learning & Collaborative Learning', contoh: 'Merancang solusi masalah sosial masyarakat sekitar melalui keterampilan vokasional', tema: 'Wirausaha Sosial untuk Pemberdayaan Masyarakat' }
    };

    const m = model[ctx.paket];

    const content = [
      h.title('Modul Ajar Pembelajaran Kolaboratif'),
      h.heading(`Metode: ${m.metode}`, 2),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('A. Informasi Umum'),
      h.table(
        ['Komponen', 'Keterangan'],
        [
          ['Satuan Pendidikan', ctx.lembaga.nama],
          ['Program', `${ctx.pkg.nama} (Setara ${ctx.pkg.setara})`],
          ['Tema/Topik', m.tema],
          ['Model Pembelajaran', m.metode],
          ['Alokasi Waktu', `6 JP × ${ctx.pkg.jpMenit} menit = ${6 * ctx.pkg.jpMenit} menit (2 pertemuan)`],
          ['Tahun Ajaran', ctx.tahunAjaran],
          ['Fase', ctx.fase]
        ]
      ),
      h.empty(),
      h.heading('B. Alur Perkembangan Kompetensi (Karakter)'),
      h.bullet('Kolaborasi — Bekerja sama secara efektif'),
      h.bullet('Kewargaan — Menghargai perbedaan pendapat'),
      h.bullet('Penalaran Kritis — Menganalisis masalah dan solusi'),
      h.empty(),
      h.heading('C. Tujuan Pembelajaran'),
      h.numbered('Peserta didik mampu bekerja sama dalam tim secara efektif dan inklusif', 1),
      h.numbered('Peserta didik mampu berkomunikasi dengan empati dan menghargai perbedaan pendapat', 2),
      h.numbered('Peserta didik mampu menyelesaikan permasalahan bersama melalui diskusi dan kolaborasi', 3),
      h.empty(),
      h.heading('D. Keterampilan Sosial-Emosional yang Dikembangkan'),
      h.table(
        ['Keterampilan SEL', 'Indikator Perilaku yang Diamati'],
        [
          ['Kesadaran Diri', 'Mampu mengidentifikasi emosi sendiri saat berinteraksi'],
          ['Manajemen Diri', 'Mampu mengendalikan emosi saat terjadi perbedaan pendapat'],
          ['Kesadaran Sosial', 'Memahami perspektif dan perasaan orang lain'],
          ['Keterampilan Relasi', 'Mampu bekerja sama dan berkomunikasi secara efektif'],
          ['Pengambilan Keputusan', 'Mampu membuat keputusan yang bertanggung jawab secara bersama']
        ]
      ),
      h.empty(),
      h.heading('E. Kegiatan Pembelajaran'),
      h.heading('Pertemuan 1 — Eksplorasi & Pembentukan Tim', 3),
      h.bullet('Pembukaan: Tutor menjelaskan tema dan membentuk kelompok heterogen (4-5 orang)'),
      h.bullet('Inti: Setiap kelompok mendiskusikan isu/masalah terkait tema → merumuskan pertanyaan utama'),
      h.bullet(`Contoh kegiatan: ${m.contoh}`),
      h.bullet('Penutup: Setiap kelompok mempresentasikan rencana aksi/skenario singkat'),
      h.empty(),
      h.heading('Pertemuan 2 — Pelaksanaan & Refleksi', 3),
      h.bullet('Pembukaan: Review kegiatan pertemuan sebelumnya'),
      h.bullet('Inti: Pelaksanaan proyek/simulasi → dokumentasi → presentasi hasil'),
      h.bullet('Penutup: Refleksi kelompok — apa yang berhasil, apa yang bisa diperbaiki'),
      h.empty(),
      h.heading('F. Asesmen'),
      h.para('Asesmen Formatif:', { bold: true }),
      h.bullet('Observasi keterampilan kolaborasi selama kegiatan (rubrik terlampir)'),
      h.bullet('Refleksi tertulis peserta didik tentang pengalaman bekerja dalam tim'),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
    return content;
  },

  // =================================================
  // 1.4-02: LKPD Kerja Sama dan Empati
  // =================================================
  'B1-1.4-02': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Lembar Kerja Peserta Didik (LKPD)'),
      h.heading('Kerja Sama dan Empati', 2),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.para(`Program: ${ctx.pkg.nama} | Fase: ${ctx.fase} | Tahun Ajaran: ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER }),
      h.empty(),
      h.heading('Identitas Kelompok'),
      h.para('Nama Kelompok   : ___________________________', { indent: false }),
      h.para('Anggota Kelompok:', { indent: false }),
      h.numbered('___________________________', 1),
      h.numbered('___________________________', 2),
      h.numbered('___________________________', 3),
      h.numbered('___________________________', 4),
      h.empty(),
      h.heading('Kegiatan 1 — Memahami Empati'),
      h.para(ctx.paket === 'A'
        ? 'Ceritakan tentang temanmu! Apa yang membuat kalian berbeda? Apa yang membuat kalian sama?'
        : 'Bacalah skenario berikut, lalu diskusikan bersama kelompok:',
        { indent: true }),
      h.empty()
    ];

    if (ctx.paket === 'A') {
      content.push(
        h.para('Gambarlah dua orang teman yang berbeda tetapi tetap bisa bermain bersama:', { indent: false }),
        h.para('[Ruang Menggambar]', { indent: false }),
        h.empty(),
        h.para('Tuliskan satu kalimat: "Meskipun kami berbeda, kami tetap bisa ..."', { indent: false }),
        h.para('_______________________________________________________________________', { indent: false })
      );
    } else {
      content.push(
        h.para('Skenario: "Seorang peserta didik baru bergabung di kelas kalian. Dia datang dari daerah yang berbeda, berbicara dengan logat yang berbeda, dan terlihat canggung. Beberapa teman mengejeknya."', { indent: true, italic: true }),
        h.empty(),
        h.para('Pertanyaan Diskusi:', { bold: true }),
        h.numbered('Bagaimana perasaan peserta didik baru tersebut menurut kalian?', 1),
        h.para('Jawaban: _______________________________________________________', { indent: false }),
        h.numbered('Apa yang sebaiknya kalian lakukan jika melihat situasi tersebut?', 2),
        h.para('Jawaban: _______________________________________________________', { indent: false }),
        h.numbered('Pernahkah kalian merasa seperti itu? Ceritakan!', 3),
        h.para('Jawaban: _______________________________________________________', { indent: false })
      );
    }

    content.push(
      h.empty(),
      h.heading('Kegiatan 2 — Praktik Kerja Sama'),
      h.para(`Bersama kelompok, buatlah sebuah ${ctx.paket === 'A' ? 'gambar bersama (setiap anggota menggambar satu bagian)' : ctx.paket === 'B' ? 'poster bertema "Kelas Kami yang Saling Menghargai"' : 'proposal kegiatan kelas yang mempromosikan empati dan toleransi'}.`, { indent: true }),
      h.empty(),
      h.heading('Refleksi Individu'),
      h.table(
        ['Pertanyaan', 'Jawabanmu'],
        [
          ['Apa kontribusiku dalam kelompok?', ''],
          ['Apa hal tersulit saat bekerja sama?', ''],
          ['Apa yang aku pelajari tentang kerja sama?', ''],
          ['Hal apa yang bisa aku tingkatkan?', '']
        ]
      ),
      h.empty(),
      h.heading('Penilaian Antar Teman'),
      h.para('Berilah nilai 1-4 untuk setiap anggota kelompokmu:', { italic: true }),
      h.table(
        ['Nama Anggota', 'Kerja Sama (1-4)', 'Komunikasi (1-4)', 'Menghargai (1-4)', 'Total'],
        [
          ['', '', '', '', ''],
          ['', '', '', '', ''],
          ['', '', '', '', ''],
          ['', '', '', '', '']
        ]
      )
    );
    return content;
  },

  // =================================================
  // 1.4-03: Format Angket/Observasi Keterampilan Sosial Emosional
  // =================================================
  'B1-1.4-03': function(ctx) {
    const h = DocGenerator.h;

    const kompetensiSEL = [
      { aspek: 'Kesadaran Diri', indikator: ['Mampu mengenali emosinya sendiri', 'Memiliki rasa percaya diri yang positif', 'Menunjukkan kesadaran akan kekuatan dan kelemahannya'] },
      { aspek: 'Manajemen Diri', indikator: ['Mampu mengendalikan emosi dalam situasi sulit', 'Menunjukkan motivasi internal untuk belajar', 'Mampu menetapkan dan mengejar tujuan personal'] },
      { aspek: 'Kesadaran Sosial', indikator: ['Menunjukkan empati terhadap teman', 'Menghargai keberagaman di lingkungan belajar', 'Memahami norma sosial yang berlaku'] },
      { aspek: 'Keterampilan Relasi', indikator: ['Mampu berkomunikasi secara efektif', 'Mampu bekerja sama dalam tim', 'Mampu menyelesaikan konflik secara konstruktif'] },
      { aspek: 'Pengambilan Keputusan', indikator: ['Mampu mempertimbangkan konsekuensi tindakan', 'Mampu membuat pilihan yang bertanggung jawab', 'Menunjukkan integritas dalam tindakan'] }
    ];

    const content = [
      h.title('Format Observasi Keterampilan Sosial Emosional'),
      h.heading('Instrumen Penilaian Kompetensi SEL Peserta Didik', 2),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('Identitas'),
      h.para(`Satuan Pendidikan : ${ctx.lembaga.nama}`, { indent: false }),
      h.para(`Program           : ${ctx.pkg.nama}`, { indent: false }),
      h.para(`Kelas / Rombel    : ___________________________`, { indent: false }),
      h.para(`Semester          : ___________________________`, { indent: false }),
      h.para(`Observer          : ___________________________`, { indent: false }),
      h.empty(),
      h.heading('Petunjuk Pengisian'),
      h.para('Tuliskan skor 1-3 pada kolom yang tersedia berdasarkan observasi:', { indent: false }),
      h.para('1 = Berkembang (B) | 2 = Cakap (C) | 3 = Mahir (M)', { italic: true, size: 20 }),
      h.empty()
    ];

    // Create table per aspek
    kompetensiSEL.forEach(k => {
      content.push(
        h.heading(k.aspek, 3),
        h.table(
          ['No', 'Indikator', 'Siswa 1', 'Siswa 2', 'Siswa 3', 'Siswa 4', 'Siswa 5'],
          k.indikator.map((ind, i) => [String(i + 1), ind, '', '', '', '', ''])
        ),
        h.empty()
      );
    });

    content.push(
      h.heading('Catatan Kualitatif'),
      h.para('Tuliskan catatan khusus tentang perkembangan sosial emosional peserta didik:', { indent: false }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      ...h.signatureTutor(ctx)
    );
    return content;
  }
};
