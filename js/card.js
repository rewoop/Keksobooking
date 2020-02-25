'use strict';

(function () {
  var card = document.querySelector('#card').content.querySelector('.map__card');
  //  var avatar = card.querySelector('.popup__avatar');
  //  var closeBtn = card.querySelector('.popup__close');
  var title = card.querySelector('.popup__title');
  var address = card.querySelector('.popup__text--address');
  var price = card.querySelector('.popup__text--price');
  var cardType = card.querySelector('.popup__type');
  var capacity = card.querySelector('.popup__text--capacity');
  var time = card.querySelector('.popup__text--time');
  //  var description = card.querySelector('.popup__description');
  var featuresList = card.querySelector('.popup__features');
  //  var photos = card.querySelectorAll('.popup__photo');

  var Types = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var getFeauters = function (array) {
    featuresList.innerHTML = '';
    var fragment = document.createDocumentFragment();
    array.forEach(function (item) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature');
      feature.classList.add('popup__feature--' + item);
      fragment.appendChild(feature);
    });
    return featuresList.appendChild(fragment);
  };

  var renderPinCard = function (item) {
    title.textContent = item.offer.title;
    address.textContent = item.offer.address;
    price.textContent = item.offer.price + '₽/ночь';
    cardType.textContent = Types[item.offer.type];
    capacity.textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
    time.textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
    getFeauters(item.offer.features);
  };

  var onPinClick = function (item) {
    renderPinCard(item);
    // console.log(item);
  };

  var chooseCard = function (collection, array) {
    var newCollection = Array.from(collection).slice(1);
    newCollection.forEach(function (item, index) {
      item.addEventListener('click', function (evt) {
        evt.preventDefault();
        onPinClick(array[index]);
      });
    });
  };

  window.card = {
    chooseCard: chooseCard
  };

})();
