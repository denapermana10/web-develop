import React, { useState } from "react";
import { Lead, Service, Portfolio, Testimonial, Blog, User } from "../types";
import { BarChart3, Users, Briefcase, TrendingUp, ChevronRight, Plus, Pencil, Trash2, ArrowUpRight, DollarSign, Filter, Grid, CheckCircle, Clock, Phone, X } from "lucide-react";

interface AdminDashboardProps {
  currentUser: User;
  leads: Lead[];
  services: Service[];
  portfolio: Portfolio[];
  testimonials: Testimonial[];
  blogs: Blog[];
  onAddLead: (lead: Lead) => void;
  onUpdateLeadStatus: (leadId: string, status: Lead["status"]) => void;
  onDeleteLead: (leadId: string) => void;
  // CRUD callbacks
  onAddService: (service: Service) => void;
  onEditService: (service: Service) => void;
  onDeleteService: (serviceId: string) => void;
  
  onAddPortfolio: (proj: Portfolio) => void;
  onEditPortfolio: (proj: Portfolio) => void;
  onDeletePortfolio: (projId: string) => void;
}

export default function AdminDashboard({
  currentUser,
  leads,
  services,
  portfolio,
  testimonials,
  blogs,
  onAddLead,
  onUpdateLeadStatus,
  onDeleteLead,
  onAddService,
  onEditService,
  onDeleteService,
  onAddPortfolio,
  onEditPortfolio,
  onDeletePortfolio
}: AdminDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<"analytics" | "crm" | "services" | "portfolio">("analytics");
  
  // Pipeline filter / view helper
  const pipelineStages: Lead["status"][] = ["Lead Baru", "Follow Up", "Meeting", "Quotation", "Deal", "Lost"];

  // New service form state
  const [showAddService, setShowAddService] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState(5000000);
  const [newServiceDesc, setNewServiceDesc] = useState("");

  // New portfolio form state
  const [showAddPortfolio, setShowAddPortfolio] = useState(false);
  const [newPortTitle, setNewPortTitle] = useState("");
  const [newPortCat, setNewPortCat] = useState<Portfolio["category"]>("Website");
  const [newPortClient, setNewPortClient] = useState("");
  const [newPortDesc, setNewPortDesc] = useState("");
  const [newPortTech, setNewPortTech] = useState("");

  const handleAddServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;

    onAddService({
      id: "s-" + Date.now().toString(),
      nama: newServiceName,
      slug: newServiceName.toLowerCase().replace(/\s+/g, "-"),
      harga: Number(newServicePrice),
      icon: "Cpu",
      deskripsi: newServiceDesc || "Layanan digital profesional bergaransi."
    });

    setNewServiceName("");
    setNewServicePrice(5000000);
    setNewServiceDesc("");
    setShowAddService(false);
  };

  const handleAddPortfolioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortTitle.trim()) return;

    onAddPortfolio({
      id: "p-" + Date.now().toString(),
      title: newPortTitle,
      category: newPortCat,
      client: newPortClient || "Klien Mandiri",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400&q=80",
      description: newPortDesc || "Sistem digital handal dengan performa tinggi.",
      tech: newPortTech ? newPortTech.split(",").map(t => t.trim()) : ["React", "Node.js"],
      year: 2026,
      duration: "8 Minggu"
    });

    setNewPortTitle("");
    setNewPortClient("");
    setNewPortDesc("");
    setNewPortTech("");
    setShowAddPortfolio(false);
  };

  // Edit service form state
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editServiceName, setEditServiceName] = useState("");
  const [editServicePrice, setEditServicePrice] = useState(5000000);
  const [editServiceDesc, setEditServiceDesc] = useState("");

  const handleEditServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editServiceName.trim()) return;

    onEditService({
      ...editingService,
      nama: editServiceName,
      slug: editServiceName.toLowerCase().replace(/\s+/g, "-"),
      harga: Number(editServicePrice),
      deskripsi: editServiceDesc
    });

    setEditingService(null);
  };

  // Math totals for dashboard KPI cards
  const totalLeads = leads.length;
  const dealLeads = leads.filter(l => l.status === "Deal").length;
  const winRate = totalLeads > 0 ? Math.round((dealLeads / totalLeads) * 100) : 0;
  const totalRevenueSimulated = leads
    .filter(l => l.status === "Deal")
    .reduce((sum, current) => sum + current.budget, 0);

  return (
    <div className="space-y-6">
      
      {/* Admin Command Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="text-[10px] bg-cyan-50 text-cyan-700 font-mono font-bold tracking-widest px-2.5 py-0.5 rounded border border-cyan-200">
            {currentUser.role.toUpperCase()} CONSOLE
          </span>
          <h2 className="font-display font-bold text-slate-900 text-xl md:text-2xl mt-1.5">Manajemen Operasional RRPRO</h2>
          <p className="text-xs text-slate-500">Kelola master data, ikuti alur CRM pipeline, dan ulas pertumbuhan omzet secara real-time.</p>
        </div>

        {/* Console Actions & Nav buttons */}
        <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
          {/* Prominent WhatsApp Admin Button */}
          <a
            href="https://wa.me/6281324421411?text=Halo%20Admin%20RRPRO,%20saya%20ingin%20berkonsultasi%20mengenai%20operasional/layanan."
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Phone className="h-4 w-4 text-emerald-600" />
            <span>WhatsApp Admin (081324421411)</span>
          </a>

          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            {[
              { id: "analytics", label: "Analytics" },
              { id: "crm", label: "CRM Pipeline" },
              { id: "services", label: "Services" },
              { id: "portfolio", label: "Portfolio" }
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSubTab(sub.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeSubTab === sub.id
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Leads</span>
            <div className="h-7 w-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-display font-bold text-slate-950">{totalLeads}</span>
            <span className="text-[10px] text-emerald-600 font-semibold font-mono flex items-center">
              <ArrowUpRight className="h-3 w-3" />
              +14%
            </span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Dari formulir web &amp; Chatbot AI</span>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Revenue</span>
            <div className="h-7 w-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-lg font-mono font-bold text-slate-950">Rp {totalRevenueSimulated.toLocaleString('id-ID')}</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1.5 block">Akumulasi kesepakatan status DEAL</span>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Conversion Rate</span>
            <div className="h-7 w-7 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-display font-bold text-slate-950">{winRate}%</span>
            <span className="text-[10px] text-emerald-600 font-semibold font-mono flex items-center">
              <ArrowUpRight className="h-3 w-3" />
              +2.3%
            </span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Target optimasi minimal 20%</span>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Projects</span>
            <div className="h-7 w-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Briefcase className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-display font-bold text-slate-950">{portfolio.length}</span>
            <span className="text-[10px] text-slate-400 font-medium">Portofolio Publik</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Telah diluncurkan ke pasar</span>
        </div>

      </div>

      {/* SUB-TABS INTERFACE */}
      {activeSubTab === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          
          {/* Main Visitor & Traffic SVG Chart */}
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="font-display font-semibold text-slate-900 text-sm">Traffic Pengunjung Web (30 Hari Terakhir)</h4>
                <p className="text-[10px] text-slate-400">Total: 12,450 Uniques - Diperbarui harian</p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100">
                SEO Score: 98/100
              </span>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="h-56 w-full flex items-end">
              <svg className="w-full h-full text-indigo-600" viewBox="0 0 500 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                {/* Area under curve */}
                <path d="M0,180 L50,150 L100,165 L150,120 L200,140 L250,90 L300,105 L350,60 L400,75 L450,40 L500,20 L500,200 L0,200 Z" fill="url(#grad)" />
                {/* Curve Line */}
                <path d="M0,180 L50,150 L100,165 L150,120 L200,140 L250,90 L300,105 L350,60 L400,75 L450,40 L500,20" fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />
                {/* Dots on peak points */}
                <circle cx="250" cy="90" r="4" fill="#06b6d4" />
                <circle cx="500" cy="20" r="5" fill="#4f46e5" />
              </svg>
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-3 border-t border-slate-50 pt-2">
              <span>Minggu 1 (Juni)</span>
              <span>Minggu 2</span>
              <span>Minggu 3</span>
              <span>Minggu 4</span>
              <span>Sekarang (Juli 2026)</span>
            </div>
          </div>

          {/* Device & Acquisition Stats card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <h4 className="font-display font-semibold text-slate-900 text-sm mb-1.5">Acquisition &amp; Device</h4>
              <p className="text-[10px] text-slate-400 mb-4">Sistem Operasi &amp; Browser Klien</p>
            </div>

            <div className="space-y-3.5">
              {[
                { name: "Mobile Smartphone (Chrome / Safari)", percent: 58, color: "bg-indigo-600" },
                { name: "Desktop & Laptop (Windows / macOS)", percent: 34, color: "bg-cyan-500" },
                { name: "Direct Search & organic", percent: 8, color: "bg-slate-400" }
              ].map((stat) => (
                <div key={stat.name} className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-semibold text-slate-700">
                    <span>{stat.name}</span>
                    <span>{stat.percent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className={`${stat.color} h-full rounded-full`} style={{ width: `${stat.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-50 pt-3 mt-4 text-[10px] text-slate-500 font-mono text-center">
              Target SEO: <strong>100% Mobile Friendly</strong>
            </div>
          </div>

        </div>
      )}

      {activeSubTab === "crm" && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-slate-900 text-lg">Sales Pipeline &amp; CRM Leads</h3>
            <span className="text-xs text-slate-500 font-mono">Dikelola oleh Sales Executive</span>
          </div>

          {/* CRM Kanban / Pipeline Board */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3.5 overflow-x-auto pb-4">
            {pipelineStages.map((stage) => {
              const stageLeads = leads.filter(l => l.status === stage);
              return (
                <div key={stage} className="bg-slate-50 border border-slate-200 rounded-2xl p-3 shrink-0 min-w-[200px]">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">{stage}</span>
                    <span className="text-[10px] bg-slate-200 font-mono font-bold text-slate-600 px-1.5 py-0.5 rounded-full">
                      {stageLeads.length}
                    </span>
                  </div>

                  <div className="space-y-2.5 max-h-[350px] overflow-y-auto">
                    {stageLeads.map((lead) => (
                      <div key={lead.id} className="bg-white border border-slate-150 rounded-xl p-3 shadow-xs space-y-1.5 relative group">
                        
                        <div className="flex justify-between items-start">
                          <h5 className="font-semibold text-xs text-slate-900 truncate max-w-[120px]">{lead.nama}</h5>
                          <button
                            onClick={() => onDeleteLead(lead.id)}
                            className="text-slate-300 hover:text-rose-600 transition-colors"
                            title="Hapus Lead"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>

                        <p className="text-[10px] text-indigo-600 font-medium truncate">{lead.layanan}</p>
                        
                        <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                          <span className="text-[9px] font-mono font-semibold text-slate-500">Rp {lead.budget.toLocaleString('id-ID')}</span>
                        </div>

                        {/* Fast Status Switcher for testing pipeline */}
                        <div className="flex gap-1 pt-1.5 border-t border-slate-50">
                          <select
                            value={lead.status}
                            onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as Lead["status"])}
                            className="w-full text-[9px] bg-slate-50 border border-slate-200 rounded-md py-0.5 px-1 font-semibold focus:outline-none focus:border-indigo-500 text-slate-600"
                          >
                            {pipelineStages.map((st) => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </div>

                      </div>
                    ))}

                    {stageLeads.length === 0 && (
                      <div className="text-center py-6 text-[10px] text-slate-400 italic">
                        Kosong
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeSubTab === "services" && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-slate-900 text-lg">Master Data Layanan / Services</h3>
            <button
              onClick={() => setShowAddService(!showAddService)}
              className="py-2 px-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Layanan</span>
            </button>
          </div>

          {showAddService && (
            <form onSubmit={handleAddServiceSubmit} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 max-w-lg animate-scale-up">
              <h4 className="font-display font-bold text-slate-900 text-sm">Buat Record Layanan Baru</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">Nama Layanan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Jasa SEO Bulanan Premium"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Harga Mulai Dari (Rp)</label>
                    <input
                      type="number"
                      required
                      value={newServicePrice}
                      onChange={(e) => setNewServicePrice(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Icon Representatif</label>
                    <input
                      type="text"
                      disabled
                      placeholder="Cpu"
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">Deskripsi Layanan</label>
                  <textarea
                    rows={3}
                    placeholder="Deskripsi singkat mengenai deliverables jasa..."
                    value={newServiceDesc}
                    onChange={(e) => setNewServiceDesc(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddService(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg"
                >
                  Simpan Layanan
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((ser) => (
              <div key={ser.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex justify-between items-start">
                <div className="space-y-1.5 max-w-[80%]">
                  <h4 className="font-display font-semibold text-slate-900 text-sm">{ser.nama}</h4>
                  <p className="text-[10px] text-slate-400 font-mono">Slug: {ser.slug}</p>
                  <p className="text-xs text-slate-500 leading-normal font-normal">{ser.deskripsi}</p>
                  <span className="inline-block text-xs font-bold text-indigo-600 font-mono mt-1">
                    Mulai: Rp {ser.harga.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => {
                      setEditingService(ser);
                      setEditServiceName(ser.nama);
                      setEditServicePrice(ser.harga);
                      setEditServiceDesc(ser.deskripsi);
                    }}
                    className="p-1.5 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                    title="Edit Layanan"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeleteService(ser.id)}
                    className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Hapus Layanan"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Service Modal Dialog */}
          {editingService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
              <form onSubmit={handleEditServiceSubmit} className="bg-white rounded-2xl p-6 space-y-4 max-w-lg w-full shadow-2xl border border-slate-100 animate-scale-up">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h4 className="font-display font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Pencil className="h-4 w-4 text-indigo-600" />
                    <span>Edit Data Layanan / Penentuan Harga</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Nama Layanan</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Jasa SEO Premium"
                      value={editServiceName}
                      onChange={(e) => setEditServiceName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 mb-1">Harga Mulai Dari (Rp)</label>
                      <input
                        type="number"
                        required
                        value={editServicePrice}
                        onChange={(e) => setEditServicePrice(Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-600 mb-1">Icon Representatif</label>
                      <input
                        type="text"
                        disabled
                        placeholder={editingService.icon || "Cpu"}
                        className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Deskripsi Layanan</label>
                    <textarea
                      rows={3}
                      placeholder="Deskripsi singkat mengenai deliverables jasa..."
                      value={editServiceDesc}
                      onChange={(e) => setEditServiceDesc(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      )}

      {activeSubTab === "portfolio" && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-slate-900 text-lg">Master Data Portofolio</h3>
            <button
              onClick={() => setShowAddPortfolio(!showAddPortfolio)}
              className="py-2 px-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Portofolio</span>
            </button>
          </div>

          {showAddPortfolio && (
            <form onSubmit={handleAddPortfolioSubmit} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 max-w-lg animate-scale-up">
              <h4 className="font-display font-bold text-slate-900 text-sm">Buat Record Portofolio Baru</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">Judul Portofolio</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Landing Page E-Procurement B2B"
                    value={newPortTitle}
                    onChange={(e) => setNewPortTitle(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Kategori</label>
                    <select
                      value={newPortCat}
                      onChange={(e) => setNewPortCat(e.target.value as Portfolio["category"])}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-indigo-500"
                    >
                      <option value="Website">Website</option>
                      <option value="Android">Android</option>
                      <option value="ERP">ERP</option>
                      <option value="CRM">CRM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">Nama Klien</label>
                    <input
                      type="text"
                      placeholder="Contoh: PT Astra Tbk"
                      value={newPortClient}
                      onChange={(e) => setNewPortClient(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">Teknologi (Pisahkan dengan koma)</label>
                  <input
                    type="text"
                    placeholder="Contoh: Next.js, Supabase, Tailwind, Firebase"
                    value={newPortTech}
                    onChange={(e) => setNewPortTech(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">Deskripsi Project Walkthrough</label>
                  <textarea
                    rows={3}
                    placeholder="Tuliskan latar belakang klien dan deliverables solusi yang tim kami kerjakan..."
                    value={newPortDesc}
                    onChange={(e) => setNewPortDesc(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-indigo-500 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPortfolio(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg"
                >
                  Simpan Portofolio
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolio.map((port) => (
              <div key={port.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex justify-between items-start gap-4">
                <img src={port.image} alt={port.title} className="h-16 w-16 rounded-xl object-cover border border-slate-100 shrink-0" />
                
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold uppercase">
                      {port.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Klien: {port.client}</span>
                  </div>
                  <h4 className="font-display font-semibold text-slate-900 text-sm leading-tight">{port.title}</h4>
                  <p className="text-xs text-slate-500 leading-normal font-normal line-clamp-2">{port.description}</p>
                </div>

                <button
                  onClick={() => onDeletePortfolio(port.id)}
                  className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Hapus Portofolio"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
