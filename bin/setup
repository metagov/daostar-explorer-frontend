#!/usr/bin/env sh

set -e
source "./bin/functions"

env=${1:-"development"}

#
# languages setup
#

pp_info "setup" "Installing required languages..."

if not_installed "asdf"; then
  pp_error "setup" "
    We are using asdf (https://github.com/asdf-vm/asdf) to manage tool
    dependencies, since it was not found on your system we cannot ensure that you
    are using the correct versions of all the tools. Please install it and run
    this script again, or proceed at your own peril.
  "

  ensure_confirmation
else
  set +e
  asdf plugin-add nodejs
  set -e

  asdf install
fi

#
# dependencies
#

pp_info "setup" "Installing node dependencies for env $env..."
NODE_ENV=$env yarn install

pp_success "setup" "You're good to go! Run yarn to get the development server running."
