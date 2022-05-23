<script setup>
import WindDeg from "./WindDeg.vue";
</script>

<template>
	<div class="row">
		<div class="text-light col-2">
			Kierunek wiatru stopnie meterologiczne
			<table class="table table-sm table-striped table-dark">
				<thead>
					<tr>
						<th scope="col" class="text-light">data</th>
						<th scope="col" class="text-light">Kierunek wiatru</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(value, index) in this.wind_degTab" :key="index">
						<td class="text-light">{{ this.daysTab[index] }}</td>
						<td class="text-light" v-if="(value >= 0 && value < 23) || value > 337">
							<WindDeg :value="value" :symbol="'N'" />
						</td>
						<td class="text-light" v-if="value >= 23 && value < 69">
							<WindDeg :value="value" :symbol="'NE'" />
						</td>
						<td class="text-light" v-if="value >= 69 && value < 113">
							<WindDeg :value="value" :symbol="'E'" />
						</td>
						<td class="text-light" v-if="value >= 113 && value < 158">
							<WindDeg :value="value" :symbol="'SE'" />
						</td>
						<td class="text-light" v-if="value >= 158 && value < 203">
							<WindDeg :value="value" :symbol="'S'" />
						</td>
						<td class="text-light" v-if="value >= 203 && value < 248">
							<WindDeg :value="value" :symbol="'SW'" />
						</td>
						<td class="text-light" v-if="value >= 248 && value < 293">
							<WindDeg :value="value" :symbol="'W'" />
						</td>
						<td class="text-light" v-if="value >= 293 && value < 338">
							<WindDeg :value="value" :symbol="'NW'" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="col-10">
			<div class="row">
				<div class="text-dark col-9">
					Zachmurzenie w %
					<LineChart
						:chartData="chartDataCloudsHumidity"
						:chartOptions="returnChartOptions(0, 100)"
						:height="350"
					/>
				</div>
				<div class="col-3">
					Wilgotność względna równa 0 oznacza powietrze całkowicie suche, zaś równa 1
					oznacza powietrze całkowicie nasycone parą wodną. Przy wilgotności względnej
					równej 1 oziębienie powietrza daje początek skraplaniu pary wodnej.
					<br />
					<br />
					Zachmurzenie – stopień pokrycia nieba przez chmury.
				</div>
				<div class="text-dark col-9">
					Punkt rosy.
					<LineChart
						:chartData="chartDataDewPointTemp"
						:chartOptions="returnChartOptions(0, 10)"
						:height="350"
					/>
				</div>
				<div class="col-3">
					Punkt rosy to - temperatura atmosfery (zmienna w zależności od ciśnienia i
					wilgotności), poniżej której zaczynają się skraplać krople wody i może tworzyć
					się rosa.
					<br />
					<br />
					Temperatura odczuwalna – stan określający, jakie odczucie termiczne wystąpi przy
					danych warunkach pogodowych. Wyliczana jest w zależności od przyjętego modelu na
					podstawie takich parametrów, jak temperatura powietrza, siła wiatru, wilgotność
					i opady.
				</div>
				<div class="text-dark col-9">
					Ciśnienie atmosferyczne
					<LineChart
						:chartData="chartDataPressure"
						:chartOptions="returnChartOptions(1000, 1013)"
						:height="250"
					/>
				</div>
				<div class="col-3">
					Najwyższe na świecie zarejestrowano 19 grudnia roku 2001 w miejscowości
					Tosontsengel w Mongolii – wyniosło wtedy 1086 hPa. Natomiast najniższe
					znormalizowane ciśnienie atmosferyczne, wynoszące 870 hPa, spowodowane
					przejściem tajfunu Tip, zarejestrowano 12 października roku 1979 na Północnym
					Pacyfiku.
				</div>
				<div class="text-dark col-9">
					Deszcz 1mm3/mm2 lub 1l/m2
					<LineChart
						:chartData="chartDataRainSnow"
						:chartOptions="returnChartOptions(0, 1)"
						:height="250"
					/>
				</div>
				<div class="text-dark col-9">
					Prędkość i podmuch wiatru
					<LineChart
						:chartData="chartDataWindSpeedGust"
						:chartOptions="returnChartOptions(0, 1)"
						:height="350"
					/>
				</div>
				<div class="text-dark col-9">
					Promieniowanie UV
					<LineChart
						:chartData="chartDataUvi"
						:chartOptions="returnChartOptions(0, 10)"
						:height="350"
					/>
				</div>
				<div class="col-3">
					0–2 Brak zagrożeń dla zdrowego człowieka.
					<br />
					3–5 Średnie zagrożenie podczas dłuższego przebywania na słońcu.
					<br />
					6–7 Wysokie i bardzo wysokie zagrożenie podczas dłuższego przebywania na słońcu.
					<br />
					8–10 Bardzo wysokie zagrożenie podczas przebywania na słońcu.
					<br />
					11+ Ekstremalne zagrożenie podczas przebywania na słońcu.
				</div>
				<div class="text-dark col-9">
					Widocznośc na drogach
					<LineChart
						:chartData="chartDataVisibility"
						:chartOptions="returnChartOptions(1000, 8000)"
						:height="350"
					/>
				</div>
				<div class="col-3">
					Średnia widoczność pokazana jest w metrach. Maksymalna wartość widzialności to
					10km czyli 10000m
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
				},
			},
		};
		this.scales = {};
		this.scales.y = {
			suggestedMin: suggestedMin,
			suggestedMax: suggestedMax, //<- tu by trzeba było podać opcje max
			// color: 'black',
			ticks: {
				color: "white",
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
				color: "white",
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
		returnChartOptions(min, max, fontSize = 20, color = "blue") {
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
						backgroundColor: "rgba(200,0,100, 0.2)",
						data: this.wind_speed,
						borderColor: "yellow",
						tension: 0.5,
						fill: true,
					},
					{
						label: " podmuch km/h",
						backgroundColor: "rgba(200,0,100, 0.2)",
						data: this.wind_gust,
						borderColor: "red",
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
						label: "Deszcz litr/na metr kwadratowy",
						backgroundColor: "rgba(200,0,100, 0.2)",
						data: this.rain,
						borderColor: "blue",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Śnieg litr/na metr kwadratowy",
						backgroundColor: "rgba(200,0,100, 0.2)",
						data: this.snow,
						borderColor: "lightblue",
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
						backgroundColor: "rgba(200,0,100, 0.2)",
						data: this.pressure,
						borderColor: "violet",
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
						backgroundColor: "rgba(200,0,100, 0.2)",
						data: this.uvi,
						borderColor: "green",
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
						backgroundColor: "rgba(200,0,100, 0.2)",
						data: this.visibility,
						borderColor: "green",
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
						backgroundColor: "rgba(9, 209, 89,0.2)",
						data: this.dew_point,
						borderColor: "green",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Temperatura",
						backgroundColor: "rgba(200,0,100, 0.2)",
						data: this.temp,
						borderColor: "pink",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Temperatura odczuwalna",
						backgroundColor: "rgba(0,255,100, 0.2)",
						data: this.feels_like,
						borderColor: "red",
						tension: 0.5,
						fill: false,
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
						label: "Zachmurzenie w %",
						backgroundColor: "rgba(200,0,100, 0.2)",
						data: this.clouds,
						borderColor: "violet",
						tension: 0.5,
						fill: true,
					},
					{
						label: "WILGOTNOŚĆ W %",
						backgroundColor: "rgba(173, 216, 230, 0.2)",
						data: this.humidity,
						borderColor: "blue",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Prawdopodobieñstwo opadów w %",
						backgroundColor: "rgba(200,0,100, 0.2)",
						data: this.pop,
						borderColor: "green",
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
