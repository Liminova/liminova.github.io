---
layout: home

hero:
  name: "Liminova"
  text: "A group of developers and CTF enjoyers!"
  tagline: "We're a group of young developers, some of which happens to be interested in learning and playing Capture the Flag."
---

<script setup>
import osu from ".vitepress/build-assets/osu.svg?raw";
import email from ".vitepress/build-assets/email.svg?raw";

const members = [
    {
        avatar: "/rylie.png",
        name: "Rylie",
        title: "resident troller, founder of CTF division",
        links: [
            { icon: "github", link: "https://github.com/j1nxie" },
            { icon: "twitter", link: "https://x.com/_lumi9" },
            {
                icon: { svg: osu },
                link: "https://osu.ppy.sh/u/14585583",
            },
        ],
    },
    {
        avatar: "https://avatars.githubusercontent.com/u/107946882?v=4",
        name: "Peachy",
        links: [
            { icon: "github", link: "https://github.com/Peachy72" },
        ],
    },
    {
        avatar: "/delnegend.mp4",
        name: "Delnegend",
        links: [
            { icon: "github", link: "https://github.com/Delnegend" },
            { icon: { svg: email }, link: "mailto:kiennguyen19323@gmail.com" },
        ],
    },
    {
        avatar: "/ellimac.mp4",
        name: "Ellimac",
        links: [
            { icon: "github", link: "https://github.com/EllimacH" },
        ],
    },
    {
        avatar: "https://avatars.githubusercontent.com/u/101856461?v=4",
        name: "Maxim",
        links: [
            { icon: "github", link: "https://github.com/GHCMaxim" },
        ],
    },
    {
        avatar: "/namspro.png",
        name: "NamSPro",
        title: "founder of competitive programming/gaming division",
        links: [
            { icon: "github", link: "https://github.com/NamSPro" },
            {
                icon: { svg: osu },
                link: "https://osu.ppy.sh/u/11387006",
            },
        ],
    },
    {
        avatar: "https://avatars.githubusercontent.com/u/92439990?v=4",
        name: "beerpsi",
        links: [
            { icon: "github", link: "https://github.com/beer-psi" },
        ],
    },
    {
        avatar: "/sorako.jpg",
        name: "Sorako",
        title: "happy to be here",
        links: [],
    },
]
</script>

<h1>Meet the Team</h1>

<TeamMembers size="medium" :members="members" />
