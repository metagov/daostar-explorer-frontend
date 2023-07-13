# DAOStar DAOIP-3 Explorer

DAOIP-3 defines a standard for contribution and attestations in DAOs and web3
communities. You can read about the standard [here][daoip-3].

This is the frontend for an explorer application which allows you to view and
navigate through any address to see the contributions they've done.

## Development

First clone the repo and run the setup:

```sh
$ git clone git@github.com:metagov/daostar-explorer-frontend.git

$ cd daostar-explorer-frontend
```

This repo makes use of (and it's highly recommend using) [`asdf`][asdf-vm] to manage language and tool versions.

Make sure you have it installed and then run the setup:

```sh
$ bin/setup
```

To start the development server:

```sh
$ bin/server
```

That's it! You're ready to go.

Before submitting any code, make sure it conforms to the standards by running
the linters:

```sh
$ bin/lint
```

[asdf-vm]: https://asdf-vm.com/
[daoip-3]: https://github.com/metagov/daostar/blob/main/DAOIPs/daoip-3.md
