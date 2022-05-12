<template>
    <div id="forecast">
        <h2>{{cityName}} - średnie dobowe temperatury</h2>
        <div class="">
            <div class="">
                <h5>{{tempHeader}} &#x2103;</h5>
            </div>
            <div class="d-flex">
                <div class="flex-fill text-center" v-for="(temp, index) in tableDayTemp" :key="index">
                    <h6>{{temp}}&deg;</h6>
                    <p>{{getDay(index)}}</p>
                </div>
            </div>
        </div>
            <!-- <pre ><code type="text/json" class="text-white">{{table}}</code></pre> -->
    </div>
</template>

<script>
import lodash from "lodash";
export default {
    props: {
        cityName: String,
    	lat: Number,
		lon: Number,
        table: Array,
        tempHeader: Number
    },
    data() {
        return {
            tableDayTemp: []
        }
    },
    setup() {
        
    },
    methods: {
        tableChange(){
            if (this.table != []) {
                this.tableDayTemp.length = 0;
                const list = this.table;
                const resultLodash = lodash.chunk(list, 8);
                let averageTemp = 0;
                for (let index = 0; index < resultLodash.length; index++) {
                    const element = resultLodash[index];
                    averageTemp = element.reduce((prev, next)=> {
                        return prev + next.main.temp;
                    }, 0);
                    this.tableDayTemp.push((averageTemp/8).toFixed(2));
                }
                this.getDay(1)
            }
        },
        getDay(index){
            const todayDate = new Date();
            const tablicaNazwDni = [ 'N', 'PN', "WT", "ŚR", "CZW", "PT", "SO",'N', 'PN', "WT", "ŚR", "CZW", "PT"]
            return tablicaNazwDni[todayDate.getDay()+index];
        },
    },
    watch: {
        table(){
            this.tableChange()
        }
    }
}
</script>