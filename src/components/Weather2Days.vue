<template>
	<div>
		<section class="container-fluid section py-5 mt-2">
			<div class="row m-0 pr-0 pr-lg-5 mt-5">
				<div class="col-12 col-lg-8">
					<div class="row m-0 mx-5">
						<div class="col-12 bgOpacity my-4 bRadius">
							<h2>
								{{ name }}
								<p class="h6 pt-2">
									{{ $t("province") }}:
									{{ city.WOJ != undefined ? city.WOJ : "podkarpackie" }}
								</p>
							</h2>

							<div class="d-flex">
								<div class="flex-grow-1">
									<img src="../assets/icons/temperature.svg" />
									<h5 class="d-inline-block">
										{{ currentWeather.temp }} &#x2103;
									</h5>
								</div>
								<div class="flex-fill">
									<h5
										class="text-capitalize"
										v-for="item in currentWeather.weather"
										:key="item"
									>
										{{ $t(`${item.description}`) }}
										<img
											:src="linkIcon(item.icon)"
											alt=""
											class="bg-secondary"
										/>
									</h5>
									<p class="text-capitalize mb-1 mb-md-3">
										{{ $t("Humidity") }}: {{ currentWeather.humidity }} %
									</p>
									<p class="text-capitalize mb-1 mb-md-3">
										{{ $t(`${"wind speed"}`) }}:
										{{ currentWeather.wind_speed }} m/s
									</p>
								</div>
							</div>
						</div>
						<div class="col-12 bgOpacity my-4 bRadius">
							<div class="row m-0">
								<div class="col-12 col-xl-7">
									<SunriseSunset :sys="sys" :visible="currentWeather.visibility">
									</SunriseSunset>
									<UV :uvi="currentWeather.uvi" />
								</div>
								<hr class="hr d-xl-none" />
								<div class="col-12 col-xl-5 text-capitalize mt-0 mt-md-3 mt-xl-0">
									{{ $t("weatherAlerts") }}:
									<Alerts :alerts="alertsWeather" />
									<span v-if="alertsWeather == undefined">{{
										$t("noAlerts")
									}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-4 my-4">
					<div class="row mx-5 mx-lg-0 h-100">
						<div class="col-12 bgOpacity bRadius d-flex flex-column">
							<div class="container-fluid py-1">
								<label for="">{{ $t("selectCityInPoland") }}</label>
								<VueMultiselect
									v-model="city"
									:options="myCities"
									:close-on-select="true"
									:clear-on-select="false"
									:placeholder="$t('selectCityInPoland')"
									:hideSelected="true"
									:show-labels="false"
									label="NAZWA"
									track-by="NAZWA"
									@close="selectCity(city)"
								></VueMultiselect>
							</div>
							<div class="container-fluid py-1">
								<label for="">{{ $t("selectCityWorld") }}</label>
								<VueMultiselect
									v-model="cityWorld"
									:options="myCitiesWorld"
									:close-on-select="true"
									:clear-on-select="false"
									:placeholder="$t('selectCityWorld')"
									:custom-label="nameWithLang"
									label="STOLICA"
									track-by="STOLICA"
									@close="selectCityWorld(cityWorld)"
									:show-labels="false"
								>
									<template v-slot:option="{ option }">
										<div class="">
											<p class="mb-0 w-100">{{ option.STOLICA }}</p>
											<div class="fontSmall country">{{ option.PANSTWO }} - </div>
											<div class="fontSmall">{{ option.KONTYNENT }}</div>
										</div>
									</template>
								</VueMultiselect>
							</div>
							<div class="container-fluid mt-auto">
								<router-link
									to="/weather48h"
									class="d-block fw-bold btn btn-success my-2"
									>{{ $t("Weather48h") }}</router-link
								>
								<router-link to="/" class="d-block fw-bold btn btn-info my-2">{{
									$t("WeatherFor5Days")
								}}</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="weather2Days py-5">
			<div class="container">
				<div class="row m-0">
					<div class="col-12">
						<h1 class="text-center text-secondary text-decoration-underline">
							{{ $t("forecastFor48Hour") }}
						</h1>
					</div>
					<div class="col-12">
						<Weather48Chart
							:cityName="cityName"
							:lat="12"
							:lon="15"
							:table="hourlyWeather"
						/>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import SunriseSunset from "./SunriseSunset.vue";
import UV from "./UV.vue";
import Alerts from "./Alerts.vue";
import VueMultiselect from "vue-multiselect";
import cities from "../module/cities";
import citiesWorld from "../module/citiesWorld";
import Weather48Chart from "./Weather48Chart.vue";
// import lang from '../module/language';
import axios from "axios";

export default {
	name: "weather48h",
	props: {},
	components: {
		SunriseSunset,
		VueMultiselect,
		Weather48Chart,
		Alerts,
		UV,
	},
	data() {
		return {
			result: [],
			cityName: "Rzeszów",
			city: { NAZWA: "Rzeszów" },
			coord: {},
			sys: {},
			name: "",

			currentWeather: {},
			dailyWeather: [],
			hourlyWeather: [],
			minutelyWeather: [],
			alertsWeather: [],

			myCities: [],
			myCitiesWorld: [],
			cityWorld: {
				STOLICA: this.$t("selectCityWorld"),
				PANSTWO: "Polska",
				KONTYNENT: "Europa",
			},

			//API
			API_KEY: "5baab241d44debf04d78944091967607",
			// API_KEY: '1c7fbae096fe77971b1dc5aa8fcd17ae',
			URLWeather: "https://api.openweathermap.org/data/2.5/weather?",
			URLOneCall: "https://api.openweathermap.org/data/2.5/onecall?",
		};
	},
	created() {
		const resultCity = JSON.parse(cities());
		const resultCityWorld = JSON.parse(citiesWorld());
		this.myCities = resultCity;
		this.myCitiesWorld = resultCityWorld;
		this.getWeather();
		this.daily48h();
	},
	methods: {
		nameWithLang({ STOLICA, PANSTWO, KONTYNENT }) {
			return `${STOLICA}`;
		},

		async selectCityWorld(e) {
			this.cityName = e.STOLICA;
			this.city.WOJ = "";
			await this.getWeather();
			await this.daily48h(this.coord.lat, this.coord.lon);
		},

		async selectCity(e) {
			this.cityName = e.NAZWA;
			await this.getWeather();
			await this.daily48h(this.coord.lat, this.coord.lon);
		},

		linkIcon(icon) {
			return `http://openweathermap.org/img/w/${icon}.png`;
		},

		async getWeather() {
			await axios
				.get(
					`${this.URLWeather}q=${this.cityName}&lat=${this.lat}&lon=${this.lon}&appid=${this.API_KEY}&lang=en&units=metric`,
				)
				.then((res) => {
					if (res.status == 200) {
						this.result = res.data;
						this.coord = res.data.coord;
						this.sys = res.data.sys;
						this.name = res.data.name;
					} else {
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},

		// FORECAST
		async daily48h(lat = 50.0413, lon = 21.999) {
			await axios
				.get(
					`${this.URLOneCall}lat=${lat}&lon=${lon}&exclude=&units=metric&lang=en&appid=${this.API_KEY}`,
				)
				.then((res) => {
					if (res.status == 200) {
						this.listResultsOneCall = res.data;
						this.currentWeather = res.data.current;
						this.dailyWeather = res.data.daily;
						this.hourlyWeather = res.data.hourly;
						this.minutelyWeather = res.data.minutely;
						this.alertsWeather = res.data.alerts;
					} else {
						console.log(res);
					}
				})
				.catch((err) => {
					console.log(err, "forecast");
				});
		},
	},
	watch: {
		cityPoland() {
			this.cityPoland = $t("selectCityInPoland");
		},
	},
};
</script>
