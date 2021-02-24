// libs
; (function () {
  var canUseWebp = function () {
    var elem = document.createElement('canvas');

    if (!!(elem.getContext && elem.getContext('2d'))) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }

    return false;
  };

  var isWebpSupported = canUseWebp();

  if (isWebpSupported === false) {
    var lazyItems = document.querySelectorAll('[data-bg-replace-webp]')

    for (var i = 0; i < lazyItems.length; i += 1) {
      var item = lazyItems[i];
      var dataSrcPeplaceWebp = item.getAttribute('data-bg-replace-webp');
      if (dataSrcPeplaceWebp !== null) {
        item.setAttribute('data-bg', dataSrcPeplaceWebp)
      }
    }


  }

  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy",
  });
})();
// libs

//  myLib
; (function () {
  
  window.myLib = {};

  window.myLib.body = document.querySelector('body');

  window.myLib.closestAttr = function (item, attr) {
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

  window.myLib.closestItemByClass = function (item, className) {
    var node = item;

    while (node) {

      if (node.classList.contains(className)) {
        return node;
      };
      node = node.parentElement;
    };

    return null;
  };

  window.myLib.toggleScroll = function () {
    myLib.body.classList.toggle('no-scroll');
  };
})();
// myLib

// header
; (function () {
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
})();
// header

// scroll
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
// scroll

// popup
; (function () {
  var showPopup = function (target) {
    target.classList.add('popup--active');
  };

  var closePopup = function (target) {
    target.classList.remove('popup--active');
  };

  myLib.body.addEventListener('click', function (e) {
    var target = e.target;
    var popupClass = myLib.closestAttr(target, 'data-popup');

    if (popupClass === null) {
      return;
    }

    e.preventDefault();

    var popup = document.querySelector('.' + popupClass);

    if (popup) {
      showPopup(popup);
      myLib.toggleScroll();
    }
  });


  myLib.body.addEventListener('click', function (e) {
    var target = e.target;

    if (target.classList.contains('popup-close') || target.classList.contains('popup__inner')) {

      var popup = myLib.closestItemByClass(target, 'popup');

      closePopup(popup);
      myLib.toggleScroll();
    };

  });


  myLib.body.addEventListener('keydown', function (e) {

    if (e.key !== "Escape") {
      return;
    }

    var popup = document.querySelector('.popup.popup--active');

    if (popup) {
      closePopup(popup);
      toggleScroll();
    }

  });
})();
// popup

// catalog
; (function () {
  var catalogSection = document.querySelector('.section-catalog');

  if (catalogSection === null) {
    return;
  }

  var removeChildren = function (item) {
    while (item.firstChild) {
      item.removeChild(item.firstChild);
    }
  }

  var updateChildren = function (item, children) {
    console.log(children);
    removeChildren(item);

    for (var i = 0; i < children.length; i += 1) {
      item.appendChild(children[i]);
    }
  };

  var catalog = catalogSection.querySelector('.catalog');
  var catalogNav = catalogSection.querySelector('.catalog-nav');
  var catalogItems = catalogSection.querySelectorAll('.catalog__item');

  catalogNav.addEventListener('click', function (e) {
    var target = e.target;
    var item = myLib.closestItemByClass(target, 'catalog-nav__btn');

    if (item == null || item.classList.contains('.catelog-nav__btn--active')) {
      return;
    }

    e.preventDefault();

    var filterValue = item.getAttribute('data-filter');
    var previousBtnActive = catalogNav.querySelector('.catalog-nav__btn--active');

    previousBtnActive.classList.remove('catalog-nav__btn--active');
    item.classList.add('catalog-nav__btn--active');

    if (filterValue === 'all') {
      updateChildren(catalog, catalogItems);
      return;
    }

    var filteredItems = [];

    for (var i = 0; i < catalogItems.length; i += 1) {
      var current = catalogItems[i];

      if (current.getAttribute('data-category') === filterValue) {
        filteredItems.push(current);
      }
    }

    updateChildren(catalog, filteredItems);
  })
})();
// catalog

// product
; (function () {
  var catalog = document.querySelector('.catalog');

  if (catalog === null) {
    return;
  }

  var updateProductPrice = function (product, price) {
    var productPrice = product.querySelector('.product__price-value');
    productPrice.textContent = price;


  };

  var changeProductSize = function (target) {

    var product = myLib.closestItemByClass(target, 'product');
    var previousBtnActive = product.querySelector('.product__size--active');
    var newPrice = target.getAttribute('data-product-size-price');

    previousBtnActive.classList.remove('product__size--active');
    target.classList.add('product__size--active');

    updateProductPrice(product, newPrice);

  }


  var changeProductOrderInfo = function (target) {
    var product = myLib.closestItemByClass(target, 'product');
    var order = document.querySelector('.popup-order');

    var productTitle = product.querySelector('.product__title').textContent;
    var productSize = product.querySelector('.product__size--active').textContent;
    var productPrice = product.querySelector('.product__price-value').textContent;
    var productImgSrc = product.querySelector('.product__img').getAttribute('src');

    order.querySelector('.order-info-title').setAttribute('value', productTitle);
    order.querySelector('.order-info-size').setAttribute('value', productSize);
    order.querySelector('.order-info-price').setAttribute('value', productPrice);

    order.querySelector('.order-product-title').textContent = productTitle;
    order.querySelector('.order-product-price').textContent = productPrice;
    order.querySelector('.order__size').textContent = productSize;
    order.querySelector('.order__img').setAttribute('src', productImgSrc);

  };

  catalog.addEventListener('click', function (e) {
    var target = e.target;

    if (target.classList.contains('product__size') && !target.classList.contains('product__size--active')) {
      e.preventDefault();
      changeProductSize(target);
    }

    if (target.classList.contains('product__btn')) {
      e.preventDefault();
      changeProductOrderInfo(target);
    }

  });
})();
// product

// form
// ; (function () {
  // var forms = document.querySelectorAll('.form-send');

  // if (forms.length === 0) {
  //   return;
  // }

  // var formSend = function(form) {
  //   var xhr = new XMLHttpRequest();
  //   var url = 'app/mail/mail.php';

  //   xhr.open('POST', url);
  //   xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  //   xhr.onload = function() {
  //     console.log(xhr.response);
  //   }

  //   xhr.send();
  // }

  // for (var i = 0; i < forms.length; i += 1) {
  //   forms[i].addEventListener('submit', function(e) {
  //     e.preventDefault();
  //     var form = e.currentTarget;

  //     formSend(form);
  //   });
  // }
// })();
// form

// map
; (function () {

  var mapLoad = function() {
    var iframe = document.createElement('iframe');
    var map = document.querySelector('.contacts__map');
    iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2242.9051438292327!2d37.710615315393!3d55.7948849962137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b535093ad7d72b%3A0x15c200dbca057794!2z0J_RgNC10L7QsdGA0LDQttC10L3RgdC60LDRjyDQv9C7LiwgOCwg0JzQvtGB0LrQstCwLCDQoNC-0YHRltGPLCAxMDcwNjE!5e0!3m2!1suk!2sua!4v1614072983739!5m2!1suk!2sua";
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style ="border:0;"
    map.appendChild(iframe);
    
  };

  var sectionContacts = document.querySelector('.section-contacts');
  var checkMapInit = function() {
    var sectionContactsTop = sectionContacts.getBoundingClientRect().top;
    var scrollTop = window.pageYOffset;
    var sectionContactsOffsetTop =  scrollTop + sectionContactsTop;

    if (scrollTop + window.innerHeight > sectionContactsOffsetTop) {
      mapLoad();
      window.removeEventListener('scroll', checkMapInit);
    }
  };
  window.addEventListener('scroll', checkMapInit);
})();
// map

