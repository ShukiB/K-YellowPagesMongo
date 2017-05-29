YellowPages.factory('searchLogic', function() {
    return {
        buildQueryByObject: function(query) {
            // going trgough the word to assign them for the search
            var queryObj = query.split(" ").reduce((result, value) => {
                // Checking if the value is not a naumber to compare on many fields
                if (isNaN(value)) {
                    if (!result.name) result.name = [];
                    result.name.push(value);
                // Checking if the value is a phone number
                } else if (value.length > 3) {
                    // we ignore a second phone number
                    if (!result.phone) result.phone = [value];
                    //result.phone.push(value);
                // Checking if the value is an age
                } else {
                    // we ignore the second age or short phone number
                    if (!result.age) result.age = [value];
                    //result.age.push(value);
                }
                return result;
            }, {});

            // flatten the query array
            var queryJson = _.reduce(queryObj, (result, value, key) => {
                result[key] = value.join(",");
                return result;
            }, {});

            // Building the query string to return
            return "?" + Object.keys(queryJson).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(queryJson[key]);
            }).join("&");
        }
    }
});