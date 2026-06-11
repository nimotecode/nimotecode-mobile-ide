import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import PricingFeatureSystem from './components/PricingFeatureSystem.vue'
import { type Theme } from 'vitepress'
import './custom.css'

const theme: Theme = {
  extends: DefaultTheme,
  Layout,

  enhanceApp({ app }) {
    app.component('PricingFeatureSystem', PricingFeatureSystem)
  }
}

export default theme
