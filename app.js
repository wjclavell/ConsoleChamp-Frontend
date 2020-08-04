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
const $critcsContainer = $(".critics-container");

//functions

//*display all games
const getGames = async () => {
  //get all games as json
  const response = await fetch(`${URL}/games`);
  const data = await response.json();

  //empty the section to repopulate (for when returning to home screen)
  $allgames.empty();
  $onegame.empty();
  $critcsContainer.empty();

  data.forEach(async (game) => {
    //make a div with class game (will hold each game 'card') w/ background image of game
    const $game = $(`<div class="game"></div>`).css(
      "background-image",
      `url(${game.boxArt})`
    );
    //get each individual game as json (which now includes populated critic ratings)
    const response = await fetch(`${URL}/games/${game._id}`);
    const data = await response.json();
    console.log(data.criticRating);

    //loop over critic rating array and add up all the ratings
    let totalRating = 0;
    data.criticRating.forEach((rating) => {
      return (totalRating += rating.rating);
    });
    //get average by diving by total number of ratings (hardcoded 5 for now)
    let avgRating = totalRating / 5;

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
  $critcsContainer.empty();
  data.forEach(async (game) => {
    //make a div with class game (will hold each game 'card') w/ background image of game
    const $game = $(`<div class="game"></div>`).css(
      "background-image",
      `url(${game.boxArt})`
    );
    //get each individual game as json (which now includes populated critic ratings)
    const response = await fetch(`${URL}/games/${game._id}`);
    const data = await response.json();
    console.log(data.criticRating);

    //loop over critic rating array and add up all the ratings
    let totalRating = 0;
    data.criticRating.forEach((rating) => {
      return (totalRating += rating.rating);
    });
    //get average by diving by total number of ratings (hardcoded 5 for now)
    let avgRating = totalRating / 5;

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
  $game.append(`<h4 class="title" id="showgame">${data.title}</h4><svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    class="bi bi-plus-circle-fill"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"
    />
  </svg>`);
  //append it to the section
  $onegame.append($game);
  //get average critic score for the game
  let totalRating = 0;
  data.criticRating.forEach((rating) => {
    return (totalRating += rating.rating);
  });
  let avgRating = totalRating / 5;
  //create the rating footer with avg rating
  const $rating = $(`<div class="rating-foot">
    <h4>Rating</h4>
    <h3>${avgRating}</h3>
  </div>`);
  //append it to the section
  $onegame.append($rating);
  //create the critic review div
  data.criticRating.forEach((review) => {
    const $review = $(`<div class="critic-header">
    <h5>${review.critic}</h5>
    <h5>${review.rating}</h5>
    </div>
    <p>${review.excerpt}</p>
      <a
        target="_blank"
        href="${review.link}"
        >link to full review</a
      >`);
    //append each critic review to the box
    const $reviewBox = $('<div class="review-box"></div>');
    $reviewBox.append($review);
    //apend each box to container
    $critcsContainer.append($reviewBox);
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

//main application logic

//display all the games by invoking the function
getGames();
$("#create-game").on("click", createGame);
