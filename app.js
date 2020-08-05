// heroku url for fetch requests
const deployedURL = "https://videogame-ratings.herokuapp.com";
const URL = deployedURL ? deployedURL : "http://localhost:3000";

//global variables. elements needed for event listeners
const $ps4 = $("#ps4");
const $xbox = $("#xbox");
const $ns = $("#ns");
const $addgame = $("#addgame");
const $showgame = $("#showgame");
const $allgames = $(".allgames");
const $onegame = $(".onegame");
const $criticsContainer = $(".critics-container");
const $reviewRating = $("#review-rating");
const $reviewCritic = $("#review-critic");
const $reviewExcerpt = $("#review-excerpt");

//functions

//*display all games
const getGames = async () => {
  //get all games as json
  const response = await fetch(`${URL}/games`);
  const data = await response.json();

  //empty the section to repopulate (for when returning to home screen)
  $allgames.empty();
  $onegame.empty();
  $criticsContainer.empty();

  data.forEach(async (game) => {
    //make a div with class game (will hold each game 'card') w/ background image of game
    const $game = $(`<div class="game"></div>`).css(
      "background-image",
      `url(${game.boxArt})`
    );
    //get each individual game as json (which now includes populated critic ratings)
    const response = await fetch(`${URL}/games/${game._id}`);
    const data = await response.json();

    //loop over critic rating array and add up all the ratings
    let totalRating = 0;
    data.criticRating.forEach((rating) => {
      return (totalRating += rating.rating);
    });
    //get average by diving by total number of ratings (hardcoded 5 for now)
    let avgRating = Math.floor(totalRating / data.criticRating.length);

    //append rating and title to the game 'card'
    $game.append(`<div class="rating">${avgRating}%`);
    $game.append(
      `<h5 class="title" onclick="showOne()" id="${game._id}">${game.title}`
    );
    $allgames.append($game);
  });
};

//*display by console
const getConsoleGames = async () => {
  //get all games as json
  const response = await fetch(
    `${URL}/games/console/${event.target.innerText}`
  );
  const data = await response.json();

  //empty the section to repopulate with only console games
  $allgames.empty();
  $onegame.empty();
  $criticsContainer.empty();
  data.forEach(async (game) => {
    //make a div with class game (will hold each game 'card') w/ background image of game
    const $game = $(`<div class="game"></div>`).css(
      "background-image",
      `url(${game.boxArt})`
    );
    //get each individual game as json (which now includes populated critic ratings)
    const response = await fetch(`${URL}/games/${game._id}`);
    const data = await response.json();

    //loop over critic rating array and add up all the ratings
    let totalRating = 0;
    data.criticRating.forEach((rating) => {
      return (totalRating += rating.rating);
    });
    //get average by diving by total number of ratings (hardcoded 5 for now)
    let avgRating = Math.floor(totalRating / data.criticRating.length);

    //append rating and title to the game 'card'
    $game.append(`<div class="rating">${avgRating}%`);
    $game.append(
      `<h5 class="title" onclick="showOne()" id="${game._id}">${game.title}`
    );
    $allgames.append($game);
  });
};

