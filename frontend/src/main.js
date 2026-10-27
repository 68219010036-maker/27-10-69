import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import './style.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles'; 
import '@mdi/font/css/materialdesignicons.css';
import App from './App.vue';
import router from './router';

const vuetify = createVuetify({ components, directives });

const app = createApp(App); 
// error จาก API แสดงที่ snackbar แล้ว (ดู api.js) จึงไม่ต้องให้ขึ้นแดงใน Console ซ้ำฃ
app.config.errorHandler = (err) => console.error(err);
app.use(vuetify).use(router).mount('#app');
