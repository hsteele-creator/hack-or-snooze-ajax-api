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
        <button class='remove' >🗑️</button>
      </li>
    `);

    // onClick="remove('${story.storyId}')"


}


var favorites = [];
let favoriteStoryList = [];

// on click of favorite append story id to favorites array
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

// use the ids in the favorites array to get the stories and push them into an array
  for(let favorite of favorites) {
    const favoritedStory = await newUser.getStoryById(favorite);

    favoriteStoryList.push(favoritedStory);
  }

  console.log(favorites);

  return favoriteStoryList;
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

  const newUser = new User(currentUser, currentUser.loginToken);

  let title = $("#title").val();
  let author = $("#author").val();
  let url = $("#url").val();

  console.log(title);
  console.log(author);
  console.log(url);


const newStory = await storyList.addStory(currentUser, {title, author, url});

const $newStory = generateStoryMarkup(newStory);

// remove story from api
newUser.removeStory(newStory.storyID)

$("#title").val("");
$("#author").val("");
$("#url").val("");


});



$body.on("click", ".remove", function(e) {
  e.target.closest("li").remove();

  // await axios.get(`${BASE_URL}/stories/target.closest("li").id`);
})


// async function remove(storyID) {
  
//   console.log("removed");

//   const newUser = new User(currentUser, currentUser.username, currentUser.loginToken);

//   console.log(currentUser.loginToken);

  

//   await newUser.removeStory(currentUser.loginToken, storyID);

// }