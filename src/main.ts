import { createApp } from 'vue';
import { Quasar, Notify } from 'quasar';
import { createPinia } from 'pinia';
import router from './router';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';
// Import Quasar css
import 'quasar/dist/quasar.css';

import App from './App.vue';

createApp(App)
  .use(router)
  .use(createPinia())
  .use(Quasar, {
    plugins: {
      Notify,
    }, // import Quasar plugins and add here
  })
  .mount('#app');
