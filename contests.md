---
layout: page
---
<script setup>
const data = [
    {
        name: "CyberSpace CTF 2024",
        time: "August 30 - September 01, 2024",
        placement: 235,
        ctfPoints: 451,
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
    },
    {
        name: "Lexington Informatics Tournament CTF 2024",
        short: "LIT CTF 2024",
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

<Contests :data="data" />
