'use strict';

(function() {
    const COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
    const EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
    const FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

    const setup = document.querySelector('.setup');
    const setupWizardForm = setup.querySelector('.setup-wizard-form');
    const wizardEyes = setupWizardForm.querySelector('.wizard-eyes');
    const wizardCoat = setupWizardForm.querySelector('.wizard-coat');
    const fireballWrap = setupWizardForm.querySelector('.setup-fireball-wrap');

    window.setup = {
        // Изменение цвета глаз при клике
        onWizardEyesClick: function() {
            const eyesColor = window.util.getRandomItemFromArray(EYES_COLORS);
            wizardEyes.style.fill = eyesColor;
            setupWizardForm.querySelector('input[name=eyes-color]').value = eyesColor;
        },
        // Изменение цвета fireball при клике
        onFireballClick: function() {
            const fireballColor = window.util.getRandomItemFromArray(FIREBALL_COLORS);
            fireballWrap.style.backgroundColor = fireballColor;
            fireballWrap.querySelector('input').value = fireballColor;
        },
        // Изменение цвета плаща при клике
        onWizardCoatClick: function() {
            const coatColor = window.util.getRandomItemFromArray(COAT_COLORS);
            wizardCoat.style.fill = coatColor;
            setupWizardForm.querySelector('input[name=coat-color]').value = coatColor;
        },
        // Перемещение артефакта
        onShopElementDragstart: function(dragstartEvt) {
            const artifactsElement = document.querySelector('.setup-artifacts');
            const draggedItem = null;

            if (dragstartEvt.target.tagName.toLowerCase() === 'img') {
                draggedItem = dragstartEvt.target;
                dragstartEvt.dataTransfer.setData('text/plain', dragstartEvt.target.alt);
                artifactsElement.style.outline = '2px dashed red';
            }

            artifactsElement.addEventListener('dragstart', function() {
                artifactsElement.style.outline = '2px dashed red';
            });

            artifactsElement.addEventListener('dragover', function(evt) {
                evt.preventDefault();
                return false;
            });

            artifactsElement.addEventListener('drop', function(evt) {
                evt.preventDefault();
                evt.target.style.backgroundColor = '';
                evt.target.appendChild(draggedItem);
                artifactsElement.style.outline = '';
            });

            artifactsElement.addEventListener('dragenter', function(evt) {
                evt.preventDefault();
                evt.target.style.backgroundColor = 'yellow';
            });

            artifactsElement.addEventListener('dragleave', function(evt) {
                evt.preventDefault();
                evt.target.style.backgroundColor = '';
            });

            document.addEventListener('dragend', function(evt) {
                evt.preventDefault();
                artifactsElement.style.outline = '';
            });
        }
    };
})();