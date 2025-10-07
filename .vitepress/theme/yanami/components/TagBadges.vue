<script lang="ts" setup>
import { cn } from '../libs/classname'

const props = defineProps<{
	tagList: string[]
	class: string
}>()
</script>

<template>
	<ul :class="cn('flex-wra !my-3 flex', props.class)">
		<li
			v-for="tag in props.tagList"
			:key="tag"
			class="mr-1 mb-1 inline rounded-md bg-gray-100 px-2.5 py-1 text-center text-xs dark:bg-gray-800 dark:text-[var(--vp-c-brand-1)]"
		>
			{{ tag }}
		</li>
	</ul>
</template>
