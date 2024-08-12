<template>
    <div class="main">
        <h1>Contests</h1>
        <p class="my-6">We aren't very good yet, but we're trying. :3</p>
        <hr />
        <div class="rounded-md border">
            <table class="w-full caption-bottom text-sm">
                <thead>
                    <tr class="border-b">
                        <th class="h-12 px-4 text-left align-middle font-medium -ml-4">Placement</th>
                        <th class="h-12 px-4 text-left align-middle font-medium -ml-4">Contest</th>
                        <th class="h-12 px-4 text-right align-middle font-medium -ml-4">CTFtime Rating</th>
                    </tr>
                </thead>
                <tbody v-for="contest in data">
                    <td class="h-12 w-10 p-4 text-center align-middle -ml-4">
                        <div class="text-2xl font-semibold">#{{ contest.placement }}</div>
                    </td>
                    <td class="h-12 p-4 text-left align-middle -ml-4">
                        <div>
                            <div class="text-xl font-semibold">{{ contest.name }}</div>
                            <div>{{ contest.time }}</div>
                        </div>
                    </td>
                    <td class="h-12 px-4 text-right align-middle -ml-4">
                        <div>
                            <div>
                                <span class="text-xl font-semibold">{{ contest.ctfPoints }}</span> points
                            </div>
                            <div>
                                <span class="text-xl font-semibold">{{ contest.ctfRating }}</span> rating
                            </div>
                        </div>
                    </td>
                </tbody>
            </table>
        </div>
        <div v-if="data.length === 0" class="my-4">Nothing here just yet, but we're cooking.</div>
    </div>
</template>

<script setup lang="ts">
const data = [
    {
        name: "osu!gaming CTF 2024",
        time: "March 02 - March 04, 2024",
        placement: 166,
        ctfPoints: 1771,
        ctfRating: 4.912,
    },
    {
        name: "SekaiCTF 2023",
        time: "August 25 - August 27, 2024",
        placement: 175,
        ctfPoints: 573,
        ctfRating: 1.510,
    },
];
</script>

<style scoped lang="postcss">
.main {
    @apply mx-auto my-0;
    @apply max-w-6xl;
    @apply pt-10 px-8 pb-0;
}

h1 {
    @apply leading-10 text-5xl font-semibold;
}

hr {
    @apply my-8;
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
