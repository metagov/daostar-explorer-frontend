#!/usr/bin/env sh

set -e
./bin/functions

pp_info "lint" "running the linter"
yarn lint
echo "No errors found...."

pp_info "lint" "running ts-check"
yarn ts-check

pp_success "lint" "Done! No errors!"
