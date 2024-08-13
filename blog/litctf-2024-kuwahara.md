---
title: "LITCTF 2024: misc/Kuwahara"
date: 2024-08-13
author: beerpsi
categories: ["ctf"]
tags: ["misc", "litctf"]
---

> Finally a good stego problem??

Challenge files: [kuwahara-png-problem.zip](https://nazunacord.net/cTmZrWlZUejO.zip)

I was invited to play [Lexington Informatics Tournament CTF 2024](https://lit.lhsmathcs.org/)
with Liminova. This is my first time playing CTF, and while we did not win, we had two
first-solves, one of which is titled `Kuwahara`, the problem you're reading about now.

## The challenge

We are given a noisy image and an encoded image:

<div class="flex flex-wrap justify-evenly gap-y-2">
    <img src="https://nazunacord.net/M65cLWyIlWUt.png" width="271" alt="The original, noisy image of a bird">
    <img src="https://nazunacord.net/Nx4jxgIOe4IW.png" width="271" alt="The same image of a bird, but with the Kuwahara filter applied and a message encoded into it">
</div>

Our goal is to extract the flag from the encoded image, which was transformed from the noisy
image using the Kuwahara filter and an encoding scheme.

## Kuwahara filter

The Kuwahara filter is a smoothing filter used for adaptive noise reduction on *grayscale*
images. In this image, suppose we take a window divided into 4 overlapping, equal quadrants:

```
( a  a  ab   b  b)
( a  a  ab   b  b)
(ac ac abcd bd bd)
( c  c  cd   d  d)
( c  c  cd   d  d)
```

In each quadrant, the arithmetic mean and standard deviation is calculated. Then, the center
pixel is set to the mean of the quadrant with the smallest variance.

For color images, a copy of the image in grayscale or HSV is made (if HSV, only the brightness
channel is kept), and then the filter operates on this copy to select the quadrant with the smallest
variance, then the center pixel is set to the RGB mean of that quadrant.

## Implementing the Kuwahara filter

Alongside the two images, we are also given the source code for the encoding routines
in `main.py`, with an instruction to implement the Kuwahara filter ourselves:

```python
def kuwahara(original_image, window_size):
    """
    Kuwahara Algorithm. This function applies the Kuwahara algorithm to an image.
    More specifically, it runs the average based filter on the image,
    going over each pixel, putting 4 windows of window_size x window_size each
    having the original pixel as a corner, and then calculating the
    standard deviation of these regions (in grayscale). Then, set the color
    of the pixel to the color average of the region with the lowest standard deviation.

    Args:
        original_image (ndarray): The original image to apply the Kuwahara algorithm to.
        window_size (int): The size of the window used for calculating the local statistics.

    Returns:
        tuple: A tuple containing the following elements:
            - averages (ndarray): An array of shape (4, H, W, C)
                                containing the average values for each subregion.
            - stddevs (ndarray): An array of shape (4, H, W)
                                containing the standard deviations for each subregion.
    """
    # Your code here
    return None, None
```

The code for this function can be trivially copied from [pykuwahara](https://github.com/yoch/pykuwahara/blob/main/src/pykuwahara/kuwahara.py),
with the Gaussian parts omitted since we're only interested in calculating means
and variances.

<details>
    <summary>Full code</summary>

```python
def kuwahara(original_image: MatLike, winsize: int):
    image = original_image.astype(np.float32, copy=False)

    avgs = np.empty((4, *image.shape), dtype=image.dtype)
    stddevs = np.empty((4, *image.shape[:2]), dtype=image.dtype)

    image_2d = (
        cv2
        .cvtColor(original_image, cv2.COLOR_BGR2GRAY)
        .astype(image.dtype, copy=False)
    )
    avgs_2d = np.empty((4, *image.shape[:2]), dtype=image.dtype)

    squared_img = image_2d ** 2

    radius = (winsize - 1) // 2
    kxy = np.ones(radius + 1, dtype=image.dtype) / (radius + 1)

    shift = [(0, 0), (0, radius), (radius, 0), (radius, radius)]

    for k in range(4):
        kx = ky = kxy
        _ = cv2.sepFilter2D(image, -1, kx, ky, avgs[k], shift[k])

        _ = cv2.sepFilter2D(image_2d, -1, kx, ky, avgs_2d[k], shift[k])
        _ = cv2.sepFilter2D(squared_img, -1, kx, ky, stddevs[k], shift[k])
        stddevs[k] = stddevs[k] - avgs_2d[k] ** 2

    return avgs, stddevs
```
</details>

## Encoding information using the Kuwahara filter

Inside `main.py`, we are also given the code to encode a message using the filter:

```python
def kuwahara(original_image: MatLike, winsize: int):
    # Refer to "Implementing the Kuwahara filter" for code.
    ...


def kuwahara_encryption(original_image, message, window_size=5):
    averages, stddevs = kuwahara(original_image, window_size)

    # Might not give them these two, might give them...
    indices = np.argmin(stddevs, axis=0)
    sorted_indices = np.argsort(stddevs, axis=0)

    # Start at (window_size, window_size) to avoid the border, where
    # the Kuwahara Algorithm might not get enough pixels.
    start_x = start_y = window_size

    for m in message:
        indices[start_x][start_y] = sorted_indices[m][start_x][start_y]
        start_y += 1
        if start_y == original_image.shape[1] - window_size:
            start_y = window_size
            start_x += 1

    # Second favorite function when writing this, take_along_axis. Epic.
    filtered = (
        np.take_along_axis(
            averages,
            indices[None, ..., None],
            0,
        )
        .reshape(original_image.shape)
        .astype(original_image.dtype)
    )

    return filtered
```

The encoding procedure can be described as follows:

1. Calculate the mean and variance for all quadrants in the image
2. Find the quadrants with the smallest variance to set the target pixels to
3. Starting from `(x, y) = (window_size, window_size)`, for each digit `m` in the message:
   1. Replace the pixel at `(x, y)` with the mean of the quadrant with the `m + 1`th
   smallest variance. (e.g. if `m = 1` then the mean of the quadrant with the second least
   variance is used).
   2. Increment `y` by 1.
   3. If `y` is equal to the width of the image minus `window_size`, increment `x` by 1
   and set `y` to `window_size`.

Since there are only 4 quadrants, the message must be encoded in base-4
or lower. In the script, it is encoded as base-3, in order to distinguish
encoded pixels from normal filtered pixels:

```python
flag = [enc + 1 for enc in encode("FLAG", 3)] # FLAG encoded with base 3, plus 1 to ensure offsets are always found.
```

## The base-3 encoding scheme

The implementation of the base-N encoding and decoding routines are not important,
and can be read in the provided module `encoder.py`. However, there are two important
properties to note:
1. The `encode` and `decode` functions return/take a list of digits:

```python
>>> encode('A', 2)
[1, 0, 0, 0, 1, 1, 1, 1, 0]  # 0b100011110
>>> decode([1, 0, 0, 0, 1, 1, 1, 1, 1], 2)
'B'
```

2. Each character takes up a constant number of digits, determined by the base $b$ and the
number of characters in the provided character set $x$:

$$ \left\lceil log_b \frac{x}{b - 1} \right\rceil + 2 $$

The provided charset is ASCII letters, digits, space and `_{}` (66 characters), so
there are 6 digits per character in base 3, the base used by the script.

## Decoding the encoded image

So, knowing the encoding scheme, we can decode the flag from the noisy image
with a little bit of brute forcing:

1. Calculate the mean and variance for all quadrants in the image
2. Starting from `(x, y) = (window_size, window_size)`, for each pixel `(x, y)`:
   1. Compare it against the averages of the 3 quadrants around the pixel (the one with
   the smallest variance is excluded).
   2. If we find a match, the pixel is encoded, and we save the ordinal (1st, 2nd, ...)
   of the pixel to the message.
   3. Otherwise, the pixel is normal, and the message has ended. Exit the function.
   4. Increment `y` by 1.
   5. If `y` is equal to the width of the image minus `window_size`, increment `x` by 1
   and set `y` to `window_size`.

A Python implementation of that would look something like this:
```python
def kuwahara(original_image: MatLike, winsize: int):
    # Refer to "Implementing the Kuwahara filter" for code.
    ...


def kuwahara_decryption(original_image: MatLike, enc_image: MatLike, window_size: int = 5):
    averages, stddevs = kuwahara(original_image, window_size)
    indices = np.argmin(stddevs, axis=0)
    sorted_indices = np.argsort(stddevs, axis=0)
    message: list[int] = []

    # Start at (window_size, window_size) to avoid the border, where
    # the Kuwahara Algorithm might not get enough pixels.
    x = y = window_size
    while start_x < original_image.shape[0]:
        actual_pixel = enc_image[x][y]
        expected_index = indices[x][y]
        expected_pixel = averages[expected_index][x][y].astype(original_image.dtype)

        # The encoded pixels are continuous. If we reach a pixel that is the same as
        # a normal pixel applied through Kuwahara, we can be reasonably sure that the
        # message has ended.
        if (expected_pixel == actual_pixel).all():
            break

        # Brute force the key by comparing the current pixel with the average of the
        # 3 remaining quadrants.
        for m in range(1, 4):
            index = sorted_indices[m][x][y]
            pixel = averages[index][x][y].astype(original_image.dtype)

            if (pixel == actual_pixel).all():
                # We have a key!
                message.append(m)
                break

        # Move to the next pixel
        y += 1
        if y == original_image.shape[1] - window_size:
            x += 1
            y = window_size

    return message
```

Yay! We have finished our decoding routine, time to plug the images into it and
get our 500 points!! I wonder why no one has solved this challenge yet... Huh?!

```shell
$ python main.py
Flag:
```

There was nothing?!

## Problem 1: It's not what you think it is

It was 12pm. I had spent the whole morning on this. I was ready to slam shut my laptop
and go get something nice to eat, but then I tried a roundtrip encoding/decoding with
my own message as a sanity check. It did:

```shell
# input_image = cv2.imread("img/noisy_image.png")
# message = [x + 1 for x in encode("help_im_trapped_in_a_kuwahara_factory", 3)]
# encoded_image = kuwahara_encryption(input_image, message)
# cv2.imsave("img/test.png", encoded_image)
# decoded_message = [x - 1 for x in kuwahara_decryption(input_image, encoded_image)]
# print(f"Flag: {decode(decoded_message, 3)}")
$ python main.py
Flag: help_im_trapped_in_a_kuwahara_factory
```

Then I noticed that my encoded image had way sharper edges than the provided encoded image:

<div class="flex flex-wrap justify-evenly gap-y-2">
    <img src="https://nazunacord.net/JzPGJDmiUbEL.png" alt="An image of the bird's eye after applying Kuwahara's filter using radius 2 (or window size 5)">
    <img src="https://nazunacord.net/U2Y2vkzCX7v4.png" height="125" alt="An image of the bird's eye in the provided encoded image">
</div>

<div class="text-center italic my-5">An image of the bird's eye</div>

After experimenting with different options in the `pykuwahara` encoder, it became clear
that what the provided code referred to as `window_size` is actually the size of a
quadrant (what `pykuwahara` refers to as the `radius`), instead of the entire window
of 4 quadrants. This was also explained in the docstring of the `kuwahara` function
in the script:

> Kuwahara Algorithm. This function applies the Kuwahara algorithm to an image.
> More specifically, it runs the average based filter on the image,
> going over each pixel, **putting 4 windows of window_size x window_size each
> having the original pixel as a corner**, and then calculating the
> standard deviation of these regions (in grayscale)

Learned a lesson in why reading is important. Rewrote the code in `kuwahara` to treat the
`window_size` how it was meant to be. The flag should now appear surely?

```shell
$ python main.py
Traceback (most recent call last):
  File "...\litctf2024\kuwahara3\kuwahara-png-problem\main.py", line 202, in <module>
    final_message = decode(decoded_indices, 3)
                    ^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "...\litctf2024\kuwahara3\kuwahara-png-problem\encoder.py", line 122, in decode
    seq += decoder[conv]
           ~~~~~~~^^^^^^
KeyError: 1
```

Nope.

## Problem 2: The random off-by-ones

> Alternate header: How I autistically brute forced out the flag

It was now 2pm. I had completely forgot about having lunch. I had to get this done,
no matter the cost. As any sane developer did, I started print debugging:

```shell
$ python main.py
[2, 1, 2, 2, 1, 3, 2, 1, 2, 2, 1, 3, 2, 1, 1, 3, 2, 2, 2, 1, 2, 2, 2, 3, 2, 1, 1, 3, 1, 2, 2]
Traceback (most recent call last):
# ...
```

That was the decoded message, which was 31 digits in total. Not only was this not divisible
by 6 (remember that [each character *always* takes up 6 digits](#the-base-3-encoding-scheme)),
but the whole characters in there didn't decode to part of the flag wrapper:

```python
>>> dec = [2, 1, 2, 2, 1, 3, 2, 1, 2, 2, 1, 3, 2, 1, 1, 3, 2, 2, 2, 1, 2, 2, 2, 3, 2, 1, 1, 3, 1, 2]
>>> decode([x - 1 for x in dec], 3)
'IIsLp'
>>> [x + 1 for x in encode("LITCT", 3)]
[2, 1, 2, 2, 2, 3, 2, 1, 2, 2, 1, 3, 2, 1, 2, 3, 2, 2, 2, 1, 2, 1, 2, 3, 2, 1, 2, 3, 2, 2]
```

Notice the off-by-one digits in the decoded message compared to the encoded flag wrapper:

```python
dec = [2, 1, 2, 2, 1, 3, 2, 1, 2, 2, 1, 3, 2, 1, 1, 3, 2, 2, 2, 1, 2, 2, 2, 3, 2, 1, 1, 3, 1, 2]
enc = [2, 1, 2, 2, 2, 3, 2, 1, 2, 2, 1, 3, 2, 1, 2, 3, 2, 2, 2, 1, 2, 1, 2, 3, 2, 1, 2, 3, 2, 2]
                   ^                             ^                    ^              ^     ^
```

They were off in seemingly random places, but they were all off by one.

Also, the flag was cut short - signs point to a pixel matching the expected pixel cutting
short the message, so we tried again but now testing for all quadrants instead of only
the second/third/fourth smallest variance in the [decoding function](#decoding-the-encoded-image):

```diff
- for m in range(1, 4):
+ for m in range(0, 4):
     index = sorted_indices[m][x][y]
     pixel = averages[index][x][y].astype(original_image.dtype)

     if (pixel == actual_pixel).all():
         # We have a key!
         message.append(m)
         break
```

Trying again:

```shell
$ python main.py
[2, 1, 2, 2, 1, 3, 2, 1, 2, 2, 1, 3, 2, 1, 1, 3, 2, 2, 2, 1, 2, 2, 2, 3,
 2, 1, 1, 3, 1, 2, 2, 0, 2, 1, 3, 2, 3, 1, 1, 1, 1, 3, 2, 1, 1, 3, 3, 1,
 3, 1, 2, 2, 3, 2, 2, 1, 3, 1, 2, 3, 3, 1, 2, 3, 3, 3, 2, 1, 1, 3, 1, 2,
 2, 1, 3, 1, 2, 3, 2, 0, 1, 1, 3, 1, 2, 1, 2, 3, 2, 2, 2, 1, 3, 1, 2, 3,
 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 1, 2, 3, 2, 3,
 2, 1, 1, 3, 3, 3, 2, 1, 3, 1, 3, 1, 2, 1, 1, 2, 1, 3, 2, 1, 3, 1, 3, 1,
 2, 1, 1, 3, 2, 1, 2, 1, 3, 1, 3, 1, 2, 1, 1, 1, 2, 1,
 ...] # the rest were 0 interspersed with a few 1s, for some reason.
```

It looks like we have a message here. However, a bunch of the digits are
off by one, and there are two `0`s cutting short the decoding process.
If we assume that the first 7 characters and the last character make up
the flag wrapper `LITCTF{}`, all we need to care about is this section:

```python
>>> dec[7 * 6:-6]
[2, 1, 1, 3, 3, 1, 3, 1, 2, 2, 3, 2, 2, 1, 3, 1, 2, 3,
 3, 1, 2, 3, 3, 3, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 2, 3,
 2, 0, 1, 1, 3, 1, 2, 1, 2, 3, 2, 2, 2, 1, 3, 1, 2, 3,
 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2,
 2, 1, 2, 3, 2, 3, 2, 1, 1, 3, 3, 3, 2, 1, 3, 1, 3, 1,
 2, 1, 1, 2, 1, 3, 2, 1, 3, 1, 3, 1, 2, 1, 1, 3, 2, 1,
 2, 1, 3, 1, 3, 1]
```

Decoding all the decodable characters in the message gave us most of the flag
(unknown characters replaced with `U+FFFD REPLACEMENT CHARACTER`):

```
u�3�p3�T3A_jUw4h4r4
```

Notice that all 3 undecodable characters all have a large most significant digit,
or had a 0 digit:

```python
>>> msg[6:12]
[3, 1, 2, 2, 3, 2]
>>> msg[18:24]
[3, 1, 2, 3, 3, 3]
>>> msg[36:42]
[2, 0, 1, 1, 3, 1]
```

By lowering the most significant digit to 2 in the first two cases, and increasing the
0 digit to 1 in the remaining case, we can find out the 3 missing characters:

```python
>>> msg[6] = 2
>>> msg[18] = 2
>>> msg[37] = 1
>>> decode([x - 1 for x in msg[6:12]], 3)
'N'
>>> decode([x - 1 for x in msg[18:24]], 3)
'X'
>>> decode([x - 1 for x in msg[36:42]], 3)
'c'
```

The message is now `uN3Xp3cT3A_jUw4h4r4`. You can probably guess what to fix now,
given the spelling mistakes as well as what this challenge is related to.
<sup>unfortunately i couldn't, my brain was fried. props to rylie for figuring
out the final flag.</sup>

While this method was tedious, time consuming and psychic damage inducing, we captured
the flag and got the first kill, and that was all that seemed to matter.

## It's always the damn floating point numbers

After we got the first solve on Kuwahara, I was contacted by the author of the problem,
[Agniv](https://agniv.me/), who I explained my method to, as well as point out all
of the aforementioned problems I hit while trying to solve the challenge.

When he heard about the off-by-ones, he suggested that instead of grayscaling the original
image in the [`kuwahara` function](#decoding-the-encoded-image), grayscale the image
casted into `ndarray[float32]`:

```diff
  image = original_image.astype(np.float32, copy=False)
- image_2d = cv2.cvtColor(original_image, cv2.COLOR_BGR2GRAY).astype(image.dtype, copy=False)
+ image_2d = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
```

Trying again this time yields the flag instantly without any messy `0` digits or corrupted
bits:

```shell
$ python main.py
Flag: LITCTF{uN3Xp3cT3D_kUw4h4r4}
```

This was not something I had thought of, since the `pykuwahara` implementation converted
the original image into grayscale instead. But it turns out that in order to get the most
accurate RGB to grayscale conversion, a floating point `ndarray` is desired, because the
[conversion algorithm in OpenCV](https://docs.opencv.org/3.4/de/d25/imgproc_color_conversions.html#color_convert_rgb_gray)
uses floating point coefficients.

## Conclusion
Overall, the concept of this problem was quite cool, even if a little simple, however it
ended up being one of the last challenges to get solved at LIT CTF 2024 due to all of
the problems I mentioned above, making solving this extremely tedious. Maybe if the
challenge was worded better, we would have seen more take a crack at it?

Now excuse me, I have to go take my 5pm lunch.
