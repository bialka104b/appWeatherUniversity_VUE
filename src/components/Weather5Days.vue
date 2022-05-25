<script setup>
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
import SupportIcon from "./icons/IconSupport.vue";
</script>

<template>
	<!-- <div>
    <WelcomeItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Documentation</template>

      Vue’s
      <a target="_blank" href="https://vuejs.org/">official documentation</a>
      provides you with all information you need to get started.
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <ToolingIcon />
      </template>
      <template #heading>Tooling</template>

      This project is served and bundled with
      <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite</a>. The recommended IDE
      setup is <a href="https://code.visualstudio.com/" target="_blank">VSCode</a> +
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>. If you need to test
      your components and web pages, check out
      <a href="https://www.cypress.io/" target="_blank">Cypress</a> and
      <a href="https://docs.cypress.io/guides/component-testing/introduction" target="_blank"
        >Cypress Component Testing</a
      >.

      <br />

      More instructions are available in <code>README.md</code>.
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <EcosystemIcon />
      </template>
      <template #heading>Ecosystem</template>

      Get official tools and libraries for your project:
      <a target="_blank" href="https://pinia.vuejs.org/">Pinia</a>,
      <a target="_blank" href="https://router.vuejs.org/">Vue Router</a>,
      <a target="_blank" href="https://test-utils.vuejs.org/">Vue Test Utils</a>, and
      <a target="_blank" href="https://github.com/vuejs/devtools">Vue Dev Tools</a>. If you need more
      resources, we suggest paying
      <a target="_blank" href="https://github.com/vuejs/awesome-vue">Awesome Vue</a>
      a visit.
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <CommunityIcon />
      </template>
      <template #heading>Community</template>

      Got stuck? Ask your question on
      <a target="_blank" href="https://chat.vuejs.org">Vue Land</a>, our official Discord server, or
      <a target="_blank" href="https://stackoverflow.com/questions/tagged/vue.js">StackOverflow</a>.
      You should also subscribe to
      <a target="_blank" href="https://news.vuejs.org">our mailing list</a> and follow the official
      <a target="_blank" href="https://twitter.com/vuejs">@vuejs</a>
      twitter account for latest news in the Vue world.
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <SupportIcon />
      </template>
      <template #heading>Support Vue</template>

      As an independent project, Vue relies on community backing for its sustainability. You can help
      us by
      <a target="_blank" href="https://vuejs.org/sponsor/">becoming a sponsor</a>.
    </WelcomeItem>


  </div> -->
	<div>
		<section class="container-fluid section">
			<div class="row m-0 pr-5">
				<div class="col-8 p-0">
					<div class="row m-0 mx-5">
						<div class="col-12 bgOpacity my-4 bRadius">
							<h2>
								{{ name }}
								<p class="h6 pt-2">Województwo: {{ city.WOJ }}</p>
							</h2>

							<div class="d-flex">
								<div class="flex-grow-1">
									<img src="../assets/icons/temperature.svg" />
									<h5 class="d-inline-block">{{ main.temp }} &#x2103;</h5>
								</div>
								<div class="flex-fill">
									<h5 class="text-capitalize" v-for="item in weather" :key="item">
										{{ item.description }}
										<img
											:src="linkIcon(item.icon)"
											alt=""
											style="background: pink"
										/>
									</h5>
									<p class="text-capitalize">wilgotność: {{ main.humidity }} %</p>
									<p class="text-capitalize">
										prędkość wiatru: {{ wind.speed }} m/s
									</p>
								</div>
							</div>
						</div>
						<div class="col-12 bgOpacity my-4 bRadius">
							<SunriseSunset :sys="sys" :visible="visibility"></SunriseSunset>
						</div>
					</div>
				</div>
				<div class="col-4 my-4 bgOpacity bRadius">
					<div class="container-fluid py-1">
						<label for="">Wybierz miasto Polski</label>
						<VueMultiselect
							v-model="city"
							:options="myCities"
							:close-on-select="true"
							:clear-on-select="false"
							:placeholder="'Select City'"
							:hideSelected="true"
							:show-labels="false"
							label="NAZWA"
							track-by="NAZWA"
							@close="selectCity(city)"
						/>
					</div>
					<div class="container-fluid py-1">
						<label for="">Wybierz stolice świata</label>
						<VueMultiselect
							v-model="cityWorld"
							:options="myCitiesWorld"
							:close-on-select="true"
							:clear-on-select="false"
							:placeholder="'Select City'"
							:custom-label="nameWithLang"
							:hideSelected="true"
							:show-labels="false"
							label="STOLICA"
							track-by="STOLICA"
							@close="selectCityWorld(cityWorld)"
						>
							<!-- :show-labels="false" -->
							<template v-slot:option="{ option }">
								<div class="">
									<p class="mb-0 w-100">{{ option.STOLICA }}</p>
									<div class="country">{{ option.PANSTWO }}</div>
									<div class="">{{ option.KONTYNENT }}</div>
								</div>
							</template>
						</VueMultiselect>
					</div>
					<div class="container-fluid py-1">
						<label for="">Wybierz jednostkę temperatury</label>
						<VueMultiselect
							v-model="unitsTemp"
							:options="temperatureUnit"
							:close-on-select="true"
							:clear-on-select="false"
							placeholder="Select unit temperature"
							:hideSelected="true"
							:show-labels="false"
							label="unit"
							track-by="unit"
							@close="selectUnitTemp(unitsTemp)"
						/>
					</div>
					<div class="container-fluid py-1">
						<label for="">Wybierz język</label>
						<VueMultiselect
							v-model="selectedLang"
							:options="myLang"
							:close-on-select="true"
							:clear-on-select="false"
							placeholder="Select Lang"
							:hideSelected="true"
							:show-labels="false"
							label="lang"
							track-by="lang"
							@close="selectLang(selectedLang)"
						/>
					</div>
					<div class="container-fluid">
						<router-link to="/weather48h" class="d-block fw-bold btn btn-success my-2">Pogoda 48h</router-link>
						<router-link to="/" class="d-block fw-bold btn btn-info my-2">Pogoda pięciodniowa</router-link>`
					</div>
				</div>
			</div>
		</section>
		<section class="weather5Days">
			<div class="container-fluid">
				<div class="row m-0">
					<div class="col-12 m-auto">
						<Forecast1
							:cityName="cityName"
							:lat="12"
							:lon="15"
							:table="listInfoForecast"
							:tempHeader="main.temp"
							:defaultTableDayTemp="defaultTable"
						/>
					</div>
					<div class="col-12">
						<Temperature
							:cityName="cityName"
							:lat="12"
							:lon="15"
							:table="listInfoForecast"
						/>
						<button>dd</button>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import cities from "../module/cities";
import citiesWorld from "../module/citiesWorld";
import lang from "../module/language";
import axios from "axios";
import Forecast1 from "./Forecast1.vue";
import Temperature from "./Temperature.vue";

import SunriseSunset from "./SunriseSunset.vue";
import VueMultiselect from "vue-multiselect";
export default {
	setup() {},
	components: {
		Forecast1,
		Temperature,
		SunriseSunset,
		VueMultiselect,
	},
	data() {
		return {
			//FORECAST
			listResultsForecast: [],
			cityInfoForecast: {},
			listInfoForecast: [],
			defaultTable: [],

			myCities: [],
			myCitiesWorld: [],
			city: {},
			cityWorld: { STOLICA: "Rzeszów", PANSTWO: "Polska", KONTYNENT: "Europa" },
			unitsTemp: null,
			temperatureUnit: [
				{ key: "metric", unit: "Celciusza" },
				{ key: "imperial", unit: "Farenhajta" },
				{ key: "", unit: "Kelwina" },
			],
			selectedTemperatureUnit: "metric",
			myLang: [],
			selectedLang: "pl",

			result: [],
			lat: "",
			lon: "",
			cityName: "Rzeszów",
			coord: {},
			weather: [],
			base: "",
			main: {},
			visibility: 0,
			wind: {},
			clouds: {},
			dt: 0,
			sys: {},
			timezone: 0,
			id: 0,
			name: "",
			cod: 0,

			//API
			API_KEY: "5baab241d44debf04d78944091967607",
			// API_KEY: '1c7fbae096fe77971b1dc5aa8fcd17ae',
			URLWeather: "https://api.openweathermap.org/data/2.5/weather?",
			URLForecast: "https://api.openweathermap.org/data/2.5/forecast?",
		};
	},
	async created() {
		const resultCity = JSON.parse(cities());
		const resultCityWorld = JSON.parse(citiesWorld());
		this.myCities = resultCity;
		this.myCitiesWorld = resultCityWorld;
		this.myLang = lang();
		this.getWeather();
		await this.daily();
	},
	methods: {
		nameWithLang({ STOLICA, PANSTWO, KONTYNENT }) {
			return `${STOLICA}`;
		},
		async selectCityWorld(e) {
			this.cityName = e.STOLICA;
			await this.getWeather();
			await this.daily(this.coord.lat, this.coord.lon, this.selectedTemperatureUnit);
		},

		async selectCity(e) {
			this.cityName = e.NAZWA;
			await this.getWeather();
			await this.daily(this.coord.lat, this.coord.lon, this.selectedTemperatureUnit);
		},

		selectUnitTemp(e) {
			this.selectedTemperatureUnit = e.key;
			this.getWeather();
			this.daily(this.coord.lat, this.coord.lon, this.selectedTemperatureUnit);
		},

		selectLang(e) {
			this.selectedLang = e.key;
			this.getWeather();
		},
		async getWeather() {
			await axios
				.get(
					`${this.URLWeather}q=${this.cityName}&lat=${this.lat}&lon=${this.lon}&appid=${this.API_KEY}&lang=${this.selectedLang}&units=${this.selectedTemperatureUnit}`,
				)
				.then((res) => {
					if (res.status == 200) {
						this.result = res.data;
						this.coord = res.data.coord;
						this.weather = res.data.weather;
						this.base = res.data.base;
						this.main = res.data.main;
						this.visibility = res.data.visibility;
						this.wind = res.data.wind;
						this.clouds = res.data.clouds;
						this.dt = res.data.dt;
						this.sys = res.data.sys;
						this.timezone = res.data.timezone;
						this.id = res.data.id;
						this.name = res.data.name;
						this.cod = res.data.cod;
						this.lon = res.data.coord.lon;
						this.lat = res.data.coord.lat;
					} else {
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},

		// FORECAST
		async daily(lat = 50.0413, lon = 21.999, units = "metric") {
			await axios
				.get(
					`${this.URLForecast}lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=${units}`,
				)
				.then((res) => {
					if (res.status == 200) {
						this.listResultsForecast = res.data;
						this.cityInfoForecast = res.data.city;
						this.listInfoForecast = res.data.list;
						console.log(res.data, "resdata forecast");
					} else {
						console.log(res);
					}
				})
				.catch((err) => {
					console.log(err, "forecast");
				});
		},
		linkIcon(icon) {
			return `http://openweathermap.org/img/w/${icon}.png`;
		},
	},
};
</script>
