
$(document).ready(function() {
  const textarea = $("#tweet-text");
  const total = Number($(".counter").html());

  textarea.on('keyup', function() {
    const count = $(this).val().length;
    const remaining = total - count;

    // use this keyword to get counter ?
    $(".counter").html(String(remaining));

    if (remaining < 0) {
      $(".counter").css("color", "red")
    }
  });
});