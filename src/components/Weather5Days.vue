<script setup></script>

<template>
	<div>
		<section class="container-fluid section py-5">
			<div class="row m-0 pr-0 pr-lg-5 mt-5">
				<div class="col-12 col-lg-8">
					<div class="row m-0 mx-5">
						<div class="col-12 bgOpacity my-4 bRadius">
							<h2>
								{{ name }}
								<p class="h6 pt-2" v-if="city.WOJ != ''">
									{{ $t("province") }}:
									{{ city.WOJ != undefined ? city.WOJ : "podkarpackie" }}
								</p>
								<p class="h6 pt-2" v-if="city.WOJ == ''">
									{{ $t("country") }}:
									{{ cityWorld.PANSTWO != undefined ? cityWorld.PANSTWO: "" }}
								</p>
							</h2>

							<div class="d-flex">
								<div class="flex-grow-1">
									<img src="../assets/icons/temperature.svg" />
									<h5 class="d-inline-block">{{ main.temp }} &#x2103;</h5>
								</div>
								<div class="flex-fill">
									<h5 class="text-capitalize" v-for="item in weather" :key="item">
										{{ $t(`${item.description}`) }}
										<img
											:src="linkIcon(item.icon)"
											alt=""
											class="bg-secondary"
										/>
									</h5>
									<p class="text-capitalize">
										{{ $t("Humidity") }}: {{ main.humidity }} %
									</p>
									<p class="text-capitalize">
										{{ $t(`${"wind speed"}`) }}: {{ wind.speed }} m/s
									</p>
								</div>
							</div>
						</div>
						<div class="col-12 bgOpacity my-4 bRadius">
							<div class="row m-0">
								<div class="col-12 col-xl-7">
									<SunriseSunset :sys="sys" :visible="visibility"></SunriseSunset>
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
								/>
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
									:hideSelected="true"
									:show-labels="false"
									label="STOLICA"
									track-by="STOLICA"
									@close="selectCityWorld(cityWorld)"
								>
									<template v-slot:option="{ option }">
										<div class="">
											<p class="mb-0 w-100">{{ option.STOLICA }}</p>
											<div class="fontSmall country">
												{{ option.PANSTWO }}
											</div>
											<div class="fontSmall">{{ option.KONTYNENT }}</div>
										</div>
									</template>
								</VueMultiselect>
							</div>
							<div class="container-fluid py-1">
								<label for="" class="text-capitalize">{{
									$t("selectTemperatureUnit")
								}}</label>
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
		<section class="weather5Days py-5">
			<div class="container-fluid">
				<div class="row m-0">
					<div class="col-12">
						<h1 class="text-center text-secondary text-decoration-underline">
							{{ $t("forecastFor5Days") }}
						</h1>
					</div>
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
			listResultsForecast: [],
			cityInfoForecast: {},
			listInfoForecast: [],
			defaultTable: [],
			myCities: [],
			myCitiesWorld: [],
			city: { NAZWA: "Rzeszów" },
			cityWorld: {
				STOLICA: this.$t("selectCityWorld"),
				PANSTWO: "Polska",
				KONTYNENT: "Europa",
			},
			unitsTemp: null,
			temperatureUnit: [
				{ key: "metric", unit: "Celciusza" },
				{ key: "imperial", unit: "Farenhajta" },
				{ key: "", unit: "Kelwina" },
			],
			selectedTemperatureUnit: "metric",
			myLang: [],
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
			API_KEY: "5baab241d44debf04d78944091967607",
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
			this.city.WOJ = "";
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
		async getWeather() {
			await axios
				.get(
					`${this.URLWeather}q=${this.cityName}&lat=${this.lat}&lon=${this.lon}&appid=${this.API_KEY}&lang=en&units=${this.selectedTemperatureUnit}`,
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
					console.error(err, "getWeather - Weather5Days component");
				});
		},
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
					} else {
						console.error(res.status, "daily - Weather5Days component");
					}
				})
				.catch((err) => {
					console.error(err, "daily - Weather5Days component");
				});
		},
		linkIcon(icon) {
			return `http://openweathermap.org/img/w/${icon}.png`;
		},
	},
};
</script>
