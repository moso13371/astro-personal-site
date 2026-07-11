import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { parseString } from 'set-cookie-parser';
import { config as config$1, collection, fields, singleton } from '@keystatic/core';

function makeHandler(_config) {
  return async function keystaticAPIRoute(context) {
    var _context$locals, _ref, _config$clientId, _ref2, _config$clientSecret, _ref3, _config$secret;
    const envVarsForCf = (_context$locals = context.locals) === null || _context$locals === void 0 || (_context$locals = _context$locals.runtime) === null || _context$locals === void 0 ? void 0 : _context$locals.env;
    const handler = makeGenericAPIRouteHandler({
      ..._config,
      clientId: (_ref = (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_ID) !== null && _ref !== void 0 ? _ref : tryOrUndefined(() => {
        return undefined                                          ;
      }),
      clientSecret: (_ref2 = (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_SECRET) !== null && _ref2 !== void 0 ? _ref2 : tryOrUndefined(() => {
        return undefined                                              ;
      }),
      secret: (_ref3 = (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_SECRET) !== null && _ref3 !== void 0 ? _ref3 : tryOrUndefined(() => {
        return undefined                                ;
      })
    }, {
      slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG"
    });
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    let headersInADifferentStructure = /* @__PURE__ */ new Map();
    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          if (!headersInADifferentStructure.has(key.toLowerCase())) {
            headersInADifferentStructure.set(key.toLowerCase(), []);
          }
          headersInADifferentStructure.get(key.toLowerCase()).push(value);
        }
      } else if (typeof headers.entries === "function") {
        for (const [key, value] of headers.entries()) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
        if ("getSetCookie" in headers && typeof headers.getSetCookie === "function") {
          const setCookieHeaders2 = headers.getSetCookie();
          if (setCookieHeaders2 !== null && setCookieHeaders2 !== void 0 && setCookieHeaders2.length) {
            headersInADifferentStructure.set("set-cookie", setCookieHeaders2);
          }
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
      }
    }
    const setCookieHeaders = headersInADifferentStructure.get("set-cookie");
    headersInADifferentStructure.delete("set-cookie");
    if (setCookieHeaders) {
      for (const setCookieValue of setCookieHeaders) {
        var _options$sameSite;
        const {
          name,
          value,
          ...options
        } = parseString(setCookieValue);
        const sameSite = (_options$sameSite = options.sameSite) === null || _options$sameSite === void 0 ? void 0 : _options$sameSite.toLowerCase();
        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite: sameSite === "lax" || sameSite === "strict" || sameSite === "none" ? sameSite : void 0
        });
      }
    }
    return new Response(body, {
      status,
      headers: [...headersInADifferentStructure.entries()].flatMap(([key, val]) => val.map((x) => [key, x]))
    });
  };
}
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return void 0;
  }
}

