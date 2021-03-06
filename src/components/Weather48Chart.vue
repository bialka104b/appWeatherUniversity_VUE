<script setup>
import WindDeg from "./WindDeg.vue";
</script>

<template>
	<div class="row flex-wrap-reverse flex-lg-wrap">
		<div class="text-secondary col-12 col-lg-3 mt-5">
			<h6 class="text-success text-center">{{ $t("windDirection") }}</h6>
			<table class="table table-sm">
				<thead>
					<tr class="">
						<th scope="col" class="text-secondary text-center">{{ $t("date") }}</th>
						<th scope="col" class="text-secondary text-center">
							{{ $t("windDirection") }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(value, index) in this.wind_degTab" :key="index" class="">
						<td class="text-secondary text-center">{{ this.daysTab[index] }}</td>
						<td
							class="text-secondary d-flex justify-content-around"
							v-if="(value >= 0 && value < 23) || value > 337"
						>
							<WindDeg :value="value" :symbol="'N'" />
						</td>
						<td
							class="text-secondary d-flex justify-content-around"
							v-if="value >= 23 && value < 69"
						>
							<WindDeg :value="value" :symbol="'NE'" />
						</td>
						<td
							class="text-secondary d-flex justify-content-around"
							v-if="value >= 69 && value < 113"
						>
							<WindDeg :value="value" :symbol="'E'" />
						</td>
						<td
							class="text-secondary d-flex justify-content-around"
							v-if="value >= 113 && value < 158"
						>
							<WindDeg :value="value" :symbol="'SE'" />
						</td>
						<td
							class="text-secondary d-flex justify-content-around"
							v-if="value >= 158 && value < 203"
						>
							<WindDeg :value="value" :symbol="'S'" />
						</td>
						<td
							class="text-secondary d-flex justify-content-around"
							v-if="value >= 203 && value < 248"
						>
							<WindDeg :value="value" :symbol="'SW'" />
						</td>
						<td
							class="text-secondary d-flex justify-content-around"
							v-if="value >= 248 && value < 293"
						>
							<WindDeg :value="value" :symbol="'W'" />
						</td>
						<td
							class="text-secondary d-flex justify-content-around"
							v-if="value >= 293 && value < 338"
						>
							<WindDeg :value="value" :symbol="'NW'" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="col-12 col-lg-9">
			<div class="row">
				<div class="text-dark col-12 mt-3 mt-md-5">
					<h3 class="text-success text-center">{{ $t("cloudy") }}</h3>
					<LineChart
						:cssClasses="'bg-secondary rounded boxShadow py-3 px-1'"
						:chartData="chartDataCloudsHumidity"
						:chartOptions="returnChartOptions(0, 100)"
						:height="350"
					/>
				</div>
				<div class="col-12 text-secondary mt-2">
					<p class="text-justify mb-2">
						{{ $t("descriptionHumidity") }}
					</p>
					<p class="text-justify mb-2">{{ $t("descriptionCloudiness") }}</p>
				</div>
				<div class="text-dark col-12 mt-3 mt-md-5">
					<h3 class="text-success text-center">{{ $t("dewPoint") }}</h3>
					<LineChart
						:cssClasses="'bg-secondary rounded boxShadow py-3 px-1'"
						:chartData="chartDataDewPointTemp"
						:chartOptions="returnChartOptions(0, 10)"
						:height="350"
					/>
				</div>
				<div class="col-12 text-secondary mt-2">
					<p class="text-justify mb-2">
						{{ $t("descriptionDewPoint") }}
					</p>
					<p class="text-justify mb-2">
						{{ $t("descriptionTemperature") }}
					</p>
				</div>
				<div class="text-dark col-12 mt-3 mt-md-5">
					<h3 class="text-success text-center">{{ $t("atmosphericPressure") }}</h3>
					<LineChart
						:cssClasses="'bg-secondary rounded boxShadow py-3 px-1'"
						:chartData="chartDataPressure"
						:chartOptions="returnChartOptions(1000, 1013)"
						:height="350"
					/>
				</div>
				<div class="col-12 text-secondary mt-2">
					<p class="text-justify mb-2">
						{{ $t("descriptionPressureMin") }} <br />
						{{ $t("descriptionPressureMax") }}
					</p>
				</div>
				<div class="text-dark col-12 mt-3 mt-md-5">
					<h3 class="text-success text-center">{{ $t("rainAndSnowfall") }}</h3>
					<LineChart
						:cssClasses="'bg-secondary rounded boxShadow py-3 px-1'"
						:chartData="chartDataRainSnow"
						:chartOptions="returnChartOptions(0, 1)"
						:height="350"
					/>
				</div>
				<div class="text-dark col-12 mt-3 mt-md-5">
					<h3 class="text-success text-center">{{ $t("windSpeedAndGust") }}</h3>
					<LineChart
						:cssClasses="'bg-secondary rounded boxShadow py-3 px-1'"
						:chartData="chartDataWindSpeedGust"
						:chartOptions="returnChartOptions(0, 1)"
						:height="350"
					/>
				</div>
				<div class="text-dark col-12 mt-3 mt-md-5">
					<h3 class="text-success text-center">{{ $t("UVradiation") }}</h3>
					<LineChart
						:cssClasses="'bg-secondary rounded boxShadow py-3 px-1'"
						:chartData="chartDataUvi"
						:chartOptions="returnChartOptions(0, 10)"
						:height="350"
					/>
				</div>
				<div class="text-dark col-12 mt-3 mt-md-5">
					<h3 class="text-success text-center">{{ $t("visibilityOnRoads") }}</h3>
					<LineChart
						:cssClasses="'bg-secondary rounded boxShadow py-3 px-1'"
						:chartData="chartDataVisibility"
						:chartOptions="returnChartOptions(0, 10)"
						:height="350"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import LineChart from "./../chart/LineChart";
import moment from "moment";
import { setBlockTracking } from "vue";
import { night, day, min, max}  from '../module/nightAndDay';

class Options {
	constructor(labelsFontSize, labelsColor, suggestedMin, suggestedMax) {
		this.responsive = true;
		this.maintainAspectRatio = false;
		this.plugins = {
			legend: {
				labels: {
					color: labelsColor,
					boxWidth: 20,
					fontFamily: "'Roboto'",
					fontSize: labelsFontSize,
					font: {
						weight: "bold",
					},
				},
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						let label = context.dataset.label || "";

						if (label == "Promieniowanie UV" && context.parsed.y !== null) {
							label += ": ";
							if (context.parsed.y < 3) {
								label += `${context.parsed.y} Brak zagrożeń dla zdrowego człowieka.`;
							} else if (context.parsed.y >= 3 && context.parsed.y < 6) {
								label += `${context.parsed.y} Średnie zagrożenie podczas dłuższego przebywania na słońcu.`;
							} else if (context.parsed.y >= 6 && context.parsed.y < 8) {
								label += `${context.parsed.y} Wysokie i bardzo wysokie zagrożenie podczas dłuższego przebywania na słońcu.`;
							} else if (context.parsed.y >= 8 && context.parsed.y < 11) {
								label += `${context.parsed.y} Bardzo wysokie zagrożenie podczas przebywania na słońcu.`;
							} else {
								label += `${context.parsed.y} Ekstremalne zagrożenie podczas przebywania na słońcu.`;
							}
						} else {
							label += `: ${context.parsed.y}`;
						}
						return label;
					},
				},
			},
		};
		this.scales = {};
		this.scales.y = {
			ticks: {
				color: labelsColor,
				font: {
					weight: "bold",
				},
			},
		};
		this.scales.x = {
			ticks: {
				color: labelsColor,
				font: {
					weight: "bold",
				},
			},
		};
	}
}

