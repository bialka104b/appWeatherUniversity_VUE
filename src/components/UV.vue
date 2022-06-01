<template>
	<div class="pb-2 text-capitalize">
		<img src="./../assets/icons/uv.svg" class="mr-2 sunriseSunsetIcon" />{{ $t("UVIndicator") }}: {{ uv }}
	</div>
</template>

<script>
export default {
	props: {
		uvi: Number,
	},
	components: {},
	data() {
		return {
			uv: 0,
		};
	},
	created() {},
	methods: {},
	watch: {
		uvi() {
			this.uv = this.uvi;
		},
	},
};
</script>
