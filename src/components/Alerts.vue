<template>
	<div v-for="(alert, index) in alerts" :key="index" class="mb-3 d-flex flex-row">
		<div class="my-1 mr-4">{{ index + 1 }}:</div>
		<div v-if="alert != undefined">
			<!-- {{alerts}} -->
			<p class="mb-1 mt-1">{{ $t("sourceOfAlert") }}: {{ alert.sender_name }}</p>
			<p class="mb-1">{{ $t("nameAlert") }}: {{ $t(`${alert.event.toLowerCase()}`) }}</p>
			<p class="mb-1">{{ $t("startOfAlert") }}: {{ setDataAlert(alert.start) }}</p>
			<p class="mb-1">{{ $t("endOfAlert") }}: {{ setDataAlert(alert.end) }}</p>
			<Popper :hover="true"  :placement="'top'" :arrow-padding="'20'" v-bind:arrow="true"
				><p class="mb-1">
					<span>{{ $t("description") }}<i class="uil uil-info-circle" style="font-size:smaller;vertical-align: super;"></i>: </span><span>{{ alert.description }}</span>
				</p>
				<template #content>
					<div class="bg-secondary text-primary py-1 px-2 font-weight-light" style="font-size: 8px;border-radius: 0.25rem;">{{ $t("descriptionTooltip") }}</div>
				</template>
			</Popper>
			<p class="mb-1" v-if="alert.tags.length > 0">
				{{ $t("weatherType") }}:
				<span v-for="(tag, index) in alert.tags" :key="index"
					>{{ $t(`${tag.toLowerCase()}`) }}
				</span>
			</p>
		</div>
	</div>
</template>

<script>
import moment from "moment";
import lodash from "lodash";
import Popper from "vue3-popper";
export default {
	props: {
		alerts: Array,
	},
	components: {
		Popper,
	},
	data() {
		return {
			sender_name: "",
			event: "",
			start: "",
			end: "",
			description: "",
			tags: "",
		};
	},
	created() {
		if (this.alerts != null) {
			this.sender_name = this.alerts.sender_name;
			this.event = this.alerts.event;
			this.start = this.alerts.start;
			this.end = this.alerts.end;
			this.description = this.alerts.description;
			this.tags = this.alerts.tags;
		}
	},
	methods: {
		setDataAlert(dataUnix) {
			return moment.unix(dataUnix).format("YYYY-MM-DD, HH:mm");
		},
	},
	watch: {
		alerts() {
			if (this.alerts != null && this.alerts.length > 0) {
				this.sender_name = this.alerts[0].sender_name;
				this.event = this.alerts[0].event;
				this.start = moment.unix(this.alerts[0].start).format("YYYY-MM-DD, HH:mm");
				this.end = moment.unix(this.alerts[0].end).format("YYYY-MM-DD, HH:mm");
				this.description = this.alerts[0].description;
				this.tags = this.alerts[0].tags;
			}
		},
	},
};
</script>
