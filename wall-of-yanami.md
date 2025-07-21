---
layout: page
---

<script setup lang="ts">
const yanamiFrames = [
	{
		"src": "/yanami/s1e1-00.03.48.770.jpg",
		"desc": "Episode 1 - Professional Childhood Friend Yanami Anna's Style of Losing - 03:48.770",
		"bg": "9a988e"
	},
	{
		"src": "/yanami/s1e1-00.09.34.408.jpg",
		"desc": "Episode 1 - Professional Childhood Friend Yanami Anna's Style of Losing - 09:34.408",
		"bg": "415762"
	},
	{
		"src": "/yanami/s1e1-00.09.51.758.jpg",
		"desc": "Episode 1 - Professional Childhood Friend Yanami Anna's Style of Losing - 09:51.758",
		"bg": "2c3945"
	},
	{
		"src": "/yanami/s1e1-00.15.04.863.jpg",
		"desc": "Episode 1 - Professional Childhood Friend Yanami Anna's Style of Losing - 15:04.863",
		"bg": "64338a"
	},
	{
		"src": "/yanami/s1e1-00.15.06.365.jpg",
		"desc": "Episode 1 - Professional Childhood Friend Yanami Anna's Style of Losing - 15:06.365",
		"bg": "425b67"
	},
	{
		"src": "/yanami/s1e1-00.17.54.324.jpg",
		"desc": "Episode 1 - Professional Childhood Friend Yanami Anna's Style of Losing - 17:54.324",
		"bg": "5e6458"
	},
	{
		"src": "/yanami/s1e1-00.18.07.629.jpg",
		"desc": "Episode 1 - Professional Childhood Friend Yanami Anna's Style of Losing - 18:07.629",
		"bg": "415661"
	},
	{
		"src": "/yanami/s1e1-00.19.37.803.jpg",
		"desc": "Episode 1 - Professional Childhood Friend Yanami Anna's Style of Losing - 19:37.803",
		"bg": "314e70"
	},
	{
		"src": "/yanami/s1e1-00.22.16.170.jpg",
		"desc": "Episode 1 - Professional Childhood Friend Yanami Anna's Style of Losing - 22:16.170",
		"bg": "698baf"
	},
	{
		"src": "/yanami/s1e2-00.07.59.479.jpg",
		"desc": "Episode 2 - The Promised Failure for You - 07:59.479",
		"bg": "708174"
	},
	{
		"src": "/yanami/s1e2-00.08.55.577.jpg",
		"desc": "Episode 2 - The Promised Failure for You - 08:55.577",
		"bg": "979f9a"
	},
	{
		"src": "/yanami/s1e2-00.09.19.726.jpg",
		"desc": "Episode 2 - The Promised Failure for You - 09:19.726",
		"bg": "a3aa9d"
	},
	{
		"src": "/yanami/s1e2-00.14.30.120.jpg",
		"desc": "Episode 2 - The Promised Failure for You - 14:30.120",
		"bg": "425862"
	},
	{
		"src": "/yanami/s1e2-00.15.59.751.jpg",
		"desc": "Episode 2 - The Promised Failure for You - 15:59.751",
		"bg": "595b4f"
	},
	{
		"src": "/yanami/s1e2-00.19.56.238.jpg",
		"desc": "Episode 2 - The Promised Failure for You - 19:56.238",
		"bg": "8f7f66"
	},
	{
		"src": "/yanami/s1e2-00.20.37.070.jpg",
		"desc": "Episode 2 - The Promised Failure for You - 20:37.070",
		"bg": "605746"
	},
	{
		"src": "/yanami/s1e2-00.20.50.709.jpg",
		"desc": "Episode 2 - The Promised Failure for You - 20:50.709",
		"bg": "50504d"
	},
	{
		"src": "/yanami/s1e3-00.16.00.835.jpg",
		"desc": "Episode 3 - Losing the Battle Before it is Ever Fought - 16:00.835",
		"bg": "556262"
	},
	{
		"src": "/yanami/s1e3-00.20.15.464.jpg",
		"desc": "Episode 3 - Losing the Battle Before it is Ever Fought - 20:15.464",
		"bg": "0e1e28"
	},
	{
		"src": "/yanami/s1e4-00.03.38.010.jpg",
		"desc": "Episode 4 - When You Stare into a Losing Heroine, the Losing Heroine Stares Back into You - 03:38.010",
		"bg": "061820"
	},
	{
		"src": "/yanami/s1e4-00.05.09.643.jpg",
		"desc": "Episode 4 - When You Stare into a Losing Heroine, the Losing Heroine Stares Back into You - 05:09.643",
		"bg": "09141b"
	},
	{
		"src": "/yanami/s1e4-00.17.15.118.jpg",
		"desc": "Episode 4 - When You Stare into a Losing Heroine, the Losing Heroine Stares Back into You - 17:15.118",
		"bg": "52654f"
	},
	{
		"src": "/yanami/s1e4-00.17.15.202.jpg",
		"desc": "Episode 4 - When You Stare into a Losing Heroine, the Losing Heroine Stares Back into You - 17:15.202",
		"bg": "4f624e"
	},
	{
		"src": "/yanami/s1e4-00.21.31.333.jpg",
		"desc": "Episode 4 - When You Stare into a Losing Heroine, the Losing Heroine Stares Back into You - 21:31.333",
		"bg": "7599b3"
	},
	{
		"src": "/yanami/s1e4-00.21.37.714.jpg",
		"desc": "Episode 4 - When You Stare into a Losing Heroine, the Losing Heroine Stares Back into You - 21:37.714",
		"bg": "7298b5"
	},
	{
		"src": "/yanami/s1e4-00.21.37.881.jpg",
		"desc": "Episode 4 - When You Stare into a Losing Heroine, the Losing Heroine Stares Back into You - 21:37.881",
		"bg": "7499b6"
	},
	{
		"src": "/yanami/s1e4-00.22.01.321.jpg",
		"desc": "Episode 4 - When You Stare into a Losing Heroine, the Losing Heroine Stares Back into You - 22:01.321",
		"bg": "8aaac0"
	},
	{
		"src": "/yanami/s1e4-00.23.10.015.jpg",
		"desc": "Episode 4 - When You Stare into a Losing Heroine, the Losing Heroine Stares Back into You - 23:10.015",
		"bg": "809da8"
	},
	{
		"src": "/yanami/s1e5-00.03.30.669.jpg",
		"desc": "Episode 5 - Asagumo Chihaya Is Led Astray - 03:30.669",
		"bg": "8ea2a0"
	},
	{
		"src": "/yanami/s1e5-00.08.09.322.jpg",
		"desc": "Episode 5 - Asagumo Chihaya Is Led Astray - 08:09.322",
		"bg": "7a6f48"
	},
	{
		"src": "/yanami/s1e5-00.13.01.447.jpg",
		"desc": "Episode 5 - Asagumo Chihaya Is Led Astray - 13:01.447",
		"bg": "5e4a35"
	},
	{
		"src": "/yanami/s1e5-00.15.12.161.jpg",
		"desc": "Episode 5 - Asagumo Chihaya Is Led Astray - 15:12:161",
		"bg": "554034"
	},
	{
		"src": "/yanami/s1e5-00.19.19.116.jpg",
		"desc": "Episode 5 - Asagumo Chihaya Is Led Astray - 19:19.669",
		"bg": "666565"
	},
	{
		"src": "/yanami/s1e6-00.17.35.222.jpg",
		"desc": "Episode 6 - Let Any One of You Who Has Never Been Dumped Be the First to Throw a Stone at the Losing Heroine - 17:35.222",
		"bg": "6c6967"
	},
	{
		"src": "/yanami/s1e6-00.18.46.001.jpg",
		"desc": "Episode 6 - Let Any One of You Who Has Never Been Dumped Be the First to Throw a Stone at the Losing Heroine - 18:46.001",
		"bg": "749ca3"
	},
	{
		"src": "/yanami/s1e6-00.20.38.238.jpg",
		"desc": "Episode 6 - Let Any One of You Who Has Never Been Dumped Be the First to Throw a Stone at the Losing Heroine - 20:38:238",
		"bg": "3e5871"
	},
	{
		"src": "/yanami/s1e6-00.20.46.997.jpg",
		"desc": "Episode 6 - Let Any One of You Who Has Never Been Dumped Be the First to Throw a Stone at the Losing Heroine - 20:46.997",
		"bg": "2b3337"
	},
	{
		"src": "/yanami/s1e7-00.03.55.902.jpg",
		"desc": "Episode 7 - The Other Side of a Happy Ending - 03:55.902",
		"bg": "3f454d"
	},
	{
		"src": "/yanami/s1e7-00.04.42.407.jpg",
		"desc": "Episode 7 - The Other Side of a Happy Ending - 04:42.407",
		"bg": "124665"
	},
	{
		"src": "/yanami/s1e7-00.07.59.813.jpg",
		"desc": "Episode 7 - The Other Side of a Happy Ending - 07:59.813",
		"bg": "0e1b27"
	},
	{
		"src": "/yanami/s1e7-00.21.10.978.jpg",
		"desc": "Episode 7 - The Other Side of a Happy Ending - 21:10.978",
		"bg": "484947"
	},
	{
		"src": "/yanami/s1e7-00.21.31.373.jpg",
		"desc": "Episode 7 - The Other Side of a Happy Ending - 21:31.373",
		"bg": "5f7881"
	},
	{
		"src": "/yanami/s1e8-00.07.54.432.jpg",
		"desc": "Episode 8 - If You Are In Trouble, Feel Free to Consult - 07:54.432",
		"bg": "60827b"
	},
	{
		"src": "/yanami/s1e8-00.10.21.788.jpg",
		"desc": "Episode 8 - If You Are In Trouble, Feel Free to Consult - 10:21.788",
		"bg": "545a5e"
	},
	{
		"src": "/yanami/s1e10-00.09.47.545.jpg",
		"desc": "Episode 10 - I Suppose It's a Bit Too Early for Goodbye - 09:47.545",
		"bg": "9f7e65"
	}
]
</script>

<WallOfYanami :yanamiFrames="yanamiFrames" />
