<template>
	<div>
		<section class="container-fluid section py-5">
			<div class="row m-0 pr-5">
				<div class="col-8">
					<div class="row m-0 mx-5">
						<div class="col-12 bgOpacity my-4 bRadius">
							<h2>
								{{ name }}
								<p class="h6 pt-2">Województwo: {{ city.WOJ != undefined ? city.WOJ : 'podkarpackie' }}</p>
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
										{{ item.description }}
										<img
											:src="linkIcon(item.icon)"
											alt=""
											style="background: pink"
										/>
									</h5>
									<p class="text-capitalize">
										wilgotność: {{ currentWeather.humidity }} %
									</p>
									<p class="text-capitalize">
										prędkość wiatru: {{ currentWeather.wind_speed }} m/s
									</p>
								</div>
							</div>
						</div>
						<div class="col-12 bgOpacity my-4 bRadius">
							<div class="row">
								<div class="col-7">
									<SunriseSunset :sys="sys" :visible="currentWeather.visibility">
									</SunriseSunset>
									<UV :uvi="currentWeather.uvi"/>
								</div>
								<div class="col-5">
									Alerty pogodowe:
									<Alerts :alerts="alertsWeather" />
								</div>
							</div>
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
						></VueMultiselect>
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
							label="STOLICA"
							track-by="STOLICA"
							@close="selectCityWorld(cityWorld)"
							:show-labels="false"
						>
							<template v-slot:option="{ option }">
								<div class="">
									<p class="mb-0 w-100">{{ option.STOLICA }}</p>
									<span class="">{{ option.PANSTWO }} - </span>
									<span class="">{{ option.KONTYNENT }}</span>
								</div>
							</template>
						</VueMultiselect>
					</div>
					<div class="container-fluid">
						<router-link to="/weather48h" class="d-block fw-bold btn btn-success my-2">Pogoda 48h</router-link>
						<router-link to="/" class="d-block fw-bold btn btn-info my-2">Pogoda pięciodniowa</router-link>`
					</div>
				</div>
			</div>
		</section>
		<section class="weather2Days py-5">
			<div class="container">
				<div class="row m-0">
					<div class="col-6">
						<!-- <Forecast1
							:cityName="cityName"
							:lat="12"
							:lon="15"
							:table="listInfoForecast"
							:tempHeader="main.temp"
							:defaultTableDayTemp="defaultTable"
						/> -->
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
			city: {},
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
			cityWorld: { STOLICA: "Rzeszów", PANSTWO: "Polska", KONTYNENT: "Europa" },

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
			this.city.WOJ = '';
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
					`${this.URLWeather}q=${this.cityName}&lat=${this.lat}&lon=${this.lon}&appid=${this.API_KEY}&lang=${this.selectedLang}&units=metric`,
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
					`${this.URLOneCall}lat=${lat}&lon=${lon}&exclude=&units=metric&lang=pl&appid=${this.API_KEY}`,
				)
				.then((res) => {
					if (res.status == 200) {
						this.listResultsOneCall = res.data;
						this.currentWeather = res.data.current;
						this.dailyWeather = res.data.daily;
						this.hourlyWeather = res.data.hourly;
						this.minutelyWeather = res.data.minutely;
						this.alertsWeather = res.data.alerts;
						console.log(res.data.alerts, "red data one call", res.data);
					} else {
						console.log(res);
					}
				})
				.catch((err) => {
					console.log(err, "forecast");
				});
		},
	},
};
</script>
