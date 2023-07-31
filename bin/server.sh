#!/usr/bin/env sh

set -e
source "./bin/functions"

pp_info "server" "running the development server"
yarn dev
