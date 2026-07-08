import React, { useState } from "react";
import { Project, Invoice, Ticket, User } from "../types";
import { Progress } from "./Progress";
import { CheckCircle, Clock, FileText, Layout, CreditCard, LifeBuoy, Send, Download, Plus, Sparkles, MessageCircle } from "lucide-react";

interface ClientAreaProps {
  currentUser: User;
  projects: Project[];
  invoices: Invoice[];
  tickets: Ticket[];
  onAddTicket: (ticket: Omit<Ticket, "id" | "status" | "createdAt">) => void;
}

export default function ClientArea({ currentUser, projects, invoices, tickets, onAddTicket }: ClientAreaProps) {
  const [activeSubTab, setActiveSubTab] = useState<"projects" | "invoices" | "tickets">("projects");
  
  // Create ticket form states
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketPriority, setTicketPriority] = useState<Ticket["priority"]>("Medium");

  // Filter lists based on simulated logged in user's email
  const userProjects = projects.filter(p => p.customerEmail === currentUser.email);
  const userInvoices = invoices.filter(i => i.customerEmail === currentUser.email);
  const userTickets = tickets.filter(t => t.customerEmail === currentUser.email);

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim()) return;

    onAddTicket({
      customerName: currentUser.fullname,
      customerEmail: currentUser.email,
      subject: ticketSubject,
      priority: ticketPriority
    });

    setTicketSubject("");
    setShowCreateTicket(false);
  };

  const downloadFileSimulation = (fileName: string) => {
    alert(`[Simulasi Download] File "${fileName}" sedang dipersiapkan dan diunduh secara lokal.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Client Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] bg-indigo-500/30 text-indigo-300 font-mono font-bold tracking-widest px-3 py-1 rounded-full border border-indigo-400/20 uppercase">
            Client Portal Area
          </span>
          <h2 className="font-display font-bold text-2xl md:text-3xl mt-3 text-slate-100">Selamat datang, {currentUser.fullname}!</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Akses progres pengerjaan aplikasi Anda, kelola invoices pembayaran, atau buat tiket bantuan teknis secara langsung dengan tim arsitek kami.
          </p>
        </div>
        
        <div className="flex gap-2 bg-slate-800/40 p-1.5 rounded-xl border border-slate-700/50">
          <button
            onClick={() => setActiveSubTab("projects")}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === "projects" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Layout className="h-3.5 w-3.5" />
            <span>Progress Project</span>
          </button>
          
          <button
            onClick={() => setActiveSubTab("invoices")}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === "invoices" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <CreditCard className="h-3.5 w-3.5" />
            <span>Invoices</span>
          </button>
          
          <button
            onClick={() => setActiveSubTab("tickets")}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === "tickets" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <LifeBuoy className="h-3.5 w-3.5" />
            <span>Support Tickets</span>
          </button>
        </div>
      </div>

      {/* Primary Workspace Panels */}
      {activeSubTab === "projects" && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-slate-900 text-lg">Daftar Proyek Aktif</h3>
            <span className="text-xs font-mono text-slate-500">Menampilkan {userProjects.length} proyek</span>
          </div>

          {userProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {userProjects.map((proj) => (
                <div key={proj.id} className="bg-white border border-slate-100 rounded-2xl shadow-xs p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase bg-cyan-50 text-cyan-700 px-2.5 py-1 rounded-md border border-cyan-100">
                        {proj.status}
                      </span>
                      <h4 className="font-display font-bold text-slate-950 text-lg mt-2">{proj.projectName}</h4>
                      <p className="text-xs text-slate-500">Mulai Pengerjaan: {proj.startDate}</p>
                    </div>

                    <div className="text-left md:text-right">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Target Rilis</span>
                      <span className="text-sm font-semibold text-slate-800 font-mono">{proj.deadline}</span>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-600 font-medium">Progress Keseluruhan</span>
                      <span className="font-bold text-indigo-600 font-mono">{proj.progress}%</span>
                    </div>
                    <Progress value={proj.progress} className="h-2" />
                  </div>

                  {/* Roadmap Timeline Progression Visual */}
                  <div>
                    <span className="text-xs font-bold text-slate-700 block mb-3 uppercase tracking-wider">Milestones &amp; Fase Proyek</span>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                      {[
                        { step: "Requirement", limit: 20, desc: "Riset & Analisis" },
                        { step: "UI/UX Design", limit: 40, desc: "Desain Figma" },
                        { step: "Development", limit: 75, desc: "Backend & Coding" },
                        { step: "Testing & QA", limit: 90, desc: "Cek Bug & Feedback" },
                        { step: "Deployment", limit: 100, desc: "Go Live & Rilis" }
                      ].map((step, idx) => {
                        const isDone = proj.progress >= step.limit;
                        const isActive = proj.progress < step.limit && (idx === 0 || proj.progress >= (idx > 0 ? [20, 40, 75, 90][idx-1] : 0));
                        return (
                          <div
                            key={step.step}
                            className={`p-3 rounded-xl border text-center transition-all ${
                              isDone
                                ? "bg-emerald-50/50 border-emerald-100 text-emerald-950"
                                : isActive
                                ? "bg-indigo-50 border-indigo-200 text-indigo-950 animate-pulse"
                                : "bg-slate-50/30 border-slate-100 text-slate-400"
                            }`}
                          >
                            <div className="flex justify-center mb-1">
                              {isDone ? (
                                <CheckCircle className="h-4 w-4 text-emerald-600" />
                              ) : (
                                <Clock className={`h-4 w-4 ${isActive ? "text-indigo-600" : "text-slate-300"}`} />
                              )}
                            </div>
                            <span className="text-[10px] font-bold block">{step.step}</span>
                            <span className="text-[8px] opacity-80 block mt-0.5">{step.desc}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Download Deliverables Area */}
                  <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-cyan-600" />
                      <span className="text-xs text-slate-600">Dokumen Project Charter &amp; UI Design Link tersedia secara real-time.</span>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => downloadFileSimulation("Link-Figma-Prototyping.txt")}
                        className="flex-1 sm:flex-initial px-3.5 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        <span>Figma Design</span>
                      </button>
                      <button
                        onClick={() => downloadFileSimulation("Laporan-Progress-Sprint-2.pdf")}
                        className="flex-1 sm:flex-initial px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Unduh Laporan</span>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center">
              <p className="text-xs text-slate-500">Anda belum memiliki proyek aktif yang berjalan. Ajukan penawaran harga di menu Layanan / Estimator!</p>
            </div>
          )}
        </div>
      )}

      {activeSubTab === "invoices" && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-slate-900 text-lg">Invoices Pembayaran</h3>
            <span className="text-xs font-mono text-slate-500">Total {userInvoices.length} tagihan</span>
          </div>

          {userInvoices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userInvoices.map((inv) => (
                <div key={inv.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-mono font-bold bg-slate-50 px-2 py-0.5 border border-slate-150 text-slate-600 rounded">
                        INV-{inv.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        inv.status === "Paid"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : inv.status === "Unpaid"
                          ? "bg-amber-50 text-amber-700 border border-amber-100"
                          : "bg-rose-50 text-rose-700 border border-rose-100"
                      }`}>
                        {inv.status === "Paid" ? "Lunas" : "Belum Bayar"}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-slate-950 text-base">{inv.serviceName}</h4>
                    <div className="flex items-baseline gap-1 mt-2 mb-4">
                      <span className="text-xs text-slate-400">Total:</span>
                      <span className="text-lg font-mono font-bold text-slate-900">Rp {inv.total.toLocaleString("id-ID")}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 border-t border-slate-50 pt-3">
                      <div>
                        <span>Tgl Tagihan</span>
                        <span className="block font-semibold text-slate-700">{inv.issueDate}</span>
                      </div>
                      <div>
                        <span>Jatuh Tempo</span>
                        <span className="block font-semibold text-slate-700">{inv.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-50 flex gap-2">
                    <button
                      onClick={() => downloadFileSimulation(`Invoice-${inv.id}.pdf`)}
                      className="flex-1 py-2 px-3 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Cetak PDF</span>
                    </button>
                    {inv.status !== "Paid" && (
                      <a
                        href="https://wa.me/6281324421411?text=Halo%20RRPRO,%20saya%20ingin%20melakukan%20pembayaran%20untuk%20Invoice%20INV-s2."
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer"
                      >
                        Bayar Sekarang
                      </a>
                    )}
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center">
              <p className="text-xs text-slate-500">Belum ada invoice yang diterbitkan untuk akun Anda saat ini.</p>
            </div>
          )}
        </div>
      )}

      {activeSubTab === "tickets" && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-slate-900 text-lg">Support Tickets &amp; Layanan Bantuan</h3>
            <button
              onClick={() => setShowCreateTicket(true)}
              className="py-2 px-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Buat Tiket Baru</span>
            </button>
          </div>

          {/* Create Ticket Modal */}
          {showCreateTicket && (
            <form onSubmit={handleCreateTicketSubmit} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 animate-scale-up">
              <h4 className="font-display font-bold text-slate-950 text-sm">Buat Tiket Bantuan Teknis</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">Subjek / Kendala Teknis</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Gagal integrasi API RajaOngkir di checkout"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">Prioritas</label>
                  <select
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value as Ticket["priority"])}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Low">Rendah (Low)</option>
                    <option value="Medium">Sedang (Medium)</option>
                    <option value="High">Tinggi (High)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateTicket(false)}
                  className="px-3 py-1.5 border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg"
                >
                  Kirim Tiket
                </button>
              </div>
            </form>
          )}

          {userTickets.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {userTickets.map((t) => (
                <div key={t.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-150">
                        TCK-{t.id}
                      </span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                        t.priority === "High" ? "bg-rose-50 text-rose-700" : "bg-slate-100 text-slate-700"
                      }`}>
                        {t.priority} Priority
                      </span>
                    </div>

                    <h4 className="font-display font-semibold text-slate-900 text-sm">{t.subject}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">Dibuat pada: {t.createdAt}</p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      t.status === "Open"
                        ? "bg-sky-50 text-sky-700 border border-sky-100"
                        : t.status === "In Progress"
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    }`}>
                      {t.status}
                    </span>

                    <button
                      onClick={() => alert(`[Tiket Terbuka] Menghubungkan Anda ke WA Group support teknis RRPRO untuk tiket #${t.id}`)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-cyan-600" />
                      <span>Chat WhatsApp Group</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center">
              <p className="text-xs text-slate-500">Anda belum memiliki tiket bantuan aktif saat ini.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
