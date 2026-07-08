import React, { useState } from "react";
import { Portfolio, Service } from "../types";
import { X, Play, Pause, Smartphone, Laptop, CheckCircle, ArrowRight, Code, Calendar, Tag, ShieldAlert } from "lucide-react";

interface AIPortfolioDetailProps {
  project: Portfolio;
  onClose: () => void;
  onSelectService: (serviceSlug: string) => void;
}

export default function AIPortfolioDetail({ project, onClose, onSelectService }: AIPortfolioDetailProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(35); // simulated percent

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Map portfolio categories to relevant service links for the CTA
  const getRelevantServiceSlug = (category: string) => {
    switch (category) {
      case "Website": return "website-company-profile";
      case "Android": return "mobile-app";
      case "ERP": return "custom-web-app";
      case "CRM": return "custom-web-app";
      default: return "website-company-profile";
    }
  };

  const serviceSlug = getRelevantServiceSlug(project.category);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col md:flex-row max-h-[90vh] animate-scale-up">
        
        {/* Left: Video / Image Interactive Panel */}
        <div className="md:w-1/2 bg-slate-950 flex flex-col justify-between relative overflow-hidden h-[300px] md:h-auto">
          {/* Main Visual or Video Walkthrough Player */}
          {isPlaying ? (
            <div className="absolute inset-0 flex flex-col justify-between p-4 bg-slate-950">
              {/* Simulated Mobile/Web App Wireframe running inside the video player */}
              <div className="flex-1 flex items-center justify-center">
                <div className={`border-4 border-slate-800 bg-slate-900 rounded-2xl shadow-2xl p-3 flex flex-col ${project.category === "Android" ? "h-48 w-28" : "h-36 w-64"}`}>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-1.5">
                    <span className="text-[7px] text-slate-500 font-mono">11:42 AM</span>
                    <span className="text-[7px] bg-indigo-500 text-white font-semibold px-1 rounded-sm uppercase tracking-wider scale-90">Demo Live</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5 justify-center">
                    <div className="h-2 w-full bg-slate-800 rounded animate-pulse" />
                    <div className="h-2 w-2/3 bg-slate-800 rounded animate-pulse" />
                    <div className="flex gap-1">
                      <div className="h-4 w-4 rounded-full bg-cyan-500 animate-bounce" />
                      <div className="h-4 w-4 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="h-4 w-4 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                  <div className="h-1.5 w-1/3 bg-slate-800 rounded-full mx-auto mt-2" />
                </div>
              </div>

              {/* Progress and controls */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono">
                  <span>Simulasi Walkthrough</span>
                  <span>0:42 / 2:15</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full w-[42%] animate-pulse" />
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }}>
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] flex flex-col justify-between p-4">
                <span className="text-[10px] font-mono tracking-wider bg-slate-900/80 text-cyan-400 px-2.5 py-1 rounded-full w-fit font-bold border border-slate-800">
                  {project.category} PROJECT
                </span>
                <div className="flex justify-center items-center flex-1">
                  <button
                    onClick={handlePlayPause}
                    className="h-14 w-14 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="h-6 w-6 ml-1 stroke-[3]" />
                  </button>
                </div>
                <p className="text-[10px] text-center text-slate-300 font-medium">Klik untuk menonton Demo Video Walkthrough</p>
              </div>
            </div>
          )}

          {/* Controls overlay overlay */}
          <div className="absolute bottom-4 right-4 z-10">
            <button
              onClick={handlePlayPause}
              className="p-2 rounded-lg bg-slate-900/80 text-white hover:bg-slate-900 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Right: Project Details & Context */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold text-cyan-600 uppercase tracking-widest">{project.category} Project</span>
                <h3 className="font-display font-bold text-slate-950 text-xl md:text-2xl mt-1 leading-tight">{project.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mt-4 leading-relaxed font-normal">{project.description}</p>

            {/* Meta details list */}
            <div className="grid grid-cols-2 gap-4 mt-6 border-t border-slate-100 pt-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Klien</span>
                <span className="text-xs font-semibold text-slate-800">{project.client}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tahun</span>
                <span className="text-xs font-semibold text-slate-800">{project.year}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Durasi Proyek</span>
                <span className="text-xs font-semibold text-slate-800">{project.duration}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Metodologi</span>
                <span className="text-xs font-semibold text-slate-800">Agile Scrum / MVP</span>
              </div>
            </div>

            {/* Tech stack badges */}
            <div className="mt-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Teknologi Terintegrasi</span>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-700 text-[10px] font-semibold rounded-lg flex items-center gap-1">
                    <Code className="h-3 w-3 text-cyan-600" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTA Block */}
          <div className="mt-8 border-t border-slate-100 pt-5">
            <div className="p-3 bg-gradient-to-tr from-slate-50 to-indigo-50/20 border border-indigo-100/30 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Ingin Solusi Seperti Ini?</span>
                <span className="text-[11px] font-medium text-slate-700 block">Dapatkan konsultasi gratis &amp; sketsa rancangan.</span>
              </div>
              <button
                onClick={() => {
                  onSelectService(serviceSlug);
                  onClose();
                }}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm hover:shadow transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Pesan Jasa</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
