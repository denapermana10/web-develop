import { Service, Portfolio, Testimonial, Blog, BlogCategory } from "./types";

export const SEED_SERVICES: Service[] = [
  {
    id: "s1",
    nama: "Website Company Profile",
    slug: "website-company-profile",
    harga: 1500000,
    icon: "Globe",
    deskripsi: "Website representasi digital profesional dengan desain kustom, performa super cepat, dan optimasi SEO premium untuk meningkatkan kredibilitas perusahaan Anda."
  },
  {
    id: "s2",
    nama: "Website E-Commerce (Toko Online)",
    slug: "ecommerce",
    harga: 2500000,
    icon: "ShoppingBag",
    deskripsi: "Platform e-commerce lengkap dengan integrasi payment gateway (Midtrans/Xendit), kalkulator ongkir otomatis (RajaOngkir), dan dashboard manajemen stok."
  },
  {
    id: "s3",
    nama: "Aplikasi Web Kustom (ERP & CRM)",
    slug: "custom-web-app",
    harga: 5000000,
    icon: "Cpu",
    deskripsi: "Sistem internal terpadu untuk mengelola CRM, POS, HRM, Inventory, hingga modul akuntansi guna meningkatkan efisiensi operasional bisnis Anda secara digital."
  },
  {
    id: "s4",
    nama: "Aplikasi Android & iOS",
    slug: "mobile-app",
    harga: 5000000,
    icon: "Smartphone",
    deskripsi: "Aplikasi mobile performa tinggi berbasis Flutter/React Native, lengkap dengan push notifications, offline-first capabilities, dan UI/UX modern."
  },
  {
    id: "s5",
    nama: "AI Automation & Chatbot",
    slug: "ai-automation",
    harga: 5000000,
    icon: "Sparkles",
    deskripsi: "Integrasi kecerdasan buatan (Gemini/OpenAI API) untuk otomatisasi customer service, analisis dokumen otomatis, dan generator proposal cerdas."
  },
  {
    id: "s6",
    nama: "UI/UX Design & Prototyping",
    slug: "ui-ux-design",
    harga: 2000000,
    icon: "Palette",
    deskripsi: "Riset pengguna komprehensif, wireframing, high-fidelity UI design, dan prototype interaktif menggunakan Figma sebelum masuk ke tahap pengembangan."
  }
];

export const SEED_PORTFOLIO: Portfolio[] = [
  {
    id: "p1",
    title: "Sistem Informasi Manajemen Rumah Sakit (ERP-Med)",
    category: "ERP",
    client: "Medika Group Indonesia",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=400&q=80",
    description: "Sistem ERP terintegrasi untuk pendaftaran pasien online, rekam medis elektronik (RME), manajemen obat/apotek, serta integrasi jaminan kesehatan nasional BPJS.",
    tech: ["Next.js", "Express.js", "PostgreSQL", "Tailwind CSS", "D3.js"],
    year: 2025,
    duration: "16 Minggu"
  },
  {
    id: "p2",
    title: "Aplikasi Logistik & Delivery Tracking",
    category: "Android",
    client: "TransCargo Logistics",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&h=400&q=80",
    description: "Aplikasi mobile hybrid untuk driver pengiriman, lengkap dengan optimasi rute via Google Maps, real-time geolocation tracking, dan tanda tangan digital bukti terima.",
    tech: ["React Native", "Node.js", "Firebase", "TypeScript", "Google Maps API"],
    year: 2024,
    duration: "10 Minggu"
  },
  {
    id: "p3",
    title: "Portal E-Procurement B2B",
    category: "Website",
    client: "Nusantara Manufaktur PT",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400&q=80",
    description: "Portal pengadaan barang digital berskala korporasi dengan fitur multi-vendor bidding, sistem approval bertingkat, dan pembuatan kontrak otomatis.",
    tech: ["Next.js", "Supabase", "Tailwind CSS", "PDFKit", "Xendit Payment"],
    year: 2025,
    duration: "12 Minggu"
  },
  {
    id: "p4",
    title: "Sistem CRM Otomatisasi Sales & Pipeline",
    category: "CRM",
    client: "Astra Rent Car",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&h=400&q=80",
    description: "Dasbor CRM interaktif untuk melacak prospek sewa kendaraan, follow-up otomatis WhatsApp, integrasi email marketing, serta analisis kepuasan pelanggan secara real-time.",
    tech: ["React.js", "NestJS", "MongoDB", "Recharts", "WhatsApp Business API"],
    year: 2025,
    duration: "8 Minggu"
  },
  {
    id: "p5",
    title: "Aplikasi POS Kasir & Multi-Outlet",
    category: "Custom",
    client: "Kopi Kenangan Senja",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&h=400&q=80",
    description: "Aplikasi Point of Sale offline-first untuk outlet kuliner skala besar, terintegrasi dengan printer kasir Bluetooth, QRIS pembayaran dinamis, dan cloud inventory analytics.",
    tech: ["Flutter Web", "SQLite", "Firebase Auth", "Tailwind CSS", "QRIS API"],
    year: 2024,
    duration: "12 Minggu"
  }
];

