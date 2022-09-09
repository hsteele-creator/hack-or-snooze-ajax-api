"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();


  return $(`
      <li id="${story.storyId}">
      <button class="favorite" onClick="favorite('${story.storyId}')">⭐</button>   
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        <button class='remove' onClick="remove('${story.storyId}')">🗑️</button>
      </li>
    `);


}


const favorites = [];
const favoriteStoryList = [];

async function favorite(storyID) {

  const newUser = new User(currentUser, currentUser.loginToken);

  if(!favorites.includes(storyID)) {

    favorites.push(storyID);
  } else {
    for(let i = 0; i < favorites.length; i++) {
      if(favorites[i] === storyID) {
        favorites.splice(i, 1);
      }
    }
  }
  for(let favorite of favorites) {
    const favoritedStory = newUser.getStoryById(favorite);

    favoriteStoryList.append(favoritedStory);
  }
  console.log(favorites);
  }
  

/** Gets list of stories from server, generates their HTML, and puts on page. */
function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


// use created story data to append a new story to a page
$("#submit-btn").on("click", async function(e) {

  e.preventDefault;

  const title = $("#title").val();
  const author = $("#author").val();
  const url = $("#url").val();

  console.log(title);
  console.log(author);
  console.log(url);

  console.log(currentUser);


const newStory = await storyList.addStory(currentUser, {title, author, url});

const $newStory = generateStoryMarkup(newStory);

$allStoriesList.prepend($newStory);
});



// remove story from DOM and let api know its deleted
// $body.on("click", ".remove", async function(e) {
//   e.target.closest("li").remove();

//   await axios.get(`${BASE_URL}/stories/target.closest("li").id`);
// })

async function remove(storyID) {
  
  console.log("removed");

  const newUser = new User(currentUser, currentUser.loginToken);

  console.log(storyID);

  // await storyID.closest("li").remove();
  
}