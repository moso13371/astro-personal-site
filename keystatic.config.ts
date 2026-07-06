import { config, fields, singleton, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: process.env.NODE_ENV === 'production' ? 'github' : 'local',
    repo: 'moso13371-7063/astro-personal-site', // 預設使用你在 Vercel 上的帳號名稱，之後在 GitHub 建立同名專案即可
  },
  singletons: {
    about: singleton({
      label: '關於頁面',
      path: 'src/content/about',
      schema: {
        name: fields.string({ label: '名字' }),
        profession: fields.string({ label: '職業' }),
        intro: fields.text({ label: '關於研究簡介', multiline: true }),
        focusAreas: fields.array(
          fields.string({ label: '專注領域' }),
          {
            label: '專注領域列表',
            itemLabel: props => props.value || '未命名領域'
          }
        )
      }
    })
  },
  collections: {
    posts: collection({
      label: '研究文章',
      slugField: 'title',
      path: 'src/content/posts/*',
      entryLayout: 'content',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: '文章標題' } }),
        publishDate: fields.date({ label: '發佈日期', defaultValue: { kind: 'today' } }),
        summary: fields.text({ label: '文章摘要', multiline: true }),
        content: fields.mdx({ label: '文章內容' })
      }
    })
  }
});
