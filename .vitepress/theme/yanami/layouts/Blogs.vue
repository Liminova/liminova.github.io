<template>
    <div class="main">
        <h1 class="">Blogs</h1>
        <div v-for="yearList in data" class="yearItem">
            <div class="my-5 font-medium text-xl">
                {{ yearList[0].date.original.split("-")[0] }}
            </div>
            <div v-for="(article, index) in yearList">
                <a :href="article.url" :key="index" class="article">
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
.main {
    @apply mx-auto my-0;
    @apply max-w-3xl;
    @apply pt-10 px-8 pb-0;
}

h1 {
    @apply leading-10 text-2xl font-semibold;
}

.yearItem {
    border-bottom: 1px dashed #c7c7c7;
}

.yearItem:last-child {
    border: none;
}

.year {
    padding: 16px 0 8px 0;
    font-size: 1.2rem;
    font-weight: 600;
}

.article {
    @apply flex items-center justify-between;
    @apply m-3;
    color: var(--vp-c-text-2);
    transition: border 0.3s ease, color 0.3s ease;
}

.article:hover {
    text-decoration: none;
    color: var(--vp-c-brand);
}
</style>
