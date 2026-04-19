/**
 * aiClient.js
 * Klien AI Mode Browser (Client-Side)
 * Berinteraksi langsung dengan Gemini REST API.
 */

const AIClient = {
  // Pastikan kita bisa memberikan mode jeda otomatis (rate-limiter) untuk keamanan 15 Request Per Menit
  lastRequestTime: 0,
  REQUEST_COOLDOWN_MS: 4100, // ~4.1 detik per rekues untuk memastikan tidak melanggar limit 15 RPM
  MODEL: 'gemini-3.1-flash-lite',

  getApiKey() {
    const key = localStorage.getItem('gemini_api_key');
    if (!key) {
        throw new Error('API Key Gemini tidak ditemukan. Harap isikan API Key Anda di Pengaturan.');
    }
    return key.trim();
  },

  setApiKey(key) {
    if (key) {
      localStorage.setItem('gemini_api_key', key.trim());
    } else {
      localStorage.removeItem('gemini_api_key');
    }
  },

  async _enforceCooldown() {
      const now = Date.now();
      const timeSinceLast = now - this.lastRequestTime;
      if (timeSinceLast < this.REQUEST_COOLDOWN_MS) {
          const waitTime = this.REQUEST_COOLDOWN_MS - timeSinceLast;
          console.log(`[AI Queue] Menunggu cooldown rate-limit selama ${waitTime} ms...`);
          await new Promise(r => setTimeout(r, waitTime));
      }
      this.lastRequestTime = Date.now();
  },

  /**
   * Fungsi inti memanggil API Google
   */
  async askGemini(prompt, expectJson = false) {
    try {
      await this._enforceCooldown();

      const apiKey = this.getApiKey();
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.MODEL}:generateContent?key=${apiKey}`;

      const payload = {
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
        }
      };

      if (expectJson) {
          payload.generationConfig.responseMimeType = "application/json";
      }

      console.log(`[API Request] Mengirim ke ${this.MODEL}...`);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
          const err = await response.json();
          throw new Error(`API Error: ${response.status} - ${err.error?.message || 'Unknown Error'}`);
      }

      const data = await response.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!responseText) {
          throw new Error('Respon Gemini kosong atau struktur API berubah.');
      }

      return expectJson ? JSON.parse(responseText) : responseText;
    } catch (e) {
      console.error("[AI Error]", e);
      throw e;
    }
  },

  /**
   * Menghasilkan Paket Data per Mata Pelajaran untuk digunakan oleh docx.js Templates
   */
  async generateMapelPayload(paket, mapel, fase) {
    const modelBelajar = localStorage.getItem('ai_model_belajar') || 'Problem Based Learning (PBL)';
    const formatSoal = localStorage.getItem('ai_format_soal') || 'Soal Analitis Uraian Panjang (Esai)';
    const temaP5 = localStorage.getItem('ai_tema_p5') || 'Kewirausahaan / Keterampilan Mandiri';
    const konteks = localStorage.getItem('ai_konteks') || '';
    
    let konteksPrompt = konteks ? `\nKONTEKS KHUSUS DARI TUTOR:\n"${konteks}"\n(Sesuaikan seluruh konten dengan konteks ini)\n` : "";

    const prompt = `Anda adalah ahli kurikulum pendidikan kesetaraan (PKBM) yang berpengalaman dalam akreditasi BAN-PDM.
Buatkan skenario pembelajaran yang SIAP PAKAI untuk dokumen akreditasi dengan detail berikut:

IDENTITAS:
- Mata Pelajaran: "${mapel}"
- Jenjang: Paket ${paket} (Fase ${fase})
- Regulasi Acuan: Kurikulum Merdeka sesuai Kepmendikbudristek No. 262/M/2022 dan Panduan BSKAP
- Konteks: Pendidikan Kesetaraan (peserta didik umumnya pekerja/orang dewasa, pembelajaran fleksibel berbasis SKK)

PARAMETER KUSTOMISASI:
- Model Pembelajaran: ${modelBelajar}
- Format Soal: ${formatSoal}
- Tema Projek Penguatan Karakter: ${temaP5}
${konteksPrompt}
ATURAN PENULISAN:
1. Gunakan bahasa Indonesia yang profesional namun tidak kaku — sesuai karakteristik pendidikan kesetaraan (andragogi)
2. Kegiatan harus kontekstual dan relevan dengan kehidupan nyata peserta didik dewasa
3. Soal harus sesuai level kognitif HOTS yang sesuai fase (${fase})
4. Semua konten harus bisa dipertanggungjawabkan saat visitasi akreditasi BAN-PDM

OUTPUT WAJIB dalam format JSON murni (tanpa markdown, tanpa backtick), struktur:
{
  "kegiatanPendahuluan": "Deskripsi kegiatan awal: salam, doa, apersepsi kontekstual, penyampaian tujuan pembelajaran. Minimal 3 kalimat.",
  "kegiatanInti": ["Tahap 1: Sintaks ${modelBelajar} - deskripsi kegiatan...", "Tahap 2: ...", "Tahap 3: ...", "Tahap 4: ...", "Tahap 5: Diferensiasi (remedial/pengayaan)"],
  "kegiatanPenutup": "Refleksi, kesimpulan, informasi tindak lanjut, doa penutup. Minimal 2 kalimat.",
  "soalFormatif": [
    {"soal": "Pertanyaan formatif 1 (Level C3-C4)...", "jawaban": "Jawaban/rubrik singkat..."},
    {"soal": "Pertanyaan formatif 2...", "jawaban": "..."},
    {"soal": "Pertanyaan formatif 3...", "jawaban": "..."}
  ],
  "soalSumatif": [
    {"soal": "Soal sumatif 1 sesuai format ${formatSoal} (Level C4-C6)...", "kunciJawaban": "Kunci jawaban/penjelasan lengkap..."},
    {"soal": "Soal sumatif 2...", "kunciJawaban": "..."}
  ],
  "ideProyekKarakter": {
    "judul": "Judul proyek karakter yang berkaitan dengan: ${temaP5}",
    "deskripsi": "Deskripsi lengkap proyek (tujuan, kegiatan, produk akhir, dimensi Profil Pelajar Pancasila yang dikembangkan)"
  }
}`;

    const jsonResult = await this.askGemini(prompt, true);
    return jsonResult;
  }

};

window.AIClient = AIClient;
