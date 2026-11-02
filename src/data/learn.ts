// 文章 slug → 標題（給功能頁的「延伸閱讀」用）
import { getCollection } from 'astro:content';

export async function articleTitles() {
  const all = await getCollection('learn');
  return Object.fromEntries(all.map((a) => [a.data.slug, a.data.title]));
}
