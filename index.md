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
import { useData } from "vitepress";

const data = useData();
const members = data.theme.value.members;
</script>

<h1>Meet the Team</h1>

<TeamMembers size="medium" :members="members" />
