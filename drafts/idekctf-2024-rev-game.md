---
title: "idekCTF 2024: rev/Game"
date: 2024-08-27
author: NamSPro
categories: ["ctf"]
tags: ["rev", "idekctf"]
---

> What? I can play the "no internet" game with internet?

Challenge files: [Game.tar.gz](https://nazunacord.net/2Blf4C8h5OA9.gz)

The time is 9:20 am. I just woke up and found out that [idekCTF 2024](https://ctf.idek.team/) has a game in it!
Time to try it out!

## The challenge

We are given a game (above), and the problem states that the flag will be given to
"players who reach a high enough score". Our goal will be doing just that.

## Playing the game normally

Since you just need to reach a high enough score, we can play the game normally
and reach it. But then why are you reading this? So...

## Playing the game abnormally

By examining the challenge files, we see a `spritesheet.json` file, which is
suspicious to say the least. So let's open that.

```json
    "trex_running_0": {
        "x": 936,
        "y": 2,
        "width": 44,
        "height": 47,
        "collision": [
            {"x": 1, "y": 18, "width": 30, "height": 9},
            {"x": 1, "y": 24, "width": 29, "height": 5},
            {"x": 10, "y": 35, "width": 14, "height": 8},
            {"x": 22, "y": 0, "width": 18, "height": 16},
            {"x": 5, "y": 30, "width": 21, "height": 4},
            {"x": 9, "y": 34, "width": 15, "height": 4}
        ]
    },
    "trex_running_1": {
        "x": 980,
        "y": 2,
        "width": 44,
        "height": 47,
        "collision": [
            {"x": 1, "y": 18, "width": 30, "height": 9},
            {"x": 1, "y": 24, "width": 29, "height": 5},
            {"x": 10, "y": 35, "width": 14, "height": 8},
            {"x": 22, "y": 0, "width": 18, "height": 16},
            {"x": 5, "y": 30, "width": 21, "height": 4},
            {"x": 9, "y": 34, "width": 15, "height": 4}
        ]
    },
```

What's this? Game logic? Will making the `collision` array empty makes us invincible?

<div class="flex flex-wrap justify-evenly gap-y-2">
    <img src="https://nazunacord.net/rrf2vNi26VTH.png" alt="A dinosaur colliding with some cacti without dying">
</div>

Nice! All that's left now is to wait for the flag to show itself.

Now excuse me, I am going to get myself some breakfast.