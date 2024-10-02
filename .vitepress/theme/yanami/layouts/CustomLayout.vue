<!-- SPDX-License-Identifier: Apache-2.0 -->

<script setup lang="ts">
/* eslint vue/no-useless-template-attributes: 0 */
import { useData, useRoute } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { watch } from "vue";
import type { TeamMember } from "../../../config.mjs";
import Avatar from "../components/Avatar.vue";
import TagBadges from "../components/TagBadges.vue";
import { formatDate } from "../libs";

const { Layout } = DefaultTheme;
const route = useRoute();

watch(
	() => route.path,
	(path, referrer) => {
		window.goatcounter?.count?.({ path, referrer });
	}
);

function getPostAuthors(): Array<TeamMember> {
	const data = useData();
	const members = (data.theme.value as { members: Array<TeamMember> }).members;
	const postAuthors = data.frontmatter.value.author as string | Array<string> | undefined;
	if (postAuthors === undefined) {
		throw new Error(`author field in ${data.page.value.filePath} is empty`);
	}

	switch (true) {
		case typeof postAuthors === "string":
			return members.filter((member) => member.name === postAuthors);
		case typeof postAuthors === "object":
			return members.reduce((acc: Array<TeamMember>, member: TeamMember) => {
				if (postAuthors.includes(member.name)) {
					acc.push(member);
				}

				return acc;
			}, []);
		default:
			throw new Error(`invalid author type ${typeof postAuthors}`);
	}
}
</script>

<template>
	<Layout>
		<template class="my-4" #doc-before>
			<h1 class="my-2 text-4xl font-semibold leading-10">
				{{ $frontmatter.title }}
			</h1>
			<h2 class="my-2">
				<div class="flex max-w-fit items-center justify-between">
					<div v-for="author in getPostAuthors()" :key="author.name">
						<Avatar
							:src="author.avatar"
							class="mr-2 inline-block aspect-square w-8 rounded-full"
						/>
						<span>
							<span class="font-semibold">{{ author.name }}</span>
						</span>
					</div>
					&nbsp;• {{ formatDate($frontmatter.date).readable }}
				</div>
				<TagBadges class="my-3" :tagList="$frontmatter.tags" v-if="$frontmatter.tags" />
			</h2>
		</template>
	</Layout>
</template>

<style scoped>
li {
	display: inline;
}

li:not(.tag):not(:last-child)::after {
	content: " • ";
}
</style>
