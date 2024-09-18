<script lang="ts" setup>
import TagBadge from "./TagBadge.vue";

defineProps<{
	tagList: Array<string>;
}>();
</script>

<template>
	<ul class="flex flex-wrap">
		<TagBadge :key="tag" :tag="tag" v-for="tag in tagList" />
	</ul>
</template>
