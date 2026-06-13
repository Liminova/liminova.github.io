FROM debian:13-slim

ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

RUN apt-get update && apt-get install -y \
    curl git sudo libatomic1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd -g 1000 liminova && \
    useradd -m -u 1000 -g liminova -s /bin/bash liminova && \
    echo "liminova ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/liminova && \
    mkdir -p /home/liminova/.pnpm-store && chown -R liminova /home/liminova/.pnpm-store

USER liminova
