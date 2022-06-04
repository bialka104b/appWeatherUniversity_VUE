//CONFIGURATION LANG
import * as lang from "../src/translations/lang.json";
const obj = JSON.parse(JSON.stringify(lang));
const messages = obj;

import { createApp } from "vue";
import App from "./App.vue";
import * as vueRouter from "vue-router";
import { createI18n } from "vue-i18n";

export const router = vueRouter.createRouter({
	history: vueRouter.createWebHistory(),
	routes: [
		{
			path: "/",
			name: "Weather5Days",
			component: () => import("./components/Weather5Days.vue"),
		},
		{
			path: "/weather48h",
			name: "Weather48h",
			component: () => import("./components/Weather2Days.vue"),
		},
	],
});

export const i18n = createI18n({
	locale: "pl", // set locale
	fallbackLocale: "en", // set fallback locale
	messages,
});

const app = createApp(App);

app.use(router)
app.use(i18n)
app.mount("#app");
