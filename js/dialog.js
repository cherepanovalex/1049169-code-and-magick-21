'use strict';

(function() {
    const ENTER_KEYCODE = 13;
    const ESC_KEYCODE = 27;

    const setup = document.querySelector('.setup');
    const setupOpen = document.querySelector('.setup-open');
    const setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
    const setupClose = setup.querySelector('.setup-close');
    const setupUpload = setup.querySelector('.upload');
    const setupWizardForm = setup.querySelector('.setup-wizard-form');
    const setupNameInput = setupWizardForm.querySelector('.setup-user-name');
    const wizardEyes = setupWizardForm.querySelector('.wizard-eyes');
    const wizardCoat = setupWizardForm.querySelector('.wizard-coat');
    const fireballWrap = setupWizardForm.querySelector('.setup-fireball-wrap');
    const shopElement = document.querySelector('.setup-artifacts-shop');

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

    // Перетаскивание окна настроек
    const onSetupUploadMousedown = function(evt) {

        const startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };

        const dragged = false;

        const onMouseMove = function(moveEvt) {
            dragged = true;

            const shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            };

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };

            setup.style.top = (setup.offsetTop - shift.y) + 'px';
            setup.style.left = (setup.offsetLeft - shift.x) + 'px';
        };

        const onMouseUp = function() {

            if (dragged) {
                const onSetupUploadClick = function(clickEvt) {
                    clickEvt.preventDefault();
                    setupUpload.removeEventListener('click', onSetupUploadClick);
                };
                setupUpload.addEventListener('click', onSetupUploadClick);
            }

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const openPopup = function() {
        setup.classList.remove('hidden');
        document.addEventListener('keydown', onPopupEscPress);
        setupClose.addEventListener('click', onSetupCloseClick);
        setupClose.addEventListener('keydown', onSetupCloseEnterPress);
        setupUpload.addEventListener('mousedown', onSetupUploadMousedown);
        wizardEyes.addEventListener('click', window.setup.onWizardEyesClick);
        fireballWrap.addEventListener('click', window.setup.onFireballClick);
        wizardCoat.addEventListener('click', window.setup.onWizardCoatClick);
        shopElement.addEventListener('dragstart', window.setup.onShopElementDragstart);
    };

    const closePopup = function() {
        setup.classList.add('hidden');
        setup.style.top = null;
        setup.style.left = null;
        document.removeEventListener('keydown', onPopupEscPress);
        setupClose.removeEventListener('click', onSetupCloseClick);
        setupClose.removeEventListener('keydown', onSetupCloseEnterPress);
        setupUpload.removeEventListener('mousedown', onSetupUploadMousedown);
        wizardEyes.removeEventListener('click', window.setup.onWizardEyesClick);
        fireballWrap.removeEventListener('click', window.setup.onFireballClick);
        wizardCoat.removeEventListener('click', window.setup.onWizardCoatClick);
        shopElement.removeEventListener('dragstart', window.setup.onShopElementDragstart);
    };

    setupOpen.addEventListener('click', function() {
        openPopup();
    });

    setupOpenIcon.addEventListener('keydown', function(evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
            openPopup();
        }
    });
})();