'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
  var setupClose = setup.querySelector('.setup-close');
  var setupUpload = setup.querySelector('.upload');
  var setupWizardForm = setup.querySelector('.setup-wizard-form');
  var setupNameInput = setupWizardForm.querySelector('.setup-user-name');
  var wizardEyes = setupWizardForm.querySelector('.wizard-eyes');
  var wizardCoat = setupWizardForm.querySelector('.wizard-coat');
  var fireballWrap = setupWizardForm.querySelector('.setup-fireball-wrap');
  var shopElement = document.querySelector('.setup-artifacts-shop');

  // Закрытие окна настроек при нажатии кнопки ESC
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (evt.target === setupNameInput) {
        evt.stopPropagation();
      } else {
        closePopup();
      }
    }
  };

  // Закрытие окна настроек при клике на крестик
  var onSetupCloseClick = function () {
    closePopup();
  };

  // Закрытие окна настроек при нажатии Enter на крестик
  var onSetupCloseEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  };

  // Перетаскивание окна настроек
  var onSetupUploadMousedown = function (evt) {

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      dragged = true;

      var shift = {
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

    var onMouseUp = function () {

      if (dragged) {
        var onSetupUploadClick = function (clickEvt) {
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

  var openPopup = function () {
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

  var closePopup = function () {
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

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });
})();
