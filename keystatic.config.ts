import { config, fields, singleton, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: process.env.NODE_ENV === 'production' ? 'github' : 'local',
    repo: 'moso13371/astro-personal-site', // 已經修正為你的實際 GitHub 帳號名稱
  },
  singletons: {
    about: singleton({
      label: '關於頁面',
      path: 'src/content/about',
      format: { data: 'json' },
      previewUrl: '/',
      schema: {
        name: fields.text({ label: '名字' }),
        profession: fields.text({ label: '職業' }),
        intro: fields.text({ label: '關於研究簡介', multiline: true }),
        focusAreas: fields.array(
          fields.text({ label: '專注領域' }),
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
      previewUrl: '/articles/{slug}',
      schema: {
        title: fields.slug({ name: { label: '文章標題' } }),
        publishDate: fields.date({ label: '發佈日期', defaultValue: { kind: 'today' } }),
        summary: fields.text({ label: '文章摘要', multiline: true }),
        content: fields.mdx({ label: '文章內容' })
      }
    })
  }
});
