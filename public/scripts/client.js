/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

// AJAX Get Request
const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (tweets) {
      renderTweets(tweets);
    });
};

// Prepends rendered tweets to html selement
const renderTweets = function(tweets) {
  $('#tweets-container').html('');

  for (const tweet of tweets) {
   const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet); 
  }
};
// Creates Tweet Markup
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

      <p class="content">${tweetObj.content.text}</p>
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

// AJAX Post Request
$( "#form" ).submit(function(event) {
  event.preventDefault();

  const input = $('#tweet-text').val();

  if (input === '') {
    $(".errorMessage").html("Error: How dare thee submit a blank tweet!");
    $(".alert").slideDown(1000).removeClass("hidden");
  } else if (input.length > 140) {
    $(".errorMessage").html("Error: Your tweet is too long! 140 characters max.");
    $(".alert").slideDown(1000).removeClass("hidden");
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

loadTweets();

});