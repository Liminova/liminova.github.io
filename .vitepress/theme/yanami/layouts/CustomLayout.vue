<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import { formatDate } from "../utils";

const { Layout } = DefaultTheme;
const page = useData();
const date = formatDate(page.frontmatter.value["date"]);
</script>

<template>
    <Layout>
        <template class="my-4" #doc-before>
            <h1 class="my-2 leading-10 text-4xl font-semibold">{{ $frontmatter.title }}</h1>
            <h2 class="my-2">
                {{ date.string }} •
                <span>
                    Written by <span class="font-semibold">{{ $frontmatter.author }}</span>
                </span>
            </h2>
        </template>
    </Layout>
</template>

<style>
.image-wrapper {
    @apply flex flex-wrap justify-evenly gap-y-2;
}

.caption {
    @apply text-center italic my-5;
}
</style>
