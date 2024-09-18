<!-- SPDX-License-Identifier: Apache-2.0 -->

<script setup lang="ts">
/* eslint vue/no-useless-template-attributes: 0 */
import { useData, useRoute } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { watch } from "vue";
import { formatDate } from "../libs";
import type { ThemeConfig } from "../../../config.mts";

const { Layout } = DefaultTheme;
const route = useRoute();
const data = useData<ThemeConfig>();
const members = data.theme.value.members;

watch(
	() => route.path,
	(path, referrer) => {
		window.goatcounter?.count?.({ path, referrer });
	}
);
</script>

<template>
	<Layout>
		<template class="my-4" #doc-before>
			<h1 class="my-2 text-4xl font-semibold leading-10">
				{{ useData().frontmatter.value.title }}
			</h1>
			<h2 class="my-2">
				<div class="flex max-w-fit items-center justify-between">
					<video
						v-if="
							members
								?.filter(
									(member) => member.name === useData().frontmatter.value.author
								)[0]
								.avatar.endsWith('.mp4')
						"
						class="mr-2 inline-block aspect-square w-8 rounded-full"
						:src="
							members?.filter(
								(member) => member.name === useData().frontmatter.value.author
							)[0].avatar
						"
						autoplay
						muted
						loop
						playsinline
					/>
					<img
						class="mr-2 inline-block aspect-square w-8 rounded-full"
						:src="
							members?.filter(
								(member) => member.name === useData().frontmatter.value.author
							)[0].avatar
						"
						v-else
					/>
					<span>
						<span class="font-semibold">{{ useData().frontmatter.value.author }}</span>
						• {{ formatDate(useData().frontmatter.value.date).readable }}
					</span>
				</div>
				<ul class="my-3 flex flex-wrap" v-if="useData().frontmatter.value.tags">
					<li class="tag" :key="tag" v-for="tag in useData().frontmatter.value.tags">
						{{ tag }}
					</li>
				</ul>
			</h2>
		</template>
	</Layout>
</template>

<style scoped>
li {
	@apply inline;
}

li:not(.tag):not(:last-child)::after {
	content: " • ";
}
</style>
