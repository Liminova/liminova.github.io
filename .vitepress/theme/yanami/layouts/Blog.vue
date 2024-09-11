<script setup lang="ts">
import { computed } from "vue";
import { data as posts } from "../../../posts.data";
import { useYearSort } from "../libs";

const postsByYear = computed(() => useYearSort(posts));
</script>

<template>
	<div class="mx-auto my-0 max-w-6xl px-8 pb-0 pt-10">
		<h1 class="text-5xl font-semibold leading-10">All Posts</h1>
		<p class="my-6">An archive of our blog posts.</p>
		<hr class="my-8" />
		<div
			v-for="posts in postsByYear"
			:key="posts[0].date.readable.slice(-4)"
			class="border border-dashed border-[#c7c7c7] last:border-none"
		>
			<div class="my-5 text-2xl font-medium">
				{{ posts[0].date.readable.slice(-4) }}
			</div>
			<div class="mx-3 my-5" v-for="(post, index) in posts" :key="index">
				<a
					:href="post.url"
					:key="index"
					class="flex items-center justify-between hover:text-[color:var(--vp-c-brand)] hover:no-underline"
					style="
						transition:
							border 0.3s ease,
							color 0.3s ease;
					"
				>
					<div class="text-xl">
						{{ post.title }}
					</div>
					<div>{{ post.date.readable.slice(0, -6) }}</div>
				</a>
				<div class="flex items-center justify-between text-gray-500 dark:text-gray-300">
					<div>
						Written by
						<span class="font-semibold">{{ post.author }}</span>
					</div>
					<span v-if="post.tags">
						<ul>
							<li class="inline" :key="tag" v-for="tag in post.tags">#{{ tag }}</li>
						</ul>
					</span>
				</div>
			</div>
		</div>
		<div v-if="postsByYear.length === 0" class="my-4">
			Nothing here just yet, but we're cooking.
		</div>
	</div>
</template>

<style>
li:not(:last-child)::after {
	content: " ";
}
</style>
