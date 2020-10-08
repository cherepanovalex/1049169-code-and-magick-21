'use strict';

var WIZARDS_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
var setupClose = setup.querySelector('.setup-close');
var setupWizardForm = setup.querySelector('.setup-wizard-form');
var setupNameInput = setupWizardForm.querySelector('.setup-user-name');
var wizardEyes = setupWizardForm.querySelector('.wizard-eyes');
var wizardCoat = setupWizardForm.querySelector('.wizard-coat');
var fireballWrap = setupWizardForm.querySelector('.setup-fireball-wrap');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = setup.querySelector('.setup-similar-list');

// Закрытие окна настроек при нажатии кнопки ESC
var onPopupEscPress = function(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
        if (evt.target === setupNameInput) {
            evt.stopPropagation();
        } else {
            closePopup();
        }
    }
};

// Закрытие окна настроек при клике на крестик
var onSetupCloseClick = function() {
    closePopup();
};

// Закрытие окна настроек при нажатии Enter на крестик
var onSetupCloseEnterPress = function(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
        closePopup();
    }
};

// Получаем случайные данные из массива
var getRandomItemFromArray = function(array) {
    var randomItem = array[Math.floor(Math.random() * array.length)];
    return randomItem;
};

// Изменение цвета глаз при клике
var onWizardEyesClick = function() {
    var eyesColor = getRandomItemFromArray(EYES_COLORS);
    wizardEyes.style.fill = eyesColor;
    setupWizardForm.querySelector('input[name=eyes-color]').value = eyesColor;
};

// Изменение цвета fireball при клике
var onFireballClick = function() {
    var fireballColor = getRandomItemFromArray(FIREBALL_COLORS);
    fireballWrap.style.backgroundColor = fireballColor;
    fireballWrap.querySelector('input').value = fireballColor;
};

// Изменение цвета плаща при клике
var onWizardCoatClick = function() {
    var coatColor = getRandomItemFromArray(COAT_COLORS);
    wizardCoat.style.fill = coatColor;
    setupWizardForm.querySelector('input[name=coat-color]').value = coatColor;
};

var openPopup = function() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupClose.addEventListener('click', onSetupCloseClick);
    setupClose.addEventListener('keydown', onSetupCloseEnterPress);
    wizardEyes.addEventListener('click', onWizardEyesClick);
    fireballWrap.addEventListener('click', onFireballClick);
    wizardCoat.addEventListener('click', onWizardCoatClick);
};

var closePopup = function() {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setupClose.removeEventListener('click', onSetupCloseClick);
    setupClose.removeEventListener('keydown', onSetupCloseEnterPress);
    wizardEyes.removeEventListener('click', onWizardEyesClick);
    fireballWrap.removeEventListener('click', onFireballClick);
    wizardCoat.removeEventListener('click', onWizardCoatClick);
};

setupOpen.addEventListener('click', function() {
    openPopup();
});

setupOpenIcon.addEventListener('keydown', function(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
        openPopup();
    }
});

// Генерация массива случайных похожих персонажей
var generateWizards = function(wizardsCount) {
    var wizardsArray = [];

    for (var i = 0; i < wizardsCount; i++) {
        wizardsArray[i] = {
            name: getRandomItemFromArray(WIZARD_NAMES) + ' ' + getRandomItemFromArray(WIZARD_SURNAMES),
            coatColor: getRandomItemFromArray(COAT_COLORS),
            eyesColor: getRandomItemFromArray(EYES_COLORS)
        };
    }

    return wizardsArray;
};

// Создаем элемент
var makeWizardElement = function(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
};

// Функция отрисовки элементов
var renderWizards = function(wizards) {
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