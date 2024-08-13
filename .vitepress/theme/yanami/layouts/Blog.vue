<template>
    <div class="mx-auto my-0 max-w-6xl pt-10 px-8 pb-0">
        <h1 class="leading-10 text-5xl font-semibold">All Posts</h1>
        <p class="my-6">An archive of our blog posts.</p>
        <hr class="my-8" />
        <div v-for="yearList in data" class="border-[1px] border-dashed border-[#c7c7c7] last:border-none">
            <div class="my-5 font-medium text-xl">
                {{ yearList[0].date.original.split("-")[0] }}
            </div>
            <div v-for="(article, index) in yearList">
                <a
                    :href="article.url"
                    :key="index"
                    class="flex items-center justify-between m-3 hover:no-underline text-[color:var(--vp-c-text-2)] hover:text-[color:var(--vp-c-brand)]"
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
