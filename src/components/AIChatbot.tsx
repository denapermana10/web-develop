import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User as UserIcon, Loader2, Sparkles, AlertCircle, Phone } from "lucide-react";
import { ChatMessage, Lead } from "../types";

interface AIChatbotProps {
  onAddLead: (lead: Omit<Lead, "id" | "createdAt" | "status">) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AIChatbot({ onAddLead, activeTab, setActiveTab }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Halo! Selamat datang di RRPRO Digital Solution. Saya AI Consultant Anda. Ada yang bisa saya bantu hari ini mengenai pembuatan website, aplikasi mobile, atau sistem kustom ERP/CRM?",
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Lead Collection State
  const [collectingLead, setCollectingLead] = useState(false);
  const [leadStep, setLeadStep] = useState<"name" | "email" | "service" | "done">("name");
  const [leadData, setLeadData] = useState({
    nama: "",
    email: "",
    layanan: "Website Company Profile",
    phone: "",
    budget: 15000000,
    deskripsi: "Dikumpulkan melalui asisten AI Chatbot."
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Quick suggestions trigger
  const handleSuggestionClick = (text: string) => {
    handleSendMessage(text);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const chatText = textToSend || input;
    if (!chatText.trim()) return;

    if (!textToSend) setInput("");

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: chatText,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMessage]);

    // Check if user wants to start consultation or order service
    const lowercaseText = chatText.toLowerCase();
    if (
      (lowercaseText.includes("pesan") || 
       lowercaseText.includes("order") || 
       lowercaseText.includes("konsultasi") || 
       lowercaseText.includes("buat website") || 
       lowercaseText.includes("bikin") || 
       lowercaseText.includes("harga")) && 
      !collectingLead
    ) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCollectingLead(true);
        setLeadStep("name");
        setMessages((prev) => [
          ...prev,
          {
            id: "lead-start",
            role: "assistant",
            content: "Tentu! Saya akan bantu mengumpulkan info kebutuhan Anda agar tim Sales kami bisa segera menyusun proposal terbaik. Boleh tahu **nama lengkap** Anda?",
            timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
          }
        ]);
      }, 700);
      return;
    }

    // Lead gathering flow
    if (collectingLead) {
      if (leadStep === "name") {
        setLeadData((prev) => ({ ...prev, nama: chatText }));
        setLeadStep("email");
        setMessages((prev) => [
          ...prev,
          {
            id: "lead-email",
            role: "assistant",
            content: `Salam kenal, Kak ${chatText}! Selanjutnya, mohon masukkan **alamat email** aktif Anda agar kami bisa mengirimkan proposal/penawaran.`,
            timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
          }
        ]);
      } else if (leadStep === "email") {
        if (!chatText.includes("@")) {
          setMessages((prev) => [
            ...prev,
            {
              id: "lead-email-invalid",
              role: "assistant",
              content: "Mohon masukkan format email yang valid (contoh: nama@perusahaan.com) agar penawaran bisa terkirim dengan aman.",
              timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
            }
          ]);
          return;
        }
        setLeadData((prev) => ({ ...prev, email: chatText }));
        setLeadStep("service");
        setMessages((prev) => [
          ...prev,
          {
            id: "lead-service",
            role: "assistant",
            content: "Email Anda telah kami catat. Apa **jenis layanan** yang sedang Anda cari? (contoh: Website Company Profile, Toko Online, Aplikasi Android, ERP/CRM Custom, AI Automation)",
            timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
          }
        ]);
      } else if (leadStep === "service") {
        setLeadData((prev) => ({ ...prev, layanan: chatText }));
        setLeadStep("done");
        
        // Save lead info
        onAddLead({
          nama: leadData.nama,
          email: leadData.email,
          phone: "08123456789 (AI Chatbot)",
          layanan: chatText,
          budget: leadData.budget,
          deskripsi: `Prospek dari chatbot asisten. Menanyakan layanan: ${chatText}`
        });

        setCollectingLead(false);
        setMessages((prev) => [
          ...prev,
          {
            id: "lead-finish",
            role: "assistant",
            content: `Terima kasih banyak, Kak ${leadData.nama}! Data prospek konsultasi Anda sudah tersimpan dengan aman ke dalam CRM kami. Tim Sales Executive kami akan menghubungi Anda di email **${leadData.email}** dalam waktu kurang dari 24 jam kerja.

Apakah ada hal teknis lain yang ingin Anda konsultasikan dengan AI kami saat ini?`,
            timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
          }
        ]);
      }
      return;
    }

    // Standard Gemini/AI query with fallback
    setIsLoading(true);
    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          context: { currentPage: activeTab }
        }),
      });

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-ai",
          role: "assistant",
          content: data.reply || "Mohon maaf, terjadi gangguan koneksi ke server AI kami.",
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-err",
          role: "assistant",
          content: "Mohon maaf, sistem asisten AI sedang sibuk. Silakan isi form di halaman Kontak atau coba lagi beberapa saat lagi.",
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        id="ai-chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 scale-100 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Tanya AI Assistant"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        {!isOpen && (
          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 text-[9px] text-white font-bold items-center justify-center">AI</span>
          </span>
        )}
      </button>

      {/* Chat Window Container */}
      {isOpen && (
        <div
          id="ai-chatbot-window"
          className="fixed bottom-24 right-6 z-40 w-[380px] sm:w-[420px] h-[550px] rounded-2xl bg-white shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-slide-up"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center shadow-inner">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm">RRPRO AI Consultant</h3>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
                  Online - Gemini 3.5 Active
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Info bar */}
          <div className="bg-slate-50 border-b border-slate-100 py-1.5 px-3 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1 font-medium">
            <Sparkles className="h-3 w-3 text-cyan-600" />
            <span>Ketik <strong>&quot;pesan website&quot;</strong> untuk memulai asisten lead!</span>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                
                {m.role !== "user" && (
                  <div className="h-7 w-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 mt-1 border border-indigo-100">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-xs shadow-xs ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-white text-slate-800 border border-slate-100 rounded-tl-none leading-relaxed"
                }`}>
                  <div className="whitespace-pre-line font-normal">{m.content}</div>
                  <span className={`block text-[8px] mt-1 text-right ${m.role === "user" ? "text-indigo-200" : "text-slate-400"}`}>
                    {m.timestamp}
                  </span>
                </div>

                {m.role === "user" && (
                  <div className="h-7 w-7 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 mt-1">
                    <UserIcon className="h-4 w-4" />
                  </div>
                )}

              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="h-7 w-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 text-indigo-600 animate-spin" />
                  <span className="text-[11px] text-slate-500 font-medium">RRPRO AI sedang mengetik...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggestions Pill */}
          {!collectingLead && messages.length <= 2 && (
            <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
              <button
                onClick={() => handleSuggestionClick("Berapa estimasi biaya bikin website company profile?")}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[10px] text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-all font-medium cursor-pointer"
              >
                💰 Biaya Pembuatan Website?
              </button>
              <button
                onClick={() => handleSuggestionClick("Saya mau pesan website kustom ERP")}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[10px] text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-all font-medium cursor-pointer"
              >
                🚀 Mau Pesan ERP/CRM
              </button>
              <button
                onClick={() => handleSuggestionClick("Apakah dapet source code penuh?")}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[10px] text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-all font-medium cursor-pointer"
              >
                📂 Dapat Source Code?
              </button>
            </div>
          )}

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-slate-100 bg-white flex items-center gap-2"
          >
            <input
              type="text"
              id="ai-chat-input-field"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={collectingLead ? "Masukkan jawaban Anda..." : "Tanyakan tentang harga, sistem, atau teknologi..."}
              className="flex-1 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:outline-none rounded-xl px-3 py-2 text-xs transition-all"
            />
            <button
              type="submit"
              id="ai-chat-send-btn"
              disabled={isLoading || !input.trim()}
              className="h-8 w-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white flex items-center justify-center shadow-sm hover:shadow transition-all shrink-0 cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
