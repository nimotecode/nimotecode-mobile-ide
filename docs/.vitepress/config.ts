import { defineConfig, type HeadConfig, type TransformContext } from 'vitepress'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

const siteUrl = 'https://nimotecode.com'
const socialImage = `${siteUrl}/app_icon.png`
const localeConfig = {
  root: { lang: 'en-US', path: '' },
  zh: { lang: 'zh-CN', path: '/zh' },
  ja: { lang: 'ja-JP', path: '/ja' },
  ko: { lang: 'ko-KR', path: '/ko' },
  ru: { lang: 'ru-RU', path: '/ru' },
  es: { lang: 'es-ES', path: '/es' }
} as const

function normalizePath(path: string): string {
  if (!path || path === 'index.md' || path === '/index.md') return '/'
  let normalized = path
    .replace(/\\/g, '/')
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '')
  if (!normalized.startsWith('/')) normalized = `/${normalized}`
  normalized = normalized.replace(/\/+/g, '/')
  return normalized === '' ? '/' : normalized
}

function canonicalUrl(path: string): string {
  const normalized = normalizePath(path)
  return normalized === '/' ? siteUrl : `${siteUrl}${normalized}`
}

function asContent(value: unknown, fallback: string): string {
  if (typeof value === 'string' && value.trim()) return value
  return fallback
}

function pageDescription(context: TransformContext, title: string): string {
  const explicit = asContent(context.pageData.frontmatter.description, '')
  if (explicit) return explicit

  const normalizedTitle = title.trim()
  if (!normalizedTitle || normalizedTitle === 'NimoteCode') {
    return asContent(context.siteConfig.site.description, 'NimoteCode mobile developer workspace.')
  }

  return `${normalizedTitle} page on NimoteCode, the mobile-first developer workspace for SSH, terminal, Git, AI, debugging, tasks, timeline, and sync/cache workflows.`
}

function stripLocalePrefix(path: string): string {
  return path.replace(/^\/(zh|ja|ko|ru|es)(?=\/|$)/, '') || '/'
}

function titleCase(value: string): string {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function languageForPath(path: string): string {
  const localeKey = pageLocaleKey(path)
  if (localeKey === 'zh') return 'zh-CN'
  if (localeKey === 'ja') return 'ja-JP'
  if (localeKey === 'ko') return 'ko-KR'
  if (localeKey === 'ru') return 'ru-RU'
  if (localeKey === 'es') return 'es-ES'
  return 'en-US'
}

function localeAlternates(path: string): HeadConfig[] {
  const normalized = normalizePath(path)
  const suffix = normalized === '/' ? '' : normalized
  const stripped = suffix.replace(/^\/(zh|ja|ko|ru|es)(\/|$)/, '/')
  const entries = Object.values(localeConfig).map((locale) => {
    const localePath = `${locale.path}${stripped}` || '/'
    const href = localePath === '/' ? siteUrl : `${siteUrl}${localePath}`
    return ['link', { rel: 'alternate', hreflang: locale.lang, href }] as HeadConfig
  })
  entries.push(['link', { rel: 'alternate', hreflang: 'x-default', href: siteUrl }])
  return entries
}

function pageSchemas(context: TransformContext): object[] {
  const url = canonicalUrl(context.pageData.relativePath)
  const title = asContent(context.pageData.frontmatter.title, asContent(context.pageData.title, 'NimoteCode'))
  const description = pageDescription(context, title)
  const inLanguage = languageForPath(context.pageData.relativePath)

  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'NimoteCode',
      url: siteUrl,
      logo: socialImage,
      sameAs: [
        'https://github.com/nimotecode',
        'https://x.com/nimotecode'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'NimoteCode',
      url: siteUrl,
      description: 'NimoteCode is a mobile-first IDE and developer workspace for SSH, terminal, Git, AI, debugging, and daily software delivery from iPhone, iPad, Android phones, and tablets.',
      inLanguage: 'en-US'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url,
      inLanguage
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'NimoteCode',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'iOS, iPadOS, Android',
      url: siteUrl,
      image: socialImage,
      description: 'Mobile IDE and developer workspace with code editor, SSH terminal, Git, AI coding assistant, LSP, debugger, tasks, timeline diagnostics, and sync/cache workflows.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        category: 'Freemium'
      }
    }
  ]

  if (normalizePath(context.pageData.relativePath) !== '/') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: title,
      description,
      url,
      author: {
        '@type': 'Organization',
        name: 'NimoteCode'
      },
      publisher: {
        '@type': 'Organization',
        name: 'NimoteCode',
        logo: {
          '@type': 'ImageObject',
          url: socialImage
        }
      }
    })
  }

  const breadcrumb = breadcrumbSchema(context)
  if (breadcrumb) {
    schemas.push(breadcrumb)
  }

  const faq = faqSchema(context)
  if (faq) {
    schemas.push(faq)
  }

  return schemas
}

