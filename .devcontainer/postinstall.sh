#!/bin/bash

SHELL=bash curl -fsSL https://get.pnpm.io/install.sh | bash -
export PNPM_HOME="/home/liminova/.local/share/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
pnpm config set store-dir ~/.pnpm-store
pnpm env use -g lts