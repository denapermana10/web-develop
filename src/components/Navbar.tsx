import React, { useState } from "react";
import { Menu, X, Laptop, UserCheck, ShieldAlert, Lock, AlertCircle } from "lucide-react";
import { User } from "../types";
import { RRProLogo } from "./RRProLogo";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
}

export default function Navbar({ activeTab, setActiveTab, currentUser, setCurrentUser }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  // Admin password authentication states
  const [showPassModal, setShowPassModal] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [passError, setPassError] = useState("");
  const [pendingRole, setPendingRole] = useState<User["role"] | null>(null);

  const roles: User["role"][] = ["Visitor", "Customer", "Sales", "Admin"];

  const handleRoleChange = (role: User["role"]) => {
    if (role === "Admin") {
      setPendingRole(role);
      setPassInput("");
      setPassError("");
      setShowPassModal(true);
      setShowRoleSelector(false);
    } else {
      executeRoleChange(role);
    }
  };

  const executeRoleChange = (role: User["role"]) => {
    let email = "guest@example.com";
    let fullname = "Tamu RRPRO";

    if (role === "Customer") {
      email = "denapermana151690@gmail.com";
      fullname = "Dena Permana (Klien)";
    } else if (role === "Sales") {
      email = "sales.rrpro@gmail.com";
      fullname = "Rizky (Sales Executive)";
    } else if (role === "Admin" || role === "Super Admin") {
      email = "admin.rrpro@gmail.com";
      fullname = "Reza (Super Admin)";
    }

    setCurrentUser({
      id: role.toLowerCase() + "-123",
      fullname,
      email,
      role
    });
    
    setShowRoleSelector(false);
    
    // Auto shift view based on selected role
    if (role === "Customer") {
      setActiveTab("client-area");
    } else if (role === "Sales" || role === "Admin") {
      setActiveTab("admin-dashboard");
    } else {
      setActiveTab("home");
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passInput === "Bandung123@") {
      setShowPassModal(false);
      if (pendingRole) {
        executeRoleChange(pendingRole);
        setPendingRole(null);
      }
    } else {
      setPassError("Password salah! Silakan coba lagi.");
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "tentang", label: "Tentang Kami" },
    { id: "layanan", label: "Layanan" },
    { id: "portfolio", label: "Portofolio" },
    { id: "harga", label: "Harga" },
    { id: "blog", label: "Blog" },
    { id: "faq", label: "FAQ" },
    { id: "kontak", label: "Kontak" }
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab("home")}>
            <RRProLogo className="h-10 w-10 flex-shrink-0" theme="light" />
            <div>
              <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                RRPRO
              </span>
              <span className="block text-[10px] font-mono tracking-wider uppercase text-cyan-600 -mt-1 font-semibold">
                Digital Solution
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-slate-50 text-indigo-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Role Switching Badge & Client Area CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Simulator Switcher */}
            <div className="relative">
              <button
                id="role-switcher-btn"
                onClick={() => setShowRoleSelector(!showRoleSelector)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors text-xs text-slate-700 font-semibold cursor-pointer"
              >
                <UserCheck className="h-3.5 w-3.5 text-cyan-600" />
                <span>Simulasi: <strong className="text-cyan-700">{currentUser.role}</strong></span>
              </button>

              {showRoleSelector && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-slate-100 shadow-xl ring-1 ring-black/5 py-1.5 z-50 animate-fade-in">
                  <div className="px-3 py-1 border-b border-slate-100 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">
                    Ganti Role Pengguna
                  </div>
                  {roles.map((r) => (
                    <button
                      key={r}
                      id={`role-opt-${r}`}
                      onClick={() => handleRoleChange(r)}
                      className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between transition-colors ${
                        currentUser.role === r
                          ? "bg-indigo-50 text-indigo-700 font-semibold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span>{r}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {r === "Visitor" && "Hanya Lihat"}
                        {r === "Customer" && "Portal Klien"}
                        {r === "Sales" && "CRM Leads"}
                        {r === "Admin" && "Akses Penuh"}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Client Area and Admin Portals */}
            {currentUser.role === "Visitor" ? (
              <button
                id="nav-client-login"
                onClick={() => handleRoleChange("Customer")}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-850 hover:to-slate-750 text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer"
              >
                Client Area
              </button>
            ) : currentUser.role === "Customer" ? (
              <button
                id="nav-client-portal"
                onClick={() => setActiveTab("client-area")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all duration-150 cursor-pointer ${
                  activeTab === "client-area"
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                }`}
              >
                Portal Klien
              </button>
            ) : (
              <button
                id="nav-admin-portal"
                onClick={() => setActiveTab("admin-dashboard")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "admin-dashboard"
                    ? "bg-cyan-600 text-white"
                    : "bg-cyan-50 text-cyan-700 hover:bg-cyan-100"
                }`}
              >
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Dashboard {currentUser.role}</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setShowRoleSelector(!showRoleSelector)}
              className="px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-semibold text-slate-700"
            >
              Role: {currentUser.role}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-2 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-slate-50 text-indigo-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="pt-4 pb-2 border-t border-slate-100 px-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
              Beralih Simulasi Role
            </div>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    handleRoleChange(r);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    currentUser.role === r
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick alert bar for simulasi to guide users */}
      <div className="bg-slate-900 text-slate-300 py-1 px-4 text-center text-[11px] font-mono flex items-center justify-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Simulasi Multi-Role Aktif: Anda bisa berpindah antara <strong>Visitor, Customer, Sales, dan Admin</strong> kapan saja untuk mencoba seluruh fitur!</span>
      </div>

      {/* Password Modal for Admin */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-scale-up space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="h-10 w-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-150">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-950 text-sm">Autentikasi Admin</h4>
                <p className="text-[10px] text-slate-400">Silakan masukkan password rahasia Admin</p>
              </div>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-1 uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Password Admin"
                  value={passInput}
                  onChange={(e) => setPassInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs transition-all animate-none"
                  autoFocus
                />
              </div>

              {passError && (
                <div className="text-[10px] text-rose-600 font-semibold flex items-center gap-1.5 bg-rose-50 border border-rose-100 rounded-lg p-2 animate-pulse">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>{passError}</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPassModal(false);
                    setPendingRole(null);
                  }}
                  className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-600 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow cursor-pointer"
                >
                  Masuk Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}
