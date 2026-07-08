-- ============================================================================
-- SUPABASE POSTGRESQL SCHEMA & INITIAL SEED DATA
-- Aplikasi: RRPRO Digital Solution CRM & Master Console
-- Tanggal: 8 Juli 2026
-- Deskripsi: Skrip SQL lengkap untuk membuat tabel, tipe enum, indeks, 
--            Row Level Security (RLS), serta pre-populate data awal (Seeding)
--            sesuai dengan harga terbaru dari penyesuaian layanan bisnis.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. PEMBERSIHAN TABEL SEBELUMNYA (Jika Ingin Reset Ulang)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS invoices CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS blog_categories CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS portfolios CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Hapus tipe enum jika sudah ada (untuk re-run bersih)
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS portfolio_category CASCADE;
DROP TYPE IF EXISTS lead_status CASCADE;
DROP TYPE IF EXISTS invoice_status CASCADE;
DROP TYPE IF EXISTS project_status CASCADE;
DROP TYPE IF EXISTS ticket_status CASCADE;
DROP TYPE IF EXISTS ticket_priority CASCADE;


-- ----------------------------------------------------------------------------
-- 2. PEMBUATAN ENUM TYPE UNTUK INTEGRITAS DATA (TYPE SAFETY)
-- ----------------------------------------------------------------------------
CREATE TYPE user_role AS ENUM ('Visitor', 'Customer', 'Sales', 'Admin', 'Super Admin');
CREATE TYPE portfolio_category AS ENUM ('Website', 'Android', 'ERP', 'CRM', 'Custom');
CREATE TYPE lead_status AS ENUM ('Lead Baru', 'Follow Up', 'Meeting', 'Quotation', 'Deal', 'Lost');
CREATE TYPE invoice_status AS ENUM ('Paid', 'Unpaid', 'Overdue');
CREATE TYPE project_status AS ENUM ('Requirement Gathering', 'Designing', 'Developing', 'Testing', 'Deployed');
CREATE TYPE ticket_status AS ENUM ('Open', 'In Progress', 'Resolved');
CREATE TYPE ticket_priority AS ENUM ('Low', 'Medium', 'High');


-- ----------------------------------------------------------------------------
-- 3. SKEMA TABEL-TABEL UTAMA
-- ----------------------------------------------------------------------------

