@mtucourses/scraper / [Modules](modules.md)

# @mtucourses/scraper

[![codecov](https://codecov.io/gh/Michigan-Tech-Courses/scraper/branch/master/graph/badge.svg?token=E7AG8R5XN0)](https://codecov.io/gh/Michigan-Tech-Courses/scraper)

Scrapes various types of information from [Michigan Tech](https://www.mtu.edu/), including faculty members and offered courses.

## 🏗 Usage

```js
const {getAllSections} = require('@mtucourses/scraper');

(async () => {
  const fallTerm = new Date();
  fallTerm.setFullYear(2020, 7);

  const sections = await getAllSections(fallTerm);

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
