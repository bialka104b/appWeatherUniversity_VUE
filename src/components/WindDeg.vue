<template>
	<div class="d-inline-block">{{ value }}&deg; {{symbol}}</div>
	<div class="d-inline-block ml-2" :style="`transform: rotate(${value}deg);width:20px`">
		<img src="./../assets/icons/windDeg.svg" alt="" />
	</div>
</template>

<script>
export default {
    name: 'WindDeg',
    props: {
		value: Number,
        symbol: String
	},
}
</script>