export const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    nama: "Budi Santoso",
    jabatan: "Chief Technology Officer",
    perusahaan: "Medika Group Indonesia",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    review: "RRPRO Digital Solution berhasil mendeploy sistem ERP-Med kami tepat waktu. Komunikasi sangat profesional, dan kualitas penulisan kodenya bersih serta mudah diskalakan."
  },
  {
    id: "t2",
    nama: "Diana Lestari",
    jabatan: "Founder & CEO",
    perusahaan: "Kenangan Senja Group",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    review: "Sistem POS Multi-Outlet yang mereka bangun mengubah cara kami mengontrol stok harian. Sangat merekomendasikan jasa kustomisasi web & app dari tim RRPRO!"
  },
  {
    id: "t3",
    nama: "Ferry Hermawan",
    jabatan: "Operations Manager",
    perusahaan: "TransCargo Logistics",
    foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    review: "Aplikasi delivery tracking yang kami pesan memangkas durasi pelaporan kurir hingga 50%. Pelayanan ramah, responsif, dan maintenance bulanan mereka sangat memuaskan."
  }
];

export const SEED_BLOGS: Blog[] = [
  {
    id: "b1",
    category: "Teknologi",
    title: "Mengapa Next.js 15 Adalah Pilihan Utama untuk Website Perusahaan Modern",
    slug: "nextjs-15-pilihan-website-perusahaan",
    image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&h=400&q=80",
    content: `Dalam era digital saat ini, kecepatan pemuatan halaman dan optimasi Search Engine (SEO) merupakan kunci utama untuk menarik calon pelanggan. Next.js 15 hadir dengan membawa terobosan besar dalam teknik rendering:

### 1. Server Components secara Default
Dengan React Server Components (RSC), mayoritas halaman website Anda dirender di server sebelum dikirim ke browser client. Hal ini mengurangi beban javascript di sisi client secara drastis, sehingga website terasa sangat responsif bahkan pada jaringan seluler 3G/4G.

### 2. Kecepatan LCP < 1.5 Detik
Teknologi incremental static regeneration (ISR) dan optimasi gambar bawaan membuat performa Core Web Vitals Anda dijamin mendapat skor hijau pekat (LCP di bawah 1.5 detik), meningkatkan skor SEO Google secara signifikan.

### 3. Keamanan Tingkat Tinggi
Semua query database dan pemanggilan API pihak ketiga diproses di sisi server (Server-Side), menyembunyikan API key sensitif dari inspect element browser, sehingga website Anda aman dari injeksi script berbahaya.

RRPRO selalu mengadopsi standar Next.js terbaru untuk menjamin website Anda beroperasi dengan performa puncak dan proteksi keamanan maksimal.`,
    date: "24 Juni 2026",
    tags: ["Next.js", "Web Development", "SEO", "Teknologi"]
  },
  {
    id: "b2",
    category: "Bisnis",
    title: "Bagaimana Sistem ERP Kustom Membantu UMKM Naik Kelas ke Skala Industri",
    slug: "erp-kustom-umkm-naik-kelas",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=400&q=80",
    content: `Banyak pemilik usaha yang beranggapan bahwa sistem Enterprise Resource Planning (ERP) hanya ditujukan bagi korporasi multinasional dengan budget miliaran rupiah. Padahal, sistem ERP kustom justru menjadi akselerator terkuat bagi UMKM untuk berkembang:

### Mengapa ERP Kustom Lebih Baik daripada Software Jadi (SaaS SaaS Instan)?
SaaS siap pakai seringkali membebankan biaya per-user bulanan yang mahal, serta memaksa Anda mengadaptasi proses bisnis yang kaku. Dengan ERP Kustom:
1. **Fitur Menyesuaikan Bisnis Anda**: Hanya bangun apa yang Anda butuhkan (CRM, POS, stok, atau payroll), tanpa membayar fitur mubazir.
2. **Sekali Bayar & Kepemilikan Penuh**: Menghilangkan biaya lisensi langganan bulanan selamanya.
3. **Analisis Terpusat**: Seluruh data transaksi, penjualan, dan stok terekam dalam satu database terpusat, mempermudah pembuatan keputusan berbasis data nyata.

Membangun fondasi digital yang kuat sejak dini adalah investasi terbaik demi menjaga keberlanjutan bisnis jangka panjang.`,
    date: "12 Juni 2026",
    tags: ["ERP", "UMKM", "Efisiensi", "Bisnis"]
  },
  {
    id: "b3",
    category: "Desain",
    title: "Pentingnya UI/UX yang Intuitif dalam Menurunkan Bounce Rate Landing Page",
    slug: "pentingnya-ui-ux-landing-page",
    image: "https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=600&h=400&q=80",
    content: `Desain yang menarik mata memang penting, namun desain yang mampu membimbing psikologi pengunjung untuk melakukan tindakan (konversi) adalah segalanya dalam dunia digital marketing.

### 1. Pola F-Layout dan Z-Layout
Mata manusia membaca konten digital dengan pola tertentu. Menempatkan Value Proposition (nilai jual utama) dan tombol CTA (Call to Action) yang kontras di persimpangan pola F atau Z ini terbukti menaikkan klik penawaran hingga 34%.

### 2. Loading Visual skeleton
Menampilkan kerangka halaman (skeleton) saat data diproses memberikan kenyamanan psikologis bagi pengunjung, menjaga agar mereka tidak buru-buru menutup tab browser (bounce rate rendah).

### 3. Touch Target Ramah Mobile
Setiap tombol interaktif di perangkat mobile harus didesain minimal berukuran 44x44px dengan sela yang cukup guna menghindari salah klik yang mengesalkan pengguna.

Di RRPRO, fase riset UI/UX Figma merupakan pilar awal yang kami kerjakan secara detail sebelum baris kode pertama ditulis.`,
    date: "05 Juni 2026",
    tags: ["UI/UX", "Desain", "Conversion", "Landing Page"]
  }
];

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: "c1", nama: "Semua" },
  { id: "c2", nama: "Teknologi" },
  { id: "c3", nama: "Bisnis" },
  { id: "c4", nama: "Desain" }
];

