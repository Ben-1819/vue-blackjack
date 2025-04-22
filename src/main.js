import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Player from './components/Player.vue'
import Dealer from './components/Dealer.vue'
import Results from './components/Results.vue'

createApp(App)
.component("Player", Player)
.component("Dealer", Dealer)
.component("Results", Results)
.mount('#app')
