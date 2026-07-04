#!/bin/bash
set -e

SHELL=bash curl -fsSL https://get.pnpm.io/install.sh | bash -

export PNPM_HOME="/home/liminova/.local/share/pnpm"
export PATH="$PNPM_HOME:$PNPM_HOME/bin:$PATH"
pnpm setup 2>/dev/null || true
pnpm config set store-dir ~/.pnpm-store
pnpm runtime set node lts -g
