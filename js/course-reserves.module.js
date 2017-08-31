angular
  .module('courseReserves', ['ui.router'])
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('courses', {
          url: '/courses/:group?vid',
          template: `
          <prm-explore-main></prm-explore-main>
          <md-content class="main _md md-primoExplore-theme layout-align-center-start" flex layout-padding>
              <div flex ng-if="policyInfo" layout="row" layout-xs="column">
                <md-card ng-repeat="policy in policyInfo" flex>
                  <md-card-title>
                    <md-card-title-text>
                      <span class="md-headline">{{ policy.title }}</span>
                    </md-card-title-text>
                  </md-card-title>
                  <md-card-content>
                    <p class="md-subhead">{{ policy.body }}</p>
                  </md-card-content>
                  <md-card-actions ng-if="policy.links" layout="row">
                      <div ng-repeat="link in policy.links">
                          <a ng-href="{{ link.url }}">
                              <md-button>{{ link.name }}</md-button>
                          </a>
                      </div>
                  </md-card-actions>
                </md-card>
              </div>
              <section section="courses" class="md-padding" layout="row" layout-xs="column" layout-align="center" flex>
                  <div ng-repeat="list in courseLists" flex>
                      <md-card>
                          <md-card-title layout="row" layout-xs="column">
                              <md-card-title-text flex>
                                  <span class="md-headline">{{ list.title }}</span>
                                  <span ng-if="list.courses.length > 0" class="md-title">{{ list.courses.length }} courses</span>
                                  <span ng-if="list.courses.length === 0" class="md-title">No courses found.</span>
                              </md-card-title-text>
                              <md-card-title-text flex layout="row">
                                  <md-input-container flex>
                                      <label>Show only:</label>
                                      <md-select ng-model="list.departmentFilter">
                                          <md-option ng-repeat="department in list.departments" value="{{ department }}" ng-selected="$first">
                                              {{ department }}
                                          </md-option>
                                      </md-select>
                                  </md-input-container>
                                  <md-input-container flex>
                                      <label>Sort by:</label>
                                      <md-select ng-model="list.sortType">
                                          <md-option value="code">course number</md-option>
                                          <md-option value="name">course name</md-option>
                                          <md-option value="instructors[0].last_name">instructor</md-option>
                                      </md-select>
                                  </md-input-container>
                              </md-card-title-text>
                          </md-card-title>
                          <md-card-content ng-if="list.courses.length > 0">
                              <md-list flex>
                                  <md-list-item class="md-3-line" ng-if="list.departmentFilter === 'all' || course.department === list.departmentFilter" ng-repeat="course in list.courses | orderBy : list.sortType" ui-sref="reserves({cid : course.id, group: group, vid: vid})">
                                      <div class="md-list-item-text" layout="column">
                                          <ng-template ng-if="list.sortType !== 'name'">
                                              <h3>{{ course.code }}</h3>
                                              <h4>{{ course.name }}</h4>
                                          </ng-template>
                                          <ng-template ng-if="list.sortType === 'name'">
                                              <h3>{{ course.name }}</h3>
                                              <h4>{{ course.code }}</h4>
                                          </ng-template>
                                          <p ng-repeat="instructor in course.instructors" ng-if="course.instructors" class="md-title animate-if">
                                              {{ instructor.last_name }}, {{ instructor.first_name }}
                                          </p>
                                      </div>
                                  </md-list-item>
                              </md-list>
                          </md-card-content>
                      </md-card>
                  </div>
              </section>
          </md-content>`,
          controller: 'coursesController'
        })
        .state('reserves', {
          url: '/reserves/:cid?group&vid',
          template: `
          <prm-explore-main></prm-explore-main>
          <md-content class="main _md md-primoExplore-theme" flex layout-padding layout-align="center start">
              <div flex ng-if="policyInfo" layout="row" layout-xs="column">
                <md-card ng-repeat="policy in policyInfo" flex>
                  <md-card-title>
                    <md-card-title-text>
                      <span class="md-headline">{{ policy.title }}</span>
                    </md-card-title-text>
                  </md-card-title>
                  <md-card-content>
                    <p class="md-subhead">{{ policy.body }}</p>
                  </md-card-content>
                  <md-card-actions ng-if="policy.links" layout="row">
                      <div ng-repeat="link in policy.links">
                          <a ng-href="{{ link.url }}">
                              <md-button>{{ link.name }}</md-button>
                          </a>
                      </div>
                  </md-card-actions>
                </md-card>
              </div>
              <section section="reserves" flex class="md-padding" layout="column" layout-align="center">
                  <md-card ng-if="!course" ng-cloak>
                      <md-card-title>
                          <md-card-title-text>
                              <span class="md-headline">Course not found.</span>
                          </md-card-title-text>
                      </md-card-title>
                  </md-card>
                  <md-card ng-if="course" class="animate-if" flex>
                      <md-card-title layout="row" layout-xs="column">
                          <md-card-title-text flex>
                              <span class="md-headline">{{ course.code }} - {{ course.name }}</span>
                              <span ng-repeat="instructor in instructors" ng-if="instructors" class="md-title animate-if">{{ instructor.last_name }}, {{ instructor.first_name }}</span>
                          </md-card-title-text>
                          <md-card-title-text flex>
                              <md-input-container>
                                  <label>Sort by:</label>
                                  <md-select ng-model="course.sortType">
                                      <md-option ng-repeat="sortType in course.sortTypes" value="{{ sortType }}" ng-selected="$first">
                                          {{ sortType }}
                                      </md-option>
                                  </md-select>
                              </md-input-container>
                          </md-card-title-text>
                      </md-card-title>
                      <md-card-content ng-if="reserves" class="animate-if">
                          <md-list flex>
                              <md-list-item item="item" ng-repeat="item in reserves | orderBy : course.sortType" ng-href="{{ item.open_url }}" class="md-3-line" >
                                  <img ng-src="{{ item.cover }}" class="md-avatar animate-if" />
                                  <div class="md-list-item-text" layout="column">
                                      <h3>{{ item.title }}</h3>
                                      <p>
                                          {{ item.author}}
                                      </p>
                                      <p>
                                          <span ng-if="item.availability" ng-style="{{ item.availabilityStyle }}" class="animate-if">{{ item.availability }}</span>
                                          <span ng-if="item.loanType" class="animate-if"> - {{ item.loanType }}</span>
                                      </p>
                                  </div>
                              </md-list-item>
                          </md-list>
                      </md-card-content>
                      <md-card-content ng-if="!reserves" class="animate-if">
                          No reserves found for this course.
                      </md-card-content>
                  </md-card>
              </section>
          </md-content>`,
          controller: 'reservesController'
        })
    }
  ])
  .controller('coursesController', ['$scope', '$stateParams', 'coursesService', 'courseLists', 'policyInfo',
    function ($scope, $stateParams, coursesService, courseLists, policyInfo) {
      $scope.vid = $stateParams.vid
      $scope.group = $stateParams.group
      $scope.policyInfo = policyInfo.filter(info => info.group === $stateParams.group)
      $scope.courseLists = courseLists.filter(list => list.group === $stateParams.group)
      $scope.courseLists.map(
        list => coursesService.getCourses(list.filter).then(
          courses => {
            list.courses = courses
            list.departments = coursesService.getDepartments(courses)
            list.sortType = list.sortType || 'code'
            list.courses.map(
              course => {
                course.department = coursesService.getCourseDepartment(course)
                course.instructors = coursesService.makeArray(course.instructors.instructor)
              }
            )
          }
        )
      )
    }
  ])
  .controller('reservesController', ['$scope', '$stateParams', 'reservesService', 'policyInfo',
    function ($scope, $stateParams, reservesService, policyInfo) {
      $scope.vid = $stateParams.vid
      $scope.policyInfo = policyInfo.filter(info => info.group === $stateParams.group)
      reservesService.getCourse($stateParams.cid).then(
        course => {
          $scope.course = course
          $scope.course.sortTypes = ['title', 'author']
          $scope.instructors = reservesService.makeArray(course.instructors.instructor)
          $scope.reserves = reservesService.makeArray(course.reading_lists.reading_list.citations.citation)
          $scope.reserves.map(
            item => {
              item.title = item.metadata.title
              item.author = item.metadata.author || item.metadata.additional_person_name
              reservesService.getBib(item.metadata.mms_id).then(
                bib => {
                  item.availability = reservesService.getAvailability(bib)
                  item.availabilityStyle = reservesService.getAvailabilityStyle(bib)
                  item.loanType = reservesService.getLoanType(bib)
                  item.cover = reservesService.getCover(bib)
                }
              )
            }
          )
        }
      )
    }
  ])
  .factory('coursesService', ['$http', 'URLs',
    function ($http, URLs) {
      return {
        /**
         * Converts a parameter to array if not already an array.
         * Returns false if input was falsy (e.g. undefined).
         * @param  {any}  property    param to convert
         * @return {array}            converted param
         */
        makeArray: function (property) {
          return Array.isArray(property) ? property : property ? [property] : false
        },
        /**
         * Queries the Alma API to retrieve a list of courses based on a search filter.
         * Requires a server-side wrapper function defined in URLs.courses.
         * @param  {string} filter the search filter, e.g. 'searchableid~res'
         * @return {promise}         list of matching courses
         */
        getCourses: function (filter) {
          return $http({
            method: 'GET',
            url: URLs.courses,
            params: { 'filter': filter },
            cache: true
          }).then(response => response.data)
        },
        /**
         * Extracts the set of unique academic departments from an array of courses.
         * Used to generate the group_by menu.
         * @param  {array} courses  array of course objects, e.g. from getCourses()
         * @return {array}          array of department codes, e.g. ['BIO', 'CHEM' ...
         */
        getDepartments: function (courses) {
          let departments = new Set().add('all')
          courses.map(course => departments.add(this.getCourseDepartment(course)))
          return Array.from(departments)
        },
        /**
         * Gets the department code of a course.
         * Uses a regex to delete non-word characters from the course code.
         * @param  {object} course course object
         * @return {string}        department code, e.g. 'BIO'
         */
        getCourseDepartment: function (course) {
          return course.code.replace(/[\s\d\W]/g, '')
        }
      }
    }
  ])
  .factory('reservesService', ['$http', 'URLs', 'loanCodes',
    function ($http, URLs, loanCodes) {
      return {
        /**
         * Queries the Alma API to retrieve a course object using its cid.
         * Requires a server-side wrapper function defined in URLs.reserves.
         * @param  {string} cid course ID
         * @return {promise}     course object
         */
        getCourse: function (cid) {
          return $http({
            method: 'GET',
            url: URLs.course,
            params: { 'cid': cid },
            cache: true
          }).then(response => response.data)
        },
        /**
         * Queries the Alma API to retrieve a bib using an item's MMSID.
         * Requires a server-side wrapper function defined in URLs.bibs.
         * @param  {string} mmsid item MMSID
         * @return {promise}       bib object
         */
        getBib: function (mmsid) {
          return $http({
            method: 'GET',
            url: URLs.bibs,
            params: { 'mmsid': mmsid },
            cache: true
          }).then(response => response.data)
        },
        /**
        * Converts a parameter to array if not already an array.
        * Returns false if input was falsy (e.g. undefined)
        * @param  {any}  property    param to convert
        * @return {array}            converted param
        */
        makeArray: function (property) {
          return Array.isArray(property) ? property : property ? [property] : false
        },
        /**
        * Gets the value of a MARC field in a bib.
        * Returns an array or false if field was not found.
        * Common fields:
        * ISBN (020)
        * @param  {object} bib       bib object returned from getBib()
        * @param  {string} fieldName name or number of the MARC field to find
        * @return {array}            values(s) of the field
        */
        getMarcField: function(bib, fieldName) {
          let field = bib.record.datafield.find(field => field['@attributes'].tag === fieldName)
          return field ? this.makeArray(field.subfield) : false
        },
        /**
        * Check if an item is available (not checked out) using a bib's AVA field.
        * @param  {object} bib       bib object returned from getBib()
        * @return {string}           'unavailable' or 'available'
        */
        getAvailability: function(bib) {
          let holdings = this.getMarcField(bib, 'AVA')
          if (holdings) return holdings.filter(field => /(una|a)vailable/.test(field))[0]
          return 'unavailable'
        },
        /**
        * Generate CSS to match an item's availability status.
        * @param  {object} bib       bib object returned from getBib()
        * @return {object}           CSS to apply using ng-style
        */
        getAvailabilityStyle: function(bib) {
          let availability = this.getAvailability(bib)
          if (availability === 'available') return {
            color: 'green'
          }
          else return {
            color: 'orange'
          }
        },
        /**
        * Get the loan type of an item by matching a bib's AVA field to a list.
        * Requires a lookup table of codes defined in loanCodes.
        * @param  {object} bib       bib object returned from getBib()
        * @return {string}           a description of the loan, e.g. '3-hour loan'
        */
        getLoanType: function(bib) {
          let holdings = this.getMarcField(bib, 'AVA')
          if (holdings) {
            for (let field of holdings) {
              if (loanCodes.hasOwnProperty(field)) return loanCodes[field]
            }
          }
          return 'external'
        },
        /**
        * Get a cover image URL for an item using its ISBN or MMSID.
        * Uses the bib record's leader to guess the resource type.
        * @param  {object} bib       bib object returned from getBib()
        * @return {string}           image URL
        */
        getCover: function(bib) {
          let isbn = this.getMarcField(bib, '020')[0]
          if (bib.record.leader[6] != 'a') return URLs.fallback + bib.mms_id
          if (isbn) return URLs.covers + isbn + '/SC.JPG&client=primo'
          return URLs.fallback + bib.mms_id
        }
      }
    }
  ])
  .run(
    function ($http) {
      // Necessary for requests to succeed...not sure why
      $http.defaults.headers.common = { "X-From-ExL-API-Gateway": undefined }
    }
  )
