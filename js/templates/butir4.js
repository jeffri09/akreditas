/**
 * butir4.js — Template Dokumen Butir 4
 * Pembelajaran Efektif: Keimanan, Kebangsaan, Bernalar, Karakter
 * Level HOTS: Menganalisis (A), Mengevaluasi (B), Mencipta (C)
 */

const Butir4Templates = {
  // =================================================
  // 4.1-01: Jadwal Kegiatan Keagamaan
  // =================================================
  'B4-4.1-01': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Jadwal Kegiatan Keagamaan'),
      h.para(`${ctx.lembaga.nama} — Tahun Ajaran ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER, bold: true }),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('A. Kegiatan Rutin Harian'),
      h.table(
        ['No', 'Kegiatan', 'Waktu', 'Penanggung Jawab', 'Keterangan'],
        [
          ['1', 'Doa bersama sebelum pembelajaran', 'Awal kegiatan belajar', 'Tutor pengampu', 'Wajib setiap pertemuan'],
          ['2', 'Tahsin/Tadarus Al-Quran', '15 menit sebelum pelajaran', 'Tutor PAI', 'Minimal 1 halaman'],
          ['3', 'Sholat Dhuha berjama\'ah', 'Istirahat pertama', 'Tutor piket', 'Bagi yang berkenan'],
          ['4', 'Sholat Dzuhur berjama\'ah', 'Waktu Dzuhur', 'Tutor piket', 'Wajib bagi yang hadir'],
          ['5', 'Doa bersama setelah pembelajaran', 'Akhir kegiatan belajar', 'Tutor pengampu', 'Wajib setiap pertemuan']
        ]
      ),
      h.empty(),
      h.heading('B. Kegiatan Mingguan'),
      h.table(
        ['Hari', 'Kegiatan', 'Waktu', 'PJ'],
        [
          ['Senin', 'Yasinan bersama', '07.00 - 07.30', 'Tutor PAI'],
          ['Jumat', 'Kultum/Tausyiah singkat', '07.00 - 07.15', 'Peserta didik (bergantian)'],
          ['Sabtu', 'Infaq dan sedekah', 'Saat pembelajaran', 'Pengurus kelas']
        ]
      ),
      h.empty(),
      h.heading('C. Kegiatan Bulanan/Periodik'),
      h.table(
        ['No', 'Kegiatan', 'Waktu Pelaksanaan', 'Keterangan'],
        [
          ['1', 'Peringatan Isra Mi\'raj', 'Sesuai kalender Hijriyah', 'Ceramah & doa bersama'],
          ['2', 'Peringatan Maulid Nabi', 'Sesuai kalender Hijriyah', 'Lomba sholawat, ceramah'],
          ['3', 'Pesantren Kilat Ramadhan', 'Bulan Ramadhan', 'Tadarus, kajian, buka bersama'],
          ['4', 'Penyaluran Zakat Fitrah', 'Akhir Ramadhan', 'Pengumpulan & distribusi'],
          ['5', 'Peringatan Tahun Baru Hijriyah', 'Sesuai kalender Hijriyah', 'Muhasabah & refleksi diri'],
          ['6', 'Peringatan Nuzulul Quran', 'Sesuai kalender Hijriyah', 'Khataman & ceramah'],
          ['7', 'Penyembelihan Hewan Qurban', 'Idul Adha', 'Penyembelihan & distribusi']
        ]
      ),
      h.empty(),
      ...h.signature(ctx)
    ];
    return content;
  },

  // =================================================
  // 4.1-02: RPP Integrasi Nilai Keimanan dan Ketakwaan
  // =================================================
  'B4-4.1-02': function(ctx) {
    const h = DocGenerator.h;
    const integrasiPerPaket = {
      A: { contoh: 'Menghitung nikmat Allah melalui kegiatan berhitung benda-benda di sekitar', mapel: 'Matematika + PAI', kegiatan: 'Peserta didik menghitung benda-benda ciptaan Allah di lingkungan PKBM, lalu membuat doa syukur sederhana' },
      B: { contoh: 'Menganalisis ekosistem sebagai tanda kebesaran Allah SWT', mapel: 'IPA + PAI', kegiatan: 'Peserta didik mengamati ekosistem lokal, mengidentifikasi keteraturannya, dan menuliskan refleksi tentang kebesaran Sang Pencipta' },
      C: { contoh: 'Mengkaji nilai-nilai etika bisnis dalam Islam untuk keterampilan wirausaha', mapel: 'Kewirausahaan + PAI', kegiatan: 'Peserta didik menyusun rencana bisnis yang menekankan kejujuran, keadilan, dan tanggung jawab sesuai nilai Islam' }
    };

    const intg = integrasiPerPaket[ctx.paket];

    return [
      h.title('Modul Ajar — Integrasi Nilai Keimanan dan Ketakwaan'),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('A. Informasi Umum'),
      h.table(['Komponen', 'Keterangan'], [
        ['Satuan Pendidikan', ctx.lembaga.nama],
        ['Program', `${ctx.pkg.nama} (Setara ${ctx.pkg.setara})`],
        ['Integrasi Mapel', intg.mapel],
        ['Tema', intg.contoh],
        ['Fase', ctx.fase],
        ['Alokasi Waktu', `4 JP × ${ctx.pkg.jpMenit} menit`],
        ['Tahun Ajaran', ctx.tahunAjaran]
      ]),
      h.empty(),
      h.heading('B. Alur Perkembangan Kompetensi (Karakter)'),
      h.bullet('Keimanan, Ketakwaan kepada Tuhan YME, dan Akhlak Mulia'),
      h.empty(),
      h.heading('C. Tujuan Pembelajaran'),
      h.numbered('Peserta didik mampu mengintegrasikan nilai keimanan dalam mata pelajaran umum', 1),
      h.numbered('Peserta didik mampu merefleksikan kebesaran Allah SWT melalui ilmu pengetahuan', 2),
      h.numbered('Peserta didik menunjukkan sikap syukur dan akhlak mulia dalam kehidupan sehari-hari', 3),
      h.empty(),
      h.heading('D. Kegiatan Pembelajaran'),
      h.heading('Pendahuluan', 3),
      h.bullet('Salam, doa bersama (dibimbing tutor)'),
      h.bullet('Tadarus singkat / membaca ayat Al-Quran terkait materi'),
      h.bullet('Apersepsi: menghubungkan materi pelajaran dengan nilai spiritual'),
      h.empty(),
      h.heading('Kegiatan Inti', 3),
      h.para(`${intg.kegiatan}`, { indent: true }),
      h.empty(),
      h.bullet('Peserta didik bekerja secara individual/kelompok'),
      h.bullet('Tutor membimbing untuk menemukan hubungan antara materi dan nilai spiritual'),
      h.bullet('Diskusi: Bagaimana nilai keimanan dapat diterapkan dalam konteks materi ini?'),
      h.empty(),
      h.heading('Penutup', 3),
      h.bullet('Refleksi spiritual: Apa yang membuat kita lebih bersyukur setelah mempelajari ini?'),
      h.bullet('Doa penutup bersama'),
      h.empty(),
      h.heading('E. Asesmen'),
      h.para('Formatif: Observasi sikap spiritual + tulisan refleksi keimanan', { indent: false }),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
  },

  // =================================================
  // 4.1-03: Jurnal Pembiasaan Akhlak Mulia Siswa
  // =================================================
  'B4-4.1-03': function(ctx) {
    const h = DocGenerator.h;
    const aspekAkhlak = [
      'Berdoa sebelum dan sesudah kegiatan',
      'Sholat wajib tepat waktu',
      'Membaca Al-Quran/buku agama',
      'Berkata jujur',
      'Bersikap sopan dan santun',
      'Menolong teman yang membutuhkan',
      'Bersedekah/infaq',
      'Menjaga kebersihan diri dan lingkungan',
      'Sabar menghadapi masalah',
      'Bersyukur atas nikmat Allah'
    ];

    return [
      h.title('Jurnal Pembiasaan Akhlak Mulia Peserta Didik'),
      h.referensiRegulasi(ctx),
      h.para(`${ctx.lembaga.nama} | ${ctx.pkg.nama} | T.A. ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER }),
      h.empty(),
      h.heading('Identitas'),
      h.para('Nama Peserta Didik : ___________________________', { indent: false }),
      h.para('Kelas / Rombel     : ___________________________', { indent: false }),
      h.para('Tutor Wali         : ___________________________', { indent: false }),
      h.empty(),
      h.heading('Petunjuk Pengisian'),
      h.para('Peserta didik mengisi secara mandiri setiap minggu. Beri tanda ✓ pada kolom yang sesuai. Tutor memverifikasi di akhir bulan.', { italic: true }),
      h.empty(),
      h.heading('Catatan Pembiasaan Bulanan'),
      h.table(
        ['No', 'Aspek Akhlak Mulia', 'Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4', 'Catatan Tutor'],
        aspekAkhlak.map((a, i) => [String(i+1), a, '', '', '', '', ''])
      ),
      h.para('Keterangan: ✓✓✓ = Selalu | ✓✓ = Sering | ✓ = Kadang | - = Belum', { italic: true, size: 20 }),
      h.empty(),
      h.heading('Refleksi Peserta Didik (Akhir Bulan)'),
      h.numbered('Akhlak apa yang paling sering saya praktikkan bulan ini?', 1),
      h.para('_______________________________________________________________________', { indent: false }),
      h.numbered('Akhlak apa yang ingin saya tingkatkan bulan depan?', 2),
      h.para('_______________________________________________________________________', { indent: false }),
      h.numbered('Apa yang menghalangi saya untuk berakhlak mulia?', 3),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      h.heading('Verifikasi'),
      h.table(['Peserta Didik', 'Tutor Wali', 'Orang Tua/Wali'], [
        ['', '', ''], ['', '', ''],
        ['(_______________)', '(_______________)', '(_________________)']
      ])
    ];
  },

  // =================================================
  // 4.2-01: RPP Muatan Lokal/Sejarah/Budaya
  // =================================================
  'B4-4.2-01': function(ctx) {
    const h = DocGenerator.h;
    const temaPerPaket = {
      A: { tema: 'Mengenal Kekayaan Budaya Daerahku', kegiatan: 'Peserta didik menggambar pakaian adat, mewarnai peta budaya, dan mempraktikkan permainan tradisional' },
      B: { tema: 'Menjelajahi Sejarah Perjuangan Bangsa', kegiatan: 'Peserta didik membuat timeline sejarah kemerdekaan, mendiskusikan peran pahlawan lokal, dan menulis esai reflektif' },
      C: { tema: 'Analisis Kearifan Lokal untuk Pembangunan Berkelanjutan', kegiatan: 'Peserta didik meneliti kearifan lokal (pertanian, kerajinan, kuliner), menganalisis potensi ekonomi kreatif, dan menyusun proposal pelestarian' }
    };

    const tp = temaPerPaket[ctx.paket];

    return [
      h.title('Modul Ajar — Muatan Lokal, Sejarah, dan Budaya'),
      h.heading(`Tema: ${tp.tema}`, 2),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('A. Informasi Umum'),
      h.table(['Komponen', 'Keterangan'], [
        ['Satuan Pendidikan', ctx.lembaga.nama],
        ['Program', `${ctx.pkg.nama}`],
        ['Tema', tp.tema],
        ['Fase', ctx.fase],
        ['Alokasi Waktu', `6 JP × ${ctx.pkg.jpMenit} menit (2 pertemuan)`],
        ['Tahun Ajaran', ctx.tahunAjaran]
      ]),
      h.empty(),
      h.heading('B. Dimensi Karakter yang Dikembangkan'),
      h.bullet('Kewargaan — menghargai dan melestarikan budaya bangsa'),
      h.bullet('Penalaran Kritis — menganalisis hubungan budaya dan kehidupan'),
      h.empty(),
      h.heading('C. Tujuan Pembelajaran'),
      h.numbered('Peserta didik mampu mengidentifikasi dan menghargai kekayaan budaya dan sejarah Indonesia', 1),
      h.numbered('Peserta didik mampu menghubungkan kearifan lokal dengan kehidupan modern', 2),
      h.numbered('Peserta didik menunjukkan rasa bangga sebagai warga negara Indonesia', 3),
      h.empty(),
      h.heading('D. Kegiatan Pembelajaran'),
      h.para(`${tp.kegiatan}`, { indent: true }),
      h.empty(),
      h.heading('E. Asesmen'),
      h.para('Produk: Hasil karya terkait budaya (gambar, esai, poster, proposal)', { indent: false }),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
  },

  // =================================================
  // 4.2-02: Program Peringatan Hari Besar Nasional
  // =================================================
  'B4-4.2-02': function(ctx) {
    const h = DocGenerator.h;
    const content = [
      h.title('Program Peringatan Hari Besar Nasional'),
      h.para(`${ctx.lembaga.nama} — Tahun Ajaran ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER, bold: true }),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('A. Dasar dan Tujuan'),
      h.para('Program peringatan hari besar nasional disusun untuk menumbuhkan rasa cinta tanah air, menghargai jasa pahlawan, dan memperkuat komitmen kebangsaan peserta didik.', { indent: true }),
      h.empty(),
      h.heading('B. Jadwal Peringatan'),
      h.table(
        ['No', 'Tanggal', 'Hari Besar', 'Kegiatan', 'Penanggung Jawab'],
        CONFIG.hariBesarNasional.map((hb, i) => [String(i+1), hb.tanggal, hb.nama, hb.kegiatan, ''])
      ),
      h.empty(),
      h.heading('C. Rencana Anggaran (Opsional)'),
      h.table(
        ['No', 'Kegiatan', 'Estimasi Biaya', 'Sumber Dana'],
        [
          ['1', 'HUT RI — Lomba & Upacara', '', 'BOS/Swadaya'],
          ['2', 'Hari Pahlawan — Drama Sejarah', '', 'BOS/Swadaya'],
          ['3', 'Hari Batik — Pameran', '', 'Swadaya'],
          ['', 'TOTAL', '', '']
        ]
      ),
      h.empty(),
      ...h.signature(ctx)
    ];
    return content;
  },

  // =================================================
  // 4.2-03: Template Karya Siswa tentang Budaya
  // =================================================
  'B4-4.2-03': function(ctx) {
    const h = DocGenerator.h;
    return [
      h.title('Template Karya Peserta Didik tentang Budaya'),
      h.referensiRegulasi(ctx),
      h.para(`${ctx.pkg.nama} | Fase ${ctx.fase} | T.A. ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER }),
      h.empty(),
      h.heading('Identitas'),
      h.para('Nama: ___________________________ Kelas: _____ Tanggal: _____', { indent: false }),
      h.para(`Jenis karya: ${ctx.paket === 'A' ? 'Gambar / Kolase' : ctx.paket === 'B' ? 'Poster / Esai / Drama singkat' : 'Esai Analitis / Proposal / Karya Digital'}`, { indent: false }),
      h.empty(),
      h.heading('Tema Karya'),
      h.para('Judul: _______________________________________________________________', { indent: false }),
      h.para('Sub-tema: ____________________________________________________________', { indent: false }),
      h.empty(),
      h.heading('Isi/Konten Karya'),
      h.para('[Ruang untuk karya peserta didik — ditempelkan, ditulis, atau dilampirkan]', { italic: true }),
      h.empty(),
      h.heading('Deskripsi Karya'),
      h.numbered('Apa yang ingin kamu sampaikan melalui karya ini?', 1),
      h.para('_______________________________________________________________________', { indent: false }),
      h.numbered('Mengapa tema budaya ini penting menurutmu?', 2),
      h.para('_______________________________________________________________________', { indent: false }),
      h.numbered('Apa yang kamu pelajari saat membuat karya ini?', 3),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      h.heading('Penilaian Tutor'),
      h.table(['Aspek', 'Skor (1-4)', 'Catatan'], [
        ['Kesesuaian dengan tema budaya', '', ''],
        ['Kreativitas', '', ''],
        ['Kedalaman isi/pesan', '', ''],
        ['Kerapian/estetika', '', '']
      ]),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
  },

  // =================================================
  // 4.3-01: LKPD Berbasis HOTS
  // =================================================
  'B4-4.3-01': function(ctx) {
    const h = DocGenerator.h;
    // Reuse the HOTS LKPD from Butir 3
    return Butir3Templates['B3-3.5-02'](ctx);
  },

  // =================================================
  // 4.3-02: Format Penilaian Berpikir Kritis
  // =================================================
  'B4-4.3-02': function(ctx) {
    const h = DocGenerator.h;
    const dimensiBerpikirKritis = [
      { dimensi: 'Interpretasi', deskripsi: 'Kemampuan memahami makna dari informasi/data' },
      { dimensi: 'Analisis', deskripsi: 'Kemampuan mengidentifikasi hubungan antar konsep' },
      { dimensi: 'Evaluasi', deskripsi: 'Kemampuan menilai kredibilitas argumen/sumber' },
      { dimensi: 'Inferensi', deskripsi: 'Kemampuan menarik kesimpulan yang logis' },
      { dimensi: 'Eksplanasi', deskripsi: 'Kemampuan menjelaskan proses berpikir' },
      { dimensi: 'Regulasi Diri', deskripsi: 'Kemampuan memonitor dan mengoreksi pemikirannya sendiri' }
    ];

    return [
      h.title('Format Penilaian Keterampilan Berpikir Kritis'),
      h.referensiRegulasi(ctx),
      h.para(`${ctx.pkg.nama} | Level Target: ${ctx.pkg.levelHOTS}`, { align: docx.AlignmentType.CENTER }),
      h.empty(),
      h.heading('Identitas'),
      h.para(`Mapel: ${ctx.mapel} | Kelas: _____ | Semester: _____ | Tutor: ______________`, { indent: false }),
      h.empty(),
      h.heading('Rubrik Penilaian Berpikir Kritis'),
      h.table(
        ['Dimensi', 'Deskripsi', '4 (Luar Biasa)', '3 (Mahir)', '2 (Berkembang)', '1 (Awal)'],
        dimensiBerpikirKritis.map(d => [
          d.dimensi, d.deskripsi,
          'Konsisten & mendalam', 'Sering & tepat', 'Kadang-kadang', 'Jarang terlihat'
        ])
      ),
      h.empty(),
      h.heading('Lembar Penilaian per Peserta Didik'),
      h.table(
        ['No', 'Nama', ...dimensiBerpikirKritis.map(d => d.dimensi), 'Total', 'Predikat'],
        Array.from({length: 10}, (_, i) => [String(i+1), '', ...Array(6).fill(''), '', ''])
      ),
      h.empty(),
      ...h.signatureTutor(ctx)
    ];
  },

  // =================================================
  // 4.3-03: Template Proyek PBL
  // =================================================
  'B4-4.3-03': function(ctx) {
    const h = DocGenerator.h;
    // Reuse PBL template from Butir 3
    return Butir3Templates['B3-3.5-03'](ctx);
  },

  // =================================================
  // 4.4-01: Dokumen Visi, Misi, dan Tujuan PKBM
  // =================================================
  'B4-4.4-01': function(ctx) {
    const h = DocGenerator.h;
    const visi = ctx.lembaga.visi || 'Terwujudnya masyarakat yang cerdas, beriman, terampil, dan mandiri melalui pendidikan kesetaraan yang berkualitas';
    const misi = ctx.lembaga.misi || 'Menyelenggarakan pendidikan kesetaraan Paket A, B, dan C yang berkualitas dan terjangkau\nMengembangkan potensi peserta didik melalui pendekatan pembelajaran yang inovatif dan kontekstual\nMembentuk peserta didik yang beriman, bertakwa, dan berakhlak mulia\nMembekali peserta didik dengan keterampilan hidup dan kesiapan dunia kerja\nMembangun kemitraan dengan masyarakat dan dunia usaha untuk pemberdayaan';
    const tujuan = ctx.lembaga.tujuan || 'Memberikan layanan pendidikan kesetaraan yang bermutu bagi masyarakat yang belum tuntas pendidikan formal. Menghasilkan lulusan yang memiliki kompetensi akademik, keterampilan vokasional, dan karakter yang kuat.';

    return [
      h.title('Dokumen Visi, Misi, dan Tujuan'),
      h.para(ctx.lembaga.nama.toUpperCase(), { align: docx.AlignmentType.CENTER, bold: true, size: 28 }),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('VISI'),
      h.para(`"${visi}"`, { align: docx.AlignmentType.CENTER, bold: true, italic: true }),
      h.empty(),
      h.heading('MISI'),
      ...misi.split('\n').filter(Boolean).map((m, i) => h.numbered(m.trim(), i + 1)),
      h.empty(),
      h.heading('TUJUAN'),
      h.para(tujuan, { indent: true }),
      h.empty(),
      h.heading('NILAI-NILAI UTAMA'),
      h.table(['No', 'Nilai', 'Implementasi'], [
        ['1', 'Keimanan & Ketakwaan', 'Integrasi nilai spiritual dalam seluruh kegiatan pembelajaran'],
        ['2', 'Kemandirian', 'Pembelajaran berbasis SKK, keterampilan hidup, dan wirausaha'],
        ['3', 'Inklusivitas', 'Layanan pendidikan terbuka untuk semua kalangan'],
        ['4', 'Kebersamaan', 'Gotong royong dan pemberdayaan masyarakat'],
        ['5', 'Inovasi', 'Pembelajaran kontekstual dan pemanfaatan teknologi']
      ]),
      h.empty(),
      ...h.signature(ctx)
    ];
  },

  // =================================================
  // 4.4-02: Program Projek Karakter
  // =================================================
  'B4-4.4-02': function(ctx) {
    const h = DocGenerator.h;
    return [
      h.title('Program Projek Penguatan Karakter/Kompetensi'),
      h.para(`${ctx.lembaga.nama} | ${ctx.pkg.nama} | T.A. ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER, bold: true }),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('A. Dasar Pelaksanaan'),
      h.para('Projek Penguatan Karakter merupakan kegiatan kokurikuler berbasis proyek yang dirancang untuk menguatkan upaya pencapaian kompetensi dan karakter sesuai Alur Perkembangan Kompetensi Lulusan. Pada pendidikan kesetaraan, proyek ini terintegrasi dalam kelompok Pemberdayaan dan Keterampilan.', { indent: true }),
      h.empty(),
      h.heading('B. Tema Projek yang Dipilih (Tahun Ajaran Ini)'),
      h.table(
        ['Semester', 'Tema', 'Dimensi PP', 'Durasi'],
        [
          ['Ganjil', '___________________________', '', '4-6 minggu'],
          ['Genap', '___________________________', '', '4-6 minggu']
        ]
      ),
      h.empty(),
      h.heading('C. Pilihan Tema Projek (Referensi)'),
      h.table(
        ['No', 'Tema', 'Contoh Kegiatan'],
        CONFIG.temaP5.map((t, i) => [String(i+1), t, ''])
      ),
      h.empty(),
      h.heading('D. Rancangan Proyek'),
      h.heading('Proyek Semester Ganjil', 3),
      h.table(['Komponen', 'Keterangan'], [
        ['Tema', '___________________________'],
        ['Dimensi Kompetensi / Karakter', '___________________________'],
        ['Deskripsi Proyek', ''],
        ['Target / Produk Akhir', ''],
        ['Tahapan Pelaksanaan', '1. Pengenalan tema (1 minggu)\n2. Eksplorasi & perencanaan (1-2 minggu)\n3. Aksi/Pelaksanaan (2-3 minggu)\n4. Refleksi & presentasi (1 minggu)'],
        ['Asesmen', 'Portofolio, presentasi, refleksi'],
        ['Kolaborasi Lintas Mapel', '']
      ]),
      h.empty(),
      h.heading('E. Dimensi dan Sub-Elemen (Alur Perkembangan Kompetensi)'),
      h.table(['Dimensi', 'Sub-Elemen yang Dikembangkan', 'Indikator Keberhasilan'], [
        ['Keimanan & Ketakwaan', '', ''],
        ['Kewargaan', '', ''],
        ['Penalaran Kritis', '', ''],
        ['Kreativitas', '', ''],
        ['Kolaborasi', '', ''],
        ['Kemandirian', '', ''],
        ['Kesehatan', '', ''],
        ['Komunikasi', '', '']
      ]),
      h.empty(),
      ...h.signature(ctx)
    ];
  },

  // =================================================
  // 4.4-03: Program Ekstrakurikuler & Pembinaan Karakter
  // =================================================
  'B4-4.4-03': function(ctx) {
    const h = DocGenerator.h;
    return [
      h.title('Program Kegiatan Ekstrakurikuler dan Pembinaan Karakter'),
      h.para(`${ctx.lembaga.nama} | T.A. ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER, bold: true }),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('A. Tujuan'),
      h.numbered('Mengembangkan potensi, bakat, dan minat peserta didik di luar kegiatan akademik', 1),
      h.numbered('Memperkuat karakter peserta didik sesuai Alur Perkembangan Kompetensi Lulusan', 2),
      h.numbered('Memfasilitasi pengembangan keterampilan sosial, kepemimpinan, dan kemandirian', 3),
      h.empty(),
      h.heading('B. Program Ekstrakurikuler'),
      h.table(
        ['No', 'Kegiatan', 'Jadwal', 'Pembina', 'Target Karakter'],
        [
          ['1', 'Pramuka (Wajib)', 'Sabtu, 08.00-10.00', '', 'Kemandirian, Kolaborasi'],
          ['2', 'Tahfidz Al-Quran', 'Senin-Kamis, sebelum KBM', '', 'Keimanan, Kemandirian'],
          ['3', 'Seni & Budaya', 'Rabu, 14.00-15.30', '', 'Kreativitas, Kewargaan'],
          ['4', 'Olahraga', 'Jumat, 07.00-08.30', '', 'Kolaborasi, Kesehatan'],
          ['5', 'Keterampilan / Vokasi', 'Sabtu, 10.00-12.00', '', 'Kemandirian, Kreativitas'],
          ['6', 'Literasi & Jurnalistik', 'Selasa, 14.00-15.30', '', 'Penalaran Kritis, Komunikasi']
        ]
      ),
      h.empty(),
      h.heading('C. Program Pembinaan Karakter'),
      h.table(
        ['No', 'Kegiatan Pembinaan', 'Frekuensi', 'Deskripsi'],
        [
          ['1', 'Upacara Bendera', 'Bulanan', 'Penguatan nilai kebangsaan dan kedisiplinan'],
          ['2', 'Jumat Bersih', 'Mingguan', 'Membiasakan kepedulian terhadap lingkungan'],
          ['3', 'Kelas Inspirasi', 'Bulanan', 'Mengundang tokoh masyarakat sebagai narasumber'],
          ['4', 'Bakti Sosial', 'Per semester', 'Penguatan empati dan kepedulian sosial'],
          ['5', 'Outbound / Team Building', 'Per semester', 'Membangun kerja sama dan kepercayaan diri']
        ]
      ),
      h.empty(),
      ...h.signature(ctx)
    ];
  },

  // =================================================
  // 4.4-04: Template Portofolio Pencapaian Siswa
  // =================================================
  'B4-4.4-04': function(ctx) {
    const h = DocGenerator.h;
    return [
      h.title('Portofolio Pencapaian Peserta Didik'),
      h.para(`${ctx.lembaga.nama} | ${ctx.pkg.nama} | T.A. ${ctx.tahunAjaran}`, { align: docx.AlignmentType.CENTER }),
      h.referensiRegulasi(ctx),
      h.empty(),
      h.heading('Identitas'),
      h.table(['Komponen', 'Isian'], [
        ['Nama Lengkap', '___________________________'],
        ['NISN', '___________________________'],
        ['Kelas / Fase', `_____ / Fase ${ctx.fase}`],
        ['Program', ctx.pkg.nama],
        ['Tutor Wali', '___________________________']
      ]),
      h.empty(),
      h.heading('A. Pencapaian Akademik'),
      h.table(['Semester', 'Mata Pelajaran Terbaik', 'Nilai', 'Bukti/Lampiran'], [
        ['Ganjil', '', '', ''],
        ['Genap', '', '', '']
      ]),
      h.empty(),
      h.heading('B. Pencapaian Karakter (Perkembangan Kompetensi)'),
      h.table(['Dimensi', 'Bukti/Deskripsi Pencapaian', 'Level'],
        CONFIG.profilPelajarPancasila.map(p => [p, '', 'B / C / M *'])
      ),
      h.para('* B = Berkembang | C = Cakap | M = Mahir', { italic: true, size: 20 }),
      h.empty(),
      h.heading('C. Pencapaian Keterampilan & Pemberdayaan'),
      h.table(['No', 'Keterampilan', 'Deskripsi Pencapaian', 'Bukti'],
        [['1', '', '', ''], ['2', '', '', ''], ['3', '', '', '']]
      ),
      h.empty(),
      h.heading('D. Kegiatan Ekstrakurikuler & Prestasi'),
      h.table(['No', 'Kegiatan/Lomba', 'Tingkat', 'Hasil/Prestasi', 'Bukti'],
        [['1', '', '', '', ''], ['2', '', '', '', ''], ['3', '', '', '', '']]
      ),
      h.empty(),
      h.heading('E. Karya Terbaik'),
      h.para('Lampirkan bukti karya terbaik peserta didik (hasil proyek, poster, tulisan, dll):', { indent: false }),
      h.para('[Lampiran 1: ________________]', { indent: false }),
      h.para('[Lampiran 2: ________________]', { indent: false }),
      h.empty(),
      h.heading('F. Refleksi Peserta Didik'),
      h.para('Apa pencapaian yang paling membanggakan tahun ini?', { bold: true }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.para('Apa target di tahun ajaran berikutnya?', { bold: true }),
      h.para('_______________________________________________________________________', { indent: false }),
      h.empty(),
      h.table(['Peserta Didik', 'Tutor Wali', 'Kepala PKBM'], [
        ['', '', ''], ['', '', ''],
        ['(_______________)', '(_______________)', `(${ctx.lembaga.kepala.nama || '_______________'})`]
      ])
    ];
  }
};
