// 結構化標記產生器（JSON-LD）
import { brand, pricing } from './site';

export const faqSchema = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const breadcrumb = (trail: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: '首頁', path: '/' }, ...trail].map((t, i) => ({
    '@type': 'ListItem', position: i + 1, name: t.name, item: new URL(t.path, brand.url).href,
  })),
});

export const softwareSchema = () => {
  const s: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: brand.name,
    alternateName: brand.nameZh,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: '醫美診所營運管理系統',
    operatingSystem: 'Web, iOS, Android',
    inLanguage: 'zh-Hant-TW',
    description: brand.description,
    url: brand.url,
    publisher: { '@id': brand.url + '/#org' },
  };
  // 金額公布後才加 offers，避免寫出不合規格的價格
  if (pricing.published) {
    s.offers = pricing.plans.filter((p) => p.price).map((p) => ({
      '@type': 'Offer', name: p.name, price: p.price, priceCurrency: 'TWD', url: brand.url + '/pricing',
    }));
  }
  return s;
};
