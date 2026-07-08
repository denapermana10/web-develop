import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client with fallback check
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY is not defined in environment. Gemini features will run in Demo/Simulation mode.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. API: AI Chatbot / Consultant
app.post("/api/gemini/chat", async (req, res) => {
  const { messages, context } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array." });
  }

  const ai = getGeminiClient();
  if (!ai) {
    // Elegant simulation mode fallback so app never crashes and behaves perfectly
    const userMessage = messages[messages.length - 1]?.content || "";
    return res.json({
      reply: `[Demo Mode - Configure your GEMINI_API_KEY in Settings > Secrets for real AI answers]

Terima kasih telah menghubungi RRPRO Digital Solution! Mengenai "${userMessage}", kami dapat membantu Anda merancang website company profile, landing page, ataupun sistem custom ERP/CRM dengan integrasi mutakhir.

Apakah Anda ingin kami buatkan penawaran harga dan estimasi waktu proyek yang spesifik untuk kebutuhan Anda?`,
      demo: true
    });
  }

  try {
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const conversationHistory = messages.slice(0, -1).map(m => `${m.role === 'user' ? 'Client' : 'RRPRO AI'}: ${m.content}`).join("\n");

    const systemInstruction = `You are a professional IT consultant and Senior Solution Architect at RRPRO Digital Solution, a premium Software House from Indonesia.
Our core services include:
- Jasa Pembuatan Website Company Profile (Rp 5,000,000 - Rp 15,000,000)
- Jasa E-Commerce / Toko Online (Rp 10,000,000 - Rp 25,000,000)
- Aplikasi Web Kustom (CRM, ERP, POS, HRM, Sistem Inventory) (Rp 30,000,000 - Rp 150,000,000+)
- Aplikasi Android & iOS Native/Hybrid (Rp 40,000,000 - Rp 120,000,000+)
- Jasa Integrasi API (Midtrans, RajaOngkir, Xendit, WhatsApp API, OpenAI)
- AI Automation Solutions

Your tone should be professional, welcoming, helpful, and analytical. Answer in Indonesian by default unless the user chats in English.
Provide constructive, direct, and actionable advice. Guide the user to try our interactive "AI Estimator" on the Pricing/Harga page or submit a contact form for detailed deals.

Context about the active page/user request: ${JSON.stringify(context || {})}
Conversation History:
${conversationHistory}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: lastUserMessage,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ reply: response.text || "Mohon maaf, saya belum bisa memproses pesan ini.", demo: false });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada layanan AI: " + error.message });
  }
});

// 2. API: AI Project Cost and Requirement Analyzer
app.post("/api/gemini/estimate", async (req, res) => {
  const { title, category, description, budget, deadline, features } = req.body;

  const ai = getGeminiClient();
  if (!ai) {
    // Simulated project estimation fallback
    const estimatedCost = budget ? parseInt(budget) : 15000000;
    const weeks = deadline ? deadline : "4-6 minggu";
    return res.json({
      analysis: `### [Demo Mode] Estimasi Proyek: ${title || "Sistem Custom"}

Terima kasih atas rincian kebutuhan Anda. Berikut adalah analisis awal dari RRPRO Solution Architect:

1. **Kelayakan Teknis**: Kategori **${category || "Aplikasi Web"}** sangat layak dikerjakan menggunakan tech stack modern seperti React, Node.js, atau Next.js dengan database Supabase PostgreSQL.
2. **Estimasi Waktu**: Penggembangan diperkirakan memakan waktu sekitar **${weeks}** secara end-to-end, mencakup fase UI/UX, Backend Development, Testing, hingga Deployment.
3. **Analisis Biaya**: Anggaran yang Anda harapkan (sekitar Rp ${Number(estimatedCost).toLocaleString('id-ID')}) sangat bersaing. Kami menyarankan pembagian fase rilis (MVP) untuk mengoptimalkan anggaran.
4. **Fitur yang Diusulkan**:
${(features || ["Autentikasi", "Sistem Dashboard", "Integrasi Pembayaran"]).map((f: string) => `   - **${f}**: Implementasi backend terintegrasi dengan modul keamanan tinggi.`).join("\n")}

*Catatan: Konfigurasikan kunci API Gemini Anda di menu Secrets untuk mendapatkan ulasan arsitektur AI yang mendalam dan dinamis!*`,
      techStack: ["React.js", "Node.js (Express)", "Tailwind CSS", "Supabase PostgreSQL", "Vercel / Cloud Run"],
      estimatedTimeline: weeks,
      estimatedPriceRange: `Rp ${Math.round(estimatedCost * 0.9).toLocaleString('id-ID')} - Rp ${Math.round(estimatedCost * 1.15).toLocaleString('id-ID')}`,
      demo: true
    });
  }

  try {
    const prompt = `Lakukan analisis teknis mendalam dan berikan estimasi profesional untuk proyek berikut:
- Nama Proyek: ${title}
- Kategori: ${category}
- Deskripsi Kebutuhan: ${description}
- Target Budget: ${budget ? `Rp ${Number(budget).toLocaleString('id-ID')}` : 'Tidak ditentukan'}
- Target Deadline / Durasi: ${deadline ? `${deadline} minggu` : 'Tidak ditentukan'}
- Fitur Kunci: ${Array.isArray(features) ? features.join(", ") : features}

Output harus berupa analisis komprehensif dalam format Markdown yang mencakup:
1. Analisis Kelayakan dan Kompleksitas Proyek
2. Arsitektur dan Tech Stack yang Direkomendasikan (sebutkan alasannya)
3. Rekomendasi Alur Pengembangan (Roadmap Mingguan)
4. Estimasi Biaya dan Waktu Profesional yang realistis untuk software house Indonesia berkualitas premium.
5. Strategi Mitigasi Risiko Teknis.

Pastikan bahasanya sopan, profesional, dan persuasif dalam Bahasa Indonesia.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a Chief Technology Officer (CTO) and Lead Architect at RRPRO Digital Solution, writing a highly professional project proposal and estimation report to a potential client.",
        temperature: 0.2,
      }
    });

    // Provide some structured fields along with the markdown text
    const responseText = response.text || "";
    
    // Simple heuristic parser for demo purposes
    const estPrice = budget ? `Rp ${Math.round(parseInt(budget) * 0.95).toLocaleString('id-ID')} - Rp ${Math.round(parseInt(budget) * 1.2).toLocaleString('id-ID')}` : "Menyesuaikan";
    const estTimeline = deadline ? `${deadline} Minggu` : "6-8 Minggu";

    res.json({
      analysis: responseText,
      techStack: category?.toLowerCase().includes("android") ? ["Kotlin", "Jetpack Compose", "Node.js", "PostgreSQL", "Firebase"] : ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase PostgreSQL"],
      estimatedTimeline: estTimeline,
      estimatedPriceRange: estPrice,
      demo: false
    });
  } catch (error: any) {
    console.error("Gemini Estimate API Error:", error);
    res.status(500).json({ error: "Gagal memproses estimasi AI: " + error.message });
  }
});

// Vite middleware and Static file routing
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode with Static assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
