YellowPages.factory('databaseMediator', function($http) {
    return {
        getAllPeople: function() {
            return $http({
                method: 'GET',
                url: window.location.origin + '/people/all',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getByQuery: function(query, page) {
            return $http({
                method: 'GET',
                url: window.location.origin + '/people/' + (page || 0) + query,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getCountByQuery: function(query) {
            return $http({
                method: 'GET',
                url: window.location.origin + '/people/count' + query,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }
});