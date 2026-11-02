import { createApp } from 'vue'
import ZaehlerstandWidget from './components/ZaehlerstandWidget.vue'

const widgetElements = document.querySelectorAll<HTMLElement>('[data-zaehlerstand-widget]')

widgetElements.forEach((el) => {
  const energyType = el.dataset.energyType as 'gas' | 'strom' | undefined
  const showHistory = el.dataset.showHistory !== 'false'
  const successMessage = el.dataset.successMessage

  createApp(ZaehlerstandWidget, {
    energyType,
    showHistory,
    successMessage,
  }).mount(el)
})
