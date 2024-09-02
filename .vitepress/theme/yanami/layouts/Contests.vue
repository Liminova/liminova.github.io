<template>
	<div class="mx-auto my-0 max-w-6xl px-8 pb-0 pt-10">
		<h1 class="text-5xl font-semibold leading-10">Contests</h1>
		<p class="my-6">We aren't very good yet, but we're trying. :3</p>
		<p class="my-6">All times are in UTC+7 (ICT), as displayed on CTFtime.</p>
		<hr class="my-8" />
		<div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
			<div v-for="contest in data" :key="contest.time" class="flex size-full flex-col justify-between rounded-md border">
				<div class="text-balance border-b px-4 py-3 text-center text-lg font-semibold">{{ contest.name }}</div>

				<div class="flex grow items-center justify-evenly border-b px-4 py-5">
					<div>
						<span class="mr-1 align-top text-xl">#</span>
						<span class="text-3xl font-black">{{ contest.placement }}</span>
					</div>
					<div>
						<div v-if="contest.ctfPoints"><span class="font-bold">{{ contest.ctfPoints }}</span> points</div>
						<div v-if="contest.ctfRating"><span class="font-bold">{{ contest.ctfRating }}</span> rating</div>
					</div>
				</div>

				<div class="mx-4 my-1 text-center text-sm">{{ contest.time }}</div>
			</div>
		</div>
		<div v-if="data.length === 0" class="my-4">Nothing here just yet, but we're cooking.</div>
	</div>
</template>

<script setup lang="ts">
const data = [
	{
		name: "CyberSpace CTF 2024",
		time: "August 30 - September 01, 2024",
		placement: 235,
		ctfPoints: 451,
		ctfRating: 0,
	},
	{
		name: "SekaiCTF 2024",
		time: "August 23 - August 25, 2024",
		placement: 193,
		ctfPoints: 239,
		ctfRating: 1.74,
	},
	{
		name: "idekCTF 2024",
		time: "August 17 - August 19, 2024",
		placement: 143,
		ctfPoints: 568,
		ctfRating: 0,
	},
	{
		name: "Lexington Informatics Tournament CTF 2024",
		time: "August 10 - August 13, 2024",
		placement: 47,
		ctfPoints: 2710,
		ctfRating: 25.298,
	},
	{
		name: "osu!gaming CTF 2024",
		time: "March 02 - March 04, 2024",
		placement: 166,
		ctfPoints: 1771,
		ctfRating: 4.912,
	},
	{
		name: "SekaiCTF 2023",
		time: "August 25 - August 27, 2023",
		placement: 175,
		ctfPoints: 573,
		ctfRating: 1.51,
	},
];
</script>

<style scoped>
.year {
	padding: 16px 0 8px 0;
	font-size: 1.2rem;
	font-weight: 600;
}

.article {
	@apply flex items-center justify-between;
	@apply m-3;
	color: var(--vp-c-text-2);
	transition:
		border 0.3s ease,
		color 0.3s ease;
}

.article:hover {
	text-decoration: none;
	color: var(--vp-c-brand);
}
</style>
