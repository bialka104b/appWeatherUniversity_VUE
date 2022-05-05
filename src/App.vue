<script setup>
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
    <div class="">
      
      	<Header />
        <main class="">
			<section class="container-fluid section">
				<div class="row m-0">
					<div class="col-8">
						<div class="row m-0">
							<div class="col-12 bgOpacity my-2 bRadius">
								<h2>{{name}} 
									<p class="h6 pt-2">Województwo: {{city.WOJ}}</p>
								</h2>
							
								<div class="d-flex">
									<div class="flex-grow-1">
										<h5>{{main.temp}} &#x2103;</h5>
									</div>
									<div class="flex-fill">
										<h5 class="text-capitalize" v-for="item in weather" :key="item">{{item.description}}
											<img :src="linkIcon(item.icon)" alt="" style="background:pink">
										</h5>
										<p class="text-capitalize">wilgotność: {{main.humidity}} %</p>
										<p class="text-capitalize">prędkość wiatru: {{wind.speed}} m/s</p>
									</div>
								</div>
							</div>
							<div class="col-12 bgOpacity my-2 bRadius">
								<!-- <Forecast1 
									:cityName="cityName"
									:lat="12"
									:lon="15"
									:tableDayTemp="tableOfAverageDayTemperatures"
									:table="listInfoForecast"
									:tempHeader="main.temp"
									:defaultTableDayTemp="defaultTable"
								/> -->
							</div>
						</div>
					</div>
					<div class="col-4 my-2 bgOpacity bRadius">
						<div class="container-fluid py-1">
							<label for="">Wybierz miasto Polski</label>
							<VueMultiselect
								v-model="city"
								:options="myCities"
								:close-on-select="true"
								:clear-on-select="false"
								:placeholder="'Select City'"
								label="NAZWA"
								track-by="NAZWA"
								@close="selectCity(city)"
								/>
						</div>
						<div class="container-fluid py-1">
							<div class="">
								<label >Wpisz dowolne miasto świata</label>
								<input 
								type="text" 
								name="city-world" 
								v-model="cityWorld" 
								@input="selectCityWorld" 
								class="multiselect__input" 
								style="height:40px"
								placeholder="Rzeszów">
							</div>
						</div>
						<div class="container-fluid py-1">
							<label for="">Wybierz jednostkę temperatury</label>
							<VueMultiselect
								v-model="unitsTemp"
								:options="temperatureUnit"
								:close-on-select="true"
								:clear-on-select="false"
								placeholder="Select unit temperature"
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
								label="lang"
								track-by="lang"
								@close="selectLang(selectedLang)"
							/>
						</div>          
					</div>
				</div>
			</section>

			<section>
				<div class="container">
					<div class="row m-0">
						<div class="col-6">
							<Forecast1 
								:cityName="cityName"
								:lat="12"
								:lon="15"
								:tableDayTemp="tableOfAverageDayTemperatures"
								:table="listInfoForecast"
								:tempHeader="main.temp"
								:defaultTableDayTemp="defaultTable"
							/>
						</div>
						<div class="col-6">
							tu bedzie wykres
							<LineChart 
								:chartData="chartData"
								:chartOptions="chartOptions"
							/>
						</div>
					</div>
				</div>
			</section>

			<section>
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
					<div class="col-4 main">
					temperatura: {{main.temp}} Kelwina<br>
					temperatura: {{main.temp }} Celciusza<br>
					temperatura odczuwalna: {{main.feels_like}} K<br>
					temperatura maxymalna: {{main.temp_max}} K<br>
					temperatura minimalna: {{main.temp_min}} K<br>
					ciśnienie atmosferyczne: {{main.pressure}}hPa<br>
					wilgotność: {{main.humidity}}%<br>
					</div>
					<div class="col-4 visibility">widoczność: {{visibility}} meters</div>
					<div class="col-4 wind">
					prędkość wiatru: {{wind.speed}}m/s<br>
					podmuch wiatru: {{wind.gust}}<br>
					kierunek wiatru: {{wind.deg}}stopnie meterologiczne
					</div>
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
			</section>
    	</main>
  	</div>
</template>

<script>
import cities from './module/cities';
import lang from './module/language';
import axios from "axios";
import Header from './components/Header.vue';
import Forecast1 from './components/Forecast1.vue';
import VueMultiselect from 'vue-multiselect';
import LineChart from './chart/LineChart'

