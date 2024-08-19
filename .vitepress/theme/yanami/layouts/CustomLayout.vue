<!-- SPDX-License-Identifier: Apache-2.0 -->

<script setup lang="ts">
/* eslint vue/no-useless-template-attributes: 0 */
import { useData, useRoute } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { watch } from "vue";
import { formatDate } from "../libs";

const { Layout } = DefaultTheme;
const route = useRoute();

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
				<ul>
					<li>{{ formatDate(useData().frontmatter.value.date).string }}</li>
					<li>
						Written by
						<span class="font-semibold">{{ useData().frontmatter.value.author }}</span>
					</li>
					<li>
						<span>
							<ul class="inline" v-if="useData().frontmatter.value.tags">
								<li
									class="tag"
									:key="tag"
									v-for="tag in useData().frontmatter.value.tags"
								>
									#{{ tag }}
								</li>
							</ul>
						</span>
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
