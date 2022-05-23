<template>
	<div v-if="sender_name != undefined">
		<p class="mb-1 mt-1">Źródło alertu: {{ sender_name }}</p>
		<p class="mb-1">Nazwa: {{ event }}</p>
		<p class="mb-1">Początek alertu: {{ start }}</p>
		<p class="mb-1">Koniec alertu: {{ end }}</p>
		<p class="mb-1">Opis: {{ description }}</p>
		<p class="mb-1">Rodzaj pogody: 
            <span v-for="(tag, index) in tags" :key="index">{{ tag }}</span>
        </p>
	</div>
</template>

<script>
import moment from "moment";
export default {
	props: {
		alerts: Array,
	},
	components: {},
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
	methods: {},
	watch: {
		alerts() {
			if (this.alerts != null && this.alerts.length > 0) {
				this.sender_name = this.alerts[0].sender_name;
				this.event = this.alerts[0].event;
				this.start =  moment.unix(this.alerts[0].start).format("YYYY-MM-DD, HH:mm");
				this.end = moment.unix(this.alerts[0].end).format("YYYY-MM-DD, HH:mm");;
				this.description = this.alerts[0].description;
				this.tags = this.alerts[0].tags;
			}
		},
	},
};
</script>
