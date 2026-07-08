import React, { useState } from "react";
import { User, Lead, Service, Portfolio, Testimonial, Blog, Invoice, Project, Ticket } from "./types";
import {
  SEED_SERVICES,
  SEED_PORTFOLIO,
  SEED_TESTIMONIALS,
  SEED_BLOGS,
  BLOG_CATEGORIES,
  FAQS
} from "./data";

// Sub-components
import Navbar from "./components/Navbar";
import AIChatbot from "./components/AIChatbot";
import AIPortfolioDetail from "./components/AIPortfolioDetail";
import AIEstimator from "./components/AIEstimator";
import BlogHub from "./components/BlogHub";
import ClientArea from "./components/ClientArea";
import AdminDashboard from "./components/AdminDashboard";
import { RRProLogo } from "./components/RRProLogo";

// Lucide icons
import {
  ArrowRight,
  Sparkles,
  Phone,
  CheckCircle2,
  HelpCircle,
  Mail,
  MapPin,
  Clock,
  Shield,
  ThumbsUp,
  Cpu,
  Globe,
  ShoppingBag,
  Smartphone,
  Palette,
  ChevronDown,
  ChevronUp,
  Search,
  Upload,
  Layers,
  Award
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  
  // Simulated Logged In user profile (defaults to Visitor)
  const [currentUser, setCurrentUser] = useState<User>({
    id: "visitor-123",
    fullname: "Tamu RRPRO",
    email: "guest@example.com",
    role: "Visitor"
  });

  // Global State Stores
  const [services, setServices] = useState<Service[]>(SEED_SERVICES);
  const [portfolio, setPortfolio] = useState<Portfolio[]>(SEED_PORTFOLIO);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(SEED_TESTIMONIALS);
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "l1",
      nama: "Toko Berkah Abadi",
      email: "owner@berkahabadi.com",
      phone: "08123456789",
      layanan: "Website E-Commerce (Toko Online)",
      budget: 15000000,
      status: "Lead Baru",
      createdAt: "08 Juli 2026"
    },
    {
      id: "l2",
      nama: "Klinik Pratama Sehat",
      email: "info@klinikpratama.com",
      phone: "0855112233",
      layanan: "Website Company Profile",
      budget: 7500000,
      status: "Follow Up",
      createdAt: "06 Juli 2026"
    },
    {
      id: "l3",
      nama: "PT Nusantara Cargo",
      email: "logistics@nusantaracargo.co.id",
      phone: "0811998877",
      layanan: "Aplikasi Android & iOS",
      budget: 55000000,
      status: "Deal",
      createdAt: "01 Juni 2026"
    }
  ]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "s1",
      customerName: "Dena Permana (Klien)",
      customerEmail: "denapermana151690@gmail.com",
      serviceName: "Sistem Manajemen Kasir & CRM Mobile (Astra Rent)",
      total: 35000000,
      status: "Paid",
      issueDate: "10 Juni 2026",
      dueDate: "20 Juni 2026"
    },
    {
      id: "s2",
      customerName: "Dena Permana (Klien)",
      customerEmail: "denapermana151690@gmail.com",
      serviceName: "Maintenance & Premium Cloud Server Hosting (Tahunan)",
      total: 5500000,
      status: "Unpaid",
      issueDate: "05 Juli 2026",
      dueDate: "15 Juli 2026"
    }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "proj1",
      customerName: "Dena Permana (Klien)",
      customerEmail: "denapermana151690@gmail.com",
      projectName: "Sistem Manajemen Kasir & CRM Mobile",
      progress: 75,
      status: "Developing",
      startDate: "12 Juni 2026",
      deadline: "12 Agustus 2026"
    }
  ]);

  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "tck1",
      customerName: "Dena Permana (Klien)",
      customerEmail: "denapermana151690@gmail.com",
      subject: "Konfigurasi WhatsApp Business API gagal merespon webhook",
      status: "In Progress",
      priority: "High",
      createdAt: "07 Juli 2026"
    }
  ]);

  // Lead callbacks
  const handleAddLead = (newLead: Omit<Lead, "id" | "createdAt" | "status">) => {
    const lead: Lead = {
      ...newLead,
      id: "l-" + Date.now().toString(),
      status: "Lead Baru",
      createdAt: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })
    };
    setLeads((prev) => [lead, ...prev]);
  };

  const handleUpdateLeadStatus = (leadId: string, status: Lead["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status } : l))
    );
  };

  const handleDeleteLead = (leadId: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
  };

  // Support ticket callbacks
  const handleAddTicket = (newTicket: Omit<Ticket, "id" | "status" | "createdAt">) => {
    const ticket: Ticket = {
      ...newTicket,
      id: "tck-" + Date.now().toString(),
      status: "Open",
      createdAt: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })
    };
    setTickets((prev) => [ticket, ...prev]);
  };

  // Service CRUD
  const handleAddService = (newSer: Service) => {
    setServices((prev) => [...prev, newSer]);
  };
  const handleEditService = (editedSer: Service) => {
    setServices((prev) =>
      prev.map((s) => (s.id === editedSer.id ? editedSer : s))
    );
  };
  const handleDeleteService = (serId: string) => {
    setServices((prev) => prev.filter((s) => s.id !== serId));
  };

  // Portfolio CRUD
  const handleAddPortfolio = (newPort: Portfolio) => {
    setPortfolio((prev) => [...prev, newPort]);
  };
  const handleEditPortfolio = (editedPort: Portfolio) => {
    setPortfolio((prev) =>
      prev.map((p) => (p.id === editedPort.id ? editedPort : p))
    );
  };
  const handleDeletePortfolio = (portId: string) => {
    setPortfolio((prev) => prev.filter((p) => p.id !== portId));
  };

  // Portfolio selection/modal states
  const [selectedProject, setSelectedProject] = useState<Portfolio | null>(null);
  
  // FAQ accordion open/close list
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState("");

  // Contact Form Submission state
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    phone: "",
    perusahaan: "",
    layanan: "Website Company Profile",
    budget: 10000000,
    deadline: 4,
    deskripsi: ""
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama.trim() || !formData.email.trim()) return;

    // Add to leads
    handleAddLead({
      nama: formData.nama,
      email: formData.email,
      phone: formData.phone,
      layanan: formData.layanan,
      budget: formData.budget,
      deskripsi: `${formData.deskripsi}\nTarget Deadline: ${formData.deadline} Minggu\nPerusahaan: ${formData.perusahaan}`
    });

    setContactFormSubmitted(true);
    setTimeout(() => {
      setContactFormSubmitted(false);
      // Reset form
      setFormData({
        nama: "",
        email: "",
        phone: "",
        perusahaan: "",
        layanan: "Website Company Profile",
        budget: 10000000,
        deadline: 4,
        deskripsi: ""
      });
    }, 4000);
  };

  // Helper for rendering icons dynamically
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe": return <Globe className="h-5 w-5 text-indigo-600" />;
      case "ShoppingBag": return <ShoppingBag className="h-5 w-5 text-cyan-600" />;
      case "Cpu": return <Cpu className="h-5 w-5 text-emerald-600" />;
      case "Smartphone": return <Smartphone className="h-5 w-5 text-amber-600" />;
      case "Sparkles": return <Sparkles className="h-5 w-5 text-purple-600" />;
      case "Palette": return <Palette className="h-5 w-5 text-pink-600" />;
      default: return <Cpu className="h-5 w-5 text-slate-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      
      {/* Dynamic Header & Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      {/* Floating Smart AI Chatbot Assistant */}
      <AIChatbot
        onAddLead={handleAddLead}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Primary Workspace Sections */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB: HOME */}
        {activeTab === "home" && (
          <div className="space-y-16 animate-fade-in">
            
            {/* HERO SECTION */}
            <div className="flex flex-col lg:flex-row items-center gap-12 pt-4">
              <div className="flex-1 space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
                  <Sparkles className="h-3.5 w-3.5" />
                  Premium Software House &amp; IT Consultant
                </span>
                <h1 className="font-display font-bold text-slate-900 text-3xl sm:text-5xl leading-tight tracking-tight">
                  Wujudkan Ide Digital Bisnis Anda Bersama <span className="bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">RRPRO Digital Solution</span>
                </h1>
                <p className="text-sm text-slate-500 leading-relaxed font-normal max-w-xl">
                  Kami merancang dan mendeploy Website Company Profile, E-Commerce, Aplikasi Mobile Android, hingga Sistem ERP/CRM kustom berskala industri dengan performa LCP &lt; 2 detik dan standar proteksi enkripsi tinggi.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    id="hero-cta-estimator"
                    onClick={() => setActiveTab("harga")}
                    className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Coba AI Estimator Proyek</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    id="hero-cta-whatsapp"
                    href="https://wa.me/6281324421411?text=Halo%20RRPRO,%20saya%20tertarik%20untuk%20konsultasi%20pembuatan%20website/app%20bisnis."
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs hover:shadow transition-all flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4 text-emerald-500" />
                    <span>Diskusikan via WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Simulated Video Walkthrough Background / Interactive Frame */}
              <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-cyan-500 rounded-3xl blur-2xl opacity-10 -z-10" />
                <div className="bg-slate-900 rounded-3xl border border-slate-800 p-3 sm:p-5 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center gap-1.5 border-b border-slate-800 pb-3 mb-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-slate-500 font-mono ml-2">RRPRO_Interactive_Demo.ts</span>
                  </div>
                  
                  {/* Mock live dashboard layout rendering inside video background placeholder */}
                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col justify-between min-h-[220px]">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[8px] font-mono tracking-wider text-slate-500 uppercase">Live Sprint Progress</span>
                        <h4 className="text-white text-xs font-bold font-display mt-0.5">Sistem Inventory PT Nusantara</h4>
                      </div>
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/20">
                        Sprint 3 Active
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 my-4">
                      <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 text-center">
                        <span className="text-[8px] text-slate-400 block font-semibold">User Experience</span>
                        <span className="text-cyan-400 text-xs font-bold block mt-1 font-mono">100% DONE</span>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 text-center animate-pulse">
                        <span className="text-[8px] text-slate-400 block font-semibold">API Integrasi</span>
                        <span className="text-indigo-400 text-xs font-bold block mt-1 font-mono">85% CODES</span>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 text-center">
                        <span className="text-[8px] text-slate-400 block font-semibold">Deployment</span>
                        <span className="text-slate-500 text-xs font-bold block mt-1 font-mono">MVP</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[9px] text-slate-500 border-t border-slate-800/80 pt-2.5">
                      <span>Server status: <strong>Online</strong></span>
                      <span>Target: <strong>3 Minggu Lagi</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TRUSTED BY LOGO CLIENT */}
            <div className="border-t border-slate-200/80 pt-10 text-center space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Dipercaya oleh Perusahaan &amp; UMKM Nasional</span>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-75">
                {["PT Astra Tbk", "Medika Group", "Nusantara Cargo", "Kenangan Senja PT", "Aksara News"].map((logo) => (
                  <span key={logo} className="font-display font-bold text-slate-400 text-sm tracking-tight border border-slate-200 px-3.5 py-1.5 rounded-xl bg-white shadow-xs">
                    {logo}
                  </span>
                ))}
              </div>
            </div>

            {/* MENGAPA MEMILIH KAMI / STATISTIK */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
              {[
                { count: "142+", title: "Proyek Selesai", desc: "Website profile, e-commerce, hingga ERP custom diluncurkan sukses." },
                { count: "99.4%", title: "Tingkat Kepuasan", desc: "Klien mendapatkan support pemeliharaan berkelanjutan bebas repot." },
                { count: "10+", title: "Teknologi Terkini", desc: "Mengutamakan Next.js 15, Tailwind, Supabase Postgres, &amp; AI." }
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-white border border-slate-150 rounded-2xl shadow-xs space-y-2 hover:shadow-md transition-shadow">
                  <span className="text-3xl font-display font-bold text-indigo-600 block">{stat.count}</span>
                  <h4 className="font-display font-semibold text-slate-900 text-sm">{stat.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">{stat.desc}</p>
                </div>
              ))}
            </div>

            {/* LAYANAN CARD PREVIEW */}
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-[10px] text-cyan-600 font-bold font-mono tracking-widest uppercase">Layanan Kami</span>
                <h2 className="font-display font-bold text-slate-950 text-2xl md:text-3xl">Pilihan Layanan Digital Terintegrasi</h2>
                <p className="text-xs text-slate-500">Mulai dari skala kecil hingga otomasi proses bisnis korporasi modern.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((ser) => (
                  <div key={ser.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between h-64">
                    <div className="space-y-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                        {getIcon(ser.icon)}
                      </div>
                      <h3 className="font-display font-bold text-slate-900 text-sm">{ser.nama}</h3>
                      <p className="text-xs text-slate-500 leading-normal font-normal line-clamp-3">{ser.deskripsi}</p>
                    </div>

                    <div className="flex justify-between items-center border-t border-slate-50 pt-3 mt-4">
                      <span className="text-[10px] text-slate-400 font-medium">Harga mulai:</span>
                      <span className="text-xs font-bold text-indigo-600 font-mono">Rp {ser.harga.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PORTFOLIO ACCENT CARD CTA */}
            <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[9px] font-mono tracking-widest uppercase text-cyan-400 font-bold">Koleksi Portofolio Terbaik</span>
                <h3 className="font-display font-bold text-slate-100 text-lg md:text-xl mt-2">Lihat Proyek Sukses &amp; Walkthrough Video Sistem Kami</h3>
                <p className="text-xs text-slate-400 max-w-xl mt-1">Saksikan demo live dashboard ERP, pelacakan maps mobile android, &amp; setup integrasi payment gateway.</p>
              </div>
              <button
                onClick={() => setActiveTab("portfolio")}
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-950 text-xs font-bold transition-all shrink-0 cursor-pointer"
              >
                Eksplor Portofolio
              </button>
            </div>

          </div>
        )}

        {/* TAB: TENTANG KAMI */}
        {activeTab === "tentang" && (
          <div className="space-y-12 animate-fade-in">
            
            {/* Profil, Visi, Misi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
              <div className="space-y-5">
                <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-mono font-bold tracking-wider uppercase">
                  Profil Korporasi
                </span>
                <h2 className="font-display font-bold text-slate-950 text-2xl md:text-3xl leading-tight">Mendorong Transformasi Digital Bisnis Indonesia</h2>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  RRPRO Digital Solution didirikan dengan komitmen murni menyajikan jasa rekayasa perangkat lunak (software engineering) kelas atas tanpa biaya overhead yang mubazir. Kami memadukan riset kegunaan visual (UI/UX) dengan backend cloud kustom berdaya tahan tinggi.
                </p>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-150 pt-4">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Visi Kami</span>
                    <span className="text-xs font-medium text-slate-700 mt-1 block">Menjadi partner digital terpercaya bagi UMKM &amp; Startup skala industri nasional.</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Misi Kami</span>
                    <span className="text-xs font-medium text-slate-700 mt-1 block">Mendeploy sistem tangguh, aman, dan tanpa biaya langganan yang menjerat.</span>
                  </div>
                </div>
              </div>

              {/* Company Team Visual Mockup */}
              <div className="bg-white border border-slate-150 p-6 rounded-3xl space-y-4">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Pilar Nilai Perusahaan</span>
                <div className="space-y-3">
                  {[
                    { title: "Integritas & NDA", desc: "Keamanan hak kekayaan intelektual (IP) ide bisnis Anda adalah komitmen mutlak." },
                    { title: "Performa Tinggi", desc: "Semua website dijamin lolos uji PageSpeed Google &gt; 95%." },
                    { title: "One-Time Payment", desc: "Kepemilikan source code 100% penuh setelah rilis tanpa ikatan biaya tahunan membengkak." }
                  ].map((val, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="h-5 w-5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600 mt-0.5">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{val.title}</h4>
                        <p className="text-[11px] text-slate-500">{val.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Team Showcase */}
            <div className="space-y-6 pt-6">
              <div className="text-center max-w-lg mx-auto space-y-2">
                <span className="text-[10px] text-cyan-600 font-bold font-mono uppercase tracking-wider">Profesional Kami</span>
                <h3 className="font-display font-bold text-slate-900 text-xl md:text-2xl">Tim Solution Architect &amp; Engineers</h3>
                <p className="text-xs text-slate-500">Masing-masing dengan jam terbang tinggi di bidang arsitektur sistem.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { nama: "Reza Permana", role: "Chief Technology Officer", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200&q=80" },
                  { nama: "Rizky Ramadhan", role: "Senior Frontend Engineer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80" },
                  { nama: "Dena Permana", role: "Product Manager & QA Lead", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80" },
                  { nama: "Sarah Amalia", role: "Lead UI/UX Designer", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80" }
                ].map((member) => (
                  <div key={member.nama} className="bg-white border border-slate-100 rounded-2xl p-4 text-center space-y-3 hover:shadow-sm transition-shadow">
                    <img src={member.avatar} alt={member.nama} className="h-16 w-16 rounded-full object-cover mx-auto border-2 border-indigo-50" />
                    <div>
                      <h4 className="font-semibold text-xs text-slate-900">{member.nama}</h4>
                      <span className="text-[10px] text-slate-400 font-medium">{member.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB: LAYANAN */}
        {activeTab === "layanan" && (
          <div className="space-y-12 animate-fade-in">
            
            <div className="text-center max-w-2xl mx-auto space-y-2 pt-4">
              <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-mono font-bold tracking-wider uppercase">
                Katalog Jasa &amp; Deliverables
              </span>
              <h2 className="font-display font-bold text-slate-950 text-2xl md:text-3xl leading-tight">Solusi Digital Terstruktur Tanpa Biaya Tersembunyi</h2>
              <p className="text-xs text-slate-500">Kami menjamin penulisan kode terstandarisasi, dokumentasi lengkap, dan pendampingan pasca rilis.</p>
            </div>

            {/* List Services Details with subcategories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Website Company Profile & Landing Page", items: ["Optimasi Core Web Vitals (LCP < 2 detik)", "Integrasi Form Kontak SMTP Gmail/Twillio", "Desain Kustom Responsif Seluler & Tablet", "SEO Metadata Schema markup Google ready"], price: "Mulai Rp 5.000.000" },
                { title: "Website E-Commerce & Toko Online", items: ["Integrasi Pembayaran Otomatis Midtrans & Xendit", "Kalkulasi Ongkir Real-time RajaOngkir", "Dashboard Manajemen Produk & Multi-Stok", "Fitur Kupon Diskon & Push WhatsApp"], price: "Mulai Rp 15.000.000" },
                { title: "Sistem ERP & CRM Custom Skala Industri", items: ["Pipeline Leads & Follow Up Sales", "Dashboard HR, Kehadiran, & Payroll", "Modul Inventory & Warehouse Terpadu", "Pencatatan Finansial & Export Excel/PDF"], price: "Mulai Rp 45.000.000" },
                { title: "Aplikasi Android & iOS Native/Hybrid", items: ["Bahasa Kotlin / Flutter / React Native", "Push Notifications Real-time Firebase", "Tanda Tangan Digital & Geolocation Tracking", "Akses Hardware Kamera & Sensor"], price: "Mulai Rp 55.000.000" }
              ].map((cat, i) => (
                <div key={i} className="bg-white border border-slate-150 p-6 rounded-3xl space-y-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-display font-bold text-slate-950 text-sm md:text-base">{cat.title}</h3>
                    <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg shrink-0">
                      {cat.price}
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {cat.items.map((item, idx) => (
                      <li key={idx} className="flex gap-2.5 text-xs text-slate-600">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-normal leading-normal">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Integrasi API Section */}
            <div className="bg-slate-900 text-slate-300 rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-[10px] text-cyan-400 font-bold font-mono tracking-widest uppercase">Ekosistem Konektivitas</span>
                <h3 className="font-display font-bold text-white text-lg md:text-xl">Integrasi API Pihak Ketiga Terpopuler</h3>
                <p className="text-xs text-slate-400">Kami berpengalaman menghubungkan aplikasi Anda dengan berbagai gerbang layanan global &amp; lokal.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {[
                  { name: "Midtrans Payment", desc: "QRIS, Kartu Kredit, Bank Transfer" },
                  { name: "RajaOngkir API", desc: "Kurir JNE, J&T, Sicepat, POS" },
                  { name: "WhatsApp Gateway", desc: "Notifikasi Transaksi Otomatis" },
                  { name: "Google Maps Platform", desc: "Geolocation & Route Optimization" },
                  { name: "Firebase Service", desc: "Push Notification & Realtime Sync" },
                  { name: "OpenAI / Gemini", desc: "Otomatisasi Konten & Chatbot" },
                  { name: "Xendit Gateway", desc: "Virtual Account & Instant Payout" },
                  { name: "SMTP Email Server", desc: "Sistem Verifikasi Akun Cepat" }
                ].map((api) => (
                  <div key={api.name} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
                    <h4 className="text-xs font-bold text-slate-100">{api.name}</h4>
                    <p className="text-[10px] text-slate-500 leading-tight">{api.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB: PORTFOLIO */}
        {activeTab === "portfolio" && (
          <div className="space-y-8 animate-fade-in">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-4">
              <div>
                <span className="text-[10px] bg-cyan-50 border border-cyan-200 text-cyan-700 px-3 py-1 rounded-full font-mono font-bold tracking-wider uppercase">
                  Uji Portofolio
                </span>
                <h2 className="font-display font-bold text-slate-950 text-2xl md:text-3xl mt-3">Karya Nyata yang Telah Mengudara</h2>
                <p className="text-xs text-slate-500 mt-1">Gunakan penyaring (filter) kategori untuk melihat hasil kustomisasi spesifik kami.</p>
              </div>
            </div>

            {/* Portfolio listing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {portfolio.map((port) => (
                <div
                  key={port.id}
                  onClick={() => setSelectedProject(port)}
                  className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col group"
                >
                  <div className="h-48 w-full bg-cover bg-center overflow-hidden">
                    <img
                      src={port.image}
                      alt={port.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold tracking-wider uppercase bg-cyan-50 text-cyan-700 px-2.5 py-0.5 rounded border border-cyan-150">
                          {port.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">Klien: {port.client}</span>
                      </div>
                      <h4 className="font-display font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                        {port.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-600 border-t border-slate-50 pt-3">
                      <span>Tonton Demo Walkthrough</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Custom CTA */}
            <div className="bg-slate-950 text-slate-300 rounded-3xl p-6 md:p-10 border border-slate-800 text-center space-y-4 max-w-3xl mx-auto">
              <h3 className="font-display font-bold text-white text-lg md:text-xl">Tertarik Memiliki Aplikasi Serupa?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kami siap menandatangani perjanjian kerahasiaan ide bisnis (NDA) dan merancang proposal penawaran terperinci khusus untuk kebutuhan spesifik perusahaan Anda.
              </p>
              <button
                onClick={() => setActiveTab("kontak")}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all inline-block cursor-pointer"
              >
                Hubungi Tim Sales RRPRO
              </button>
            </div>

            {/* Detailed Portfolio Modal */}
            {selectedProject && (
              <AIPortfolioDetail
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
                onSelectService={(slug) => {
                  setFormData((prev) => ({ ...prev, layanan: slug }));
                  setActiveTab("kontak");
                }}
              />
            )}

          </div>
        )}

        {/* TAB: HARGA */}
        {activeTab === "harga" && (
          <div className="space-y-12 animate-fade-in">
            
            <div className="text-center max-w-2xl mx-auto space-y-2 pt-4">
              <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-mono font-bold tracking-wider uppercase">
                Estimasi Harga &amp; Proposal
              </span>
              <h2 className="font-display font-bold text-slate-950 text-2xl md:text-3xl leading-tight">Paket Investasi Digital Fleksibel</h2>
              <p className="text-xs text-slate-500">Mulai langkah transformasi bisnis Anda secara hemat, transparan, dan terukur.</p>
            </div>

            {/* Pricing Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { name: "Basic", price: "Rp 1.500.000", s: "website-company-profile", desc: "Sempurna untuk representasi instansi digital awal.", features: ["Website Company Profile 5 Halaman", "Desain Premium Responsif", "Optimasi Kecepatan LCP &lt; 2 detik", "Garansi Perbaikan Bug 3 Bulan", "Domain & Hosting (Tahun Pertama)"] },
                { name: "Professional", price: "Rp 2.500.000", s: "ecommerce", desc: "Cocok untuk toko online &amp; portal media dinamis.", features: ["Website E-Commerce Lengkap", "Integrasi Ongkir &amp; Payment Gateway", "Sistem Database Inventaris Produk", "Garansi Perbaikan Bug 6 Bulan", "Maintenance Server Bulanan (Free 3 Bln)", "Akses Source Code Github Repositori"] },
                { name: "Enterprise", price: "Rp 5.000.000", s: "custom-web-app", desc: "Sistem ERP &amp; CRM internal terintegrasi.", features: ["Sistem Custom CRM &amp; POS Kasir", "Fungsi Multi-User &amp; Role Akses", "Keamanan Enkripsi Database PostgreSQL", "Training Penggunaan Tim (2 Sesi)", "Sertifikasi SSL Keamanan Tinggi", "Hak Kepemilikan Penuh Source Code"] },
                { name: "Custom / AI", price: "Hubungi Sales", s: "ai-automation", desc: "Aplikasi mobile kustom &amp; integrasi kecerdasan buatan.", features: ["Fitur AI Automation &amp; Chatbot", "Aplikasi Mobile Android &amp; iOS", "Riset UI/UX Terdedikasi Figma", "Skalabilitas Server Cloud Server", "Dokumentasi Arsitektur Kode Lengkap", "Non-Disclosure Agreement (NDA) Aman"] }
              ].map((pkg, i) => (
                <div key={i} className="bg-white border border-slate-150 p-5 rounded-3xl space-y-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-slate-900 text-sm">{pkg.name}</h4>
                    <span className="text-lg font-mono font-bold text-indigo-600 block">{pkg.price}</span>
                    <p className="text-[11px] text-slate-400 font-normal leading-relaxed">{pkg.desc}</p>
                    
                    <ul className="space-y-2 border-t border-slate-50 pt-3">
                      {pkg.features.map((f, idx) => (
                        <li key={idx} className="flex gap-2 text-[11px] text-slate-500 leading-normal">
                          <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, layanan: pkg.s }));
                      setActiveTab("kontak");
                    }}
                    className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all text-center cursor-pointer block"
                  >
                    Pilih Paket
                  </button>
                </div>
              ))}
            </div>

            {/* AI ESTIMATOR CALCULATOR HUB */}
            <div className="space-y-4 pt-4">
              <div className="max-w-xl">
                <span className="text-[10px] text-indigo-600 font-bold font-mono tracking-widest uppercase">Smart Assistant Feature</span>
                <h3 className="font-display font-bold text-slate-900 text-xl mt-1">Kalkulasikan &amp; Analisis Kebutuhan Anda via Gemini AI</h3>
                <p className="text-xs text-slate-500">Gunakan AI Estimator kami untuk mensimulasikan deliverables, merekomendasikan tech stack, dan menaksir anggaran harga secara instan.</p>
              </div>

              <AIEstimator onAddLead={handleAddLead} />
            </div>

          </div>
        )}

        {/* TAB: BLOG */}
        {activeTab === "blog" && (
          <div className="pt-4">
            <BlogHub
              blogs={SEED_BLOGS}
              categories={BLOG_CATEGORIES}
            />
          </div>
        )}

        {/* TAB: FAQ */}
        {activeTab === "faq" && (
          <div className="space-y-8 animate-fade-in">
            
            <div className="text-center max-w-2xl mx-auto space-y-2 pt-4">
              <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-mono font-bold tracking-wider uppercase">
                Pertanyaan Populer
              </span>
              <h2 className="font-display font-bold text-slate-950 text-2xl md:text-3xl leading-tight">Membantu Menjawab Kebimbangan Anda</h2>
              <p className="text-xs text-slate-500">Pelajari transparansi pengerjaan, lisensi source code, garansi bug, dan NDA kami.</p>
            </div>

            {/* FAQ Search and list */}
            <div className="max-w-3xl mx-auto space-y-4">
              
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari kendala teknis atau pertanyaan..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs focus:border-indigo-500 focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-2.5">
                {FAQS.filter(f => f.q.toLowerCase().includes(faqSearch.toLowerCase()) || f.a.toLowerCase().includes(faqSearch.toLowerCase())).map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 flex items-center justify-between text-left font-display font-semibold text-xs md:text-sm text-slate-800 hover:bg-slate-50/50 transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
                      </button>
                      
                      {isOpen && (
                        <div className="p-4 bg-slate-50/50 border-t border-slate-50 text-xs text-slate-600 leading-relaxed font-normal whitespace-pre-line">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* TAB: KONTAK */}
        {activeTab === "kontak" && (
          <div className="space-y-12 animate-fade-in">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-4">
              
              {/* Left Details Info */}
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] bg-cyan-50 border border-cyan-200 text-cyan-700 px-3 py-1 rounded-full font-mono font-bold tracking-wider uppercase">
                    Hubungi Sales
                  </span>
                  <h2 className="font-display font-bold text-slate-950 text-2xl md:text-3xl mt-3">Mari Rumuskan Solusi Terpilih Anda</h2>
                  <p className="text-xs text-slate-500 leading-relaxed mt-2 font-normal">
                    Silakan isi detail rancangan kebutuhan Anda di form sebelah kanan. Tim sales engineer senior kami akan menyusun sketsa blueprint sistem awal dan estimasi biaya gratis khusus untuk Anda dalam waktu 24 jam.
                  </p>
                </div>

                <div className="space-y-4 border-t border-slate-150 pt-5">
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Alamat Kantor Pusat</h4>
                      <p className="text-[11px] text-slate-500 leading-normal">
                        Mandalika Technopark Suite 14B, Jln. Sudirman Kav 24, Jakarta Selatan, Indonesia 12190
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Mail className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Email Korespondensi</h4>
                      <p className="text-[11px] text-slate-500">info@rrpro-digital.com / sales@rrpro.id</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Clock className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Jam Operasional Kantor</h4>
                      <p className="text-[11px] text-slate-500">Senin - Jumat: 08:30 - 17:30 WIB (Sabtu/Minggu libur)</p>
                    </div>
                  </div>
                </div>

                {/* Simulated Google Maps Iframe visual placeholder */}
                <div className="h-48 w-full bg-slate-250 rounded-2xl overflow-hidden border border-slate-200 relative">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&h=300&q=80")' }}>
                    <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center">
                      <div className="p-3 bg-white rounded-xl shadow-md border border-slate-100 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-rose-500 animate-bounce" />
                        <div>
                          <span className="text-xs font-bold block text-slate-900">Mandalika Technopark</span>
                          <span className="text-[9px] text-slate-400 block">Kantor RRPRO Digital Solution</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Proposal Form */}
              <div className="bg-white border border-slate-150 rounded-3xl p-6 md:p-8 shadow-xs">
                {contactFormSubmitted ? (
                  <div className="text-center py-12 space-y-4 animate-scale-up">
                    <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                      <ThumbsUp className="h-6 w-6" />
                    </div>
                    <h3 className="font-display font-bold text-slate-900 text-lg">Proposal Berhasil Dikirim!</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                      Terima kasih atas kepercayaan Anda. Data proposal penawaran Anda telah terekam aman ke sistem CRM kami. Sales engineer kami akan segera mengontak Anda di email <strong>{formData.email}</strong>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <h3 className="font-display font-bold text-slate-900 text-base">Isi Formulir Konsultasi Proyek</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-1 uppercase tracking-wider">Nama Lengkap</label>
                        <input
                          type="text"
                          required
                          placeholder="Masukkan nama Anda"
                          value={formData.nama}
                          onChange={(e) => setFormData((p) => ({ ...p, nama: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-1 uppercase tracking-wider">Alamat Email</label>
                        <input
                          type="email"
                          required
                          placeholder="Contoh: nama@perusahaan.com"
                          value={formData.email}
                          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-1 uppercase tracking-wider">No HP / WhatsApp</label>
                        <input
                          type="text"
                          placeholder="Contoh: 08123456789"
                          value={formData.phone}
                          onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-1 uppercase tracking-wider">Nama Perusahaan / Institusi</label>
                        <input
                          type="text"
                          placeholder="Opsional"
                          value={formData.perusahaan}
                          onChange={(e) => setFormData((p) => ({ ...p, perusahaan: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 mb-1 uppercase tracking-wider">Pilih Layanan Utama</label>
                      <select
                        value={formData.layanan}
                        onChange={(e) => setFormData((p) => ({ ...p, layanan: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs"
                      >
                        <option value="Website Company Profile">Website Company Profile (Rp 5jt - 15jt)</option>
                        <option value="Website E-Commerce (Toko Online)">Website E-Commerce (Rp 10jt - 25jt)</option>
                        <option value="Aplikasi Web Kustom (ERP & CRM)">Aplikasi Web Kustom (Rp 30jt - 150jt+)</option>
                        <option value="Aplikasi Android & iOS">Aplikasi Android &amp; iOS (Rp 40jt - 120jt+)</option>
                        <option value="AI Automation & Chatbot">AI Automation &amp; Chatbot (Rp 25jt - 60jt)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-1 uppercase tracking-wider">Target Budget (Rp)</label>
                        <input
                          type="number"
                          step={1000000}
                          value={formData.budget}
                          onChange={(e) => setFormData((p) => ({ ...p, budget: Number(e.target.value) }))}
                          className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 mb-1 uppercase tracking-wider">Target Durasi (Minggu)</label>
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="range"
                            min={2}
                            max={24}
                            value={formData.deadline}
                            onChange={(e) => setFormData((p) => ({ ...p, deadline: Number(e.target.value) }))}
                            className="flex-1 h-2 accent-indigo-600 bg-slate-200 rounded-lg cursor-pointer"
                          />
                          <span className="px-2 py-1 bg-slate-100 text-[10px] font-bold font-mono rounded">
                            {formData.deadline} Mgg
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 mb-1 uppercase tracking-wider">Kebutuhan / Rincian Ide Sistem</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Contoh: Saya butuh website e-commerce yang bisa update stok otomatis dari file CSV distributor..."
                        value={formData.deskripsi}
                        onChange={(e) => setFormData((p) => ({ ...p, deskripsi: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:outline-none rounded-xl px-3.5 py-2 text-xs resize-none"
                      />
                    </div>

                    {/* File Upload zone */}
                    <div className="border border-dashed border-slate-200 rounded-xl p-3 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <Upload className="h-4 w-4 text-slate-400" />
                        <span className="text-[10px] font-medium text-slate-600">Unggah File Spesifikasi / Dokumen Pendukung (PDF/PNG)</span>
                        <span className="text-[8px] text-slate-400">Drag &amp; drop atau klik untuk memilih file (Max 10MB)</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Kirim Proposal Sistem</span>
                    </button>

                  </form>
                )}
              </div>

            </div>

          </div>
        )}

        {/* TAB: CLIENT AREA (PORTAL KLIEN) */}
        {activeTab === "client-area" && (
          <ClientArea
            currentUser={currentUser}
            projects={projects}
            invoices={invoices}
            tickets={tickets}
            onAddTicket={handleAddTicket}
          />
        )}

        {/* TAB: ADMIN/SALES DASHBOARD */}
        {activeTab === "admin-dashboard" && (
          <AdminDashboard
            currentUser={currentUser}
            leads={leads}
            services={services}
            portfolio={portfolio}
            testimonials={testimonials}
            blogs={SEED_BLOGS}
            onAddLead={handleAddLead}
            onUpdateLeadStatus={handleUpdateLeadStatus}
            onDeleteLead={handleDeleteLead}
            onAddService={handleAddService}
            onEditService={handleEditService}
            onDeleteService={handleDeleteService}
            onAddPortfolio={handleAddPortfolio}
            onEditPortfolio={handleEditPortfolio}
            onDeletePortfolio={handleDeletePortfolio}
          />
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-slate-800 pb-8">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <RRProLogo className="h-8 w-8 flex-shrink-0" theme="dark" />
                <span className="font-display font-bold text-white text-base">RRPRO Digital Solution</span>
              </div>
              <p className="text-[11px] leading-relaxed font-normal text-slate-400">
                Penyedia layanan kustomisasi website, aplikasi mobile, sistem ERP/CRM, &amp; otomasi AI terbaik dan terjangkau di Indonesia.
              </p>
            </div>

            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Layanan Populer</h4>
              <ul className="space-y-2 text-[11px]">
                <li><button onClick={() => { setActiveTab("layanan") }} className="hover:text-white transition-colors">Jasa Website Company Profile</button></li>
                <li><button onClick={() => { setActiveTab("layanan") }} className="hover:text-white transition-colors">Jasa Pembuatan E-Commerce</button></li>
                <li><button onClick={() => { setActiveTab("layanan") }} className="hover:text-white transition-colors">Sistem ERP &amp; CRM Custom</button></li>
                <li><button onClick={() => { setActiveTab("layanan") }} className="hover:text-white transition-colors">Pembuatan Aplikasi Android</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Hubungi Kami</h4>
              <ul className="space-y-2 text-[11px]">
                <li className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> Jakarta Selatan, Indonesia</li>
                <li className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> info@rrpro-digital.com</li>
                <li className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> +62 813-2442-1411</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Sertifikasi &amp; Keamanan</h4>
              <div className="flex gap-2 opacity-85">
                <span className="text-[10px] font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800 font-bold uppercase text-indigo-400 flex items-center gap-1">
                  <Shield className="h-3 w-3" /> ISO 27001
                </span>
                <span className="text-[10px] font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800 font-bold uppercase text-cyan-400 flex items-center gap-1">
                  <Award className="h-3 w-3" /> Google Partner
                </span>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 gap-4">
            <p>&copy; 2026 RRPRO Digital Solution. All rights reserved. Hak Cipta Dilindungi.</p>
            <div className="flex gap-4">
              <a href="#privacy" className="hover:text-slate-400">Kebijakan Privasi</a>
              <a href="#terms" className="hover:text-slate-400">Syarat &amp; Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
