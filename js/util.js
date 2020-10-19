'use strict';

(function () {
  window.util = {
    // Получаем случайные данные из массива
    getRandomItemFromArray: function (array) {
      var randomItem = array[Math.floor(Math.random() * array.length)];
      return randomItem;
    }
  };
})();
