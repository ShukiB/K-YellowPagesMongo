YellowPages.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
        
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$parent.scrollTop = raw.scrollTop;
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});

YellowPages.directive('scrollPeople', function () {
  return {
    scope: {
      scrollPeople: "="
    },
    link: function (scope, element) {
      scope.$watchCollection('scrollPeople', function (n, o) {
        if (n)
        {
          $(element).scrollTop(scope.$parent.scrollTop);
        }
      });
    }
  }
});