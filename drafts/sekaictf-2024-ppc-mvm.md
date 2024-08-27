---
title: "SekaiCTF 2024: ppc/Miku vs. Machine"
date: 2024-08-27
author: NamSPro
categories: ["ctf"]
tags: ["ppc", "sekaictf"]
---

> Ah, yes, competitive programming... This would be rated codeforces-800

Challenge files: [mvm.pdf](https://nazunacord.net/MFLt5KKWTBUM.pdf)

Continuing with last year's PPC success, I tackled this first. Too bad ours is
only the 4th fastest solve...

## The challenge

We need to select a fixed show time for `m` shows and divide them equally among `n`
artists, in a way such that no show have more than one artist transition.

## `n <= m`

This should have some eyebrows raised. Coupled with the fact that: if an artist's
total show time is less than an individual show's time, there will be a show where
there are two artist transitions; and we have our idea: select `n` as the length of
each show,  and have each artist's show time be `m`. Afterwards we can manually
assign the artist(s) for each show in `O(n)` time.

## But the "fact" you stated is...

For a longer post, a visual proof of this will be shown below.
<div class="flex flex-wrap justify-evenly gap-y-2">
    <img src="https://nazunacord.net/vsUB1KbySiic.png" alt="A dinosaur colliding with some cacti without dying">
</div>
<sup>pardon my incredible art skills</sup>

Now excuse me, I need to sleep, the time is 11:15 pm...