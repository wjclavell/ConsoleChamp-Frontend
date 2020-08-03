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

//functions

//*display all games
const getGames = async () => {
  //get all games as json
  const response = await fetch(`${URL}/games`);
  const data = await response.json();

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
    totalRating = totalRating / 5;

    //append rating and title to the game 'card'
    $game.append(`<div class="rating">${totalRating}%`);
    $game.append(`<h5 class="title" id="${game._id}">${game.title}`);
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
    totalRating = totalRating / 5;

    //append rating and title to the game 'card'
    $game.append(`<div class="rating">${totalRating}%`);
    $game.append(`<h5 class="title" id="${game._id}">${game.title}`);
    $allgames.append($game);
  });
};

//main application logic

//display all the games by invoking the function
getGames();
