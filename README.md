# @mtucourses/scrapper

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
