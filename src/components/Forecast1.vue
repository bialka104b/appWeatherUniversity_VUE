<template>
	<div id="forecast" class="container my-2 my-md-5">
		<h2 class="text-center text-success">
			{{ cityName }} - {{ $t("averageDailyTemperatures") }}
		</h2>
		<div class="bg-secondary rounded">
			<div class="d-flex justify-content-around p-3 text-primary flex-wrap">
				<div
					class="text-center px-2 flexBasis20"
					v-for="(temp, index) in tableDayTemp"
					:key="index"
				>
					<p>{{ $t(`${getDay(index)}`).toUpperCase() }}</p>
					<h6>{{ temp }}&deg;</h6>
					<img :src="`${urlTemplate}${tableImageIcon[index].icon}.png`" alt="" />
					<p class="fontSizeMobile">{{ $t(`${tableImageIcon[index].description}`) }}</p>
				</div>
			</div>
		</div>
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
		tempHeader: Number,
	},
	data() {
		return {
			tableDayTemp: [],
			tableImageIcon: [],
			urlTemplate: "http://openweathermap.org/img/w/",
		};
	},
	setup() {},
	methods: {
		tableChange() {
			if (this.table != []) {
				this.tableDayTemp.length = 0;
				this.tableImageIcon.length = 0;
				const list = this.table;
				const resultLodash = lodash.chunk(list, 8);
				let averageTemp = 0;
				for (let index = 0; index < resultLodash.length; index++) {
					const element = resultLodash[index];
					averageTemp = element.reduce((prev, next) => {
						return prev + next.main.temp;
					}, 0);
					this.tableDayTemp.push((averageTemp / 8).toFixed(2));
					this.tableImageIcon.push(element[0].weather[0]);
				}
				this.getDay(1);
			}
		},
		getDay(index) {
			const todayDate = new Date();
			const tableNamesOfDays = [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
			];
			return tableNamesOfDays[todayDate.getDay() + index];
		},
	},
	watch: {
		table() {
			this.tableChange();
		},
	},
};
</script>
