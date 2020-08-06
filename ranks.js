//* show overall rankings for console (PS4)
const ps4Rank = async () => {
  const response = await fetch(`${URL}/games/console/PS4`);
  const data = await response.json();

  //empty the section to repopulate with only console games
  $allgames.empty();
  $onegame.empty();
  $criticsContainer.empty();

  let overallRating = 0;
  let consoleRating = 0;

  data.forEach(async (game) => {
    //get each individual game as json (which now includes populated critic ratings)
    const response = await fetch(`${URL}/games/${game._id}`);
    const data = await response.json();

    //loop over critic rating array and add up all the ratings
    let totalRating = 0;
    data.criticRating.forEach(async (review) => {
      return (totalRating += review.rating);
    });
    //get average by diving by total number of ratings (hardcoded 5 for now)
    let avgRating = Math.floor(totalRating / data.criticRating.length);
    overallRating += avgRating;
  });
  setTimeout(() => {
    consoleRating = Math.floor(overallRating / data.length);
    //append rating and title to the game 'card'
    $rankings.append(`<div class="rank">
    <p>PS4:<em> ${+consoleRating.toFixed(2)}</em></p>
    <progress max="100" value="${+consoleRating.toFixed(2)}"></progress>
  </div>`);
  }, 500);
};

//* show overall rankings for console (Xbox One)
const xboxRank = async () => {
  const response = await fetch(`${URL}/games/console/Xbox One`);
  const data = await response.json();

  //empty the section to repopulate with only console games
  $allgames.empty();
  $onegame.empty();
  $criticsContainer.empty();

  let overallRating = 0;
  let consoleRating = 0;

  data.forEach(async (game) => {
    //get each individual game as json (which now includes populated critic ratings)
    const response = await fetch(`${URL}/games/${game._id}`);
    const data = await response.json();

    //loop over critic rating array and add up all the ratings
    let totalRating = 0;
    data.criticRating.forEach(async (review) => {
      return (totalRating += review.rating);
    });
    //get average by diving by total number of ratings (hardcoded 5 for now)
    let avgRating = Math.floor(totalRating / data.criticRating.length);
    overallRating += avgRating;
  });
  setTimeout(() => {
    consoleRating = Math.floor(overallRating / data.length);
    //append rating and title to the game 'card'
    $rankings.append(`<div class="rank">
    <p>Xbox One:<em> ${+consoleRating.toFixed(2)}</em></p>
    <progress max="100" value="${+consoleRating.toFixed(2)}"></progress>
  </div>`);
  }, 500);
};

//* show overall rankings for console (Nintendo Switch)
const switchRank = async () => {
  const response = await fetch(`${URL}/games/console/Nintendo Switch`);
  const data = await response.json();

  //empty the section to repopulate with only console games
  $allgames.empty();
  $onegame.empty();
  $criticsContainer.empty();

  let overallRating = 0;
  let consoleRating = 0;

  data.forEach(async (game) => {
    //get each individual game as json (which now includes populated critic ratings)
    const response = await fetch(`${URL}/games/${game._id}`);
    const data = await response.json();

    //loop over critic rating array and add up all the ratings
    let totalRating = 0;
    data.criticRating.forEach(async (review) => {
      return (totalRating += review.rating);
    });
    //get average by diving by total number of ratings (hardcoded 5 for now)
    let avgRating = Math.floor(totalRating / data.criticRating.length);
    overallRating += avgRating;
  });
  setTimeout(() => {
    consoleRating = Math.floor(overallRating / data.length);
    //append rating and title to the game 'card'
    $rankings.append(`<div class="rank">
    <p>Nintendo Switch:<em> ${+consoleRating.toFixed(2)}</em></p>
    <progress max="100" value="${+consoleRating.toFixed(2)}"></progress>
  </div>`);
  }, 500);
};
