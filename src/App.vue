<script setup>
// import TheWelcome from './components/Weather5Days.vue'
import { restElement } from "@babel/types";
</script>

<template>
	<div class="">
		<Header />
		<main class="">
			<router-view />
		</main>
		<Footer />
		<div class="scrollTop bg-secondary d-none">
			<a href="#app">
				<i class="uil uil-top-arrow-to-top"></i>
			</a>
		</div>
	</div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
	name: "app",
	components: {
		Header,
		Footer,
	},
	data() {
		return {};
	},

	async created() {},
	methods: {},
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="scss">
@import "./assets/base.css";
@import "./scss/app.scss";

.col-4 {
	background-size: cover;
}
.multiselect__content {
	min-width: 0;
	width: 100%;
}
</style>
