//CONFIGURATION LANG
import * as lang from "../src/translations/lang.json";
const obj = JSON.parse(JSON.stringify(lang));
const messages = obj;

import { createApp } from "vue";
import App from "./App.vue";
import * as vueRouter from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { createI18n } from "vue-i18n";

const router = vueRouter.createRouter({
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
		// {
		// 	path: "/about",
		// 	name: "About",
		// 	component: () => import("./views/About.vue"),
		// },
	],
});

export const i18n = createI18n({
	// something vue-i18n options here ...
	locale: "pl", // set locale
	fallbackLocale: "en", // set fallback locale
	messages, // set locale messages
});
export default router;
const app = createApp(App);

app.use(router).use(i18n).mount("#app");
