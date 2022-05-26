<script setup>
import WindDeg from "./WindDeg.vue";
</script>

<template>
	<div class="row">
		<div class="text-secondary col-3 mt-5">
			<h6 class="text-success">Kierunek wiatru stopnie meterologiczne</h6>
			<table class="table table-sm">
				<thead>
					<tr class="">
						<th scope="col" class="text-secondary text-center">data</th>
						<th scope="col" class="text-secondary text-center">Kierunek wiatru</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(value, index) in this.wind_degTab" :key="index" class="">
						<td class="text-secondary text-center">{{ this.daysTab[index] }}</td>
						<td
							class="text-light d-flex justify-content-between table-secondary"
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
		<div class="col-9">
			<div class="row">
				<div class="text-dark col-9 mt-5">
					<h3 class="text-success text-center">Zachmurzenie w %</h3>
					<LineChart
						:cssClasses="'bg-secondary rounded boxShadow py-3 px-1'"
						:chartData="chartDataCloudsHumidity"
						:chartOptions="returnChartOptions(0, 100)"
						:height="350"
					/>
				</div>
				<div class="col-3 text-secondary mt-5">
					<p class="text-justify pFirst">
						Wilgotność względna równa 0 oznacza powietrze całkowicie suche, zaś równa 1
						oznacza powietrze całkowicie nasycone parą wodną. Przy wilgotności względnej
						równej 1 oziębienie powietrza daje początek skraplaniu pary wodnej.
					</p>
					<p class="text-justify">Zachmurzenie – stopień pokrycia nieba przez chmury.</p>
				</div>
				<div class="text-dark col-9 mt-5">
					<h3 class="text-success text-center">Punkt rosy</h3>
					<LineChart
						:cssClasses="'bg-secondary rounded boxShadow py-3 px-1'"
						:chartData="chartDataDewPointTemp"
						:chartOptions="returnChartOptions(0, 10)"
						:height="350"
					/>
				</div>
				<div class="col-3 text-secondary mt-5">
					<p class="text-justify pFirst">
						Punkt rosy to - temperatura atmosfery poniżej której zaczynają się skraplać krople wody i może
						tworzyć się rosa.
					</p>
					<p class="text-justify">
						Temperatura odczuwalna wyliczana jest w zależności od przyjętego
						modelu na podstawie takich parametrów, jak temperatura powietrza, siła
						wiatru, wilgotność i opady.
					</p>
				</div>
				<div class="text-dark col-9 mt-5">
					<h3 class="text-success text-center">Ciśnienie atmosferyczne</h3>
					<LineChart
						:cssClasses="'bg-secondary rounded boxShadow py-3 px-1'"
						:chartData="chartDataPressure"
						:chartOptions="returnChartOptions(1000, 1013)"
						:height="350"
					/>
				</div>
				<div class="col-3 text-secondary mt-5">
					<p class="text-justify pFirst">
						19.12.2001r. Tosontsengel w Mongolii - zarejestrowano najwyższe na świecie ciśnienie 1086 hPa.
						12.10.1979r. Północny Pacyfik - zarejestrowano najniższe na świecie ciśnienie 870 hPa, spowodowane
						przejściem tajfunu Tip.
					</p>
				</div>
				<div class="text-dark col-12 mt-5">
					<h3 class="text-success text-center">Opady deszczu i sniegu na litr/m2</h3>
					<LineChart
						:cssClasses="'bg-secondary rounded boxShadow py-3 px-1'"
						:chartData="chartDataRainSnow"
						:chartOptions="returnChartOptions(0, 1)"
						:height="350"
					/>
				</div>
				<div class="text-dark col-12 mt-5">
					<h3 class="text-success text-center">Prędkość i podmuch wiatru</h3>
					<LineChart
						:cssClasses="'bg-secondary rounded boxShadow py-3 px-1'"
						:chartData="chartDataWindSpeedGust"
						:chartOptions="returnChartOptions(0, 1)"
						:height="350"
					/>
				</div>
				<div class="text-dark col-9 mt-5">
					<h3 class="text-success text-center">Promieniowanie UV</h3>
					<LineChart
						:cssClasses="'bg-secondary rounded boxShadow py-3 px-1'"
						:chartData="chartDataUvi"
						:chartOptions="returnChartOptions(0, 10)"
						:height="350"
					/>
				</div>
				<div class="col-3 text-secondary mt-5">
					<p class="text-justify pFirst">0–2 Brak zagrożeń dla zdrowego człowieka.</p>
					<p class="text-justify">
						3–5 Średnie zagrożenie podczas dłuższego przebywania na słońcu.
					</p>
					<p class="text-justify">
						6–7 Wysokie i bardzo wysokie zagrożenie podczas dłuższego przebywania na
						słońcu.
					</p>
					<p class="text-justify">
						8–10 Bardzo wysokie zagrożenie podczas przebywania na słońcu.
					</p>
					<p class="text-justify">
						11+ Ekstremalne zagrożenie podczas przebywania na słońcu.
					</p>
				</div>
				<div class="text-dark col-9 mt-5">
					<h3 class="text-success text-center">Widoczność na drogach</h3>
					<LineChart
						:cssClasses="'bg-secondary rounded boxShadow py-3 px-1'"
						:chartData="chartDataVisibility"
						:chartOptions="returnChartOptions(1000, 8000)"
						:height="350"
					/>
				</div>
				<div class="col-3 text-secondary mt-5">
					<p class="text-justify pFirst">
						Średnia widoczność pokazana jest w metrach. Maksymalna wartość widzialności
						to 10km czyli 10000m
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import LineChart from "./../chart/LineChart";
import moment from "moment";
import { setBlockTracking } from "vue";

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
		};
		this.scales = {};
		this.scales.y = {
			suggestedMin: suggestedMin,
			suggestedMax: suggestedMax, //<- tu by trzeba było podać opcje max
			// color: 'black',
			ticks: {
				color: labelsColor,
				font: {
					weight: "bold",
				},
				// major: {
				// 	fontSize:50,
				// 	enabled: true
				// }
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
			// chartDataPop: {},
			chartDataWindDeg: {},
			chartDataRainSnow: {},
			chartDataWindSpeedGust: {},
			chartDataUvi: {},
			chartDataVisibility: {},

			chartOptionsClouds: {},
			chartOptionsDewPointTemp: {},
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
		this.chartOptionsDewPointTemp = this.returnChartOptions(15, 15);
		// this.chartDataPop = this.returnChartDataPop();
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
			this.dew_pointTab.lenght = 0;
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
			// this.dayNightHumidityTab.length = 0;
			// this.dayNightPressureTab.length = 0;
			// this.dayNightRainTab.length = 0;
			tab.map((x) => {
				const dt = moment.unix(x.dt).format("DD-MM, HH:mm");
				// const dayNight = Number(moment(x.dt).format("HH"));
				// const dayNightHum = this.zakresyNocy(dayNight, 100, 0);
				// const dayNightRain = this.zakresyNocy(dayNight, 2, 0);
				// const dayNightPre = this.zakresyNocy(dayNight, 1040, 970);
				// const dayNightTmp = this.zakresyNocy(dayNight, 35, 0);
				// this.dayNightTemperatureTab.push(dayNightTmp);
				// this.dayNightPressureTab.push(dayNightPre);
				// this.dayNightHumidityTab.push(dayNightHum);
				// this.dayNightRainTab.push(dayNightRain);
				this.cloudsTab.push(x.clouds); //zachmurzenie
				this.dew_pointTab.push(x.dew_point);
				this.dtTab.push(dt); //data
				this.feels_LikeTab.push(x.feels_like); //temperatura odczuwalna
				this.humidityTab.push(x.humidity); //wilgotność
				// this.popTab.push(x.pop); //wilgotność
				this.popTab.push(x.pop * 100); //prawdopodobieństwo opadów
				this.pressureTab.push(x.pressure); //ciśnienie
				this.snowTab.push(x.snow ? x.snow["1h"] : 0); // śnieg w mm
				this.rainTab.push(x.rain ? x.rain["1h"] : 0); // deszczu w mm3/1mm2
				//1mm deszczu => 1000 mm * 1000 mm * 1 mm = 1 000 000 mm 3 = 1 litr
				//2.2mm => 1000*1000*2.2 = 2 200 000 mm3 => 2,2l
				this.tempTab.push(x.temp);
				this.uviTab.push(x.uvi);
				this.visibilityTab.push(x.visibility);
				this.wind_degTab.push(x.wind_deg);
				this.wind_speedTab.push(((x.wind_speed * 1000) / 3600).toFixed(2));
				this.wind_gustTab.push(((x.wind_gust * 1000) / 3600).toFixed(2));
			});
		},
		compareNumbers(a, b) {
			return a - b;
		},
		min(tab) {
			return tab.sort(this.compareNumbers)[0];
		},
		max(tab) {
			return tab.sort(this.compareNumbers)[tab.length - 1];
		},
		returnChartOptions(min, max, fontSize = 20, color = "rgb(64, 10, 58)") {
			const obj = new Options(fontSize, color, min, max);
			// const obj1 = new Options(20, 'red');
			// console.log(obj);
			return obj;
		},
		sortAndGetMin(minTab) {
			const min = minTab.sort((a, b) => {
				return a - b;
			})[0];
			console.log(min);

			return min;
		},
		sortAndGetMax(maxTab) {
			return maxTab.sort((a, b) => {
				return a - b;
			})[maxTab - 1];
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
				],
			};
		},
		returnChartDataVisibility() {
			return {
				labels: this.daysTab,
				datasets: [
					{
						label: "Widoczność na drogach",
						backgroundColor: "rgb(38, 130, 121, 0.5)",
						data: this.visibility,
						borderColor: "rgb(38, 130, 121)",
						tension: 0.5,
						fill: true,
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
				],
			};
		},
		zakresyNocy(num, max, min) {
			let dayNight = 0;
			if (num >= 21 || num < 6) {
				dayNight = max;
			} else {
				dayNight = min;
			}
			return dayNight;
		},
	},
	watch: {
		table() {
			this.setDataLocalStorage();
			this.getLocalStorage();
			this.chartDataCloudsHumidity = this.returnChartDataCloudsHumidity();
			this.chartOptionsClouds = this.returnChartOptions(0, 100);
			this.chartDataDewPointTemp = this.returnChartDataDewPointTemp();
			this.chartOptionsDewPointTemp = this.returnChartOptions(15, 15);
			// this.chartDataPop = this.returnChartDataPop();
			// this.chartOptionsPop = this.returnChartOptions(0,100,20, "orange");
			this.chartDataPressure = this.returnChartDataPressure();
			this.chartDataRainSnow = this.returnChartDataRainSnow();
			this.chartDataWindSpeedGust = this.returnChartDataWindSpeedGust();
			this.chartDataUvi = this.returnChartDataUvi();
			this.chartDataVisibility = this.returnChartDataVisibility();
		},
	},
};
</script>
