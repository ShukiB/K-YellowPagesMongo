YellowPages.filter('address', function() {
    return function({city, street, country}) {
        return street + ", " + city + ", " + country + ".";
    };
});