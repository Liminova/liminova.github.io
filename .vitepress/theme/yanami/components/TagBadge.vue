<script lang="ts" setup>
defineProps<{
	tag: string;
}>();
</script>

<template>
	<li
		class="mb-1 mr-1 inline rounded-md bg-gray-100 px-2.5 py-1 text-center text-xs dark:text-gray-500"
	>
		{{ tag }}
	</li>
</template>
