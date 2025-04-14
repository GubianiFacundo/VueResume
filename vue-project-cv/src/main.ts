import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './plugins/i18n';

import router from './router/router'
import App from './App.vue'
import vuetify from './plugins/vuetify'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)


app.mount('#app')
