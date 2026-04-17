import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'NIMOTECODE',
  description: 'A powerful mobile remote IDE for developers',
  base: '/',

  // Theme configuration
  themeConfig: {
    logo: '/logo.png',
    
    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nimotecode' },
      { icon: 'twitter', link: 'https://twitter.com/nimotecode' },
      { icon: 'discord', link: 'https://discord.gg/nimotecode' }
    ],
    
    // Footer configuration
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 NimoteCode'
    },
    
    // Edit link configuration
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
          { text: 'Documentation', link: '/docs/quick-start' },
          { text: 'Support', link: '/support' },
          { text: 'Account Deletion', link: '/account-delete' },
          { text: 'Privacy', link: '/privacy' },
          { text: 'Terms', link: '/terms' }
        ],
        sidebar: {
          '/': [
            {
              text: 'Getting Started',
              items: [
                { text: 'Quick Start', link: '/docs/quick-start' },
                { text: 'Introduction', link: '/introduction' },
                { text: 'Features', link: '/features' },
                { text: 'Download', link: '/download' }
              ]
            },
            {
              text: 'Documentation',
              items: [
                { text: 'SSH Remote Development', link: '/docs/ssh' },
                { text: 'Terminal Usage', link: '/docs/terminal' },
                { text: 'Source Control Workflow', link: '/docs/source-control' },
                { text: 'AI Assistant', link: '/docs/ai' },
                { text: 'LSP Panel', link: '/docs/lsp' },
                { text: 'Debug Panel', link: '/docs/debug' },
                { text: 'Tasks Panel', link: '/docs/tasks' },
                { text: 'Timeline Panel', link: '/docs/timeline' },
                { text: 'Sync / Cache Panel', link: '/docs/sync-cache' },
                { text: 'Settings', link: '/docs/settings' },
                { text: 'Configuration', link: '/docs/configuration' }
              ]
            },
            {
              text: 'Help',
              items: [
                { text: 'FAQ', link: '/docs/faq' },
                { text: 'Support', link: '/support' }
              ]
            }
          ]
        },
        
        // Search configuration
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
                { text: '下载', link: '/zh/download' }
              ]
            },
            {
              text: '文档',
              items: [
                { text: 'SSH 远程开发', link: '/zh/docs/ssh' },
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
    }
  },
  
  // Build configuration
  build: {
    outDir: './dist',
    assetsDir: './assets',
    emptyOutDir: true
  }
})
