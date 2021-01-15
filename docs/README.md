@mtucourses/scrapper / [Modules](modules.md)

# @mtucourses/scrapper

[![codecov](https://codecov.io/gh/Michigan-Tech-Courses/scrapper/branch/master/graph/badge.svg?token=E7AG8R5XN0)](https://codecov.io/gh/Michigan-Tech-Courses/scrapper)

Scrapes courses offered at [Michigan Tech](https://www.mtu.edu/) for a given semester.

## 🏗 Usage

```js
const {getAllSections} = require('@mtucourses/scrapper');

(async () => {
  const sections = await getAllSections();

  console.log(sections);
})();
```

See the [documentation for details](docs/modules/index.md).

## 🧰  Development

```bash
# First:
# install dependencies
yarn install

# then:
# build in watch mode
yarn build:watch

# and you can:

# run tests
yarn test

# run tests in watch mode
yarn test:watch
```

To publish a new package version, run `npm version [patch|minor|major]` and then `git push && git push --tags` on the master branch.
