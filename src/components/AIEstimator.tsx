import React, { useState } from "react";
import { Sparkles, Calculator, Check, AlertCircle, Loader2, ArrowRight, RefreshCw, Cpu, Calendar, DollarSign, FileText } from "lucide-react";

interface AIEstimatorProps {
  onAddLead: (lead: any) => void;
}

export default function AIEstimator({ onAddLead }: AIEstimatorProps) {
  const [category, setCategory] = useState<string>("Website Company Profile");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [budget, setBudget] = useState<number>(10000000);
  const [deadline, setDeadline] = useState<number>(4); // in weeks
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "Autentikasi (Sign In/Up)",
    "Dashboard Admin"
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any | null>(null);

  const featuresByCategory: Record<string, string[]> = {
    "Website Company Profile": [
      "Autentikasi (Sign In/Up)",
      "Dashboard Admin",
      "Blog/Artikel SEO",
      "Form Kontak Integrasi Email",
      "Slider & Animasi Hero",
      "Multi-bahasa (Indonesia & Inggris)"
    ],
    "Website E-Commerce (Toko Online)": [
      "Sistem Keranjang & Checkout",
      "Integrasi Ongkir Otomatis (RajaOngkir)",
      "Payment Gateway (Midtrans/QRIS)",
      "Dashboard Owner & Laporan",
      "Diskon & Kode Kupon",
      "Manajemen Produk & Kategori"
    ],
    "Aplikasi Web Kustom (ERP & CRM)": [
      "Pipeline Lead CRM",
      "Sistem Kasir (POS) Terpadu",
      "Modul Inventory & Gudang",
      "Manajemen Keuangan / Arus Kas",
      "Sistem Kehadiran & Payroll (HRM)",
      "Ekspor PDF/Excel Otomatis"
    ],
    "Aplikasi Android & iOS": [
      "Push Notifications",
      "Integrasi Kamera / Upload File",
      "Geolokasi & Pelacakan Peta",
      "Offline-first Mode",
      "Login Google / Sosial Media",
      "Obrolan Chat / Live Support"
    ],
    "AI Automation & Chatbot": [
      "Chatbot Layanan Pelanggan",
      "Analisis Dokumen / Proposal AI",
      "Pengenalan Gambar / OCR",
      "Integrasi WhatsApp API Otomatis",
      "Estimasi Harga Otomatis",
      "Analitik Sentimen Ulasan"
    ]
  };

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handleEstimate = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Mohon lengkapi judul proyek dan deskripsi kebutuhan Anda terlebih dahulu.");
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/gemini/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          description,
          budget,
          deadline,
          features: selectedFeatures
        })
      });

      const data = await response.json();
      setResult(data);

      // Save to Leads state so Sales team can follow up instantly!
      onAddLead({
        nama: "Pengguna Kalkulator AI",
        email: "estimator-user@example.com",
        phone: "0899-AI-ESTIMATOR",
        layanan: `${category}: ${title}`,
        budget,
        deskripsi: `ESTIMASI PROYEK AI\nDeskripsi: ${description}\nFitur: ${selectedFeatures.join(", ")}\nEstimasi AI: ${data.estimatedPriceRange} (${data.estimatedTimeline})`
      });

    } catch (error) {
      console.error(error);
      alert("Gagal melakukan estimasi. Mohon coba sesaat lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Form Panel */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-950">AI Estimator Proyek</h3>
              <p className="text-xs text-slate-500">Dapatkan rincian biaya, durasi, roadmap, &amp; arsitektur instan dari AI.</p>
            </div>
          </div>

          <div className="space-y-4">
            
            {/* Kategori */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Kategori Proyek</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.keys(featuresByCategory).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setCategory(cat);
                      setSelectedFeatures(featuresByCategory[cat].slice(0, 2));
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border text-left transition-all ${
                      category === cat
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Nama Proyek */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Nama / Judul Proyek</label>
              <input
                type="text"
                placeholder="Contoh: Sistem CRM Dealer Mobil Bekas"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:border-indigo-500 focus:outline-none transition-all"
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Deskripsi Kebutuhan &amp; Alur Bisnis</label>
              <textarea
                rows={4}
                placeholder="Jelaskan kebutuhan utama Anda secara garis besar. Contoh: Aplikasi untuk mendata sales dealer, tracking progres follow up customer, sampai deal dan cetak nota kwitansi pembayaran..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:border-indigo-500 focus:outline-none transition-all resize-none"
              />
            </div>

            {/* Budget & Deadline sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Target Budget (Rp)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-mono text-xs">
                    Rp
                  </div>
                  <input
                    type="number"
                    step={1000000}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-4 py-2.5 text-xs font-mono focus:border-indigo-500 focus:outline-none transition-all"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Taksiran Anda saat ini: <strong>Rp {budget.toLocaleString('id-ID')}</strong></span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Target Deadline (Minggu)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={2}
                    max={24}
                    value={deadline}
                    onChange={(e) => setDeadline(Number(e.target.value))}
                    className="flex-1 accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <span className="px-3 py-1 bg-white border border-slate-200 text-xs font-semibold font-mono rounded-lg shrink-0">
                    {deadline} Minggu
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Sekitar {Math.round(deadline * 7)} hari kalender.</span>
              </div>
            </div>

            {/* Feature Checklist */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">Pilih Fitur yang Diinginkan</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {featuresByCategory[category]?.map((feature) => {
                  const isChecked = selectedFeatures.includes(feature);
                  return (
                    <button
                      type="button"
                      key={feature}
                      onClick={() => toggleFeature(feature)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-left transition-all ${
                        isChecked
                          ? "bg-indigo-50 border-indigo-200 text-indigo-950"
                          : "bg-white border-slate-100 text-slate-600 hover:border-slate-200"
                      }`}
                    >
                      <span className="text-xs font-medium">{feature}</span>
                      <div className={`h-4 w-4 rounded-md flex items-center justify-center border transition-all ${
                        isChecked ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300"
                      }`}>
                        {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleEstimate}
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sedang Menganalisis via Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Kalkulasi &amp; Buat Estimasi Proposal AI</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Right Output Panel */}
        <div className="w-full lg:w-[450px] shrink-0">
          {result ? (
            <div className="bg-white border border-slate-100 rounded-2xl shadow-md p-5 h-full flex flex-col animate-fade-in">
              <div className="border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-bold uppercase">
                    Hasil Analisis AI
                  </span>
                  {result.demo && (
                    <span className="text-[9px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200 font-mono font-semibold">
                      Demo Mode
                    </span>
                  )}
                </div>
                <h4 className="font-display font-bold text-slate-950 text-base mt-2">{title}</h4>
                <p className="text-xs text-slate-500 mt-1">Kategori: <strong>{category}</strong></p>
              </div>

              {/* Pricing & Duration Widgets */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">Estimasi Biaya</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-900 font-mono">{result.estimatedPriceRange}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">Target Waktu</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Calendar className="h-4 w-4 text-cyan-600" />
                    <span className="text-xs font-bold text-slate-900 font-mono">{result.estimatedTimeline}</span>
                  </div>
                </div>
              </div>

              {/* Recommended Stack */}
              <div className="mb-4">
                <span className="text-[10px] font-bold text-slate-400 block uppercase mb-1.5">Rekomendasi Tech Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {result.techStack?.map((tech: string) => (
                    <span key={tech} className="px-2 py-1 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-md flex items-center gap-1">
                      <Cpu className="h-3 w-3 text-slate-500" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detailed Markdown Report */}
              <div className="flex-1 bg-slate-950 text-slate-300 rounded-xl p-4 overflow-y-auto max-h-[250px] font-mono text-[11px] leading-relaxed border border-slate-800">
                <div className="text-cyan-400 font-bold mb-2">PROPOSAL ESTIMASI TEKNIS:</div>
                <div className="whitespace-pre-wrap">{result.analysis}</div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                <p className="text-[10px] text-slate-500 leading-normal">
                  Proposal ini telah disimpan ke CRM kami. Hubungi Sales untuk konsultasi mendalam lewat WhatsApp!
                </p>
                <a
                  href="https://wa.me/6281324421411?text=Halo%20RRPRO,%20saya%20sudah%20mencoba%20AI%20Estimator%20proyek%20saya%20dan%20ingin%20berkonsultasi%20lebih%20lanjut."
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2.5 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all w-full"
                >
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>Diskusikan Detail lewat WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center p-8 bg-white/50">
              <FileText className="h-10 w-10 text-slate-300 mb-3" />
              <h4 className="font-display font-semibold text-slate-700 text-sm">Belum Ada Analisis</h4>
              <p className="text-xs text-slate-400 max-w-[280px] mt-1">
                Isi rincian ide proyek Anda di panel kiri lalu klik &quot;Buat Estimasi Proposal AI&quot; untuk memulai.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