function breadcrumbSchema(context: TransformContext): object | null {
  const normalized = normalizePath(context.pageData.relativePath)
  const localePrefix = normalized.match(/^\/(zh|ja|ko|ru|es)(?=\/|$)/)?.[0] ?? ''
  const stripped = stripLocalePrefix(normalized)
  if (stripped === '/') return null

  const segments = stripped.split('/').filter(Boolean)
  if (segments.length === 0) return null

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: localePrefix ? `${siteUrl}${localePrefix}` : siteUrl
    }
  ]

  let currentUrl = localePrefix ? `${siteUrl}${localePrefix}` : siteUrl
  segments.forEach((segment, index) => {
    currentUrl = `${currentUrl}/${segment}`
    const isLast = index === segments.length - 1
    const label = isLast ? asContent(context.pageData.title, titleCase(segment)) : titleCase(segment)

    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: label,
      item: currentUrl
    })
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  }
}

function faqSchema(context: TransformContext): object | null {
  const normalized = normalizePath(context.pageData.relativePath)
  const faqEntries: Record<string, Array<{ question: string, answer: string }>> = {
    '/docs/faq': [
      {
        question: 'Is NimoteCode only for remote development?',
        answer: 'No. You can work in Local Explorer mode or Remote Explorer (SSH) mode.'
      },
      {
        question: 'Which AI providers are supported?',
        answer: 'Built-in templates include OpenAI, Anthropic, Gemini, Grok, DeepSeek, Zhipu, Moonshot, Ollama, and custom OpenAI-compatible endpoints.'
      },
      {
        question: 'What can I do in Source Control?',
        answer: 'You can stage, unstage, discard, commit, push, pull, fetch, manage branches and stashes, view history, and use Git AI analysis tools.'
      },
      {
        question: 'Can I run project tasks?',
        answer: 'Yes. Use the Tasks panel to create and run tasks, then inspect output in terminal.'
      },
      {
        question: 'What is Timeline used for?',
        answer: 'Timeline helps you inspect events and traces, including causal analysis flow for troubleshooting.'
      },
      {
        question: 'Why is a feature locked?',
        answer: 'Some capabilities are Pro-gated. Subscription status is verified by the app premium access flow.'
      }
    ],
    '/zh/docs/faq': [
      {
        question: 'NimoteCode 只能远程开发吗？',
        answer: '不是。支持 Local Explorer（本地）与 Remote Explorer（SSH）两种模式。'
      },
      {
        question: '支持哪些 AI 提供商？',
        answer: '内置模板包括 OpenAI、Anthropic、Gemini、Grok、DeepSeek、Zhipu、Moonshot、Ollama 以及自定义 OpenAI 兼容端点。'
      },
      {
        question: 'Source Control 能做什么？',
        answer: '支持暂存、取消暂存、丢弃、提交、推拉取、分支与 stash 管理、历史与 Git AI 分析。'
      },
      {
        question: '可以运行项目任务吗？',
        answer: '可以。使用 Tasks 面板创建并运行任务，输出可在终端查看。'
      },
      {
        question: 'Timeline 有什么用？',
        answer: '用于查看事件与 Trace，帮助定位问题与复盘执行链路。'
      },
      {
        question: '为什么有些功能不可用？',
        answer: '部分能力受 Pro 门控，需通过订阅状态校验。'
      }
    ]
  }

  const entries = faqEntries[normalized]
  if (!entries) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer
      }
    }))
  }
}

