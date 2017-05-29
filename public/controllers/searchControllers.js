YellowPages.controller('searchCtrl', function($scope, searchLogic, databaseMediator) {
    $scope.page = 0;
    $scope.toLoadMore = true;

    $scope.enterToSearch = function(e) {
        // If previous query still processing then ignore this one
        if ($scope.loading) {
            console.log("ignoring qurey, another query is in progress");
            return;
        }

        // Activating fetch from server when Enter was click(both)
        if (e.which === 13)  {
            $scope.people = null;
            $scope.query = null;
            $scope.page = 0;
            $scope.scrollTop = 0;
            
            getCount();
            getPeople();
        }
    }

    $scope.loadMore = function($element) {
        // we check if we brought already all the results
        if ($scope.people.length >= $scope.allPeopleAmount) return;
        // else we go again to the server
        $scope.page++;
        getPeople();
    }

    function getCount() {
        // formatting the query string from the object gotten fron the input
        $scope.query = $scope.query || toQueryString($scope.peopleSearch);

        // Calling the server
        databaseMediator.getCountByQuery($scope.query).then(function(result) {
            $scope.allPeopleAmount = result.data;
        }, function(error) {
            $scope.allPeopleAmount = 0;
        });
    }

    function getPeople() {
        // If the query is empty we won't go to server and display empty result array
        if (!$scope.peopleSearch) {
            $scope.people = null;
            return;
        }
        // Resetting loading indication
        $scope.loading = true;
        $scope.error = false;

        // formatting the query string from the object gotten fron the input
        $scope.query = $scope.query || toQueryString($scope.peopleSearch);

        // Calling the server with a new query
        databaseMediator.getByQuery($scope.query, $scope.page).then(function(result) {
            $scope.loading = false;
            if (!$scope.people) {
                $scope.people = result.data
            } else {
                $scope.people = $scope.people.concat(result.data);
            }
        }, function(error) {
            $scope.loading = false;
            $scope.error = true;
        });
    }

    function toQueryString(query) {
        return searchLogic.buildQueryByObject(query);
    }
});