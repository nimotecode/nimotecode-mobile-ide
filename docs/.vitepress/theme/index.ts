/// <reference types="vite/client" />

import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import PricingFeatureSystem from './components/PricingFeatureSystem.vue'
import { type Theme } from 'vitepress'
import './custom.css'

// @ts-ignore - Tells TypeScript to ignore the missing type definitions for this specific plugin
import googleAnalytics from 'vitepress-plugin-google-analytics'

const theme: Theme = {
  extends: DefaultTheme,
  Layout,

  enhanceApp({ app }) {
    app.component('PricingFeatureSystem', PricingFeatureSystem)
    
    // Only trigger tracking when the site is built and running in production
    if (import.meta.env.PROD) {
      googleAnalytics({
        id: 'G-JML9VGDMXJ', // Replace with your real ID
      })
    }
  }
}

export default theme