export default {
	props: {
		cityName: String,
		lat: Number,
		lon: Number,
		table: Array,
	},
	components: {
		LineChart,
		WindDeg,
	},
	data() {
		return {
			chartDataCloudsHumidity: {},
			chartDataDewPointTemp: {},
			chartDataWindDeg: {},
			chartDataRainSnow: {},
			chartDataWindSpeedGust: {},
			chartDataUvi: {},
			chartDataVisibility: {},

			chartOptionsClouds: {},
			chartOptionsPop: {},
			chartOptionsPressure: {},
			cloudsTab: [],
			dew_pointTab: [],
			dtTab: [],
			feels_LikeTab: [],
			humidityTab: [],
			popTab: [],
			pressureTab: [],
			rainTab: [],
			snowTab: [],
			tempTab: [],
			uviTab: [],
			visibilityTab: [],
			wind_degTab: [],
			wind_gustTab: [],
			wind_speedTab: [],
			dayNightRainTab:[],
			dayNightHumidityTab:[],
			dayNightPressureTab:[],
			dayNightTemperatureTab:[],
			dayNightWindSpeedGustTab:[],
			dayNightUviTab:[],
			dayNightVisibilityTab:[],
			numberHours:[],

			clouds: 0,
			dew_point: 0,
			daysTab: 0,
			feels_like: 0,
			humidity: 0,
			pop: 0,
			pressure: 0,
			rain: 0,
			temp: 0,
			wind_deg: 0,
			wind_speed: 0,
			wind_gust: 0,
		};
	},
	updated() {},
	created() {
		this.setDataLocalStorage();
		this.getLocalStorage();
		this.chartDataCloudsHumidity = this.returnChartDataCloudsHumidity();
		this.chartOptionsClouds = this.returnChartOptions(0, 100);
		this.chartDataDewPointTemp = this.returnChartDataDewPointTemp();
		this.chartOptionsPop = this.returnChartOptions(0, 100, 20, "orange");
		this.chartDataPressure = this.returnChartDataPressure();
		this.chartDataRainSnow = this.returnChartDataRainSnow();
		this.chartDataWindSpeedGust = this.returnChartDataWindSpeedGust();
		this.chartDataUvi = this.returnChartDataUvi();
		this.chartDataVisibility = this.returnChartDataVisibility();
	},
	methods: {
		setDataLocalStorage() {
			this.stworzTablice48(this.table);
			localStorage.setItem("cloudsTab", JSON.stringify(this.cloudsTab));
			localStorage.setItem("dew_pointTab", JSON.stringify(this.dew_pointTab));
			localStorage.setItem("dtTab", JSON.stringify(this.dtTab));
			localStorage.setItem("feels_LikeTab", JSON.stringify(this.feels_LikeTab));
			localStorage.setItem("humidityTab", JSON.stringify(this.humidityTab));
			localStorage.setItem("popTab", JSON.stringify(this.popTab));
			localStorage.setItem("pressureTab", JSON.stringify(this.pressureTab));
			localStorage.setItem("rainTab", JSON.stringify(this.rainTab));
			localStorage.setItem("snowTab", JSON.stringify(this.snowTab));
			localStorage.setItem("tempTab", JSON.stringify(this.tempTab));
			localStorage.setItem("uviTab", JSON.stringify(this.uviTab));
			localStorage.setItem("visibilityTab", JSON.stringify(this.visibilityTab));
			localStorage.setItem("wind_degTab", JSON.stringify(this.wind_degTab));
			localStorage.setItem("wind_speedTab", JSON.stringify(this.wind_speedTab));
			localStorage.setItem("wind_gustTab", JSON.stringify(this.wind_gustTab));
			localStorage.setItem("uviTab", JSON.stringify(this.uviTab));
		},
		getLocalStorage() {
			this.clouds = JSON.parse(localStorage.getItem("cloudsTab"));
			this.dew_point = JSON.parse(localStorage.getItem("dew_pointTab"));
			this.daysTab = JSON.parse(localStorage.getItem("dtTab"));
			this.feels_like = JSON.parse(localStorage.getItem("feels_LikeTab"));
			this.humidity = JSON.parse(localStorage.getItem("humidityTab"));
			this.pop = JSON.parse(localStorage.getItem("popTab"));
			this.pressure = JSON.parse(localStorage.getItem("pressureTab"));
			this.rain = JSON.parse(localStorage.getItem("rainTab"));
			this.snow = JSON.parse(localStorage.getItem("snowTab"));
			this.temp = JSON.parse(localStorage.getItem("tempTab"));
			this.uvi = JSON.parse(localStorage.getItem("uviTab"));
			this.visibility = JSON.parse(localStorage.getItem("visibilityTab"));
			this.wind_deg = JSON.parse(localStorage.getItem("wind_degTab"));
			this.wind_speed = JSON.parse(localStorage.getItem("wind_speedTab"));
			this.wind_gust = JSON.parse(localStorage.getItem("wind_gustTab"));
		},
		stworzTablice48(tab) {
			this.cloudsTab.length = 0;
			this.dew_pointTab.length = 0;
			this.dtTab.length = 0;
			this.feels_LikeTab.length = 0;
			this.humidityTab.length = 0;
			this.popTab.length = 0;
			this.pressureTab.length = 0;
			this.rainTab.length = 0;
			this.snowTab.length = 0;
			this.tempTab.length = 0;
			this.uviTab.length = 0;
			this.visibilityTab.length = 0;
			this.wind_degTab.length = 0;
			this.wind_gustTab.length = 0;
			this.wind_speedTab.length = 0;
			this.dayNightHumidityTab.length = 0;
			this.dayNightPressureTab.length = 0;
			this.dayNightRainTab.length = 0;
			this.dayNightTemperatureTab.length = 0;
			this.dayNightWindSpeedGustTab.length = 0;
			this.dayNightUviTab.length = 0;
			this.dayNightVisibilityTab.length = 0;
			this.numberHours.length = 0;
			tab.map((x) => {
				const dt = moment.unix(x.dt).format("DD-MM, HH:mm");
				const numDay = Number(moment.unix(x.dt).format("HH"));
				this.numberHours.push(numDay);
				this.cloudsTab.push(x.clouds);
				this.dew_pointTab.push(x.dew_point);
				this.dtTab.push(dt);
				this.feels_LikeTab.push(x.feels_like); 
				this.humidityTab.push(x.humidity); 
				this.popTab.push(x.pop * 100);
				this.pressureTab.push(x.pressure);
				this.snowTab.push(x.snow ? x.snow["1h"] : 0); 
				this.rainTab.push(x.rain ? x.rain["1h"] : 0); // deszczu w mm3/1mm2
				//1mm deszczu => 1000 mm * 1000 mm * 1 mm = 1 000 000 mm 3 = 1 litr
				//2.2mm => 1000*1000*2.2 = 2 200 000 mm3 => 2,2l
				this.tempTab.push(x.temp);
				this.uviTab.push(x.uvi);
				this.visibilityTab.push(x.visibility * 0.001);
				this.wind_degTab.push(x.wind_deg);
				this.wind_speedTab.push(((x.wind_speed * 1000) / 3600).toFixed(2));
				this.wind_gustTab.push(((x.wind_gust * 1000) / 3600).toFixed(2));
			});

			this.dayNightRainTab = this.scopeNights(
				this.numberHours,
				night(this.rainTab, this.snowTab, this.snowTab ),
				night(this.rainTab, this.snowTab, this.snowTab )
			);

			this.dayNightHumidityTab = this.scopeNights(
				this.numberHours,
				night(this.humidityTab,	this.cloudsTab,	this.popTab),
				day( this.humidityTab, this.cloudsTab,  this.popTab ),
			);
			this.dayNightPressureTab = this.scopeNights(
				this.numberHours,
				night(this.pressureTab,	this.pressureTab, this.pressureTab),
				day(this.pressureTab,	this.pressureTab, this.pressureTab)
			);
			this.dayNightTemperatureTab = this.scopeNights(
				this.numberHours,
				night(this.dew_pointTab,	this.tempTab, this.feels_LikeTab),
				day(this.dew_pointTab,	this.tempTab, this.feels_LikeTab)
			);
			this.dayNightWindSpeedGustTab = this.scopeNights(
				this.numberHours,
				night(this.wind_gustTab,	this.wind_speedTab, this.wind_gustTab),
				day(this.wind_gustTab,	this.wind_speedTab, this.wind_gustTab)
			);
			this.dayNightUviTab = this.scopeNights(
				this.numberHours,
				night(this.uviTab,	this.uviTab, this.uviTab),
				day(this.uviTab,	this.uviTab, this.uviTab)
			);
			this.dayNightVisibilityTab = this.scopeNights(
				this.numberHours,
				night(this.visibilityTab,	this.visibilityTab, this.visibilityTab),
				day(this.visibilityTab,	this.visibilityTab, this.visibilityTab)
			);
		},
		returnChartOptions(min, max, fontSize = 20, color = "rgb(64, 10, 58)") {
			const obj = new Options(fontSize, color, min, max);
			return obj;
		},
		returnChartDataWindSpeedGust() {
			return {
				labels: this.daysTab,
				datasets: [
					{
						label: "Prędkość km/h",
						backgroundColor: "rgba(64, 10, 58, 0.7)",
						data: this.wind_speed,
						borderColor: "rgb(64, 10, 58)",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Podmuch km/h",
						backgroundColor: "rgb(255, 0, 108, 0.2)",
						data: this.wind_gust,
						borderColor: "rgb(255, 0, 108)",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Noc w lokalnej strefie czasowej",
						backgroundColor: "rgb(132,132,130, 0.5)",
						data: this.dayNightWindSpeedGustTab,
						tension: 0.5,
						fill: true,
						stepped: true,
						pointRadius: 0,
					},
				],
			};
		},
		returnChartDataRainSnow() {
			return {
				labels: this.daysTab,
				datasets: [
					{
						label: "Opady deszczu w l/m2",
						backgroundColor: "rgb(38, 130, 121, 0.5)",
						data: this.rain,
						borderColor: "rgb(38, 130, 121)",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Śnieg litr/na metr kwadratowy",
						backgroundColor: "rgb(199, 252, 255, 0.8)",
						data: this.snow,
						borderColor: "rgb(199, 252, 255)",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Noc w lokalnej strefie czasowej",
						backgroundColor: "rgb(132,132,130, 0.5)",
						data: this.dayNightRainTab,
						tension: 0.5,
						fill: true,
						stepped: true,
						pointRadius: 0,
					},
				],
			};
		},
		returnChartDataPressure() {
			return {
				labels: this.daysTab,
				datasets: [
					{
						label: "Ciśnienie",
						backgroundColor: "rgb(64, 10, 58, 0.7)",
						data: this.pressure,
						borderColor: "rgb(64, 10, 58)",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Noc w lokalnej strefie czasowej",
						backgroundColor: "rgb(132,132,130, 0.5)",
						data: this.dayNightPressureTab,
						tension: 0.5,
						fill: true,
						stepped: true,
						pointRadius: 0,
					},
				],
			};
		},
		returnChartDataUvi() {
			return {
				labels: this.daysTab,
				datasets: [
					{
						label: "Promieniowanie UV",
						backgroundColor: "rgb(255, 0, 108, 0.7)",
						data: this.uvi,
						borderColor: "rgb(255, 0, 108)",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Noc w lokalnej strefie czasowej",
						backgroundColor: "rgb(132,132,130, 0.5)",
						data: this.dayNightUviTab,
						tension: 0.5,
						fill: true,
						stepped: true,
						pointRadius: 0,
					},
				],
			};
		},
		returnChartDataVisibility() {
			return {
				labels: this.daysTab,
				datasets: [
					{
						label: "Widoczność na drogach w km",
						backgroundColor: "rgb(38, 130, 121, 0.5)",
						data: this.visibility,
						borderColor: "rgb(38, 130, 121)",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Noc w lokalnej strefie czasowej",
						backgroundColor: "rgb(132,132,130, 0.5)",
						data: this.dayNightVisibilityTab,
						tension: 0.5,
						fill: true,
						stepped: true,
						pointRadius: 0,
					},
				],
			};
		},
		returnChartDataDewPointTemp() {
			return {
				labels: this.daysTab,
				datasets: [
					{
						label: "Punkt rosy",
						backgroundColor: "rgb(0, 111, 166,0.2)",
						data: this.dew_point,
						borderColor: "rgb(0, 111, 166)",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Temperatura odczuwalna",
						backgroundColor: "rgb(64, 10, 58, 0.2)",
						data: this.feels_like,
						borderColor: "rgb(64, 10, 58)",
						tension: 0.5,
						fill: false,
						pointRadius: 0,
					},
					{
						label: "Temperatura",
						backgroundColor: "rgba(247, 79, 118, 0.7)",
						data: this.temp,
						borderColor: "rgb(247, 79, 118)",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Noc w lokalnej strefie czasowej",
						backgroundColor: "rgb(132,132,130, 0.5)",
						data: this.dayNightTemperatureTab,
						tension: 0.5,
						fill: true,
						stepped: true,
						pointRadius: 0,
					},
				],
			};
		},
		returnChartDataCloudsHumidity() {
			return {
				labels: this.daysTab,
				datasets: [
					{
						label: "Prawdopodobieñstwo opadów w %",
						backgroundColor: "rgb(38, 130, 121, 0.2)",
						data: this.pop,
						borderColor: "rgb(38, 130, 121)",
						tension: 0.5,
						fill: true,
					},
					{
						label: "WILGOTNOŚĆ W %",
						backgroundColor: "rgb(247, 79, 118, 0.2)",
						data: this.humidity,
						borderColor: "rgb(247, 79, 118)",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Zachmurzenie w %",
						backgroundColor: "rgb(64, 10, 58, 0.7)",
						data: this.clouds,
						borderColor: "rgb(64, 10, 58)",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Noc w lokalnej strefie czasowej",
						backgroundColor: "rgb(132,132,130, 0.5)",
						data: this.dayNightHumidityTab,
						tension: 0.5,
						fill: true,
						stepped: true,
						pointRadius: 0,
					},
				],
			};
		},
		scopeNights(arrayNumHours, arrayDayNightTabMax, arrayDayNightTabMin) {
			return arrayNumHours.map((val, index) => {
				if (val >= 21 || val < 6) {
					return Math.ceil(max(arrayDayNightTabMax));
				} else {
					return Math.floor(min(arrayDayNightTabMin));
				}
			})
		},
	},
	watch: {
		table() {
			this.setDataLocalStorage();
			this.getLocalStorage();
			this.chartDataCloudsHumidity = this.returnChartDataCloudsHumidity();
			this.chartOptionsClouds = this.returnChartOptions(0, 100);
			this.chartDataDewPointTemp = this.returnChartDataDewPointTemp();
			this.chartDataPressure = this.returnChartDataPressure();
			this.chartDataRainSnow = this.returnChartDataRainSnow();
			this.chartDataWindSpeedGust = this.returnChartDataWindSpeedGust();
			this.chartDataUvi = this.returnChartDataUvi();
			this.chartDataVisibility = this.returnChartDataVisibility();
		},
	},
};
</script>
