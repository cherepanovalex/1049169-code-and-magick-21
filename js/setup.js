'use strict';
//создаем массив с именами
const WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
//создаем массив с фамилией
const WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
//создаем массив с цветом пальто
const WIZARD_COAT_COLOR = ['rgb (101, 137, 164)', 'rgb (241, 43, 107)', 'rgb (146, 100, 161)', 'rgb (56, 159, 117)', 'rgb (215, 210, 55)', 'rgb (0, 0, 0)'];
//cоздаем массив из цвета глаз
const WIZARD_EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
//находим блок setup и удаляем у него класс hidden
const userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

const similarListElement = userDialog.querySelector('.setup-similar-list');

const similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

console.log(WIZARD_NAMES.length);


//получаем рандомное значение из массива
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}




const wizards = [{
        name: WIZARD_NAMES[getRandomInt(WIZARD_NAMES.length)],
        surname: WIZARD_SECOND_NAMES[getRandomInt(WIZARD_SECOND_NAMES.length)],
        coatColor: WIZARD_COAT_COLOR[[getRandomInt(WIZARD_COAT_COLOR.length)]],
        eyesColor: WIZARD_EYE_COLOR[[getRandomInt(WIZARD_EYE_COLOR.length)]]
    },
    {
        name: WIZARD_NAMES[getRandomInt(WIZARD_NAMES.length)],
        surname: WIZARD_SECOND_NAMES[getRandomInt(WIZARD_SECOND_NAMES.length)],
        coatColor: WIZARD_COAT_COLOR[[getRandomInt(WIZARD_COAT_COLOR.length)]],
        eyesColor: WIZARD_EYE_COLOR[[getRandomInt(WIZARD_EYE_COLOR.length)]]
    },
    {
        name: WIZARD_NAMES[getRandomInt(WIZARD_NAMES.length)],
        surname: WIZARD_SECOND_NAMES[getRandomInt(WIZARD_SECOND_NAMES.length)],
        coatColor: WIZARD_COAT_COLOR[[getRandomInt(WIZARD_COAT_COLOR.length)]],
        eyesColor: WIZARD_EYE_COLOR[[getRandomInt(WIZARD_EYE_COLOR.length)]]
    },
    {
        name: WIZARD_NAMES[getRandomInt(WIZARD_NAMES.length)],
        surname: WIZARD_SECOND_NAMES[getRandomInt(WIZARD_SECOND_NAMES.length)],
        coatColor: WIZARD_COAT_COLOR[[getRandomInt(WIZARD_COAT_COLOR.length)]],
        eyesColor: WIZARD_EYE_COLOR[[getRandomInt(WIZARD_EYE_COLOR.length)]]
    }
];

const renderWizard = function(wizard) {
    const wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
}

const fragment = document.createDocumentFragment();
for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');


console.log(wizards)