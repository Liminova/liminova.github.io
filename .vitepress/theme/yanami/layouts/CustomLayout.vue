<script setup lang="ts">
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { formatDate } from "../utils";

const { Layout } = DefaultTheme;
const page = useData();
const { title, author, date } = page.frontmatter.value;
</script>

<template>
    <Layout>
        <template class="my-4" #doc-before>
            <h1 class="my-2 text-4xl font-semibold leading-10">{{ title }}</h1>
            <h2 class="my-2">
                {{ formatDate(date).string }} •
                <span>
                    Written by <span class="font-semibold">{{ author }}</span>
                </span>
            </h2>
        </template>
    </Layout>
</template>

<style scoped>
.image-wrapper {
    @apply flex flex-wrap justify-evenly gap-y-2;
}

.caption {
    @apply text-center italic my-5;
}
</style>
