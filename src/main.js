import { createApp } from 'vue'
import App from './App.vue';
import * as vueRouter from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

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
const app = createApp(App);

app.use(router).mount("#app");
