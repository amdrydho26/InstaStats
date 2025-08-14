import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// Font Awesome setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBook, faCode, faAngleLeft} from '@fortawesome/free-solid-svg-icons'

library.add(faBook, faCode, faAngleLeft);

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
