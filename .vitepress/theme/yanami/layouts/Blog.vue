<template>
    <div class="mx-auto my-0 max-w-6xl px-8 pb-0 pt-10">
        <h1 class="text-5xl font-semibold leading-10">All Posts</h1>
        <p class="my-6">An archive of our blog posts.</p>
        <hr class="my-8" />
        <div v-for="yearList in data" :key="yearList[0].date.original.split('-')[0]"
            class="border border-dashed border-[#c7c7c7] last:border-none">
            <div class="my-5 text-xl font-medium">
                {{ yearList[0].date.original.split("-")[0] }}
            </div>
            <div v-for="(article, index) in yearList" :key="index">
                <a
                    :href="article.url"
                    :key="index"
                    class="m-3 flex items-center justify-between text-[color:var(--vp-c-text-2)] hover:text-[color:var(--vp-c-brand)] hover:no-underline"
                    style="transition: border 0.3s ease, color 0.3s ease;">
                    <div class="title">
                        <div class="title-o"></div>
                        {{ article.title }}
                    </div>
                    <div class="date">{{ article.date.string.slice(0, -6) }}</div>
                </a>
                <div>{{ article.excerpt }}</div>
            </div>
        </div>
        <div v-if="data.length === 0" class="my-4">Nothing here just yet, but we're cooking.</div>
    </div>
</template>

<script setup lang="ts">
import { data as posts } from "../../../posts.data";
import { computed } from "vue";
import { useYearSort } from "../utils";

const data = computed(() => useYearSort(posts));
</script>

<style scoped lang="postcss">
.year {
    padding: 16px 0 8px 0;
    font-size: 1.2rem;
    font-weight: 600;
}
</style>
