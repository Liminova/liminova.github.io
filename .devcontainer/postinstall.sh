#!/bin/bash

# zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# js things
curl https://get.volta.sh | bash
export VOLTA_HOME="$HOME/.volta" && export PATH="$VOLTA_HOME/bin:$PATH"
echo 'export VOLTA_HOME="$HOME/.volta"' >> ~/.zshrc
echo 'export PATH="$VOLTA_HOME/bin:$PATH"' >> ~/.zshrc
volta install node@lts pnpm && pnpm config set store-dir ~/.pnpm-store