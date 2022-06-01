<template>
	<div>
		<div class="pb-2 text-capitalize">
			<img src="./../assets/icons/sunrise.svg" class="mr-2 sunriseSunsetIcon" />{{ $t("sunrise") }}:
			{{ sunrise }}
		</div>
		<div class="pb-2 text-capitalize">
			<img src="./../assets/icons/sunset.svg" class="mr-2 sunriseSunsetIcon" />{{ $t("sunset") }}: {{ sunset }}
		</div>
		<div class="text-capitalize">
			<img src="./../assets/icons/visibility.svg" class="mr-2 sunriseSunsetIcon" />{{ $t("visibility") }}:
			{{ visible * 0.001 }} km
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
