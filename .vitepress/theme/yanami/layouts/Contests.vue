<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue";

interface Contest {
	name: string;
	time: string;
	placement: number;
	ctfPoints?: number;
	ctfRating?: number;
	short?: string;
}

const props = defineProps({
	data: {
		type: Array<Contest>,
		required: true,
	},
});

const isMobile = ref(false);

onBeforeMount(() => {
	isMobile.value = window.innerWidth <= 768;
});

onMounted(() => {
	const mediaQuery = window.matchMedia("(max-width: 768px)");
	mediaQuery.addEventListener("change", (e) => {
		isMobile.value = e.matches;
	});
});
</script>

<template>
	<div class="mx-auto my-0 max-w-6xl px-8 pb-0 pt-10">
		<h1 class="text-5xl font-semibold leading-10">Contests</h1>
		<p class="my-6">We aren't very good yet, but we're trying. :3</p>
		<p class="my-6">All times are in UTC+7 (ICT), as displayed on CTFtime.</p>
		<hr class="my-8" />

		<!-- desktop layout -->

		<div class="rounded-md border" v-if="!isMobile">
			<table class="w-full caption-bottom text-sm">
				<thead>
					<tr class="border-b">
						<th class="-ml-4 h-12 px-4 text-left align-middle font-medium">
							Placement
						</th>
						<th class="-ml-4 h-12 px-4 text-left align-middle font-medium">Contest</th>
						<th class="-ml-4 h-12 px-4 text-right align-middle font-medium">
							CTFtime Rating
						</th>
					</tr>
				</thead>
				<tr v-for="contest in props.data" :key="contest.name">
					<td class="-ml-4 h-12 w-10 p-4 text-center align-middle">
						<div class="text-2xl font-semibold">#{{ contest.placement }}</div>
					</td>
					<td class="-ml-4 h-12 p-4 text-left align-middle">
						<div>
							<div class="text-balance text-xl font-semibold">
								{{ contest.name }}
							</div>
							<div>{{ contest.time }}</div>
						</div>
					</td>
					<td class="-ml-4 h-12 px-4 text-right align-middle">
						<div>
							<div>
								<span class="text-xl font-semibold">{{ contest.ctfPoints }}</span>
								points
							</div>
							<div v-if="contest.ctfRating">
								<span class="text-xl font-semibold">{{ contest.ctfRating }}</span>
								rating
							</div>
						</div>
					</td>
				</tr>
			</table>
		</div>

		<!-- mobile layout -->

		<div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4" v-if="isMobile">
			<div
				v-for="contest in data"
				:key="contest.time"
				class="flex size-full flex-col justify-between rounded-md border"
			>
				<div class="text-balance border-b px-4 py-3 text-center text-lg font-semibold">
					<span v-if="contest.short">{{ contest.short }}</span>
					<span v-else>{{ contest.name }}</span>
				</div>

				<div class="flex grow items-center justify-evenly border-b px-4 py-5">
					<div>
						<span class="mr-1 align-top text-xl">#</span>
						<span class="text-3xl font-black">{{ contest.placement }}</span>
					</div>
					<div>
						<div v-if="contest.ctfPoints">
							<span class="font-bold">{{ contest.ctfPoints }}</span> points
						</div>
						<div v-if="contest.ctfRating">
							<span class="font-bold">{{ contest.ctfRating }}</span> rating
						</div>
					</div>
				</div>

				<div class="mx-4 my-1 text-center text-sm">{{ contest.time }}</div>
			</div>
		</div>

		<div v-if="props.data.length === 0" class="my-4">
			Nothing here just yet, but we're cooking.
		</div>
	</div>
</template>
