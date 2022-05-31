<template>
    <div>
        <header class="header">
            <div class="navbar">
                <div class="logo">
                    <h1 class="textLightBlue">
                        Your
                        <strong class="font-weight-normal textPrimary">
                            Weather
                        </strong>
                    </h1>
                </div>
                
                <nav class="d-flex flex-fill justify-content-around">
                    <div>
                        <a href="" class="nav-link">Home</a>
                    </div>
                    <div>
                        <a href="" class="nav-link">Photos</a>
                    </div>
                    <div>
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
                </nav>
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
            lang: [ "en", "pl"]
        }
    },
}
</script>