// Load the primary UI font asynchronously so it never blocks first paint.
// The fallback stack in tokens.css renders immediately, and the web font
// swaps in once the stylesheet finishes loading.
const FONT_LATIN = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap'
const FONT_ZH = 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@500;600;700;800&display=swap'
const FONT_JA = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500;600;700;800&display=swap'
const FONT_KO = 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500;600;700;800&display=swap'
const FONT_RU = 'https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=swap'
const FONT_ES = 'https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=swap'

function fontByLocale(lang: string): string {
  if (lang.startsWith('zh')) return FONT_ZH
  if (lang.startsWith('ja')) return FONT_JA
  if (lang.startsWith('ko')) return FONT_KO
  if (lang.startsWith('ru')) return FONT_RU
  if (lang.startsWith('es')) return FONT_ES
  return FONT_LATIN
}

function fontLinks(path: string): HeadConfig[] {
  const normalized = normalizePath(path)
  const stripped = suffixToLocaleKey(normalized)
  const lang =
    stripped === 'zh' ? 'zh-CN' :
    stripped === 'ja' ? 'ja-JP' :
    stripped === 'ko' ? 'ko-KR' :
    stripped === 'ru' ? 'ru-RU' :
    stripped === 'es' ? 'es-ES' : 'en-US'
  const href = fontByLocale(lang)
  return [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    // Async pattern: stylesheet is print-only until the browser swaps it to all.
    // This keeps the font off the critical render path.
    ['link', { rel: 'preload', as: 'style', href }],
    ['link', { rel: 'stylesheet', href, media: 'print', onload: "this.media='all'" }],
    // noscript fallback so the font still works without JS.
    ['noscript', {}, `<link rel="stylesheet" href="${href}">`]
  ]
}

function suffixToLocaleKey(normalized: string): string {
  const m = normalized.match(/^\/(zh|ja|ko|ru|es)(?:\/|$)/)
  return m ? m[1] : ''
}

function pageLocaleKey(path: string): string {
  const normalized = normalizePath(path)
  return suffixToLocaleKey(normalized)
}

