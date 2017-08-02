# primo-explore-course-reserves
a course reserves module for ex libris primo-explore using the alma API.

## installation

```js
var app = angular.module('viewCustom', ['courseReserves']);
```

## configuration

### example

```js
angular.module('courseReserves').config(
  function ($provide) {
    $provide.constant('courseLists', [
      {
        group: "main",
        title: "Main Campus Course Reserves",
        filter: "searchableid~main"
      },
      {
        group: "law",
        title: "Law Library 1L Reserves",
        filter: "searchableid~law1",
        sortType: "name"
      },
      {
        group: "law",
        title: "Law Library 2L Reserves",
        filter: "searchableid~law2",
        sortType: "name"
      }
    ])
    $provide.constant('URLs', {
      courses: 'https://my.library.edu/getCourses.php?filter=',
      course: 'https://my.library.edu/getCourse.php?cid=',
      bibs: 'https://my.library.edu/getBib.php?mmsid=',
      covers: 'https://syndetics.com/index.aspx?isbn=',
      fallback: 'https://na01.alma.exlibrisgroup.com/view/delivery/thumbnail/01ALLIANCE_MYLIB/'
    })
    $provide.constant('loanCodes', {
      'loan3': '3-hour loan',
      'loan24': '24-hour loan',
      'loan72': '3-day loan',
      'law': 'law reserves'
    })
  }
)
```
