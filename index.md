---
layout: home

hero:
    name: Liminova
    text: A group of developers and CTF enjoyers!
    tagline: We're a group of young developers, some of which happens to be interested in learning and playing Capture the Flag.
    image:
        src: /logo.png
---

<script setup>
import { useData } from 'vitepress'

const data = useData()
const members = data.theme.value.members
const alumnis = data.theme.value.alumnis
</script>

<h1>Meet the Team</h1>

<TeamMembers size="medium" :members="members" />

<hr>

<h1>Alumnis</h1>

<TeamMembers size="medium" :members="alumnis" />
