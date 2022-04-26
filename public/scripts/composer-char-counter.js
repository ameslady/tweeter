
$(document).ready(function() {
  const textarea = $("#tweet-text");
  const total = Number($(".counter").html());

  textarea.on('keyup', function() {
    const valueLength = $(this).val().length;
    const output = $(this).parent().find(".counter");
    const remaining = total - valueLength;

    output.html(String(remaining))

    if (remaining < 0) {
      output.css("color", "red")
    } else {
      output.css("color", "#2F2B34")
    }
  });
});