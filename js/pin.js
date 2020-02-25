'use strict';

(function () {
  var ERROR_TIMEOUT = 300;

  var main = document.querySelector('main');
  var mapPins = document.querySelector('.map__pins');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var errorPopup = document.querySelector('#error').content.querySelector('.error');
  var errorTitle = errorPopup.querySelector('.error__message');
  var errorBtn = errorPopup.querySelector('.error__button');

  var pins = [];

  var renderPins = function (currentPin) {
    var userPin = pin.cloneNode(true);
    userPin.style.left = currentPin.location.x + 'px'; // {{location.x + смещение по X}} + 'px';
    userPin.style.top = currentPin.location.y + 'px'; // {{location.y + смещение по Y}} + 'px';
    userPin.querySelector('img').src = currentPin.author.avatar;
    userPin.querySelector('img').alt = currentPin.offer.title;
    return userPin;
  };

  var render = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (item) {
      fragment.appendChild(renderPins(item));
    });
    mapPins.appendChild(fragment);
    window.card.chooseCard(mapPins.querySelectorAll('.map__pin'), array);
  };

  var filterPins = function () {
    render(pins);
  };

  var successHandler = function (data) {
    pins = data;
    filterPins();
  };

  var errorHandler = function (errorMessage) {
    errorTitle.textContent = errorMessage;
    main.appendChild(errorPopup);

    errorBtn.addEventListener('click', function () {
      main.removeChild(errorPopup);
      setTimeout(function () {
        window.backend.load(successHandler, errorHandler);
      }, ERROR_TIMEOUT);
    });
  };

  window.backend.load(successHandler, errorHandler);

})();
