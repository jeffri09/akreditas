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
    const prompt = `Anda adalah asisten Guru PKBM (Pendidikan Kesetaraan) professional.
Buatkan skenario materi ajar untuk mata pelajaran "${mapel}" pada jenjang ${paket} (Fase ${fase}).
Gunakan bahasa yang instruksional, interaktif, dan tidak kaku (pendekatan orang dewasa).

Keluarkan hasil WAJIB DALAM BENTUK JSON murni tanpa markdown, dengan struktur berikut:
{
  "kegiatanPendahuluan": "Paragraf deskripsi kegiatan awal (menyapa, berdoa, memotivasi).",
  "kegiatanInti": ["Point 1 kegiatan eksplorasi...", "Point 2 kegiatan diskusi...", "Point 3..."],
  "kegiatanPenutup": "Paragraf kesimpulan dan refleksi.",
  "soalFormatif": [
    {"soal": "Pertanyaan Formatif 1...", "jawaban": "Jawaban 1..."},
    {"soal": "Pertanyaan Formatif 2...", "jawaban": "Jawaban 2..."},
    {"soal": "Pertanyaan Formatif 3...", "jawaban": "Jawaban 3..."}
  ],
  "soalSumatif": [
    {"soal": "Pertanyaan Sumatif 1 (Level Kritis)...", "kunciJawaban": "Jawaban Detail 1..."},
    {"soal": "Pertanyaan Sumatif 2 (Level Analisis)...", "kunciJawaban": "Jawaban Detail 2..."}
  ],
  "ideProyekKarakter": {
    "judul": "Judul Proyek Karakter",
    "deskripsi": "Deskripsi aktivitas wirausaha/sosial dari proyek ini."
  }
}`;

    const jsonResult = await this.askGemini(prompt, true);
    return jsonResult;
  }

};

window.AIClient = AIClient;
