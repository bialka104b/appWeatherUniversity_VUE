<template>
	<div class="pb-2">
		<img src="./../assets/icons/uv.svg" />Wskaźnik UV w południe
		{{ uv }}
	</div>
</template>

<script>

export default {
	props: {
		uvi: Number
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