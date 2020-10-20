'use strict';

(function() {
    window.util = {
        // Получаем случайные данные из массива
        getRandomItemFromArray: function(array) {
            let randomItem = array[Math.floor(Math.random() * array.length)];
            return randomItem;
        }
    };
})();