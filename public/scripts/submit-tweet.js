
$(document).ready(function() {

  $( "#form" ).submit(function(event) {
    event.preventDefault();
    // update to $.ajax later
    $.post("/tweets", $(this).serialize());
    $('#tweet-text').val('');
    $('.counter').val(140);
  });

});