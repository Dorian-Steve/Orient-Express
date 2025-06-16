// Program type
export interface Program {
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  level: string;
}

// Staff member type
export interface StaffMember {
  name: string;
  role: string;
  department: string;
  image: string;
  experience: string;
}

// Testimonial type
export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface FooterSection {
  title: string;
  links: { href: string; label: string; }[];
}

export interface Stat {
  value: string;
  label: string;
  color: string;
}

export interface ContactInfo {
  icon: React.ReactNode;
  text: string;
}