FROM debian:bookworm

RUN apt-get update && apt-get install -y \
    curl git sudo zsh \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd -g 1000 liminova && \
    useradd -m -u 1000 -g liminova liminova && \
    echo "liminova ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/liminova && \
    mkdir -p /home/liminova/.pnpm-store && chown -R liminova /home/liminova/.pnpm-store

USER liminova