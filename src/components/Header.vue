<template>
	<div class="w-100 position-relative">
		<header class="header">
			<div class="navbar">
				<div class="logo">
					<h1 class="textLightBlue">
						Your
						<strong class="font-weight-normal textPrimary"> Weather </strong>
					</h1>
				</div>

				<nav class="d-flex flex-fill justify-content-md-around justify-content-end">
					<div class="d-none d-md-block">
						<router to="/" class="nav-link btn-primary">Home</router>
					</div>
					<div class="d-none d-md-block">
						<router-link to="/weather48h" class="nav-link btn-primary">{{$t('Weather48h')}}</router-link>
					</div>
					<div class="d-none d-md-block">
						<a href="" class="nav-link">Contacts</a>
					</div>
					<div class="langSelect locale-changer d-flex align-items-center">
						<!-- <select v-model="$i18n.locale">
                        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
                        </select> -->
						<VueMultiselect
							v-model="$i18n.locale"
							:options="lang"
							:close-on-select="true"
							:clear-on-select="false"
							:hideSelected="true"
							:placeholder="$i18n.locale"
							:show-labels="false"
						></VueMultiselect>
					</div>
					<button class="btn bg-none d-md-none shadowNone" @click="handleShowDropdown()">
						<i class="uil uil-align-justify text-secondary"></i>
					</button>
				</nav>
				<div class="dropdownDiv d-md-none" v-show="showDropdown">
					<ul class="list-group bg-primary dropdown-menu">
						<li class="list-group-item bg-primary">
							<a href="" class="nav-link p-0 text-center">Home</a>
						</li>
						<li class="list-group-item bg-primary">
							<a href="" class="nav-link p-0 text-center">Home</a>
						</li>
						<li class="list-group-item bg-primary">
							<a href="" class="nav-link p-0 text-center">Contacts</a>
						</li>
					</ul>
				</div>
			</div>
		</header>
	</div>
</template>

<script>
import VueMultiselect from "vue-multiselect";
export default {
	components: {
		VueMultiselect,
	},
	data() {
		return {
			lang: ["en", "pl"],
			showDropdown: false,
		};
	},
	methods: {
		handleShowDropdown() {
			this.showDropdown = !this.showDropdown;
		},
	},
};
</script>
