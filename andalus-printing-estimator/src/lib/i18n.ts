type Language = 'en' | 'ar';

interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

export const translations: Translations = {
  dashboard: {
    en: 'Dashboard',
    ar: 'لوحة القيادة',
  },
  quotations: {
    en: 'Quotations',
    ar: 'العروض',
  },
  customers: {
    en: 'Customers',
    ar: 'العملاء',
  },
  products: {
    en: 'Products',
    ar: 'المنتجات',
  },
  admin: {
    en: 'Admin',
    ar: 'المسؤول',
  },
  logout: {
    en: 'Logout',
    ar: 'تسجيل الخروج',
  },
  total_quotations: {
    en: 'Total Quotations',
    ar: 'إجمالي العروض',
  },
  pending_quotations: {
    en: 'Pending Quotations',
    ar: 'العروض المعلقة',
  },
  approved_quotations: {
    en: 'Approved Quotations',
    ar: 'العروض المعتمدة',
  },
  monthly_sales: {
    en: 'Monthly Sales Estimate',
    ar: 'تقدير المبيعات الشهرية',
  },
  recent_quotations: {
    en: 'Recent Quotations',
    ar: 'العروض الأخيرة',
  },
  new_quotation: {
    en: 'New Quotation',
    ar: 'عرض جديد',
  },
  // Add more translations as needed
};

export function t(key: string, lang: Language = 'en'): string {
  return translations[key]?.[lang] || key;
}