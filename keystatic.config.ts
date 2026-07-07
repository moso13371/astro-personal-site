import { config, fields, singleton, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: process.env.NODE_ENV === 'production' ? 'github' : 'local',
    repo: 'moso13371/astro-personal-site',
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
        avatar: fields.image({
          label: '頭像/個人照片',
          directory: 'public/images/about',
          publicPath: '/images/about'
        }),
        intro: fields.text({ label: '關於研究簡介', multiline: true }),
        focusAreas: fields.array(
          fields.text({ label: '專注領域' }),
          {
            label: '專注領域列表',
            itemLabel: props => props.value || '未命名領域'
          }
        )
      }
    }),
    contact: singleton({
      label: '聯絡頁面',
      path: 'src/content/contact',
      format: { data: 'json' },
      schema: {
        intro: fields.text({ label: '聯絡簡介文字', multiline: true }),
        email: fields.text({ label: 'Email 信箱' }),
        academicLabel: fields.text({ label: '學術平台名稱 (例如 ResearchGate)' }),
        academicUrl: fields.text({ label: '學術平台網址' })
      }
    }),
    navigation: singleton({
      label: '導覽選單',
      path: 'src/content/navigation',
      format: { data: 'json' },
      schema: {
        links: fields.array(
          fields.object({
            label: fields.text({ label: '選單名稱' }),
            href: fields.text({ label: '連結網址 (例如 / 或 /contact)' })
          }),
          {
            label: '選單連結列表',
            itemLabel: props => `${props.fields.label.value || '未命名'} (${props.fields.href.value || ''})`
          }
        )
      }
    }),
    service: singleton({
      label: '服務頁面',
      path: 'src/content/service',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: '頁面標題', defaultValue: '專業服務與項目' }),
        intro: fields.text({ label: '服務簡介', multiline: true }),
        items: fields.array(
          fields.object({
            name: fields.text({ label: '服務名稱' }),
            description: fields.text({ label: '服務描述', multiline: true }),
            details: fields.text({ label: '詳細說明/收費資訊', multiline: true })
          }),
          {
            label: '服務項目列表',
            itemLabel: props => props.fields.name.value || '未命名服務'
          }
        )
      }
    }),
    theme: singleton({
      label: '外觀字體設定',
      path: 'src/content/theme',
      format: { data: 'json' },
      schema: {
        titleSize: fields.select({
          label: '首頁名字字體大小',
          options: [
            { label: '大 (Large - 3.5rem)', value: '3.5rem' },
            { label: '中 (Medium - 2.8rem)', value: '2.8rem' },
            { label: '小 (Small - 2.4rem)', value: '2.4rem' }
          ],
          defaultValue: '2.8rem'
        }),
        professionSize: fields.select({
          label: '職業頭銜字體大小',
          options: [
            { label: '大 (Large - 1.25rem)', value: '1.25rem' },
            { label: '中 (Medium - 1.15rem)', value: '1.15rem' },
            { label: '小 (Small - 1.0rem)', value: '1.0rem' }
          ],
          defaultValue: '1.15rem'
        })
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
        isDraft: fields.checkbox({ label: '設定為草稿 (不公開)', defaultValue: false }),
        summary: fields.text({ label: '文章摘要', multiline: true }),
        heroImage: fields.image({
          label: '文章首圖',
          directory: 'public/images/posts',
          publicPath: '/images/posts'
        }),
        tags: fields.array(
          fields.text({ label: '標籤' }),
          {
            label: '文章標籤',
            itemLabel: props => props.value || '未命名標籤'
          }
        ),
        content: fields.mdx({
          label: '文章內容',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts'
            }
          }
        })
      }
    })
  },
  ui: {
    navigation: {
      '版面與選單配置': ['navigation', 'theme'],
      '個人與服務頁面': ['about', 'service', 'contact'],
      '專欄文章管理': ['posts']
    }
  }
});


