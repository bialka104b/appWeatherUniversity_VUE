<script setup>
import TheWelcome from './components/Weather5Days.vue'
import { restElement } from '@babel/types';
</script>

<template>
    <div class="">
		<router-link to="/weather48h" class="d-block fw-bold btn-primary">Pogoda 48h</router-link>
		<router-link to="/" class="d-block fw-bold btn-primary">Pogoda pięciodniowa</router-link>
		<!-- <main id="main">
                <router-view />
        </main> -->
      	<Header />
        <main class="">
			<router-view />

			<!-- <section>
				<div class="container">
				<div class="row border">
					<div class="col-4 coord">
					długośc geograficzna: {{coord.lon}}<br>
					szerokość geograficzna: {{coord.lat}}
					</div>
					<div class="col-4 weather" v-for="item in weather" :key="item">
					
					pogoda: {{item.description}}<br>
					<img :src="linkIcon(item.icon)" alt=""><br>
					pogoda główna: {{item.main}}
					</div>
					<div class="col-4 base">Parametr wewnętrzny: {{base}}</div>
				</div>
				<div class="row border">
					
					<div class="col-4 visibility">widoczność: {{visibility}} meters</div>
					
				</div>
				<div class="row border">
					<div class="col-4 clouds">zachmurzenie: {{clouds.all}}%</div>
					<div class="col-4 dt">Czas obliczenia danych: {{dt}} UTC</div>
					<div class="col-4 sys">
					Kod kraju: {{sys.country}}<br>
					Czas wschodu słońca: {{sys.sunrise}} UTC<br>
					Czas zachodu słońca: {{sys.sunset}} UTC<br>
					</div>
				</div>
				<div class="row border">
					<div class="col-4 timezone">Przesunięcie  w sekundach od UTC: {{timezone}}</div>
					<div class="col-4">Identyfikator miasta: {{id}}</div>
					<div class="col-4 name">Nazwa miasta: {{name}}</div>
					<div class="col-4 cod">Parametr wewnętrzny: {{cod}}</div>
				</div>
				</div>
			</section> -->
    	</main>
  	</div>
</template>

<script>
import cities from './module/cities';
import citiesWorld from './module/citiesWorld';
import lang from './module/language';
import Header from './components/Header.vue';

export default {
	name: "app",
	components: {
		Header,
	},
	data() {
		return {
			
      	}
    },

    async created(){
    },
    methods: {
		
  	},
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="scss">
@import './assets/base.css';
@import './scss/app.scss';

.col-4 {
    // background-image: url("./assets/images/sunset.jpg");
    background-size: cover;
}
.multiselect__content {
	min-width: 0;
	width:100%
}
</style>
