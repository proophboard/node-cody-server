# node-cody-server
NodeJS Cody Server

## Monorepo Maintenance

[Lerna](https://github.com/lerna/lerna) is used to run commands for all packages, e.g. `lerna run dev:next --stream --parallel`

[Changesets](https://github.com/changesets/changesets) is used to manage package versions and publishing to NPM

### Build Package

`yarn build`

### Create Changeset

`changeset`

### Distribute Version

`changeset version`

### Publish on NPM

`changeset publish` or `yarn release`
