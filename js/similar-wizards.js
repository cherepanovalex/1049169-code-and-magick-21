'use strict';

(function () {
  var WIZARDS_COUNT = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var setup = document.querySelector('.setup');
  var similarListElement = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Генерация массива случайных похожих персонажей
  var generateWizards = function (wizardsCount) {
    var wizardsArray = [];

    for (var i = 0; i < wizardsCount; i++) {
      wizardsArray[i] = {
        name: window.util.getRandomItemFromArray(WIZARD_NAMES) + ' ' + window.util.getRandomItemFromArray(WIZARD_SURNAMES),
        coatColor: window.util.getRandomItemFromArray(COAT_COLORS),
        eyesColor: window.util.getRandomItemFromArray(EYES_COLORS)
      };
    }

    return wizardsArray;
  };

  // Создаем элемент
  var makeWizardElement = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  // Функция отрисовки элементов
  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(makeWizardElement(wizards[i]));
    }
    return fragment;
  };

  var wizards = generateWizards(WIZARDS_COUNT);
  similarListElement.append(renderWizards(wizards));

  // Показываем Список похожих персонажей
  document.querySelector('.setup-similar').classList.remove('hidden');
})();
