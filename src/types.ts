export interface User {
  id: string;
  fullname: string;
  email: string;
  role: 'Visitor' | 'Customer' | 'Sales' | 'Admin' | 'Super Admin';
}

export interface Service {
  id: string;
  nama: string;
  slug: string;
  harga: number;
  icon: string;
  deskripsi: string;
}

export interface Portfolio {
  id: string;
  title: string;
  category: 'Website' | 'Android' | 'ERP' | 'CRM' | 'Custom';
  client: string;
  image: string;
  description: string;
  tech: string[];
  year: number;
  duration: string;
}

export interface Testimonial {
  id: string;
  nama: string;
  jabatan: string;
  perusahaan: string;
  foto: string;
  rating: number;
  review: string;
}

export interface BlogCategory {
  id: string;
  nama: string;
}

export interface Blog {
  id: string;
  category: string;
  title: string;
  slug: string;
  image: string;
  content: string;
  date: string;
  tags: string[];
}

export interface Lead {
  id: string;
  nama: string;
  email: string;
  phone: string;
  layanan: string;
  budget: number;
  status: 'Lead Baru' | 'Follow Up' | 'Meeting' | 'Quotation' | 'Deal' | 'Lost';
  deadline?: string;
  deskripsi?: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  total: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  issueDate: string;
  dueDate: string;
}

export interface Project {
  id: string;
  customerName: string;
  customerEmail: string;
  projectName: string;
  progress: number; // 0 to 100
  status: 'Requirement Gathering' | 'Designing' | 'Developing' | 'Testing' | 'Deployed';
  deadline: string;
  startDate: string;
}

export interface Ticket {
  id: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