export default defineConfig({
  description: 'NimoteCode is a mobile-first IDE and developer workspace with SSH terminal, code editor, Git, AI agent, LSP, debugger, tasks, timeline diagnostics, and sync/cache.',
  base: '/',
  lang: 'en-US',
  cleanUrls: true,
  sitemap: {
    hostname: siteUrl
  },
  transformHead(context) {
    const url = canonicalUrl(context.pageData.relativePath)
    const title = asContent(context.pageData.frontmatter.title, asContent(context.pageData.title, 'NimoteCode'))
    const description = pageDescription(context, title)
    const image = asContent(context.pageData.frontmatter.image, socialImage)

    return [
      ['link', { rel: 'canonical', href: url }],
      ...fontLinks(context.pageData.relativePath),
      ['meta', { property: 'og:site_name', content: 'NimoteCode' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:image', content: image }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: image }],
      ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
      ['meta', { name: 'author', content: 'NimoteCode' }],
      ['meta', { name: 'apple-mobile-web-app-title', content: 'NimoteCode' }],
      ['script', { type: 'application/ld+json' }, JSON.stringify(pageSchemas(context))],
      ...localeAlternates(context.pageData.relativePath)
    ]
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'theme-color', content: '#4f46e5' }],
    ['meta', { name: 'generator', content: 'VitePress' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
  ],

  themeConfig: {
    siteTitle: 'NimoteCode',
    logo: {
      light: '/app_icon.png',
      dark: '/app_icon.png'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nimotecode' },
      { icon: 'twitter', link: 'https://x.com/nimotecode' },
      { icon: 'discord', link: 'https://discord.gg/nimotecode' }
    ],
    footer: {
      message: 'Built for developers on the move. Released under the MIT License.',
      copyright: 'Copyright © 2024 NimoteCode. All rights reserved.'
    },
    editLink: {
      pattern: 'https://github.com/nimotecode/nimote_issues/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: [
          { text: 'Features', link: '/features' },
          { text: 'Use Cases', link: '/use-cases/' },
          { text: 'Docs', link: '/docs/quick-start' },
          { text: 'Support', link: '/support' },
          { text: 'Account Delete', link: '/account-delete' },
          { text: 'Privacy', link: '/privacy' },
          { text: 'Terms', link: '/terms' }
        ],
        sidebar: {
          '/': [
            {
              text: 'Start',
              items: [
                { text: 'Quick Start', link: '/docs/quick-start' },
                { text: 'Introduction', link: '/introduction' },
                { text: 'Features', link: '/features' },
                { text: 'Use Cases', link: '/use-cases/' },
                { text: 'Pro', link: '/pro' },
                { text: 'Download', link: '/download' }
              ]
            },
            {
              text: 'Use Cases',
              items: [
                { text: 'Overview', link: '/use-cases/' },
                { text: 'Remote Hotfix', link: '/use-cases/remote-hotfix' },
                { text: 'On-call Diagnostics', link: '/use-cases/on-call-diagnostics' },
                { text: 'AI Agent Workflows', link: '/use-cases/ai-agent' }
              ]
            },
            {
              text: 'Daily Workflow',
              items: [
                { text: 'SSH Workspace', link: '/docs/ssh' },
                { text: 'Editor', link: '/docs/editor' },
                { text: 'Terminal', link: '/docs/terminal' },
                { text: 'Search', link: '/docs/search' },
                { text: 'Source Control', link: '/docs/source-control' },
                { text: 'Tasks', link: '/docs/tasks' }
              ]
            },
            {
              text: 'AI and Diagnostics',
              items: [
                { text: 'AI Assistant', link: '/docs/ai' },
                { text: 'LSP', link: '/docs/lsp' },
                { text: 'Debug', link: '/docs/debug' },
                { text: 'Timeline', link: '/docs/timeline' },
                { text: 'Sync / Cache', link: '/docs/sync-cache' }
              ]
            },
            {
              text: 'Reference',
              items: [
                { text: 'Account and Subscription', link: '/docs/account-subscription' },
                { text: 'Security and Safety', link: '/docs/security' },
                { text: 'Settings', link: '/docs/settings' },
                { text: 'Configuration', link: '/docs/configuration' },
                { text: 'FAQ', link: '/docs/faq' },
                { text: 'Support', link: '/support' },
                { text: 'Privacy', link: '/privacy' },
                { text: 'Terms', link: '/terms' },
                { text: 'Account Deletion', link: '/account-delete' }
              ]
            }
          ]
        },
        search: {
          provider: 'local'
        }
      }
    },

    zh: {
      label: '中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '功能', link: '/zh/features' },
          { text: '场景', link: '/zh/use-cases/' },
          { text: '文档', link: '/zh/docs/quick-start' },
          { text: '支持', link: '/zh/support' },
          { text: '账号删除', link: '/zh/account-delete' },
          { text: '隐私政策', link: '/zh/privacy' },
          { text: '服务条款', link: '/zh/terms' }
        ],
        sidebar: {
          '/zh/': [
            {
              text: '开始使用',
              items: [
                { text: '快速入门', link: '/zh/docs/quick-start' },
                { text: '简介', link: '/zh/introduction' },
                { text: '功能特性', link: '/zh/features' },
                { text: '使用场景', link: '/zh/use-cases/' },
                { text: '下载', link: '/zh/download' }
              ]
            },
            {
              text: '场景',
              items: [
                { text: '总览', link: '/zh/use-cases/' },
                { text: '远程热修', link: '/zh/use-cases/remote-hotfix' },
                { text: '值班诊断', link: '/zh/use-cases/on-call-diagnostics' },
                { text: 'AI Agent 工作流', link: '/zh/use-cases/ai-agent' }
              ]
            },
            {
              text: '日常开发',
              items: [
                { text: 'SSH 远程开发', link: '/zh/docs/ssh' },
                { text: '编辑器', link: '/zh/docs/editor' },
                { text: '终端使用', link: '/zh/docs/terminal' },
                { text: 'Source Control 工作流', link: '/zh/docs/source-control' },
                { text: 'Tasks 面板', link: '/zh/docs/tasks' }
              ]
            },
            {
              text: 'AI 与诊断',
              items: [
                { text: 'AI 助手', link: '/zh/docs/ai' },
                { text: 'LSP 面板', link: '/zh/docs/lsp' },
                { text: '调试面板', link: '/zh/docs/debug' },
                { text: 'Timeline 面板', link: '/zh/docs/timeline' },
                { text: 'Sync / Cache 面板', link: '/zh/docs/sync-cache' }
              ]
            },
            {
              text: '参考',
              items: [
                { text: '设置', link: '/zh/docs/settings' },
                { text: '配置', link: '/zh/docs/configuration' },
                { text: '常见问题', link: '/zh/docs/faq' },
                { text: '支持', link: '/zh/support' },
                { text: '隐私政策', link: '/zh/privacy' },
                { text: '服务条款', link: '/zh/terms' },
                { text: '账号删除', link: '/zh/account-delete' }
              ]
            }
          ]
        },
        search: {
          provider: 'local'
        }
      }
    },

    ja: {
      label: '日本語',
      lang: 'ja-JP',
      link: '/ja/',
      themeConfig: {
        nav: [
          { text: '機能', link: '/ja/features' },
          { text: 'ユースケース', link: '/ja/use-cases/' },
          { text: 'ドキュメント', link: '/ja/docs/quick-start' },
          { text: 'サポート', link: '/ja/support' },
          { text: 'アカウント削除', link: '/ja/account-delete' },
          { text: 'プライバシー', link: '/ja/privacy' },
          { text: '利用規約', link: '/ja/terms' }
        ],
        sidebar: {
          '/ja/': [
            {
              text: 'はじめに',
              items: [
                { text: 'クイックスタート', link: '/ja/docs/quick-start' },
                { text: '紹介', link: '/ja/introduction' },
                { text: '機能', link: '/ja/features' },
                { text: 'ダウンロード', link: '/ja/download' }
              ]
            },
            {
              text: '日常のワークフロー',
              items: [
                { text: 'SSHリモート開発', link: '/ja/docs/ssh' },
                { text: 'ターミナル使用', link: '/ja/docs/terminal' },
                { text: 'Source Controlワークフロー', link: '/ja/docs/source-control' },
                { text: 'Tasksパネル', link: '/ja/docs/tasks' }
              ]
            },
            {
              text: 'AIと診断',
              items: [
                { text: 'AIアシスタント', link: '/ja/docs/ai' },
                { text: 'LSPパネル', link: '/ja/docs/lsp' },
                { text: 'デバッグパネル', link: '/ja/docs/debug' },
                { text: 'Timelineパネル', link: '/ja/docs/timeline' },
                { text: 'Sync / Cacheパネル', link: '/ja/docs/sync-cache' }
              ]
            },
            {
              text: 'リファレンス',
              items: [
                { text: '設定', link: '/ja/docs/settings' },
                { text: '構成', link: '/ja/docs/configuration' },
                { text: 'FAQ', link: '/ja/docs/faq' },
                { text: 'サポート', link: '/ja/support' },
                { text: 'プライバシー', link: '/ja/privacy' },
                { text: '利用規約', link: '/ja/terms' },
                { text: 'アカウント削除', link: '/ja/account-delete' }
              ]
            }
          ]
        },
        search: {
          provider: 'local'
        }
      }
    },

    ko: {
      label: '한국어',
      lang: 'ko-KR',
      link: '/ko/',
      themeConfig: {
        nav: [
          { text: '기능', link: '/ko/features' },
          { text: '사용 사례', link: '/ko/use-cases/' },
          { text: '문서', link: '/ko/docs/quick-start' },
          { text: '지원', link: '/ko/support' },
          { text: '계정 삭제', link: '/ko/account-delete' },
          { text: '개인정보 처리방침', link: '/ko/privacy' },
          { text: '이용 약관', link: '/ko/terms' }
        ],
        sidebar: {
          '/ko/': [
            {
              text: '시작하기',
              items: [
                { text: '퀵 스타트', link: '/ko/docs/quick-start' },
                { text: '소개', link: '/ko/introduction' },
                { text: '기능', link: '/ko/features' },
                { text: '다운로드', link: '/ko/download' }
              ]
            },
            {
              text: '일상 워크플로우',
              items: [
                { text: 'SSH 원격 개발', link: '/ko/docs/ssh' },
                { text: '터미널 사용', link: '/ko/docs/terminal' },
                { text: 'Source Control 워크플로우', link: '/ko/docs/source-control' },
                { text: 'Tasks 패널', link: '/ko/docs/tasks' }
              ]
            },
            {
              text: 'AI 및 진단',
              items: [
                { text: 'AI 어시스턴트', link: '/ko/docs/ai' },
                { text: 'LSP 패널', link: '/ko/docs/lsp' },
                { text: '디버그 패널', link: '/ko/docs/debug' },
                { text: 'Timeline 패널', link: '/ko/docs/timeline' },
                { text: 'Sync / Cache 패널', link: '/ko/docs/sync-cache' }
              ]
            },
            {
              text: '참조',
              items: [
                { text: '설정', link: '/ko/docs/settings' },
                { text: '구성', link: '/ko/docs/configuration' },
                { text: 'FAQ', link: '/ko/docs/faq' },
                { text: '지원', link: '/ko/support' },
                { text: '개인정보 처리방침', link: '/ko/privacy' },
                { text: '이용 약관', link: '/ko/terms' },
                { text: '계정 삭제', link: '/ko/account-delete' }
              ]
            }
          ]
        },
        search: {
          provider: 'local'
        }
      }
    },

    ru: {
      label: 'Русский',
      lang: 'ru-RU',
      link: '/ru/',
      themeConfig: {
        nav: [
          { text: 'Функции', link: '/ru/features' },
          { text: 'Сценарии', link: '/ru/use-cases/' },
          { text: 'Документация', link: '/ru/docs/quick-start' },
          { text: 'Поддержка', link: '/ru/support' },
          { text: 'Удаление аккаунта', link: '/ru/account-delete' },
          { text: 'Конфиденциальность', link: '/ru/privacy' },
          { text: 'Условия', link: '/ru/terms' }
        ],
        sidebar: {
          '/ru/': [
            {
              text: 'Начало работы',
              items: [
                { text: 'Быстрый старт', link: '/ru/docs/quick-start' },
                { text: 'Введение', link: '/ru/introduction' },
                { text: 'Функции', link: '/ru/features' },
                { text: 'Скачать', link: '/ru/download' }
              ]
            },
            {
              text: 'Повседневная работа',
              items: [
                { text: 'SSH-разработка', link: '/ru/docs/ssh' },
                { text: 'Использование терминала', link: '/ru/docs/terminal' },
                { text: 'Source Control', link: '/ru/docs/source-control' },
                { text: 'Tasks', link: '/ru/docs/tasks' }
              ]
            },
            {
              text: 'ИИ и диагностика',
              items: [
                { text: 'AI-ассистент', link: '/ru/docs/ai' },
                { text: 'Панель LSP', link: '/ru/docs/lsp' },
                { text: 'Панель Debug', link: '/ru/docs/debug' },
                { text: 'Панель Timeline', link: '/ru/docs/timeline' },
                { text: 'Sync / Cache', link: '/ru/docs/sync-cache' }
              ]
            },
            {
              text: 'Справка',
              items: [
                { text: 'Настройки', link: '/ru/docs/settings' },
                { text: 'Конфигурация', link: '/ru/docs/configuration' },
                { text: 'FAQ', link: '/ru/docs/faq' },
                { text: 'Поддержка', link: '/ru/support' },
                { text: 'Конфиденциальность', link: '/ru/privacy' },
                { text: 'Условия', link: '/ru/terms' },
                { text: 'Удаление аккаунта', link: '/ru/account-delete' }
              ]
            }
          ]
        },
        search: {
          provider: 'local'
        }
      }
    },

    es: {
      label: 'Español',
      lang: 'es-ES',
      link: '/es/',
      themeConfig: {
        nav: [
          { text: 'Funciones', link: '/es/features' },
          { text: 'Casos de uso', link: '/es/use-cases/' },
          { text: 'Documentación', link: '/es/docs/quick-start' },
          { text: 'Soporte', link: '/es/support' },
          { text: 'Eliminar cuenta', link: '/es/account-delete' },
          { text: 'Privacidad', link: '/es/privacy' },
          { text: 'Términos', link: '/es/terms' }
        ],
        sidebar: {
          '/es/': [
            {
              text: 'Comenzar',
              items: [
                { text: 'Inicio rápido', link: '/es/docs/quick-start' },
                { text: 'Introducción', link: '/es/introduction' },
                { text: 'Funciones', link: '/es/features' },
                { text: 'Descargar', link: '/es/download' }
              ]
            },
            {
              text: 'Flujo diario',
              items: [
                { text: 'Desarrollo SSH', link: '/es/docs/ssh' },
                { text: 'Uso del terminal', link: '/es/docs/terminal' },
                { text: 'Source Control', link: '/es/docs/source-control' },
                { text: 'Tasks', link: '/es/docs/tasks' }
              ]
            },
            {
              text: 'IA y diagnóstico',
              items: [
                { text: 'Asistente AI', link: '/es/docs/ai' },
                { text: 'Panel LSP', link: '/es/docs/lsp' },
                { text: 'Panel Debug', link: '/es/docs/debug' },
                { text: 'Panel Timeline', link: '/es/docs/timeline' },
                { text: 'Sync / Cache', link: '/es/docs/sync-cache' }
              ]
            },
            {
              text: 'Referencia',
              items: [
                { text: 'Ajustes', link: '/es/docs/settings' },
                { text: 'Configuración', link: '/es/docs/configuration' },
                { text: 'FAQ', link: '/es/docs/faq' },
                { text: 'Soporte', link: '/es/support' },
                { text: 'Privacidad', link: '/es/privacy' },
                { text: 'Términos', link: '/es/terms' },
                { text: 'Eliminar cuenta', link: '/es/account-delete' }
              ]
            }
          ]
        },
        search: {
          provider: 'local'
        }
      }
    }
  },

  outDir: './.vitepress/dist',
  assetsDir: './assets',

  vite: {
    plugins: [
      ViteImageOptimizer({
        test: /\.(jpe?g|png|gif|webp|avif)$/i,
        exclude: [
          'app_icon.png',
          'favicon.ico'
        ],
        includePublic: true,
        cache: true,
        cacheLocation: 'node_modules/.vite-image-optimizer',
        logStats: true,
        ansiColors: true,
        svg: {
          multipass: true
        },
        png: {
          quality: 80,
          compressionLevel: 9
        },
        jpeg: {
          quality: 80
        },
        webp: {
          quality: 80
        }
      })
    ]
  }
})
