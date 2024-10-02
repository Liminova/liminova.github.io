<script lang="ts" setup>
defineProps<{
	tagList: Array<string>;
}>();
</script>

<template>
	<ul class="flex flex-wrap">
		<li
			v-for="tag in tagList"
			:key="tag"
			class="mb-1 mr-1 inline rounded-md bg-gray-100 px-2.5 py-1 text-center text-xs dark:text-gray-500"
		>
			{{ tag }}
		</li>
	</ul>
</template>
