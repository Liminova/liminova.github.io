<script setup lang="ts">
import Avatar from "../components/Avatar.vue";
import TagBadges from "../components/TagBadges.vue";
import { sorted } from "./Blog.state";
</script>

<template>
	<div class="mx-auto my-0 max-w-6xl px-8 pb-0 pt-10">
		<h1 class="text-5xl font-semibold leading-10">All Posts</h1>
		<p class="my-6">An archive of our blog posts.</p>
		<hr class="my-8" />
		<div
			v-for="posts in sorted"
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

				<div class="my-2 flex flex-wrap items-center justify-between text-sm">
					<!-- "items-center" causes date to be centered if it's not in this div -->
					<div class="flex items-center gap-1">
						<div class="flex items-center gap-2">
							<div
								v-for="author in post.authors"
								:key="author.name"
								class="flex min-w-fit items-center"
							>
								<Avatar
									:src="author.avatar"
									class="mr-1 inline-block aspect-square w-5 rounded-full"
								/>
								<span class="font-semibold">{{ author.name }}</span>
							</div>
						</div>
						• {{ post.date.readable.slice(0, -6) }}
					</div>
					<TagBadges class="mt-1 justify-end" :tagList="post.tags" v-if="post.tags" />
				</div>

				<hr class="my-3" v-if="index !== posts.length - 1" />
			</div>
		</div>
		<div v-if="sorted.length === 0" class="my-4">Nothing here just yet, but we're cooking.</div>
	</div>
</template>
