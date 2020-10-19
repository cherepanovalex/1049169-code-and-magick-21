'use strict';

(function() {
    const WIZARDS_COUNT = 4;
    const WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
    const WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
    const COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
    const EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

    const setup = document.querySelector('.setup');
    const similarListElement = setup.querySelector('.setup-similar-list');
    const similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

    // Генерация массива случайных похожих персонажей
    const generateWizards = function(wizardsCount) {
        const wizardsArray = [];

        for (let i = 0; i < wizardsCount; i++) {
            wizardsArray[i] = {
                name: window.util.getRandomItemFromArray(WIZARD_NAMES) + ' ' + window.util.getRandomItemFromArray(WIZARD_SURNAMES),
                coatColor: window.util.getRandomItemFromArray(COAT_COLORS),
                eyesColor: window.util.getRandomItemFromArray(EYES_COLORS)
            };
        }

        return wizardsArray;
    };

    // Создаем элемент
    const makeWizardElement = function(wizard) {
        var wizardElement = similarWizardTemplate.cloneNode(true);

        wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
        wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
        wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

        return wizardElement;
    };

    // Функция отрисовки элементов
    const renderWizards = function(wizards) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < wizards.length; i++) {
            fragment.appendChild(makeWizardElement(wizards[i]));
        }
        return fragment;
    };

    const wizards = generateWizards(WIZARDS_COUNT);
    similarListElement.append(renderWizards(wizards));

    // Показываем Список похожих персонажей
    document.querySelector('.setup-similar').classList.remove('hidden');
})();