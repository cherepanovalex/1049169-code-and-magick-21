'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_PADDING = 20;
var GAP = 10;
var WELCOME_TEXT_X = CLOUD_X + CLOUD_PADDING;
var WELCOME_TEXT_Y = CLOUD_Y + CLOUD_PADDING;
var CHART_X = CLOUD_X + CLOUD_PADDING * 2;
var CHART_Y = CLOUD_Y + 80;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;

// Функция отрисовки окна с результатами
var renderCloud = function (ctx, x, y, color) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Функция отрисовки текста
var renderText = function (ctx, x, y, text, baseline) {
  ctx.fillStyle = '#000';
  ctx.textBaseline = baseline;
  ctx.fillText(text, x, y);
};

// Функция который находит лучший результат
var getMaxElement = function (times) {
  var maxElement = times[0];
  for (var i = 0; i < times.length; i++) {
    if (times[i] > maxElement) {
      maxElement = times[i];
    }
  }
  return maxElement;
};

// Получаем цвет бара
var getBarColor = function (name) {
  var barColor = 'rgba(2, 14, 134, ' + Math.random() + ')';

  if (name === 'Вы') {
    barColor = 'rgba(255, 0, 0, 1)';
  }
  return barColor;
};

window.renderStatistics = function (ctx, names, times) {
  // Рисуем окно с результатами
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // Рисуем текст приветствия
  renderText(ctx, WELCOME_TEXT_X, WELCOME_TEXT_Y, 'Ура вы победили!', 'hanging');
  renderText(ctx, WELCOME_TEXT_X, WELCOME_TEXT_Y + GAP * 2, 'Список результатов:', 'hanging');

  // Получаем лучший результат
  var maxTime = getMaxElement(times);

  // Рисуем гистограмму
  for (var i = 0; i < names.length; i++) {
    var currentBarHeight = (BAR_HEIGHT * times[i]) / maxTime;
    var coordX = CHART_X + (BAR_WIDTH + BAR_GAP) * i;
    var coordY = CHART_Y + (BAR_HEIGHT - currentBarHeight);

    renderText(ctx, coordX, coordY, Math.floor(times[i]), 'bottom');
    renderText(ctx, coordX, CHART_Y + BAR_HEIGHT + GAP, names[i], 'hanging');

    ctx.fillStyle = getBarColor(names[i]);
    ctx.fillRect(coordX, coordY, BAR_WIDTH, currentBarHeight);
  }
};
