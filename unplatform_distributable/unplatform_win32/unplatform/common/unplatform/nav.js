$(function() {
'use strict';
$('#menu').on('click', function(e) {
  $(this).children('li.selected').removeClass('selected');
  var targetEl = $(e.target).closest('li'); 
  targetEl.addClass('selected');
  //$('.content').html('<iframe id="" src="https://clix.tiss.edu/" class="fill-win">');
});

});

 