export default {
	name: "app",
	components: {
		VueMultiselect,
		Header,
		Forecast1,
		LineChart
	},
    data() {
      	return {
			tableOfAverageDayTemperatures: ["dd", "d"],
			myCities: [],
			selected: null,
			city: {},
			options1: ['list', 'of', 'options'],
			options: [
				{ name: 'Vue.js', language: 'JavaScript' },
				{ name: 'Rails', language: 'Ruby' },
				{ name: 'Sinatra', language: 'Ruby' },
				{ name: 'Laravel', language: 'PHP', $isDisabled: true },
				{ name: 'Phoenix', language: 'Elixir' }
			],
			unitsTemp: null,
			temperatureUnit: [
				{key: 'metric', unit: 'Celciusza' },
				{key: 'imperial', unit: 'Farenhajta' },
				{key: '', unit: 'Kelwina' },
			],
			selectedTemperatureUnit: 'metric',
			myLang: [],
			selectedLang:'pl',
			cityWorld: '',
			API_KEY: '5baab241d44debf04d78944091967607',
			// API_KEY: '1c7fbae096fe77971b1dc5aa8fcd17ae',
        	URLWeather: "https://api.openweathermap.org/data/2.5/weather?",
			result: [],
			lat: '',
			lon:'',
			cityName: 'Rzeszów',
			stateCode:'',
			count: "1",
			dataWithApi: {},
			coord: {},
			weather: [],
			base: '',
			main: {},
			visibility: 0,
			wind: {},
			clouds: {},
			dt: 0,
			sys: {},
			timezone: 0,
			id: 0,
			name : "",
			cod: 0,

			tempKelwin: 0.00,
			charCelcius: '&#x2103;',

			//FORECAST
			URLForecast: "https://api.openweathermap.org/data/2.5/forecast?",
			listResultsForecast: [],
            cityInfoForecast: {},
			listInfoForecast: [],
			defaultTable: [],

			//CHART JS
			chartData: {
				labels: ["January", "February", "March", "April", "May", "June", "July"],
				datasets: [
					{
						label: "Temperatura Minimalna",
						backgroundColor: "red",
						data: [40, 39, 10, 40, 39, 80, 40],
						borderColor: 'red',
					},
					{
						label: "Temperatura maksymalna",
						backgroundColor: "violet",
						data: [3, 112, 55, 30, 80, 40, 36],
						borderColor: 'violet',
					},
				],
			},
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false,
			}
      	}
    },

    created(){
      const resultCity = JSON.parse(cities());
      this.myCities = resultCity;
      this.myLang = lang();
      this.getWeather();
	  this.daily();
      // this.downloadData()
      // this.assignWeather();
    },

    methods: {
		// getDay(index){
        //     const todayDate = new Date();
        //     const tablicaNazwDni = [ 'N', 'PN', "WT", "ŚR", "CZW", "PT", "SO",'N', 'PN', "WT", "ŚR", "CZW", "PT"]
		// 	const tablicaLabel = []

        //     return tablicaNazwDni[todayDate.getDay()+index];
        // },

		selectCityWorld(e){
			this.city.WOJ = '';
			this.cityName = e.target.value;
			this.getWeather();
			this.daily(this.coord.lat, this.coord.lon, this.selectedTemperatureUnit);
		},

		selectCity(e){
			this.cityName = e.NAZWA;
			this.getWeather();
			this.daily(this.coord.lat, this.coord.lon, this.selectedTemperatureUnit);
		},

		selectUnitTemp(e){
			this.selectedTemperatureUnit = e.key;
			this.getWeather();
			this.daily(this.coord.lat, this.coord.lon, this.selectedTemperatureUnit);
		},

		selectLang(e){
			this.selectedLang = e.key;
			this.getWeather();
		},
		async getWeather() {
			
			await axios.get(`${this.URLWeather}q=${this.cityName}&lat=${this.lat}&lon=${this.lon}&appid=${this.API_KEY}&lang=${this.selectedLang}&units=${this.selectedTemperatureUnit}`)
				.then(res => {
					if (res.status == 200) {
						this.result = res.data;
						this.coord= res.data.coord;
						this.weather= res.data.weather;
						this.base= res.data.base;
						this.main= res.data.main;
						this.visibility= res.data.visibility;
						this.wind= res.data.wind;
						this.clouds= res.data.clouds;
						this.dt= res.data.dt;
						this.sys= res.data.sys;
						this.timezone= res.data.timezone;
						this.id= res.data.id;
						this.name = res.data.name;
						this.cod= res.data.cod;
						this.lon = res.data.coord.lon;
						this.lat = res.data.coord.lat;
					} else {
						console.log(res.statusText);
					}})
				.catch(err => {
					console.log(err);
				})
		},
		// FORECAST
		async daily(lat = 50.0413, lon = 21.999, units = 'metric'){
            await axios.get(`${this.URLForecast}lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=${units}`)
                .then(res => {
                    if (res.status == 200) {
                        this.listResultsForecast = res.data;
                        this.cityInfoForecast = res.data.city;
						this.listInfoForecast = res.data.list
                    } else {
                        console.log(res);
                    }
                })
                .catch(err => {
                    console.log(err, "forecast");
                })
        },
		linkIcon(icon){
			return `http://openweathermap.org/img/w/${icon}.png`;
		},
		kelwinToCelcius(){
			const tempCelcius = (this.main.temp - 273.15).toFixed(2);
			return tempCelcius;
		},
		celsiusToKelwin(celcius){
			const tempKelwin = (Number(celcius) + 273.15).toFixed(2);
			return tempKelwin;
		}
  },
  watch: {
    
  }
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
</style>
