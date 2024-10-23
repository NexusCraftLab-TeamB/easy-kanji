// import { createApp } from 'vue'

// // Vuetify
// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
// // Router
// import router from './router'
// // Components
// import App from './App.vue'

// const vuetify = createVuetify({
//   components,
//   directives,
// })

// const app = createApp(App)

// app.use(vuetify)
// app.use(router)

// app.mount('#app')

import { createApp } from 'vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Router
import router from './router';

// AWS Amplify
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports'; // aws-exports.js のパスを指定

// Components
import App from './App.vue';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

// 設定を追加
Amplify.configure(awsconfig);

app.use(vuetify);
app.use(router);

app.mount('#app');
