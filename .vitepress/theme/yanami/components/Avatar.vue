<!-- Headless Avatar component. Don't include any styles. -->

<script setup lang="ts">
const props = defineProps({
	src: {
		type: String,
		required: true,
	},
	class: {
		type: String,
		required: false,
	},
});
</script>

<template>
	<video
		v-if="props.src.endsWith('mp4')"
		:src="props.src"
		:class="props.class"
		autoplay
		muted
		loop
		playsinline
	/>
	<img v-else :class="props.class" :src="props.src" />
</template>
