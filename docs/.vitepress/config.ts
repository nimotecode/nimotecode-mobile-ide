import { defineConfig, type HeadConfig, type TransformContext } from 'vitepress'

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
  const description = asContent(
    context.pageData.frontmatter.description,
    asContent(context.siteConfig.description, 'NimoteCode mobile developer workspace documentation.')
  )

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

  return schemas
}

export default defineConfig({
  title: 'NimoteCode',
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
    const description = asContent(
      context.pageData.frontmatter.description,
      asContent(context.siteConfig.description, 'NimoteCode mobile developer workspace.')
    )
    const image = asContent(context.pageData.frontmatter.image, socialImage)

    return [
      ['link', { rel: 'canonical', href: url }],
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
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;600;700;800&family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap'
    }]
  ],

  themeConfig: {
    siteTitle: 'NimoteCode',
    logo: {
      light: '/logo-light.png',
      dark: '/logo-dark.png'
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
          { text: 'Pro', link: '/pro' },
          { text: 'Docs', link: '/docs/quick-start' },
          { text: 'Download', link: '/download' },
          { text: 'Support', link: '/support' }
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
              text: '文档',
              items: [
                { text: 'SSH 远程开发', link: '/zh/docs/ssh' },
                { text: '编辑器', link: '/zh/docs/editor' },
                { text: '终端使用', link: '/zh/docs/terminal' },
                { text: 'Source Control 工作流', link: '/zh/docs/source-control' },
                { text: 'AI 助手', link: '/zh/docs/ai' },
                { text: 'LSP 面板', link: '/zh/docs/lsp' },
                { text: '调试面板', link: '/zh/docs/debug' },
                { text: 'Tasks 面板', link: '/zh/docs/tasks' },
                { text: 'Timeline 面板', link: '/zh/docs/timeline' },
                { text: 'Sync / Cache 面板', link: '/zh/docs/sync-cache' },
                { text: '设置', link: '/zh/docs/settings' },
                { text: '配置', link: '/zh/docs/configuration' }
              ]
            },
            {
              text: '帮助',
              items: [
                { text: '常见问题', link: '/zh/docs/faq' },
                { text: '支持', link: '/zh/support' }
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
              text: 'ドキュメント',
              items: [
                { text: 'SSHリモート開発', link: '/ja/docs/ssh' },
                { text: 'ターミナル使用', link: '/ja/docs/terminal' },
                { text: 'Source Controlワークフロー', link: '/ja/docs/source-control' },
                { text: 'AIアシスタント', link: '/ja/docs/ai' },
                { text: 'LSPパネル', link: '/ja/docs/lsp' },
                { text: 'デバッグパネル', link: '/ja/docs/debug' },
                { text: 'Tasksパネル', link: '/ja/docs/tasks' },
                { text: 'Timelineパネル', link: '/ja/docs/timeline' },
                { text: 'Sync / Cacheパネル', link: '/ja/docs/sync-cache' },
                { text: '設定', link: '/ja/docs/settings' },
                { text: '構成', link: '/ja/docs/configuration' }
              ]
            },
            {
              text: 'ヘルプ',
              items: [
                { text: 'FAQ', link: '/ja/docs/faq' },
                { text: 'サポート', link: '/ja/support' }
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
          { text: '문서', link: '/ko/docs/quick-start' },
          { text: '지원', link: '/ko/support' },
          { text: '계정 삭제', link: '/ko/account-delete' },
          { text: '개인정보', link: '/ko/privacy' },
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
              text: '문서',
              items: [
                { text: 'SSH 원격 개발', link: '/ko/docs/ssh' },
                { text: '터미널 사용', link: '/ko/docs/terminal' },
                { text: 'Source Control 워크플로우', link: '/ko/docs/source-control' },
                { text: 'AI 어시스턴트', link: '/ko/docs/ai' },
                { text: 'LSP 패널', link: '/ko/docs/lsp' },
                { text: '디버그 패널', link: '/ko/docs/debug' },
                { text: 'Tasks 패널', link: '/ko/docs/tasks' },
                { text: 'Timeline 패널', link: '/ko/docs/timeline' },
                { text: 'Sync / Cache 패널', link: '/ko/docs/sync-cache' },
                { text: '설정', link: '/ko/docs/settings' },
                { text: '구성', link: '/ko/docs/configuration' }
              ]
            },
            {
              text: '도움말',
              items: [
                { text: 'FAQ', link: '/ko/docs/faq' },
                { text: '지원', link: '/ko/support' }
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
              text: 'Документация',
              items: [
                { text: 'SSH-разработка', link: '/ru/docs/ssh' },
                { text: 'Использование терминала', link: '/ru/docs/terminal' },
                { text: 'Source Control', link: '/ru/docs/source-control' },
                { text: 'AI-ассистент', link: '/ru/docs/ai' },
                { text: 'Панель LSP', link: '/ru/docs/lsp' },
                { text: 'Панель Debug', link: '/ru/docs/debug' },
                { text: 'Панель Tasks', link: '/ru/docs/tasks' },
                { text: 'Панель Timeline', link: '/ru/docs/timeline' },
                { text: 'Sync / Cache', link: '/ru/docs/sync-cache' },
                { text: 'Настройки', link: '/ru/docs/settings' },
                { text: 'Конфигурация', link: '/ru/docs/configuration' }
              ]
            },
            {
              text: 'Помощь',
              items: [
                { text: 'FAQ', link: '/ru/docs/faq' },
                { text: 'Поддержка', link: '/ru/support' }
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
              text: 'Documentación',
              items: [
                { text: 'Desarrollo SSH', link: '/es/docs/ssh' },
                { text: 'Uso del terminal', link: '/es/docs/terminal' },
                { text: 'Source Control', link: '/es/docs/source-control' },
                { text: 'Asistente AI', link: '/es/docs/ai' },
                { text: 'Panel LSP', link: '/es/docs/lsp' },
                { text: 'Panel Debug', link: '/es/docs/debug' },
                { text: 'Panel Tasks', link: '/es/docs/tasks' },
                { text: 'Panel Timeline', link: '/es/docs/timeline' },
                { text: 'Sync / Cache', link: '/es/docs/sync-cache' },
                { text: 'Ajustes', link: '/es/docs/settings' },
                { text: 'Configuración', link: '/es/docs/configuration' }
              ]
            },
            {
              text: 'Ayuda',
              items: [
                { text: 'FAQ', link: '/es/docs/faq' },
                { text: 'Soporte', link: '/es/support' }
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

  build: {
    outDir: './dist',
    assetsDir: './assets',
    emptyOutDir: true
  }
})
