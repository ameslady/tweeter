/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (tweets) {
      renderTweets(tweets);
    });
};

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
   const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet); 
  }
};

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

loadTweets();

});
