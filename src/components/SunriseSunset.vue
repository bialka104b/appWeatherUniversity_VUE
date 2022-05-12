<template>
    <div>
        
        <!-- <i class="fa-solid fa-sun"></i> -->
        <div class="pb-2">
            <img src="./../assets/icons/sunrise.svg">
            Wschód: {{sunrise}}
        </div>
        <div class="pb-2">
            <img src="./../assets/icons/sunset.svg">
            Zachód: {{sunset}}
        </div>
        <div class="">
            <img src="./../assets/icons/visibility.svg">
            Widoczność na drogach {{visible}} km
        </div>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    props: {
        sys: Object,
        visibility: Number
    },
    components: {

    },
    data() {
        return {
            sunrise: '',
            sunset: '',
            visible:0,
        }
    },
    created() {
        
    },
    methods: {
        
    },
    watch: {
        sys(){
            this.sunrise = moment.unix(this.sys.sunrise).format("YYYY-MM-DD, HH:mm")
            this.sunset = moment.unix(this.sys.sunset).format("YYYY-MM-DD, HH:mm")
            this.visible = this.visibility*0.001;
            // console.log(this.sys)
        }
    }
}
</script>