const config = config$1({
  storage: {
    kind: process.env.NODE_ENV === "production" ? "github" : "local",
    repo: "moso13371/astro-personal-site"
  },
  singletons: {
    about: singleton({
      label: "關於頁面",
      path: "src/content/about",
      format: { data: "json" },
      previewUrl: "/",
      schema: {
        name: fields.text({ label: "名字" }),
        profession: fields.text({ label: "職業" }),
        avatar: fields.image({
          label: "頭像/個人照片",
          directory: "public/images/about",
          publicPath: "/images/about"
        }),
        intro: fields.text({ label: "關於研究簡介", multiline: true }),
        researchAreas: fields.array(
          fields.object({
            category: fields.text({ label: "領域名稱 (中文)" }),
            categoryEn: fields.text({ label: "領域名稱 (英文)" }),
            summary: fields.text({ label: "領域簡介描述", multiline: true }),
            items: fields.array(
              fields.text({ label: "子項目名稱 (含中英對照)" }),
              {
                label: "子項目清單",
                itemLabel: (props) => props.value || "未命名項目"
              }
            )
          }),
          {
            label: "研究領域與關注方向",
            itemLabel: (props) => props.fields.category.value || "未命名領域"
          }
        ),
        timeline: fields.array(
          fields.object({
            year: fields.text({ label: "年份 (例如: 2024)" }),
            title: fields.text({ label: "里程碑主題" }),
            desc: fields.text({ label: "里程碑詳細說明", multiline: true })
          }),
          {
            label: "研究理論與發展里程碑",
            itemLabel: (props) => `${props.fields.year.value || ""} - ${props.fields.title.value || "未命名里程碑"}`
          }
        )
      }
    }),
    contact: singleton({
      label: "聯絡頁面",
      path: "src/content/contact",
      format: { data: "json" },
      schema: {
        intro: fields.text({ label: "聯絡簡介文字", multiline: true }),
        email: fields.text({ label: "Email 信箱" }),
        academicLabel: fields.text({ label: "學術平台名稱 (例如 ResearchGate)" }),
        academicUrl: fields.text({ label: "學術平台網址" })
      }
    }),
    navigation: singleton({
      label: "導覽選單",
      path: "src/content/navigation",
      format: { data: "json" },
      schema: {
        links: fields.array(
          fields.object({
            label: fields.text({ label: "選單名稱" }),
            href: fields.text({ label: "連結網址 (例如 / 或 /contact)" })
          }),
          {
            label: "選單連結列表",
            itemLabel: (props) => `${props.fields.label.value || "未命名"} (${props.fields.href.value || ""})`
          }
        )
      }
    }),
    service: singleton({
      label: "服務頁面",
      path: "src/content/service",
      format: { data: "json" },
      schema: {
        title: fields.text({ label: "頁面標題", defaultValue: "專業服務與項目" }),
        intro: fields.text({ label: "服務簡介", multiline: true }),
        items: fields.array(
          fields.object({
            name: fields.text({ label: "服務名稱" }),
            description: fields.text({ label: "服務描述", multiline: true }),
            details: fields.text({ label: "詳細說明/收費資訊", multiline: true })
          }),
          {
            label: "服務項目列表",
            itemLabel: (props) => props.fields.name.value || "未命名服務"
          }
        )
      }
    }),
    theme: singleton({
      label: "外觀字體設定",
      path: "src/content/theme",
      format: { data: "json" },
      schema: {
        titleSize: fields.select({
          label: "首頁名字字體大小",
          options: [
            { label: "大 (Large - 3.5rem)", value: "3.5rem" },
            { label: "中 (Medium - 2.8rem)", value: "2.8rem" },
            { label: "小 (Small - 2.4rem)", value: "2.4rem" }
          ],
          defaultValue: "2.8rem"
        }),
        professionSize: fields.select({
          label: "職業頭銜字體大小",
          options: [
            { label: "大 (Large - 1.25rem)", value: "1.25rem" },
            { label: "中 (Medium - 1.15rem)", value: "1.15rem" },
            { label: "小 (Small - 1.0rem)", value: "1.0rem" }
          ],
          defaultValue: "1.15rem"
        })
      }
    }),
    social: singleton({
      label: "社群與部落格連結",
      path: "src/content/social",
      format: { data: "json" },
      schema: {
        facebook: fields.text({ label: "Facebook 專頁網址", defaultValue: "#" }),
        instagram: fields.text({ label: "Instagram 網址", defaultValue: "#" }),
        threads: fields.text({ label: "Threads 網址", defaultValue: "#" }),
        x: fields.text({ label: "X (Twitter) 網址", defaultValue: "#" }),
        bloggerUrl: fields.text({ label: "Blogger 部落格網址 (例如: parawongling.blogspot.com)", defaultValue: "parawongling.blogspot.com" })
      }
    })
  },
  collections: {
    posts: collection({
      label: "研究文章",
      slugField: "title",
      path: "src/content/posts/*",
      entryLayout: "content",
      format: { contentField: "content" },
      previewUrl: "/articles/{slug}",
      schema: {
        title: fields.slug({ name: { label: "文章標題" } }),
        publishDate: fields.date({ label: "發佈日期", defaultValue: { kind: "today" } }),
        isDraft: fields.checkbox({ label: "設定為草稿 (不公開)", defaultValue: false }),
        summary: fields.text({ label: "文章摘要", multiline: true }),
        heroImage: fields.image({
          label: "文章首圖",
          directory: "public/images/posts",
          publicPath: "/images/posts"
        }),
        tags: fields.array(
          fields.text({ label: "標籤" }),
          {
            label: "文章標籤",
            itemLabel: (props) => props.value || "未命名標籤"
          }
        ),
        content: fields.mdx({
          label: "文章內容",
          options: {
            image: {
              directory: "public/images/posts",
              publicPath: "/images/posts"
            }
          }
        })
      }
    })
  },
  ui: {
    navigation: {
      "版面與選單配置": ["navigation", "theme"],
      "個人與服務頁面": ["about", "service", "contact", "social"],
      "專欄文章管理": ["posts"]
    }
  }
});

const all = makeHandler({ config });
const ALL = all;

const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL,
  all,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
