<template>
	<div>
		<div class="pb-2">
			<img src="./../assets/icons/sunrise.svg" />
			Wschód: {{ sunrise }}
		</div>
		<div class="pb-2">
			<img src="./../assets/icons/sunset.svg" />
			Zachód: {{ sunset }}
		</div>
		<div class="">
			<img src="./../assets/icons/visibility.svg" />
			Widoczność na drogach {{ visible * 0.001 }} km
		</div>
	</div>
</template>

<script>
import moment from "moment";
export default {
	props: {
		sys: Object,
		visible: Number,
	},
	components: {},
	data() {
		return {
			sunrise: "",
			sunset: "",
		};
	},
	created() {},
	methods: {},
	watch: {
		sys() {
			this.sunrise = moment.unix(this.sys.sunrise).format("YYYY-MM-DD, HH:mm");
			this.sunset = moment.unix(this.sys.sunset).format("YYYY-MM-DD, HH:mm");
		},
	},
};
</script>
