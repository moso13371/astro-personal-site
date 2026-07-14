import { config, fields, singleton, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: process.env.NODE_ENV === 'production' ? 'github' : 'local',
    repo: 'moso13371/astro-personal-site',
  },
  singletons: {
    homepage: singleton({
      label: '首頁設定',
      path: 'src/content/homepage',
      format: { data: 'json' },
      schema: {
        // --- 副標題文字 ---
        subtitleZhNormal: fields.text({
          label: '正常維度副標題（中文）',
          defaultValue: '往櫺 — 臺灣超心理學與未明現象研究調查員'
        }),
        subtitleEnNormal: fields.text({
          label: '正常維度副標題（英文）',
          defaultValue: 'Taiwanese researcher of parapsychology and unexplained phenomena'
        }),
        subtitleZhShifted: fields.text({
          label: '切換維度副標題（中文）',
          defaultValue: '迷幻、異常感知、聲波系統與靈性觀察研究'
        }),
        subtitleEnShifted: fields.text({
          label: '切換維度副標題（英文）',
          defaultValue: 'Psychedelic research, sound systems, and spiritual observation'
        }),
        // --- 雙耳波差頻率（直接填數字，單位 Hz）---
        binauralBaselineLeft: fields.number({
          label: 'BASELINE 模式 — 左耳頻率 (Hz)',
          defaultValue: 130,
          validation: { min: 20, max: 500 }
        }),
        binauralBaselineRight: fields.number({
          label: 'BASELINE 模式 — 右耳頻率 (Hz)',
          defaultValue: 134,
          validation: { min: 20, max: 500 }
        }),
        binauralAlteredLeft: fields.number({
          label: 'ALTERED 模式 — 左耳頻率 (Hz)',
          defaultValue: 180,
          validation: { min: 20, max: 500 }
        }),
        binauralAlteredRight: fields.number({
          label: 'ALTERED 模式 — 右耳頻率 (Hz)',
          defaultValue: 190,
          validation: { min: 20, max: 500 }
        }),
      }
    }),
    about: singleton({
      label: '關於頁面',
      path: 'src/content/about',
      format: { data: 'json' },
      previewUrl: '/',
      schema: {
        name: fields.text({ label: '名字' }),
        profession: fields.text({ label: '職業', multiline: true }),
        avatar: fields.image({
          label: '頭像/個人照片',
          directory: 'public/images/about',
          publicPath: '/images/about'
        }),
        intro: fields.text({ label: '關於研究簡介', multiline: true }),
        academicBackground: fields.array(
          fields.object({
            title: fields.text({ label: '機構或學校名稱（中文）' }),
            role: fields.text({ label: '職位或身份（可留空）', defaultValue: '' }),
            en: fields.text({ label: '機構名稱與職位（英文）' })
          }),
          {
            label: '學經歷',
            itemLabel: props => `${props.fields.title.value || '未命名'}${props.fields.role.value ? ' ｜ ' + props.fields.role.value : ''}`
          }
        ),
        researchAreas: fields.array(
          fields.object({
            category: fields.text({ label: '領域名稱 (中文)' }),
            categoryEn: fields.text({ label: '領域名稱 (英文)' }),
            summary: fields.text({ label: '領域簡介描述', multiline: true }),
            items: fields.array(
              fields.text({ label: '子項目名稱 (含中英對照)' }),
              {
                label: '子項目清單',
                itemLabel: props => props.value || '未命名項目'
              }
            )
          }),
          {
            label: '研究領域與關注方向',
            itemLabel: props => props.fields.category.value || '未命名領域'
          }
        ),
        timeline: fields.array(
          fields.object({
            year: fields.text({ label: '年份 (例如: 2024)' }),
            title: fields.text({ label: '里程碑主題' }),
            desc: fields.text({ label: '里程碑詳細說明', multiline: true })
          }),
          {
            label: '研究理論與發展里程碑',
            itemLabel: props => `${props.fields.year.value || ''} - ${props.fields.title.value || '未命名里程碑'}`
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
    }),
    social: singleton({
      label: '社群與部落格連結',
      path: 'src/content/social',
      format: { data: 'json' },
      schema: {
        facebook: fields.text({ label: 'Facebook 專頁網址', defaultValue: '#' }),
        instagram: fields.text({ label: 'Instagram 網址', defaultValue: '#' }),
        threads: fields.text({ label: 'Threads 網址', defaultValue: '#' }),
        x: fields.text({ label: 'X (Twitter) 網址', defaultValue: '#' }),
        bloggerUrl: fields.text({ label: 'Blogger 部落格網址 (例如: parawongling.blogspot.com)', defaultValue: 'parawongling.blogspot.com' })
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
      '首頁與版面配置': ['homepage', 'navigation', 'theme'],
      '個人與服務頁面': ['about', 'service', 'contact', 'social'],
      '專欄文章管理': ['posts']
    }
  }
});
