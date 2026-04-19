/**
 * generator.js — DOCX Document Generation Engine
 * Menggunakan library docx.js untuk generate Word documents client-side
 */

const DocGenerator = {
  // =========================================
  // DOCX STYLE CONSTANTS
  // =========================================
  FONT: 'Times New Roman',
  FONT_SIZE: 24, // half-points (12pt)
  HEADING_SIZE: 28, // 14pt
  TITLE_SIZE: 32, // 16pt

  // =========================================
  // CORE: Generate a single document
  // =========================================
  async generateDocument(docId, paket, mapel = null, aiData = null) {
    const profile = ProfileManager.getProfile();
    const pkg = CONFIG.packages[paket];
    
    // Resolve Tutor Dynamically to enforce Document Correlation
    let resolvedTutorName = profile.lembaga?.kepala?.nama || 'Kepala PKBM'; 
    const docInfo = CONFIG.getDocInfo(docId);
    if (docInfo && mapel) { // It's a mapel specific document
      const pic = CONFIG.mapelPics[paket]?.[mapel];
      if (pic) {
         resolvedTutorName = pic;
      }
    } else { // It's an institutional document, use the Butir PIC
      const butir = docId.split('-')[0].replace('B', '');
      const pic = CONFIG.instPics[paket]?.[butir];
      if (pic) resolvedTutorName = pic;
    }
    
    
    // Resolve manual override per butir
    const butirNumForTutor = docId.split('-')[0].replace('B', '');
    const manualTutor = App?.selectedTutors?.[butirNumForTutor] || null;

    const context = {
      profile,
      lembaga: profile.lembaga,
      paket,
      pkg,
      mapel: mapel || CONFIG.subjects[paket].umum[0],
      tahunAjaran: CONFIG.tahunAjaran,
      tanggal: Utils.formatTanggal(new Date()),
      tanggalLengkap: Utils.formatTanggalLengkap(new Date()),
      regulasiCP: Utils.getReferensiCP(paket),
      fase: Utils.getFase(paket),
      tutor: manualTutor || resolvedTutorName || profile.lembaga?.kepala?.nama || '',
      aiData: aiData
    };

    // Find the template function
    const templateFn = this._getTemplateFn(docId);
    if (!templateFn) {
      throw new Error(`Template not found for document: ${docId}`);
    }

    // Generate content sections
    const content = templateFn(context);

    // Build DOCX document
    const doc = new docx.Document({
      styles: this._getDocStyles(),
      sections: [{
        properties: {
          page: {
            margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 },
            size: { width: 12191, height: 18711 }  // F4 Indonesia: 21.5 cm × 33 cm
          }
        },
        headers: { default: this._createHeader(context) },
        footers: { default: this._createFooter(context) },
        children: content
      }]
    });

    return doc;
  },

  // =========================================
  // CORE: Download single document
  // =========================================
  async downloadDocument(docId, paket, mapel = null) {
    try {
      const doc = await this.generateDocument(docId, paket, mapel);
      const blob = await docx.Packer.toBlob(doc);
      const fileName = this._getFileName(docId, paket, mapel);
      saveAs(blob, fileName);
      Utils.showToast(`Dokumen "${fileName}" berhasil di-download!`, 'success');
    } catch (err) {
      console.error('Generate error:', err);
      Utils.showToast(`Gagal generate dokumen: ${err.message}`, 'error');
    }
  },

  // =========================================
  // CORE: Batch generate as ZIP
  // =========================================
  async generateBatchZip(docIds, paket, selectedMapels = null, progressCallback = null, useAi = false) {
    const zip = new JSZip();
    const pkg = CONFIG.packages[paket];
    let mapelWajib = pkg?.mapelWajib || [CONFIG.subjects[paket].umum[0]];
    
    // Filter by selected mapels if provided
    if (selectedMapels && selectedMapels.length > 0) {
      mapelWajib = selectedMapels;
    }
    
    let completed = 0;
    let successCount = 0;

    // Calculate total: perMapel docs × mapelWajib, others × 1
    let total = 0;
    for (const docId of docIds) {
      const docInfo = CONFIG.getDocInfo(docId);
      if (docInfo?.perMapel) {
        total += mapelWajib.length;
      } else {
        total += 1;
      }
    }

    for (const docId of docIds) {
      const docInfo = CONFIG.getDocInfo(docId);
      const butirNum = docId.split('-')[0].replace('B', '');
      const folderButir = `Butir ${butirNum}`;

      if (docInfo?.perMapel) {
        // Generate one file per mapel wajib
        for (const mpl of mapelWajib) {
          try {
            let aiData = null;
            if (useAi) {
               try {
                 const aiParamHash = DocGenerator._getAiParamHash();
                 const aiCacheKey = `ai_${paket}_${mpl}_${aiParamHash}`;
                 if (!window[aiCacheKey]) {
                   window[aiCacheKey] = await AIClient.generateMapelPayload(paket, mpl, Utils.getFase(paket));
                 }
                 aiData = window[aiCacheKey];
               } catch (aiErr) {
                 console.warn(`[AI Fallback] Gagal mengambil data AI untuk ${mpl}:`, aiErr);
                 aiData = null;
               }
            }

            const doc = await this.generateDocument(docId, paket, mpl, aiData);
            const blob = await docx.Packer.toBlob(doc);
            const fileName = this._getFileName(docId, paket, mpl);
            // Organize: Butir X / Mapel / filename.docx
            const mapelShort = mpl.replace(/Pendidikan Agama Islam dan Budi Pekerti/g, 'PAI')
              .replace(/Pendidikan /g, '').substring(0, 30);
            zip.folder(folderButir).folder(mapelShort).file(fileName, blob);
            completed++;
            successCount++;
            if (progressCallback) progressCallback(completed, total);
          } catch (err) {
            console.error(`Error generating ${docId} (${mpl}):`, err);
            completed++;
            if (progressCallback) progressCallback(completed, total);
          }
        }
      } else {
        // Generate one file (per jenjang)
        try {
          let aiData = null;
          // Dokumen institusional (perMapel: false) tidak menggunakan aiData.
          // Skip AI call untuk menghemat kuota API.

          const doc = await this.generateDocument(docId, paket, null, aiData);
          const blob = await docx.Packer.toBlob(doc);
          const fileName = this._getFileName(docId, paket, null);
          zip.folder(folderButir).file(fileName, blob);
          completed++;
          successCount++;
          if (progressCallback) progressCallback(completed, total);
        } catch (err) {
          console.error(`Error generating ${docId}:`, err);
          completed++;
          if (progressCallback) progressCallback(completed, total);
        }
      }
    }

    if (successCount === 0) {
      Utils.showToast('Gagal generate semua dokumen. ZIP tidak dibuat. Periksa Console (F12) untuk detail error.', 'error');
      return;
    }
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const zipName = `Akreditasi_PKBM_Paket${paket}_Komponen1_${new Date().toISOString().slice(0, 10)}.zip`;
    saveAs(zipBlob, zipName);
    Utils.showToast(`${successCount} dokumen berhasil di-export sebagai ZIP!`, 'success');
  },

  // =========================================
  // TEMPLATE RESOLVER
  // =========================================
  _getTemplateFn(docId) {
    // docId format: B1-1.1-01, B2-2.1-01, etc.
    const templates = {
      // BUTIR 1
      ...Butir1Templates,
      // BUTIR 2
      ...Butir2Templates,
      // BUTIR 3
      ...Butir3Templates,
      // BUTIR 4
      ...Butir4Templates
    };
    return templates[docId];
  },

  // =========================================
  // FILE NAMING
  // =========================================
  _getFileName(docId, paket, mapel) {
    // Find doc info from config
    const docInfo = CONFIG.getDocInfo(docId);
    const docName = docInfo ? docInfo.nama.replace(/[/\\?%*:|"><]/g, '-').substring(0, 40) : docId;
    if (mapel) {
      const mapelShort = mapel
        .replace(/Pendidikan Agama Islam dan Budi Pekerti/g, 'PAI')
        .replace(/Pendidikan /g, '')
        .replace(/\s+/g, '_')
        .substring(0, 25);
      return `Paket${paket}_${docId}_${docName}_${mapelShort}.docx`;
    }
    return `Paket${paket}_${docId}_${docName}.docx`;
  },

  // =========================================
  // DOCUMENT STYLES
  // =========================================
  _getDocStyles() {
    return {
      default: {
        document: {
          run: {
            font: this.FONT,
            size: this.FONT_SIZE
          },
          paragraph: {
            spacing: { after: 120, line: 360 }  // 1.5 line spacing
          }
        }
      }
    };
  },

  // =========================================
  // HEADER (Kop Surat)
  // =========================================
  _createHeader(ctx) {
    return new docx.Header({
      children: [
        new docx.Paragraph({
          alignment: docx.AlignmentType.CENTER,
          spacing: { after: 0 },
          children: [
            new docx.TextRun({
              text: ctx.lembaga.nama.toUpperCase() || 'PKBM MIFTAHUL KHOIR',
              bold: true,
              size: 32, // 16pt
              font: this.FONT
            })
          ]
        }),
        new docx.Paragraph({
          alignment: docx.AlignmentType.CENTER,
          spacing: { after: 0 },
          children: [
            new docx.TextRun({
              text: `NPSN: ${ctx.lembaga.npsn || '________'}`,
              size: 20,
              font: this.FONT
            })
          ]
        }),
        new docx.Paragraph({
          alignment: docx.AlignmentType.CENTER,
          spacing: { after: 0 },
          children: [
            new docx.TextRun({
              text: [ctx.lembaga.alamat, ctx.lembaga.kelurahan, ctx.lembaga.kecamatan, ctx.lembaga.kabupaten, ctx.lembaga.provinsi].filter(Boolean).join(', ') || 'Alamat PKBM',
              size: 18,
              font: this.FONT
            })
          ]
        }),
        new docx.Paragraph({
          alignment: docx.AlignmentType.CENTER,
          spacing: { after: 0 },
          children: [
            new docx.TextRun({
              text: [ctx.lembaga.telepon ? `Telp: ${ctx.lembaga.telepon}` : null, ctx.lembaga.email ? `Email: ${ctx.lembaga.email}` : null].filter(Boolean).join(' | ') || '',
              size: 18,
              font: this.FONT,
              italics: true
            })
          ]
        }),
        // Garis pembatas
        new docx.Paragraph({
          spacing: { after: 200 },
          border: {
            bottom: { style: docx.BorderStyle.DOUBLE, size: 6, color: '000000' }
          },
          children: []
        })
      ]
    });
  },

  // =========================================
  // FOOTER
  // =========================================
  _createFooter(ctx) {
    return new docx.Footer({
      children: [
        new docx.Paragraph({
          alignment: docx.AlignmentType.CENTER,
          spacing: { after: 0 },
          children: [
            new docx.TextRun({
              text: `${ctx.lembaga.nama} — Dokumen Akreditasi BAN-PDM — T.A. ${ctx.tahunAjaran}  |  Hal. `,
              size: 16,
              font: this.FONT,
              italics: true,
              color: '888888'
            }),
            new docx.TextRun({
              children: [docx.PageNumber.CURRENT],
              size: 16,
              font: this.FONT,
              italics: true,
              color: '888888'
            })
          ]
        })
      ]
    });
  },

  // =========================================
  // HELPER: Common paragraph builders
  // =========================================
  h: {
    title(text) {
      return new docx.Paragraph({
        alignment: docx.AlignmentType.CENTER,
        spacing: { before: 200, after: 200 },
        children: [
          new docx.TextRun({ text: text.toUpperCase(), bold: true, size: 32, font: 'Times New Roman', underline: { type: docx.UnderlineType.SINGLE, color: "000000" } })
        ]
      });
    },

    heading(text, level = 1) {
      const sizes = { 1: 28, 2: 26, 3: 24 };  // level 3 = 12pt bold, dibedakan dari body (12pt normal)
      return new docx.Paragraph({
        spacing: { before: 240, after: 120 },
        children: [
          new docx.TextRun({ text, bold: true, size: sizes[level] || 24, font: 'Times New Roman' })
        ]
      });
    },

    para(text, options = {}) {
      return new docx.Paragraph({
        alignment: options.align || docx.AlignmentType.JUSTIFIED,
        spacing: { after: options.spacing || 120, line: 360 },
        indent: options.indent ? { firstLine: 720 } : undefined,
        children: [
          new docx.TextRun({
            text,
            size: options.size || 24,
            font: 'Times New Roman',
            bold: options.bold || false,
            italics: options.italic || false
          })
        ]
      });
    },

    bullet(text, level = 0) {
      return new docx.Paragraph({
        spacing: { after: 60 },
        indent: { left: 720 + (level * 360), hanging: 360 },
        children: [
          new docx.TextRun({ text: '•  ', size: 24, font: 'Times New Roman' }),
          new docx.TextRun({ text, size: 24, font: 'Times New Roman' })
        ]
      });
    },

    numbered(text, number) {
      return new docx.Paragraph({
        spacing: { after: 60 },
        indent: { left: 720, hanging: 360 },
        children: [
          new docx.TextRun({ text: `${number}. `, size: 24, font: 'Times New Roman', bold: true }),
          new docx.TextRun({ text, size: 24, font: 'Times New Roman' })
        ]
      });
    },

    empty() {
      return new docx.Paragraph({ spacing: { after: 120 }, children: [] });
    },

    signature(ctx) {
      const location = ctx.lembaga.kabupaten || '________';
      return [
        new docx.Paragraph({ children: [] }),
        new docx.Paragraph({
          alignment: docx.AlignmentType.RIGHT,
          spacing: { after: 0 },
          children: [
            new docx.TextRun({ text: `${location}, ${ctx.tanggal}`, size: 24, font: 'Times New Roman' })
          ]
        }),
        new docx.Paragraph({
          alignment: docx.AlignmentType.RIGHT,
          spacing: { after: 0 },
          children: [
            new docx.TextRun({ text: 'Kepala PKBM,', size: 24, font: 'Times New Roman' })
          ]
        }),
        new docx.Paragraph({ spacing: { after: 0 }, children: [] }),
        new docx.Paragraph({ spacing: { after: 0 }, children: [] }),
        new docx.Paragraph({ spacing: { after: 0 }, children: [] }),
        new docx.Paragraph({
          alignment: docx.AlignmentType.RIGHT,
          spacing: { after: 0 },
          children: [
            new docx.TextRun({
              text: ctx.lembaga.kepala.nama || '________________________',
              size: 24, font: 'Times New Roman', bold: true, underline: { type: docx.UnderlineType.SINGLE, color: "000000" }
            })
          ]
        }),
        new docx.Paragraph({
          alignment: docx.AlignmentType.RIGHT,
          children: [
            new docx.TextRun({
              text: ctx.lembaga.kepala.nip ? `NIP. ${ctx.lembaga.kepala.nip}` : 'NIP. ________________________',
              size: 20, font: 'Times New Roman'
            })
          ]
        })
      ];
    },

    signatureTutor(ctx, tutorName) {
      const location = ctx.lembaga.kabupaten || '________';
      const nama = tutorName || ctx.tutor || '________________________';
      return [
        new docx.Paragraph({ children: [] }),
        new docx.Paragraph({
          alignment: docx.AlignmentType.LEFT,
          spacing: { after: 0 },
          children: [
            new docx.TextRun({ text: `${location}, ${ctx.tanggal}`, size: 24, font: 'Times New Roman' })
          ]
        }),
        new docx.Paragraph({
          alignment: docx.AlignmentType.LEFT,
          spacing: { after: 0 },
          children: [
            new docx.TextRun({ text: 'Tutor/Pendidik,', size: 24, font: 'Times New Roman' })
          ]
        }),
        new docx.Paragraph({ spacing: { after: 0 }, children: [] }),
        new docx.Paragraph({ spacing: { after: 0 }, children: [] }),
        new docx.Paragraph({ spacing: { after: 0 }, children: [] }),
        new docx.Paragraph({
          alignment: docx.AlignmentType.LEFT,
          children: [
            new docx.TextRun({
              text: nama,
              size: 24, font: 'Times New Roman', bold: true, underline: { type: docx.UnderlineType.SINGLE, color: "000000" }
            })
          ]
        })
      ];
    },

    table(headers, rows) {
      const headerCells = headers.map(h => new docx.TableCell({
        shading: { fill: 'D6E4F0' },
        children: [new docx.Paragraph({
          alignment: docx.AlignmentType.CENTER,
          spacing: { line: 276 },  // single spacing in tables for compactness
          children: [new docx.TextRun({ text: h, bold: true, size: 24, font: 'Times New Roman', color: '000000' })]
        })],
        verticalAlign: docx.VerticalAlign.CENTER
      }));

      const dataRows = rows.map(row => new docx.TableRow({
        children: row.map(cell => new docx.TableCell({
          children: [new docx.Paragraph({
            spacing: { line: 276 },  // single spacing in tables
            children: [new docx.TextRun({ text: String(cell), size: 24, font: 'Times New Roman' })]
          })],
          verticalAlign: docx.VerticalAlign.CENTER
        }))
      }));

      return new docx.Table({
        width: { size: 100, type: docx.WidthType.PERCENTAGE },
        rows: [
          new docx.TableRow({ children: headerCells, tableHeader: true }),
          ...dataRows
        ]
      });
    },

    referensiRegulasi(ctx) {
      return new docx.Paragraph({
        spacing: { before: 120, after: 120, line: 276 },
        children: [
          new docx.TextRun({ text: 'Referensi: ', bold: true, size: 22, font: 'Times New Roman', italics: true }),
          new docx.TextRun({ text: `${ctx.regulasiCP} | ${CONFIG.regulasi.kurikulum.panduan}`, size: 22, font: 'Times New Roman', italics: true, color: '444444' })
        ]
      });
    }
  },

  // =========================================
  // HELPER: AI Parameter Hash (for cache invalidation)
  // =========================================
  _getAiParamHash() {
    const params = [
      localStorage.getItem('ai_model_belajar') || '',
      localStorage.getItem('ai_format_soal') || '',
      localStorage.getItem('ai_tema_p5') || '',
      localStorage.getItem('ai_konteks') || ''
    ].join('|');
    // Simple hash
    let hash = 0;
    for (let i = 0; i < params.length; i++) {
      const chr = params.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return Math.abs(hash).toString(36);
  }
};
