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
