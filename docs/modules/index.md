[@mtucourses/scrapper](../README.md) / [Modules](../modules.md) / index

# Module: index

## Table of contents

### Enumerations

- [ESemester](../enums/index.esemester.md)

### Interfaces

- [ICourseOverview](../interfaces/index.icourseoverview.md)
- [IFaculty](../interfaces/index.ifaculty.md)
- [IScrappedSection](../interfaces/index.iscrappedsection.md)
- [ISection](../interfaces/index.isection.md)
- [ISectionDetails](../interfaces/index.isectiondetails.md)

### Functions

- [getAllFacultyByDepartment](index.md#getallfacultybydepartment)
- [getAllSections](index.md#getallsections)
- [getSectionDetails](index.md#getsectiondetails)

## Functions

### getAllFacultyByDepartment

▸ `Const`**getAllFacultyByDepartment**(): *Promise*<IDepartmentAndPeople[]\>

**Returns:** *Promise*<IDepartmentAndPeople[]\>

Defined in: [lib/faculty.ts:13](https://github.com/Michigan-Tech-Courses/scrapper/blob/0bef693/src/lib/faculty.ts#L13)

___

### getAllSections

▸ `Const`**getAllSections**(): *Promise*<[*ICourseOverview*](../interfaces/lib/types.icourseoverview.md)[]\>

**Returns:** *Promise*<[*ICourseOverview*](../interfaces/lib/types.icourseoverview.md)[]\>

Defined in: [lib/sections.ts:7](https://github.com/Michigan-Tech-Courses/scrapper/blob/0bef693/src/lib/sections.ts#L7)

___

### getSectionDetails

▸ `Const`**getSectionDetails**(`__namedParameters`: { `crn`: *string* ; `crse`: *string* ; `subject`: *string* ; `term`: *string*  }): *Promise*<[*ISectionDetails*](../interfaces/lib/types.isectiondetails.md)\>

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { `crn`: *string* ; `crse`: *string* ; `subject`: *string* ; `term`: *string*  } |

**Returns:** *Promise*<[*ISectionDetails*](../interfaces/lib/types.isectiondetails.md)\>

Defined in: [lib/sections.ts:160](https://github.com/Michigan-Tech-Courses/scrapper/blob/0bef693/src/lib/sections.ts#L160)
