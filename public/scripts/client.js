/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

// Fake data taken from initial-tweets.json
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1651024800000
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1649901600000
  }
]

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
        <span class="createdDate">${daysSince(tweetObj.created_at)}</span>
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

const daysSince = function(date) {
  const today = new Date();
  const createdDate = new Date(date);
  const difference = (today.getTime() - createdDate.getTime()) / (1000 * 3600 * 24);
  return `${Math.round(difference)} days ago`;
};

renderTweets(tweetData);

});
