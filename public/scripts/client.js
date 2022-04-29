/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

 // -- Requests --

// AJAX get request
const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (tweets) {
      renderTweets(tweets);
    });
};

// AJAX post request
$( "#form" ).submit(function(event) {
  event.preventDefault();
  const input = $('#tweet-text').val();

  if (input === '') {
    $(".errorMessage").html("Error: Tweet contents cannot be blank.");
    $(".alert").removeClass("hidden");
  } else if (input.length > 140) {
    $(".errorMessage").html("Error: Your tweet is too long. 140 characters max.");
    $(".alert").removeClass("hidden");
  } else {
    $(".alert").addClass("hidden");
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $(this).serialize(),
      success: function() {
        $('#tweet-text').val('');
        $('.counter').val(140);
        loadTweets();
      }
    })
  }
});

// -- Helpers --

// ensure tweet content is safe
const safeText = (text) => {
  const safe = document.createElement("div");
  safe.appendChild(document.createTextNode(text));
  return safe.innerHTML;
}

// prepends rendered tweets to html selement
const renderTweets = function(tweets) {
  $('#tweets-container').html('');

  for (const tweet of tweets) {
   const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet); 
  }
};

// creates tweet markup
const createTweetElement = function(tweetObj) {
  let $tweetHtml = `
    <br>
    <article class="tweet">
      <header>
        <div>
          <i class="fa-solid fa-user-astronaut"></i>
          <span class="name">${tweetObj.user.name}</span>
        </div>
        <span class="handle">${tweetObj.user.handle}</span>
      </header>

      <p class="content">${safeText(tweetObj.content.text)}</p>
      <hr class="solid">

      <footer> 
        <span class="createdDate">${timeago.format(tweetObj.created_at)}</span>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
    `;

  return $tweetHtml;
};

loadTweets();

});