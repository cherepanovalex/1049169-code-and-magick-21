'use strict';

const WIZARDS_COUNT = 4;
const WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
const COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
const EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
const FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
const ENTER_KEYCODE = 13;
const ESC_KEYCODE = 27;

const setup = document.querySelector('.setup');
const setupOpen = document.querySelector('.setup-open');
const setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
const setupClose = setup.querySelector('.setup-close');
const setupWizardForm = setup.querySelector('.setup-wizard-form');
const setupNameInput = setupWizardForm.querySelector('.setup-user-name');
const wizardEyes = setupWizardForm.querySelector('.wizard-eyes');
const wizardCoat = setupWizardForm.querySelector('.wizard-coat');
const fireballWrap = setupWizardForm.querySelector('.setup-fireball-wrap');
const similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
const similarListElement = setup.querySelector('.setup-similar-list');

// Закрытие окна настроек при нажатии кнопки ESC
const onPopupEscPress = function(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
        if (evt.target === setupNameInput) {
            evt.stopPropagation();
        } else {
            closePopup();
        }
    }
};

// Закрытие окна настроек при клике на крестик
const onSetupCloseClick = function() {
    closePopup();
};

// Закрытие окна настроек при нажатии Enter на крестик
const onSetupCloseEnterPress = function(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
        closePopup();
    }
};

// Получаем случайные данные из массива
const getRandomItemFromArray = function(array) {
    const randomItem = array[Math.floor(Math.random() * array.length)];
    return randomItem;
};

// Изменение цвета глаз при клике
const onWizardEyesClick = function() {
    const eyesColor = getRandomItemFromArray(EYES_COLORS);
    wizardEyes.style.fill = eyesColor;
    setupWizardForm.querySelector('input[name=eyes-color]').value = eyesColor;
};

// Изменение цвета fireball при клике
const onFireballClick = function() {
    const fireballColor = getRandomItemFromArray(FIREBALL_COLORS);
    fireballWrap.style.backgroundColor = fireballColor;
    fireballWrap.querySelector('input').value = fireballColor;
};

// Изменение цвета плаща при клике
const onWizardCoatClick = function() {
    const coatColor = getRandomItemFromArray(COAT_COLORS);
    wizardCoat.style.fill = coatColor;
    setupWizardForm.querySelector('input[name=coat-color]').value = coatColor;
};

const openPopup = function() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupClose.addEventListener('click', onSetupCloseClick);
    setupClose.addEventListener('keydown', onSetupCloseEnterPress);
    wizardEyes.addEventListener('click', onWizardEyesClick);
    fireballWrap.addEventListener('click', onFireballClick);
    wizardCoat.addEventListener('click', onWizardCoatClick);
};

const closePopup = function() {
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
const generateWizards = function(wizardsCount) {
    const wizardsArray = [];

    for (let i = 0; i < wizardsCount; i++) {
        wizardsArray[i] = {
            name: getRandomItemFromArray(WIZARD_NAMES) + ' ' + getRandomItemFromArray(WIZARD_SURNAMES),
            coatColor: getRandomItemFromArray(COAT_COLORS),
            eyesColor: getRandomItemFromArray(EYES_COLORS)
        };
    }

    return wizardsArray;
};

// Создаем элемент
const makeWizardElement = function(wizard) {
    const wizardElement = similarWizardTemplate.cloneNode(true);

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