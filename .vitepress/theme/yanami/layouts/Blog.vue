<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";
import { data as posts } from "../../../posts.data";
import { useYearSort } from "../libs";
import type { ThemeConfig } from "../../../config.mts";

const postsByYear = computed(() => useYearSort(posts));
const data = useData<ThemeConfig>();
const members = data.theme.value.members;
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
			<div class="mx-3 my-6" v-for="(post, index) in posts" :key="index">
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
					<div class="text-xl font-semibold">
						{{ post.title }}
					</div>
				</a>
				<div
					class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-300"
				>
					{{ post.description }}
				</div>
				<div class="my-2 flex items-center justify-between text-sm">
					<div class="flex items-center">
						<video
							v-if="
								members
									?.filter((member) => member.name === post.author)[0]
									.avatar.endsWith('.mp4')
							"
							class="mr-2 inline-block aspect-square w-8 rounded-full"
							:src="
								members?.filter((member) => member.name === post.author)[0].avatar
							"
							autoplay
							muted
							loop
							playsinline
						/>
						<img
							class="mr-2 inline-block aspect-square w-8 rounded-full"
							:src="
								members?.filter((member) => member.name === post.author)[0].avatar
							"
							v-else
						/>
						<span>
							<span class="font-semibold">{{ post.author }}</span>
							• {{ post.date.readable.slice(0, -6) }}
						</span>
					</div>
					<span v-if="post.tags">
						<ul>
							<li class="inline" :key="tag" v-for="tag in post.tags">#{{ tag }}</li>
						</ul>
					</span>
				</div>
				<hr class="my-3" v-if="index !== posts.length - 1" />
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

.avatar {
	position: relative;
	flex-shrink: 0;
	margin: 0 auto;
	border-radius: 50%;
	box-shadow: var(--vp-shadow-3);
}

.avatar-img {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	border-radius: 50%;
	object-fit: cover;
	aspect-ratio: 1/1;
}
</style>
