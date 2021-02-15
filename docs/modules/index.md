[@mtucourses/scraper](../README.md) / [Modules](../modules.md) / index

# Module: index

## Table of contents

### Enumerations

- [ESemester](../enums/index.esemester.md)

### Interfaces

- [ICourseOverview](../interfaces/index.icourseoverview.md)
- [IFaculty](../interfaces/index.ifaculty.md)
- [IScrapedSection](../interfaces/index.iscrapedsection.md)
- [ISection](../interfaces/index.isection.md)
- [ISectionDetails](../interfaces/index.isectiondetails.md)

### Functions

- [getAllFaculty](index.md#getallfaculty)
- [getAllSections](index.md#getallsections)
- [getSectionDetails](index.md#getsectiondetails)

## Functions

### getAllFaculty

▸ `Const`**getAllFaculty**(): *Promise*<[*IFaculty*](../interfaces/lib/types.ifaculty.md)[]\>

**Returns:** *Promise*<[*IFaculty*](../interfaces/lib/types.ifaculty.md)[]\>

Defined in: [lib/faculty.ts:8](https://github.com/Michigan-Tech-Courses/scrapper/blob/18efd7a/src/lib/faculty.ts#L8)

___

### getAllSections

▸ `Const`**getAllSections**(`term`: Date): *Promise*<[*ICourseOverview*](../interfaces/lib/types.icourseoverview.md)[]\>

#### Parameters:

Name | Type |
------ | ------ |
`term` | Date |

**Returns:** *Promise*<[*ICourseOverview*](../interfaces/lib/types.icourseoverview.md)[]\>

Defined in: [lib/sections.ts:12](https://github.com/Michigan-Tech-Courses/scrapper/blob/18efd7a/src/lib/sections.ts#L12)

___

### getSectionDetails

▸ `Const`**getSectionDetails**(`__namedParameters`: { `crn`: *string* ; `crse`: *string* ; `subject`: *string* ; `term`: Date  }): *Promise*<[*ISectionDetails*](../interfaces/lib/types.isectiondetails.md)\>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { `crn`: *string* ; `crse`: *string* ; `subject`: *string* ; `term`: Date  } |

**Returns:** *Promise*<[*ISectionDetails*](../interfaces/lib/types.isectiondetails.md)\>

Defined in: [lib/sections.ts:160](https://github.com/Michigan-Tech-Courses/scrapper/blob/18efd7a/src/lib/sections.ts#L160)
