<script lang="ts" setup>
import { cn } from '../libs/classname'

const props = defineProps<{
	tagList: string[]
	class: string
}>()
</script>

<template>
	<ul :class="cn('flex flex-wra !my-3', props.class)">
		<li
			v-for="tag in props.tagList"
			:key="tag"
			class="mb-1 mr-1 inline rounded-md bg-gray-100 px-2.5 py-1 text-center text-xs dark:bg-gray-800 dark:text-[var(--vp-c-brand-1)]"
		>
			{{ tag }}
		</li>
	</ul>
</template>
