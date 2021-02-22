; (function () {

  

  var scroll = function (target) {
    var targetTop = target.getBoundingClientRect().top;
    var scrollTop = window.pageYOffset;
    var targetOffsetTop = targetTop + scrollTop;
    var headerOffset = document.querySelector('.header-page').clientHeight;

    window.scrollTo(0, targetOffsetTop - headerOffset + 12);
  }

  myLib.body.addEventListener('click', function (e) {

    var target = e.target;
    var scrollToItemClass = myLib.closestAttr(target, 'data-scroll');

    if (scrollToItemClass === null) {
      return;
    }
    e.preventDefault();

    var scrollToItem = document.querySelector('.' + scrollToItemClass);

    if (scrollToItem) {
      scroll(scrollToItem);
    }
  });

})();