<script setup lang="ts">
const props = defineProps<{
	yanamiFrames: Array<{ src: string; desc: string; bg?: string }>
}>()
</script>

<template>
	<div class="mx-auto my-0 max-w-full px-8 pt-10 pb-0">
		<h1 class="!text-5xl !leading-10 !font-semibold">Wall of Yanami</h1>
		<p class="!my-6">
			A collection of Anna Yanami's frames from Make Heroine ga Oosugiru! - the namesake of
			this website internally. Why? Why
			<span class="italic">not?</span>
			<br />
			Shoutout to OrangeJuice for skimming through all the episodes and picking these frames.
		</p>
		<hr class="my-8" />
		<div class="md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
			<figure v-for="frame in props.yanamiFrames" :key="frame.src" class="mb-3 md:mb-0">
				<div
					class="relative flex aspect-video h-auto w-full"
					:style="{
						backgroundColor: frame.bg ? `#${frame.bg}` : 'transparent'
					}"
				>
					<img
						:src="frame.src"
						class="absolute top-0 left-0 h-auto w-full"
						loading="lazy"
					/>
				</div>
				<figcaption class="my-2 text-center text-sm italic">
					{{ frame.desc }}
				</figcaption>
			</figure>
		</div>
	</div>
</template>