-- A. Tabel Pengguna (Users) - Terintegrasi dengan auth.users milik Supabase
CREATE TABLE users (
    id TEXT PRIMARY KEY, -- UID dari Supabase Auth
    fullname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'Visitor',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- B. Tabel Jasa Layanan (Services) - Penentu Harga Master
CREATE TABLE services (
    id TEXT PRIMARY KEY DEFAULT 'ser-' || encode(gen_random_bytes(6), 'hex'),
    nama TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    harga NUMERIC NOT NULL CHECK (harga >= 0),
    icon TEXT NOT NULL DEFAULT 'Globe',
    deskripsi TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- C. Tabel Portofolio Karya (Portfolios)
CREATE TABLE portfolios (
    id TEXT PRIMARY KEY DEFAULT 'port-' || encode(gen_random_bytes(6), 'hex'),
    title TEXT NOT NULL,
    category portfolio_category NOT NULL DEFAULT 'Website',
    client TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    tech TEXT[] NOT NULL, -- Array teknologi (e.g. ['React', 'PostgreSQL'])
    year INTEGER NOT NULL,
    duration TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- D. Tabel Testimoni Klien (Testimonials)
CREATE TABLE testimonials (
    id TEXT PRIMARY KEY DEFAULT 'test-' || encode(gen_random_bytes(6), 'hex'),
    nama TEXT NOT NULL,
    jabatan TEXT NOT NULL,
    perusahaan TEXT NOT NULL,
    foto TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- E. Tabel Kategori Artikel (Blog Categories)
CREATE TABLE blog_categories (
    id TEXT PRIMARY KEY DEFAULT 'cat-' || encode(gen_random_bytes(6), 'hex'),
    nama TEXT UNIQUE NOT NULL
);

-- F. Tabel Artikel (Blogs)
CREATE TABLE blogs (
    id TEXT PRIMARY KEY DEFAULT 'blog-' || encode(gen_random_bytes(6), 'hex'),
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    image TEXT NOT NULL,
    content TEXT NOT NULL,
    date TEXT NOT NULL,
    tags TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- G. Tabel Prospek Konsultasi (Leads / Pipeline CRM)
CREATE TABLE leads (
    id TEXT PRIMARY KEY DEFAULT 'lead-' || encode(gen_random_bytes(6), 'hex'),
    nama TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    layanan TEXT NOT NULL,
    budget NUMERIC NOT NULL CHECK (budget >= 0),
    status lead_status NOT NULL DEFAULT 'Lead Baru',
    deadline DATE,
    deskripsi TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- H. Tabel Faktur Pembayaran (Invoices)
CREATE TABLE invoices (
    id TEXT PRIMARY KEY DEFAULT 'INV-' || encode(gen_random_bytes(4), 'hex'),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    service_name TEXT NOT NULL,
    total NUMERIC NOT NULL CHECK (total >= 0),
    status invoice_status NOT NULL DEFAULT 'Unpaid',
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- I. Tabel Proyek Klien Aktif (Projects Track)
CREATE TABLE projects (
    id TEXT PRIMARY KEY DEFAULT 'PROJ-' || encode(gen_random_bytes(4), 'hex'),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    project_name TEXT NOT NULL,
    progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100) DEFAULT 0,
    status project_status NOT NULL DEFAULT 'Requirement Gathering',
    deadline DATE NOT NULL,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- J. Tabel Tiket Kendala Teknis (Tickets Support)
CREATE TABLE tickets (
    id TEXT PRIMARY KEY DEFAULT 'TCK-' || encode(gen_random_bytes(4), 'hex'),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    status ticket_status NOT NULL DEFAULT 'Open',
    priority ticket_priority NOT NULL DEFAULT 'Medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- K. Tabel Riwayat Chatbot (Chat Messages Log)
CREATE TABLE chat_messages (
    id TEXT PRIMARY KEY DEFAULT 'chat-' || encode(gen_random_bytes(6), 'hex'),
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- ----------------------------------------------------------------------------
-- 4. PEMBUATAN INDEKS OPTIMASI UNTUK PERFORMA KONTEN & CRM
-- ----------------------------------------------------------------------------
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_portfolios_category ON portfolios(category);
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_invoices_customer ON invoices(customer_email);
CREATE INDEX idx_projects_customer ON projects(customer_email);
CREATE INDEX idx_tickets_customer ON tickets(customer_email);


-- ----------------------------------------------------------------------------
-- 5. PENGISIAN DATA SEEDING AWAL (SEED INITIAL DATA)
-- ----------------------------------------------------------------------------

-- A. Data Layanan (Services) - Sesuai dengan Update Harga Terbaru Anda
INSERT INTO services (id, nama, slug, harga, icon, deskripsi) VALUES
('s1', 'Website Company Profile', 'website-company-profile', 1500000, 'Globe', 'Website representasi digital profesional dengan desain kustom, performa super cepat, dan optimasi SEO premium untuk meningkatkan kredibilitas perusahaan Anda.'),
('s2', 'Website E-Commerce (Toko Online)', 'ecommerce', 2500000, 'ShoppingBag', 'Platform e-commerce lengkap dengan integrasi payment gateway (Midtrans/Xendit), kalkulator ongkir otomatis (RajaOngkir), dan dashboard manajemen stok.'),
('s3', 'Aplikasi Web Kustom (ERP & CRM)', 'custom-web-app', 5000000, 'Cpu', 'Sistem internal terpadu untuk mengelola CRM, POS, HRM, Inventory, hingga modul akuntansi guna meningkatkan efisiensi operasional bisnis Anda secara digital.'),
('s4', 'Aplikasi Android & iOS', 'mobile-app', 5000000, 'Smartphone', 'Aplikasi mobile performa tinggi berbasis Flutter/React Native, lengkap dengan push notifications, offline-first capabilities, dan UI/UX modern.'),
('s5', 'AI Automation & Chatbot', 'ai-automation', 5000000, 'Sparkles', 'Integrasi kecerdasan buatan (Gemini/OpenAI API) untuk otomatisasi customer service, analisis dokumen otomatis, dan generator proposal cerdas.'),
('s6', 'UI/UX Design & Prototyping', 'ui-ux-design', 2000000, 'Palette', 'Riset pengguna komprehensif, wireframing, high-fidelity UI design, dan prototype interaktif menggunakan Figma sebelum masuk ke tahap pengembangan.');

-- B. Data Portofolio (Portfolios)
INSERT INTO portfolios (id, title, category, client, image, description, tech, year, duration) VALUES
('p1', 'Sistem Informasi Manajemen Rumah Sakit (ERP-Med)', 'ERP', 'Medika Group Indonesia', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=400&q=80', 'Sistem ERP terintegrasi untuk pendaftaran pasien online, rekam medis elektronik (RME), manajemen obat/apotek, serta integrasi jaminan kesehatan nasional BPJS.', ARRAY['Next.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'D3.js'], 2025, '16 Minggu'),
('p2', 'Aplikasi Logistik & Delivery Tracking', 'Android', 'TransCargo Logistics', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&h=400&q=80', 'Aplikasi mobile hybrid untuk driver pengiriman, lengkap dengan optimasi rute via Google Maps, real-time geolocation tracking, dan tanda tangan digital bukti terima.', ARRAY['React Native', 'Node.js', 'Firebase', 'TypeScript', 'Google Maps API'], 2024, '10 Minggu'),
('p3', 'Portal E-Procurement B2B', 'Website', 'Nusantara Manufaktur PT', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400&q=80', 'Portal pengadaan barang digital berskala korporasi dengan fitur multi-vendor bidding, sistem approval bertingkat, dan pembuatan kontrak otomatis.', ARRAY['Next.js', 'Supabase', 'Tailwind CSS', 'PDFKit', 'Xendit Payment'], 2025, '12 Minggu'),
('p4', 'Sistem CRM Otomatisasi Sales & Pipeline', 'CRM', 'Astra Rent Car', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&h=400&q=80', 'Dasbor CRM interaktif untuk melacak prospek sewa kendaraan, follow-up otomatis WhatsApp, integrasi email marketing, serta analisis kepuasan pelanggan secara real-time.', ARRAY['React.js', 'NestJS', 'MongoDB', 'Recharts', 'WhatsApp Business API'], 2025, '8 Minggu'),
('p5', 'Aplikasi POS Kasir & Multi-Outlet', 'Custom', 'Kopi Kenangan Senja', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&h=400&q=80', 'Aplikasi Point of Sale offline-first untuk outlet kuliner skala besar, terintegrasi dengan printer kasir Bluetooth, QRIS pembayaran dinamis, dan cloud inventory analytics.', ARRAY['Flutter Web', 'SQLite', 'Firebase Auth', 'Tailwind CSS', 'QRIS API'], 2024, '12 Minggu');

-- C. Data Testimoni (Testimonials)
INSERT INTO testimonials (id, nama, jabatan, perusahaan, foto, rating, review) VALUES
('t1', 'Budi Santoso', 'Chief Technology Officer', 'Medika Group Indonesia', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80', 5, 'RRPRO Digital Solution berhasil mendeploy sistem ERP-Med kami tepat waktu. Komunikasi sangat profesional, dan kualitas penulisan kodenya bersih serta mudah diskalakan.'),
('t2', 'Diana Lestari', 'Founder & CEO', 'Kenangan Senja Group', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80', 5, 'Sistem POS Multi-Outlet yang mereka bangun mengubah cara kami mengontrol stok harian. Sangat merekomendasikan jasa kustomisasi web & app dari tim RRPRO!'),
('t3', 'Ferry Hermawan', 'Operations Manager', 'TransCargo Logistics', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80', 5, 'Aplikasi delivery tracking yang kami pesan memangkas durasi pelaporan kurir hingga 50%. Pelayanan ramah, responsif, dan maintenance bulanan mereka sangat memuaskan.');

-- D. Data Kategori Artikel (Blog Categories)
INSERT INTO blog_categories (id, nama) VALUES
('c1', 'Semua'),
('c2', 'Teknologi'),
('c3', 'Bisnis'),
('c4', 'Desain');

-- E. Data Artikel (Blogs)
INSERT INTO blogs (id, category, title, slug, image, content, date, tags) VALUES
('b1', 'Teknologi', 'Mengapa Next.js 15 Adalah Pilihan Utama untuk Website Perusahaan Modern', 'nextjs-15-pilihan-website-perusahaan', 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&h=400&q=80', 'Dalam era digital saat ini, kecepatan pemuatan halaman dan optimasi Search Engine (SEO) merupakan kunci utama untuk menarik calon pelanggan. Next.js 15 hadir dengan membawa terobosan besar dalam teknik rendering:

### 1. Server Components secara Default
Dengan React Server Components (RSC), mayoritas halaman website Anda dirender di server sebelum dikirim ke browser client. Hal ini mengurangi beban javascript di sisi client secara drastis, sehingga website terasa sangat responsif bahkan pada jaringan seluler 3G/4G.

### 2. Kecepatan LCP < 1.5 Detik
Teknologi incremental static regeneration (ISR) dan optimasi gambar bawaan membuat performa Core Web Vitals Anda dijamin mendapat skor hijau pekat (LCP di bawah 1.5 detik), meningkatkan skor SEO Google secara signifikan.

### 3. Keamanan Tingkat Tinggi
Semua query database dan pemanggilan API pihak ketiga diproses di sisi server (Server-Side), menyembunyikan API key sensitif dari inspect element browser, sehingga website Anda aman dari injeksi script berbahaya.

RRPRO selalu mengadopsi standar Next.js terbaru untuk menjamin website Anda beroperasi dengan performa puncak dan proteksi keamanan maksimal.', '24 Juni 2026', ARRAY['Next.js', 'Web Development', 'SEO', 'Teknologi']),

('b2', 'Bisnis', 'Bagaimana Sistem ERP Kustom Membantu UMKM Naik Kelas ke Skala Industri', 'erp-kustom-umkm-naik-kelas', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=400&q=80', 'Banyak pemilik usaha yang beranggapan bahwa sistem Enterprise Resource Planning (ERP) hanya ditujukan bagi korporasi multinasional dengan budget miliaran rupiah. Padahal, sistem ERP kustom justru menjadi akselerator terkuat bagi UMKM untuk berkembang:

### Mengapa ERP Kustom Lebih Baik daripada Software Jadi (SaaS SaaS Instan)?
SaaS siap pakai seringkali membebankan biaya per-user bulanan yang mahal, serta memaksa Anda mengadaptasi proses bisnis yang kaku. Dengan ERP Kustom:
1. **Fitur Menyesuaikan Bisnis Anda**: Hanya bangun apa yang Anda butuhkan (CRM, POS, stok, atau payroll), tanpa membayar fitur mubazir.
2. **Sekali Bayar & Kepemilikan Penuh**: Menghilangkan biaya lisensi langganan bulanan selamanya.
3. **Analisis Terpusat**: Seluruh data transaksi, penjualan, dan stok terekam dalam satu database terpusat, mempermudah pembuatan keputusan berbasis data nyata.

Membangun fondasi digital yang kuat sejak dini adalah investasi terbaik demi menjaga keberlanjutan bisnis jangka panjang.', '12 Juni 2026', ARRAY['ERP', 'UMKM', 'Efisiensi', 'Bisnis']),

('b3', 'Desain', 'Pentingnya UI/UX yang Intuitif dalam Menurunkan Bounce Rate Landing Page', 'pentingnya-ui-ux-landing-page', 'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=600&h=400&q=80', 'Desain yang menarik mata memang penting, namun desain yang mampu membimbing psikologi pengunjung untuk melakukan tindakan (konversi) adalah segalanya dalam dunia digital marketing.

### 1. Pola F-Layout dan Z-Layout
Mata manusia membaca konten digital dengan pola tertentu. Menempatkan Value Proposition (nilai jual utama) dan tombol CTA (Call to Action) yang kontras di persimpangan pola F atau Z ini terbukti menaikkan klik penawaran hingga 34%.

### 2. Loading Visual skeleton
Menampilkan kerangka halaman (skeleton) saat data diproses memberikan kenyamanan psikologis bagi pengunjung, menjaga agar mereka tidak buru-buru menutup tab browser (bounce rate rendah).

### 3. Touch Target Ramah Mobile
Setiap tombol interaktif di perangkat mobile harus didesain minimal berukuran 44x44px dengan sela yang cukup guna menghindari salah klik yang mengesalkan pengguna.

Di RRPRO, fase riset UI/UX Figma merupakan pilar awal yang kami kerjakan secara detail sebelum baris kode pertama ditulis.', '05 Juni 2026', ARRAY['UI/UX', 'Desain', 'Conversion', 'Landing Page']);

-- F. Prospek CRM Seeding awal
INSERT INTO leads (id, nama, email, phone, layanan, budget, status, deadline, deskripsi) VALUES
('lead-1', 'Ahmad Dani', 'ahmad.dani@example.com', '081299998888', 'Website Company Profile', 1500000, 'Lead Baru', '2026-08-15', 'Butuh landing page modern untuk agen travel umroh'),
('lead-2', 'Siti Rahma', 'siti@hijabstyle.co.id', '081377775555', 'Website E-Commerce (Toko Online)', 2500000, 'Follow Up', '2026-09-01', 'Migrasi toko online dari Shopify ke sistem kustom dengan integrasi RajaOngkir'),
('lead-3', 'PT Sukses Mandiri', 'procurement@suksesmandiri.com', '082155554444', 'Aplikasi Web Kustom (ERP & CRM)', 5000000, 'Meeting', '2026-10-30', 'Sistem inventaris multi-gudang dan monitoring logistik barang masuk');

-- G. Mock Invoices Seeding
INSERT INTO invoices (id, customer_name, customer_email, service_name, total, status, issue_date, due_date) VALUES
('INV-s1', 'Ahmad Dani', 'ahmad.dani@example.com', 'Website Company Profile', 1500000, 'Paid', '2026-07-01', '2026-07-08'),
('INV-s2', 'Siti Rahma', 'siti@hijabstyle.co.id', 'Website E-Commerce (Toko Online)', 2500000, 'Unpaid', '2026-07-05', '2026-07-12');

-- H. Mock Projects Seeding
INSERT INTO projects (id, customer_name, customer_email, project_name, progress, status, deadline, start_date) VALUES
('PROJ-s1', 'Ahmad Dani', 'ahmad.dani@example.com', 'Web Umroh Ahmad Dani', 45, 'Developing', '2026-08-15', '2026-07-02');

-- I. Mock Support Tickets Seeding
INSERT INTO tickets (id, customer_name, customer_email, subject, status, priority) VALUES
('TCK-s1', 'Ahmad Dani', 'ahmad.dani@example.com', 'Gagal memuat peta lokasi di footer', 'In Progress', 'Medium');


-- ----------------------------------------------------------------------------
-- 6. PENGATURAN KEAMANAN ROW LEVEL SECURITY (RLS) DI SUPABASE
-- ----------------------------------------------------------------------------
-- Aktifkan RLS di setiap tabel
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Buat Kebijakan RLS (Security Policies)
-- Catatan: Secara default, diijinkan untuk dibaca secara umum untuk data publik,
--          serta integrasi penuh bagi admin atau sesi simulasi aktif.

-- SERVICES POLICY
CREATE POLICY "Allow public read of services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow admin full control of services" ON services FOR ALL USING (true);

-- PORTFOLIOS POLICY
CREATE POLICY "Allow public read of portfolios" ON portfolios FOR SELECT USING (true);
CREATE POLICY "Allow admin full control of portfolios" ON portfolios FOR ALL USING (true);

-- TESTIMONIALS POLICY
CREATE POLICY "Allow public read of testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow admin full control of testimonials" ON testimonials FOR ALL USING (true);

-- BLOGS POLICY
CREATE POLICY "Allow public read of blogs" ON blogs FOR SELECT USING (true);
CREATE POLICY "Allow admin full control of blogs" ON blogs FOR ALL USING (true);

-- LEADS POLICY (Form Konsultasi / Input Prospek dari Pengunjung)
CREATE POLICY "Allow public insertion of leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow sales and admin full access of leads" ON leads FOR ALL USING (true);

-- INVOICES, PROJECTS, TICKETS & CHATS POLICY
CREATE POLICY "Allow full access of invoices" ON invoices FOR ALL USING (true);
CREATE POLICY "Allow full access of projects" ON projects FOR ALL USING (true);
CREATE POLICY "Allow full access of tickets" ON tickets FOR ALL USING (true);
CREATE POLICY "Allow full access of chat messages" ON chat_messages FOR ALL USING (true);
CREATE POLICY "Allow full access of users" ON users FOR ALL USING (true);
