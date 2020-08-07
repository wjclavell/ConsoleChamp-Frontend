# Project Overview

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

| Day   | Deliverable                                                      | Status   |
| ----- | ---------------------------------------------------------------- | -------- |
| Day 1 | Project Description                                              | Complete |
| Day 1 | Wireframes / Priority Matrix / Timeline `backend` and `frontend` | Complete |
| Day 2 | Working RestAPI                                                  | Complete |
| Day 3 | Core Application Structure (HTML, CSS, etc.)                     | Complete |
| Day 4 | MVP & Bug Fixes                                                  | Complete |
| Day 5 | Final Touches and Present                                        | Complete |

## Project Description

[Netlify url](https://flamboyant-ramanujan-b00f82.netlify.app/)

This project will be a full CRUD application for Video Game Ratings. It will be similar to Rotten Tomatoes or Metacritic. As a differentiating factor, I am choosing to focus only on console exclusive games (games that ONLY release for one console) and have a sort of 'ranking' to see which video game console offers the best exclusives.

## Backend Repo

[Backend](https://github.com/wjclavell/BackEnd-P2/blob/master/planning_directory/project-worksheet.md)

## User Stories

- User can view all video games on the site
- User can click a category (PS4, Nintendo Switch, XBOX One) to view games for that system
- User can click on genre type to view games in that genre
- User can click a game to view critic reviews
- User can create a user review for selected game
- User can delete and update their own reviews
- User can add a game to the list and edit the content

## Wireframes

Upload images of wireframe to cloudinary and add the link here with a description of the specific wireframe. Do not include the actual image and have it render on the page.

- [Mobile1](https://res.cloudinary.com/wjclavell/image/upload/v1596219606/project2-videogameratings/VGR_allgames_pze2ig.png)
- [Mobile2](https://res.cloudinary.com/wjclavell/image/upload/v1596219743/project2-videogameratings/VideoGameRatings_qossv6.png)

Wireframing Resources:

- [Figma](https://www.figma.com/)

## Time/Priority Matrix

[frontend TPM](https://res.cloudinary.com/wjclavell/image/upload/v1596217003/project2-videogameratings/P2-frontend-TPM_rivv2m.png)

### MVP/PostMVP - 5min

The functionality will then be divided into two separate lists: MPV and PostMVP. Carefully decided what is placed into your MVP as the client will expect this functionality to be implemented upon project completion.

#### MVP

- mobile responsive first design
- hamburger menu/nav bar
- button/event listeners
- all page, console page, review page
- add/edit modal
- bootstrap for overall layout and design
- jQuery and API intergration

#### PostMVP

- genre section
- animations
- logo
- console ranking page

## Functional Components

Based on the initial logic defined in the previous sections try and breakdown the logic further into functional components, and by that we mean functions. Try and capture what logic would need to be defined if the game was broken down into the following categories.

#### MVP

| Component        | Priority | Estimated Time | Time Invetsted | Actual Time |
| ---------------- | :------: | :------------: | :------------: | :---------: |
| Hamburger        |    H     |      2hr       |     .25hr      |    .25hr    |
| All games page   |    H     |     1.5hr      |      2hr       |     2hr     |
| Regular Nav      |    H     |      1hr       |     .25hr      |    .25hr    |
| Game review page |    H     |     1.5hr      |     2.5hr      |    2.5hr    |
| Add/edit modal   |    H     |      3hr       |     1.5hr      |    1.5hr    |
| jQuery with API  |    H     |      3hrs      |      15hr      |    15hr     |
| Responsive       |    H     |      2hr       |      .5hr      |    .5hr     |
| Console page     |    H     |     1.5hr      |      1hr       |     1hr     |
| Total            |    H     |    15.5hrs     |     20hrs      |    20hrs    |

#### PostMVP

| Component       | Priority | Estimated Time | Time Invetsted | Actual Time |
| --------------- | :------: | :------------: | :------------: | :---------: |
| Genre section   |    M     |      2hr       |      -hr       |     -hr     |
| Animations      |    L     |      3hr       |      -hr       |     -hr     |
| Logo            |    L     |      2hr       |     1.5hr      |    1.5hr    |
| Bootstrap       |    M     |      4hr       |      1hr       |     1hr     |
| Console Ranking |    M     |     2.5hr      |      6hr       |     6hr     |
| Total           |    H     |    13.5hrs     |     8.5hrs     |    -hrs     |

## Additional Libraries

- jQuery, for API frontend functionality
- Bootstrap, for NavBar and Hamburger menu

## Code Snippet

This block of code was used to generate the average rating for each game. I had to have two nested fetch requests and forEach statements in order to access the correct array of ratings. I then add each rating for that particular game and divided it by the number of total reviews. I then used that everage to display a singular rating for each game. ( in order to get the 'console rankings' I had to then add up all the average ratings for each Game, for each Console)

```
let totalRating = 0;
  data.criticRating.forEach((rating) => {
    return (totalRating += rating.rating);
  });
  let avgRating = Math.floor(totalRating / data.criticRating.length);
```

## Issues and Resolutions

**ISSUE**: Only my GET requests were working originally
**RESOLUTION**: Removed w=majority from mongoURI

**ISSUE**: Could not access critic id from current submit button
**RESOLUTION**: Created a function to add the id to that button when I click an initial edit button that has been assigned the id already

**ISSUE** Update route is functioning, but edits are not being saved in the frontend
**RESOLUTION** I had a console.log to check that the url of the route was correct,but it was placed between my fetch and put request, which was preventing it from running correctly. (funny how what was meant to detect errors, was actually causing one)

## Previous Project Worksheet

- [Readme's](https://github.com/jkeohan/fewd-class-repo/tree/master/final-project-worksheet/project-worksheet-examples)
- [Best of class readme](https://github.com/jkeohan/fewd-class-repo/blob/master/final-project-worksheet/project-worksheet-examples/portfolio-gracie.md)
