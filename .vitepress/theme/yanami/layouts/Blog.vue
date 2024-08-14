<template>
	<div class="mx-auto my-0 max-w-6xl px-8 pb-0 pt-10">
		<h1 class="text-5xl font-semibold leading-10">All Posts</h1>
		<p class="my-6">An archive of our blog posts.</p>
		<hr class="my-8" />
		<div
			v-for="yearList in data"
			:key="yearList[0].date.original.split('-')[0]"
			class="border border-dashed border-[#c7c7c7] last:border-none"
		>
			<div class="my-5 text-2xl font-medium">
				{{ yearList[0].date.original.split("-")[0] }}
			</div>
			<div class="mx-3" v-for="(article, index) in yearList" :key="index">
				<a
					:href="article.url"
					:key="index"
					class="my-1 flex items-center justify-between hover:text-[color:var(--vp-c-brand)] hover:no-underline"
					style="
						transition:
							border 0.3s ease,
							color 0.3s ease;
					"
				>
					<div class="text-xl">
						{{ article.title }}
					</div>
					<div>{{ article.date.string.slice(0, -6) }}</div>
				</a>
				<div>
					Written by
					<span class="font-semibold">{{ article.author }}</span>
				</div>
				<div>{{ article.excerpt }}</div>
			</div>
		</div>
		<div v-if="data.length === 0" class="my-4">Nothing here just yet, but we're cooking.</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { data as posts } from "../../../posts.data";
import { useYearSort } from "../utils";

const data = computed(() => useYearSort(posts));
</script>