export const FAQS = [
  {
    q: "Berapa lama waktu pengerjaan untuk satu proyek website atau aplikasi?",
    a: "Durasi proyek sangat bervariasi tergantung pada kompleksitas fitur. Website Landing Page / Company Profile umumnya memakan waktu 1-3 minggu. Toko Online 3-5 minggu, sedangkan Aplikasi Web kustom (ERP/CRM) atau Aplikasi Mobile Android berkisar antara 8-16 minggu."
  },
  {
    q: "Apakah biaya pembuatan bersifat sekali bayar atau harus berlangganan?",
    a: "RRPRO menerapkan sistem One-Time Payment (Sekali Bayar) untuk lisensi kode aplikasi kustom Anda. Tidak ada biaya langganan software bulanan yang mengikat. Anda hanya perlu membayar perpanjangan tahunan untuk sewa domain dan hosting/cloud VPS."
  },
  {
    q: "Apakah saya akan mendapatkan source code penuh dari aplikasi yang dibuat?",
    a: "Ya, 100%! Setelah proyek selesai dideploy dan dilunasi, kami akan menyerahkan hak kepemilikan source code penuh kepada Anda lewat repositori GitHub pribadi, termasuk dokumentasi instalasi lengkap."
  },
  {
    q: "Bagaimana dengan jaminan keamanan data dan layanan pemeliharaan (maintenance)?",
    a: "Kami menyediakan garansi bebas bug (Bug Guarantee) gratis selama 6 bulan pertama setelah rilis. Untuk aplikasi skala enterprise, kami juga menawarkan paket Maintenance bulanan yang mencakup server backup otomatis, update patch keamanan, pemantauan uptime, dan support instan via WhatsApp Group."
  },
  {
    q: "Apakah RRPRO bersedia menandatangani perjanjian kerahasiaan NDA?",
    a: "Tentu saja. Kami sangat menghargai inovasi dan kerahasiaan hak kekayaan intelektual (IP) ide bisnis Anda. Kami siap menandatangani Perjanjian Non-Disclosure Agreement (NDA) sebelum pembahasan teknis proyek dimulai."
  }
];
