<!-- SPDX-License-Identifier: Apache-2.0 -->

<script setup lang="ts">
/* eslint vue/no-useless-template-attributes: 0 */
import { useData, useRoute } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { watch } from "vue";
import { formatDate } from "../utils";

const { Layout } = DefaultTheme;
const route = useRoute();

watch(() => route.path, (path, referrer) => {
	window.goatcounter?.count?.({ path, referrer });
})
</script>

<template>
	<Layout>
		<template class="my-4" #doc-before>
			<h1 class="my-2 text-4xl font-semibold leading-10">{{ useData().frontmatter.value.title }}</h1>
			<h2 class="my-2">
				{{ formatDate(useData().frontmatter.value.date).string }} •
				<span>
					Written by <span class="font-semibold">{{ useData().frontmatter.value.author }}</span>
				</span>
			</h2>
		</template>
	</Layout>
</template>
