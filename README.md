# @mtucourses/scrapper

Scrapes courses offered at [Michigan Tech](https://www.mtu.edu/) for a given semester.

## 🏗 Usage

```js
const courses = require('@mtucourses/scrapper');

(async () => {
  const offeredCourses = await courses.get();

  console.log(offeredCourses);
})();
```
