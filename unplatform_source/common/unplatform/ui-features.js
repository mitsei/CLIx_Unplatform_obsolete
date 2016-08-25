'use strict';

$(function() {

  $('.but-select').on('click', function(e) {
    $(this).children('button.selected').removeClass('selected');
    $('.count-select').children('button.selected-count').removeClass('selected-count');
    var targetEl = $(e.target).closest('button');
    targetEl.addClass('selected');
  });

  $('.count-select').on('click', function(e) {
    $(this).children('button.selected-count').removeClass('selected-count');
    var targetEl = $(e.target).closest('button');
    targetEl.addClass('selected-count');
  });

});
