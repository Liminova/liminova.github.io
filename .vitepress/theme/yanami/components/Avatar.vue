<script setup lang="ts">
import { cn } from '../libs/classname'

const props = defineProps<{
	src: string
	class?: string
	alt?: string
}>()
</script>

<template>
	<video
		v-if="props.src.endsWith('mp4')"
		:src="props.src"
		:class="cn('!h-full', props.class)"
		autoplay
		muted
		loop
		playsinline
	/>
	<img v-else :class="props.class" :src="props.src" :alt="props.alt" />
</template>
