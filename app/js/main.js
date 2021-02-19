; (function () {

  // header

  if (window.matchMedia('(max-width: 992px)').matches) {
    return;
  };

  var headerPage = document.querySelector('.header-page');


  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 0) {
      headerPage.classList.add('header-page--active');
    } else {
      headerPage.classList.remove("header-page--active");
    }
  });

  // header

  // popup

  var body = document.querySelector('body');



  var closestItemByClass = function (item, className) {
    var node = item;

    while (node) {

      if (node.classList.contains(className)) {
        return node;
      };
      node = node.parentElement;
    };

    return null;
  };

  var closestAttr = function (item, attr) {
    var node = item;

    while (node) {
      var attrValue = node.getAttribute(attr);

      if (attrValue) {
        return attrValue;
      }
      node = node.parentElement;
    }

    return null;
  };

  var showPopup = function (target) {
    target.classList.add('popup--active');
  };

  var closePopup = function (target) {
    target.classList.remove('popup--active');
  };

  var toggleScroll = function () {
    body.classList.toggle('no-scroll');
  };

  body.addEventListener('click', function (e) {
    var target = e.target;
    var popupClass = closestAttr(target, 'data-popup');

    if (popupClass === null) {
      return;
    }

    e.preventDefault();

    var popup = document.querySelector('.' + popupClass);

    if (popup) {
      showPopup(popup);
      toggleScroll();
    }
  });


  body.addEventListener('click', function (e) {
    var target = e.target;

    if (target.classList.contains('popup-close') || target.classList.contains('popup__inner')) {

      var popup = closestItemByClass(target, 'popup');
 
      closePopup(popup);
      toggleScroll();
    };

  });


  body.addEventListener('keydown', function (e) {

    if (e.key !== "Escape") {
      return;
    }

    var popup = document.querySelector('.popup.popup--active');

    if (popup) {
      closePopup(popup);
      toggleScroll();
    }

  });
  // popup

  // scroll

  var body = document.querySelector('body');

  var scroll = function (target) {
    var targetTop = target.getBoundingClientRect().top;
    var scrollTop = window.pageYOffset; 
    var targetOffsetTop = targetTop + scrollTop;
    var headerOffset = document.querySelector('.header-page').clientHeight;

    window.scrollTo(0, targetOffsetTop - headerOffset + 12);
  }

  body.addEventListener('click', function(e) {

    var target = e.target;
    var scrollToItemClass = closestAttr(target, 'data-scroll');

    if (scrollToItemClass === null) {
      return;
    } 
    e.preventDefault();

    var scrollToItem = document.querySelector('.' + scrollToItemClass);

    if (scrollToItem) {
      scroll(scrollToItem);
    }
  });


  //scroll
})();