//* display one game
const showOne = async () => {
  const response = await fetch(`${URL}/games/${event.target.id}`);
  const data = await response.json();
  //empty the page sections to show just one game
  $allgames.empty();
  //create div of game
  const $game = $(`<div class="game"></div>`).css(
    "background-image",
    `url(${data.boxArt})`
  );
  //append the title and add symbol to the game
  $game.append(
    `<h4 class="title" id="showgame">${data.title}</h4><i class="fas fa-plus-circle" id="${data._id}" data-toggle="modal"
    data-target="#addReviewModal"></i>`
  );
  //give the modal submit button the id of the game to re run this page when pressed
  $(".create-review").attr("id", data._id);
  //append it to the section
  $onegame.append($game);
  //append game description
  $onegame.append(
    `<div class=desc><h6>Release Date: ${data.releaseDate}</h6><p>${data.description}</p></div>`
  );
  //get average critic score for the game
  let totalRating = 0;
  data.criticRating.forEach((rating) => {
    return (totalRating += rating.rating);
  });
  let avgRating = Math.floor(totalRating / data.criticRating.length);
  //create the rating footer with avg rating
  const $rating = $(`<div class="rating-foot">
    <h4>Rating</h4>
    <h3>${avgRating}</h3>
  </div>`);
  //append it to the section
  $onegame.append($rating);
  //create the critic review div
  let $review; //declared here to allow access outside of if/else statements
  data.criticRating.forEach((review) => {
    if (
      review.critic === "Destructoid" ||
      review.critic === "Game Informer" ||
      review.critic === "GameSpot" ||
      review.critic === "GamesRadar+" ||
      review.critic === "IGN"
    ) {
      $review = $(`<div class="critic-header">
    <h5>${review.critic}</h5>
    <h5>${review.rating}</h5>
    </div>
    <p>${review.excerpt}</p>
      <a
        target="_blank"
        href="${review.link}"
        >link to full review</a
      >`);
    } else {
      $review = $(`<div class="critic-header">
    <h5>${review.critic}</h5>
    <h5>${review.rating}</h5>
    </div>
    <p>${review.excerpt}</p>
    <div class="buttons">
    <button id="${review._id}" class="editbutton" onclick="setEditId()" data-toggle="modal"
    data-target="#editReviewModal">
      edit</button>
      <button id="${review._id}" class="deletebutton" onclick="deleteReview()">
      delete</button></div>`);
    }
    const $reviewBox = $('<div class="review-box"></div>');
    //append each review to the box
    $reviewBox.append($review);
    //apend each box to container
    $criticsContainer.append($reviewBox);
  });
};

//* add a new game
const createGame = async () => {
  const $gameTitle = $("#game-title");
  const $gameConsole = $("#game-console");
  const $gameArt = $("#game-art");
  const $gameGenre = $("#game-genre");
  const $gameRelease = $("#game-release");
  const $gameDesc = $("#game-desc");
  const newGame = {
    title: $gameTitle.val(),
    console: $gameConsole.val(),
    boxArt: $gameArt.val(),
    genre: [$gameGenre.val()],
    releaseDate: $gameRelease.val(),
    description: $gameDesc.val(),
  };

  const response = await fetch(`${URL}/games`, {
    method: "post", // lets api know that we are making a post request
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGame),
  });
  const data = response.json();

  // update DOM with new game
  $allgames.empty(); //empty the list to repopulate
  getGames();
};

//* add new review
const createReview = async () => {
  const response = await fetch(`${URL}/games/${event.target.id}`);
  const data = await response.json();

  const newReview = {
    game: data.title,
    rating: $reviewRating.val(),
    critic: $reviewCritic.val(),
    link: "https://gameratings.netlify.app/",
    excerpt: $reviewExcerpt.val(),
  };

  const res = await fetch(`${URL}/critics`, {
    method: "post", // lets api know that we are making a post request
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newReview),
  });
  res.json();

  // update DOM with new game
  $criticsContainer.empty(); //empty the list to repopulate
  $onegame.empty();
  getGames();
};

//*function to add correct id to edit submit button
const setEditId = () => {
  $(".edit-review").attr("id", event.target.id);
};

//*edit a user review
const editReview = async () => {
  const updatedReview = {
    rating: $reviewRating.val(),
    critic: $reviewCritic.val(),
    excerpt: $reviewExcerpt.val(),
  };

  const response = await fetch(`${URL}/critics/${event.target.id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedReview),
  });

  //idk howto access the id needed for oneGame() so just go back to all games for now
  $onegame.empty();
  $criticsContainer.empty();
  getGames();
};

//*delete user review
const deleteReview = async () => {
  const response = await fetch(`${URL}/critics/${event.target.id}`, {
    method: "delete",
  });
  $onegame.empty();
  $criticsContainer.empty();
  getGames();
};

//*main application logic

//display all the games by invoking the function
getGames();
//when click submit in add game modal, will add game to page
$("#create-game").on("click", createGame);
//when click submit in create review modal, will add review to list
$(".create-review").on("click", createReview);
//when click submit the edit for the user review
$(".edit-review").on("click", editReview);
