<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <div class="">
    <!-- <header>
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />
      </div>
    </header> -->
    <header class="header">
      <div class="navbar">
        <div class="logo">
          <h1 class="textLightBlue">Your<strong class="font-weight-normal textPrimary">Weather</strong> </h1>
        </div>
        
        <nav class="d-flex flex-fill justify-content-around">
          <div>
            <a href="">Home</a>
          </div>
          <div>
            <a href="">Photos</a>
          </div>
          <div>
            <a href="">Contacts</a>
          </div>
        </nav>
      </div>
    </header>

    <main class="">
      
      <!-- <TheWelcome /> -->
      <!-- <pre ><code type="text/json">{{dataWithApi}}</code></pre> -->
       <!-- {{dt}} -->

       <section class="container-fluid section">
         <HelloWorld :msg="coord" />

         <div class="row m-0">
           <div class="col-8">
             <div class="row m-0">
               <div class="col-12 bgOpacity my-2 bRadius">
                 <h2>{{name}}</h2>
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
                  <h2>{{name}}</h2>
                 <div class="">
                   <div class="">
                     <h5>{{main.temp}} &#x2103;</h5>
                   </div>
                   <div class="d-flex">
                      <div class="flex-fill text-center">
                        <h6>15&deg;</h6>
                        <p>PN</p>
                      </div>
                      <div class="flex-fill text-center">
                        <h6>15&deg;</h6>
                        <p>WT</p>
                      </div>
                      <div class="flex-fill text-center">
                        <h6>15&deg;</h6>
                        <p>ŚR</p>
                      </div>
                      <div class="flex-fill text-center">
                        <h6>15&deg;</h6>
                        <p>CZW</p>
                      </div>
                      <div class="flex-fill text-center">
                        <h6>15&deg;</h6>
                        <p>PT</p>
                      </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           <div class="col-4 my-2 bgOpacity bRadius">

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
      <!-- {{celsiusToKelwin( kelwinToCelcius() )}} -->
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
    data() {
      return {
        API_KEY: '367b8f2f934e64189da6bf139c4d24b4',
        URL: "https://api.openweathermap.org/data/2.5/weather?",
        result: [],
        lat: '',
        lon:'',
        cityName: 'Rzeszów',
        stateCode:'',
        temperatureUnit: 'metric',
        
        count: "1",
        dataWithApi: {},

        coord: {
          lon: 0,
          lat: 0
        },
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
        charCelcius: '&#x2103;'
      }
    },

    created(){
      this.getWeather()
      // this.downloadData()
      // this.assignWeather();

    },

    mounted() {
      
    },

    methods: {
      assignWeather() {
        // this.coord = this.dataWithApi.coord;
      },
      
      async getWeather() {
        
        await axios.get(`${this.URL}q=${this.cityName}&lat=${this.lat}&lon=${this.lon}&appid=${this.API_KEY}&lang=pl&units=${this.temperatureUnit}`)
                .then(res => {
                  console.log(res, "res");
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
                  } else {
                    console.log(res.statusText);
                  }
                })
                .catch(err => {
                  console.log(err);
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

<style lang="scss">
@import './assets/base.css';
@import './scss/app.scss';

.col-4 {
    // background-image: url("./assets/images/sunset.jpg");
    background-size: cover;
}
</style>
