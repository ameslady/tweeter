
$(document).ready(function() {

  $( "#form" ).submit(function(event) {
    event.preventDefault();

    const input = $('#tweet-text').val();

    if (input === '') {
      alert("How dare thee submit a blank tweet!")
    } else if (input.length > 140) {
      alert("Thy tweet is too long!")
    } else {
      $.post("/tweets", $(this).serialize());
      $('#tweet-text').val('');
      $('.counter').val(140);
    }
  });

});