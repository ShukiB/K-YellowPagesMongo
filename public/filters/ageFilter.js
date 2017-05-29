YellowPages.filter('age', function() {
    return function(birthday) {
        // First getting the age in milliseconds, then subtructing the default years
        return new Date(new Date().getTime() - new Date(birthday).getTime()).getFullYear() - new Date(0).getFullYear();
    };
});