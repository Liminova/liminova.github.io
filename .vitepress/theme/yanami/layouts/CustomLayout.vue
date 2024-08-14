<!-- SPDX-License-Identifier: Apache-2.0 -->

<script setup lang="ts">
/* eslint vue/no-useless-template-attributes: 0 */
import DefaultTheme from "vitepress/theme";
import { formatDate } from "../utils";

const { Layout } = DefaultTheme;

watch(() => route.path, (path, referrer) => {
  window.goatcounter?.count?.({ path, referrer });
})
// watch(() => route.path, (path, referrer) => {
//   window.goatcounter?.count?.({ path, referrer });
// })
</script>

<template>
    <Layout>
        <template class="my-4" #doc-before>
            <h1 class="my-2 text-4xl font-semibold leading-10">{{ $frontmatter.title }}</h1>
            <h2 class="my-2">
                {{ formatDate($frontmatter.date).string }} •
                <span>
                    Written by <span class="font-semibold">{{ $frontmatter.author }}</span>
                </span>
            </h2>
        </template>
    </Layout>
</template>
