<script setup></script>

<template>
	<div>
		<div class="text-dark">
			Temperatura minimalna i maksymalna na 5 dni
			<LineChart :chartData="chartData" :chartOptions="chartOptions" :height="350" />
		</div>
		<div class="text-dark">
			Ciśnienie atmosferyczne
			<LineChart :chartData="chartDataPressure" :chartOptions="chartOptions" :height="250" />
		</div>
		<div class="text-dark">
			Wilgotność
			<LineChart :chartData="chartDataHumidity" :chartOptions="chartOptions" :height="350" />
		</div>
		<div class="text-dark">
			Zachmurzenie w %
			<LineChart :chartData="chartDataClouds" :chartOptions="chartOptions" :height="350" />
		</div>
		<div class="text-dark">
			Opady deszczu i sniegu na m2
			<LineChart :chartData="chartDataRainfall" :chartOptions="chartOptions" :height="350" />
		</div>
		<div class="text-dark">
			Prędkość i podmuch wiatru
			<LineChart :chartData="chartDataWind" :chartOptions="chartOptions" :height="350" />
		</div>
	</div>
</template>

<script>
import LineChart from "./../chart/LineChart";
import moment from "moment";
export default {
	props: {
		cityName: String,
		lat: Number,
		lon: Number,
		table: Array,
	},
	components: {
		LineChart,
	},
	data() {
		return {
			chartData: {},
			chartDataPressure: {},
			chartDataHumidity: {},
			chartDataClouds: {},
			chartDataPop: {},
			chartDataRainfall: {},
			chartDataWind: [],
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false,
				// bezierCurve: true
				plugins: {
					legend: {
						labels: {
							color: "red",
						},
					},
				},
			},

			daysTab: [],
			dayNightTemperatureTab: [],
			dayNightPressureTab: [],
			dayNightHumidityTab: [],
			dayNightRainTab: [],
			dt_txtTab: [],
			temp_minTab: [],
			temp_maxTab: [],
			temp_feelsLikeTab: [],
			pressureTab: [],
			grnd_levelTab: [],
			humidityTab: [],
			cloudsTab: [],
			popTab: [], //prawdopodobieństwo opadów
			rainTab: [], //deszcz w mm
			snowTab: [], //snieg w mm
			speedWindTab: [], //predkosc
			gustWindTab: [], //podmuch wiatru

			dayNightHumidity: [],
			dayNightPressure: [],
			dayNightTemperature: [],
			tempMin: [],
			tempMax: [],
			tempFeelsLike: [],
			pressure: [],
			grndLevel: [],
			humidity: [],
			clouds: [],
			pop: [],
			rain: [],
			snow: [],
			speedWind: [],
			gustWind: [],
		};
	},

	updated() {
		// this.setDataLocalStorage();
		// this.getLocalStorage();
		// this.chartData = this.returnChartData();
		// this.chartDataPressure = this.returnCartDataPressure();
		// this.chartDataHumidity = this.returnChartDataHumidity();
		// this.chartDataClouds = this.returnChartDataClouds();
		// this.chartDataRainfall = this.returnChartDataRainfall();
		// this.chartDataWind = this.returnChartDataWind();
	},
	created() {
		this.table;
		this.setDataLocalStorage();
		this.getLocalStorage();
		this.chartData = this.returnChartData();
		this.chartDataPressure = this.returnCartDataPressure();
		this.chartDataHumidity = this.returnChartDataHumidity();
		this.chartDataClouds = this.returnChartDataClouds();
		this.chartDataRainfall = this.returnChartDataRainfall();
		this.chartDataWind = this.returnChartDataWind();
		// this.updated;
	},
	watch: {
		table() {
			this.setDataLocalStorage();
			this.getLocalStorage();
			// try {}
			this.chartData = this.returnChartData();
			this.chartDataPressure = this.returnCartDataPressure();
			this.chartDataHumidity = this.returnChartDataHumidity();
			this.chartDataClouds = this.returnChartDataClouds();
			this.chartDataRainfall = this.returnChartDataRainfall();
			this.chartDataWind = this.returnChartDataWind();
		},
	},
	methods: {
		setDataLocalStorage() {
			this.stworzTabliceTempDziennej(this.table);
			localStorage.setItem("dayNightRainTab", JSON.stringify(this.dayNightRainTab));
			localStorage.setItem("dayNightHumidityTab", JSON.stringify(this.dayNightHumidityTab));
			localStorage.setItem("dayNightPressureTab", JSON.stringify(this.dayNightPressureTab));
			localStorage.setItem(
				"dayNightTemperatureTab",
				JSON.stringify(this.dayNightTemperatureTab),
			);
			localStorage.setItem("dt_txtTab", JSON.stringify(this.dt_txtTab));
			localStorage.setItem("temp_minTab", JSON.stringify(this.temp_minTab));
			localStorage.setItem("temp_maxTab", JSON.stringify(this.temp_maxTab));
			localStorage.setItem("temp_feelsLikeTab", JSON.stringify(this.temp_feelsLikeTab));
			localStorage.setItem("pressureTab", JSON.stringify(this.pressureTab));
			localStorage.setItem("grnd_levelTab", JSON.stringify(this.grnd_levelTab));
			localStorage.setItem("humidityTab", JSON.stringify(this.humidityTab));
			localStorage.setItem("cloudsTab", JSON.stringify(this.cloudsTab));
			localStorage.setItem("popTab", JSON.stringify(this.popTab));
			localStorage.setItem("rainTab", JSON.stringify(this.rainTab));
			localStorage.setItem("snowTab", JSON.stringify(this.snowTab));
			localStorage.setItem("speedWindTab", JSON.stringify(this.speedWindTab));
			localStorage.setItem("gustWindTab", JSON.stringify(this.gustWindTab));
		},
		getLocalStorage() {
			this.dayNightRain = JSON.parse(localStorage.getItem("dayNightRainTab"));
			this.dayNightHumidity = JSON.parse(localStorage.getItem("dayNightHumidityTab"));
			this.dayNightPressure = JSON.parse(localStorage.getItem("dayNightPressureTab"));
			this.dayNightTemperature = JSON.parse(localStorage.getItem("dayNightTemperatureTab"));
			this.daysTab = JSON.parse(localStorage.getItem("dt_txtTab"));
			this.tempMin = JSON.parse(localStorage.getItem("temp_minTab"));
			this.tempMax = JSON.parse(localStorage.getItem("temp_maxTab"));
			this.tempFeelsLike = JSON.parse(localStorage.getItem("temp_feelsLikeTab"));
			this.pressure = JSON.parse(localStorage.getItem("pressureTab"));
			this.grndLevel = JSON.parse(localStorage.getItem("grnd_levelTab"));
			this.humidity = JSON.parse(localStorage.getItem("humidityTab"));
			this.clouds = JSON.parse(localStorage.getItem("cloudsTab"));
			this.pop = JSON.parse(localStorage.getItem("popTab"));
			this.rain = JSON.parse(localStorage.getItem("rainTab"));
			this.snow = JSON.parse(localStorage.getItem("snowTab"));
			this.speedWind = JSON.parse(localStorage.getItem("speedWindTab"));
			this.gustWind = JSON.parse(localStorage.getItem("gustWindTab"));
		},
		returnChartDataWind() {
			return {
				labels: this.daysTab,
				datasets: [
					{
						label: "prędkość wiatru m/s",
						backgroundColor: "rgba(255,140,0, 0.2)",
						data: this.speedWind,
						borderColor: "rgb(255,140,0)",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Podmuch wiatru m/s",
						backgroundColor: "rgba(255,0,0, 0.2)",
						data: this.gustWind,
						borderColor: "rgb(255,0,0)",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Noc w polskiej strefie czasowej",
						backgroundColor: "rgba(199,199,199, 0.5)",
						data: this.dayNightRain,
						tension: 0.5,
						fill: true,
						stepped: true,
						pointRadius: 0,
					},
				],
			};
		},
		returnChartDataRainfall() {
			return {
				labels: this.daysTab,
				datasets: [
					{
						label: "Opady deszczu w l/m2",
						backgroundColor: "rgba(255,140,0, 0.2)",
						data: this.rain,
						borderColor: "rgb(255,140,0)",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Opady sniegu w mm",
						backgroundColor: "rgba(255,140,0, 0.2)",
						data: this.snow,
						borderColor: "rgb(255,140,0)",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Noc w polskiej strefie czasowej",
						backgroundColor: "rgba(199,199,199, 0.5)",
						data: this.dayNightRain,
						tension: 0.5,
						fill: true,
						stepped: true,
						pointRadius: 0,
					},
				],
			};
		},
		returnChartDataClouds() {
			return {
				labels: this.daysTab,
				datasets: [
					{
						label: "Zachmurzenie w %",
						backgroundColor: "rgba(255,140,0, 0.2)",
						data: this.clouds,
						borderColor: "rgb(255,140,0)",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Prawdopodobieństwo opadów w %",
						backgroundColor: "rgba(255,0,0, 0.2)",
						data: this.pop,
						borderColor: "rgb(255,0,0)",
						tension: 0.5,
						fill: true,
					},
					{
						label: "Noc w polskiej strefie czasowej",
						backgroundColor: "rgba(199,199,199, 0.5)",
						data: this.dayNightHumidity,
						tension: 0.5,
						fill: true,
						stepped: true,
						pointRadius: 0,
					},
				],
			};
		},
		returnChartDataHumidity() {
			return {
				labels: this.daysTab,
				datasets: [
					{
						label: "Wilgotność w %",
						backgroundColor: "rgba(0,0,255, 0.2)",
						data: this.humidity,
						borderColor: "blue",
						tension: 0.5,
						fill: true,
						// stepped: true
					},
					{
						label: "Noc w polskiej strefie czasowej",
						backgroundColor: "rgba(199,199,199, 0.5)",
						data: this.dayNightHumidity,
						// borderColor: 'blue',
						// lineTension:0,
						tension: 0.5,
						fill: true,
						stepped: true,
						pointRadius: 0,
					},
				],
			};
		},
		returnCartDataPressure() {
			return {
				labels: this.daysTab,
				datasets: [
					{
						label: "Ciśnienie",
						backgroundColor: "rgba(0,0,255, 0.2)",
						data: this.pressure,
						borderColor: "blue",
						// lineTension:0,
						tension: 0.5,
						fill: true,
						// stepped: true
					},
					{
						label: "Ciśnienie na poziomie gruntu",
						backgroundColor: "rgba(0,160,0, 0.2)",
						data: this.grndLevel,
						borderColor: "rgb(0,160,0)",
						// lineTension:0,
						tension: 0.5,
						fill: true,
						// stepped: true
					},
					{
						label: "Noc w polskiej strefie czasowej",
						backgroundColor: "rgba(199,199,199, 0.5)",
						data: this.dayNightPressure,
						// borderColor: 'blue',
						// lineTension:0,
						tension: 0.5,
						fill: true,
						stepped: true,
						pointRadius: 0,
					},
				],
			};
		},
		returnChartData() {
			return {
				labels: this.daysTab,
				datasets: [
					{
						label: "Temperatura maksymalna",
						backgroundColor: "rgba(200,0,100, 0.2)",
						data: this.tempMax,
						borderColor: "violet",
						tension: 0.5,
						fill: true,
						// stepped: true
					},
					{
						label: "Temperatura Minimalna",
						backgroundColor: "rgba(255,0,0, 0.2)",
						data: this.tempMin,
						borderColor: "red",
						// lineTension:0,
						tension: 0.5,
						fill: false,
						// stepped: true
					},
					{
						label: "Temperatura odczuwalna",
						backgroundColor: "rgba(0,255,100, 0.2)",
						data: this.tempFeelsLike,
						borderColor: "green",
						tension: 0.5,
						fill: false,
						// stepped: true
						pointRadius: 0,
					},
					{
						label: "Noc w polskiej strefie czasowej",
						backgroundColor: "rgba(199,199,199, 0.5)",
						data: this.dayNightTemperature,
						// borderColor: 'blue',
						// lineTension:0,
						tension: 0.5,
						fill: true,
						stepped: true,
						pointRadius: 0,
					},
				],
			};
		},
		stworzTabliceTempDziennej(tab) {
			this.dt_txtTab.length = 0;
			this.temp_minTab.length = 0;
			this.temp_maxTab.length = 0;
			this.temp_feelsLikeTab.length = 0;
			this.pressureTab.length = 0;
			this.grnd_levelTab.length = 0;
			this.humidityTab.length = 0;
			this.cloudsTab.length = 0;
			this.popTab.length = 0;
			this.dayNightHumidityTab.length = 0;
			this.dayNightPressureTab.length = 0;
			this.dayNightRainTab.length = 0;
			this.rainTab.length = 0;
			this.snowTab.length = 0;
			this.speedWindTab.length = 0;
			this.gustWindTab.length = 0;
			tab.map((x) => {
				const dt_txt = moment(x.dt_txt).format("DD-MM, HH:mm");
				const dayNight = Number(moment(x.dt_txt).format("HH"));
				const dayNightHum = this.zakresyNocy(dayNight, 100, 0);
				const dayNightRain = this.zakresyNocy(dayNight, 2, 0);
				const dayNightPre = this.zakresyNocy(dayNight, 1040, 970);
				const dayNightTmp = this.zakresyNocy(dayNight, 35, 0);
				this.dayNightTemperatureTab.push(dayNightTmp);
				this.dayNightPressureTab.push(dayNightPre);
				this.dayNightHumidityTab.push(dayNightHum);
				this.dayNightRainTab.push(dayNightRain);
				this.dt_txtTab.push(dt_txt); //data
				this.temp_minTab.push(x.main.temp_min);
				this.temp_maxTab.push(x.main.temp_max);
				this.temp_feelsLikeTab.push(x.main.feels_like); //temperatura odczuwalna
				this.pressureTab.push(x.main.pressure); //ciśnienie
				this.grnd_levelTab.push(x.main.grnd_level); //ciśnienie na poziomie gruntu
				this.humidityTab.push(x.main.humidity); //wilgotność
				this.cloudsTab.push(x.clouds.all); //zachmurzenie
				this.popTab.push(x.pop * 100); //prawdopodobieństwo opadów
				this.rainTab.push(x.rain ? x.rain["3h"] : 0); // deszczu w mm
				this.snowTab.push(x.snow ? x.snow["3h"] : 0); //śnieg w mm
				this.speedWindTab.push(((x.wind.speed * 1000) / 3600).toFixed(2)); //śnieg w mm
				this.gustWindTab.push(((x.wind.gust * 1000) / 3600).toFixed(2)); //śnieg w mm
			});
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
};
</script>
