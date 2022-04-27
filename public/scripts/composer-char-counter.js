
$(document).ready(function() {
  const textarea = $("#tweet-text");
  const total = $(".counter").html();

  textarea.on('keyup', function() {
    const valueLength = $(this).val().length;
    const output = $(this).parent().find(".counter");
    const remaining = total - valueLength;

    output.html(remaining)

    if (remaining < 0) {
      output.addClass("red");
    } else {
      output.removeClass("red");
    }
  });
});