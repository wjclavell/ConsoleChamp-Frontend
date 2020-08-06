# CONSOLE CHAMP - ratings for console exclusive videogames

**By William Clavell**

<a name="top">

##### consolechamp live site:

<a href="https://consolechamp.netlify.app/"><img src="./assets/ConsoleChamp-orange.svg"></a>

## Contents:

1. [App Description](#appdescription)
2. [User Stories](#userstories)
3. [Wireframes](#wireframes)
4. [Screenshots](#screenshots)
5. [Technologies Used](#techused)
6. [Database Structure](#dbstructure)
7. [Backend Repo](#backend)

<a name="appdescription">

## App Description

This app is a rating/review site, similar to Rotten Tomatoes. It focuses on console exclusive games (games that ONLY release for one console: PS4, Xbox One, or Nintendo Switch). The goal is to have a database of user and critic reviews for each game, and have an overall rating system to see which console has the "best" exclusives. All games in the database are displayed on the home page. A description and list of reviews are available when a game is selected.

<a name="userstories">

## User Stories

#### Current:

- User can view all video games on the site
- User can click a category (PS4, Nintendo Switch, Xbox One) to filter games for that system
- User can click a game to view critic reviews and information about that game
- User can click a link in each critic review to view the full review by that critic
- User can create a user review for selected game
- User can delete and update their own reviews
- User can add a game to the list and edit the content

#### Future Implementations:

- User can click genre type to filter selection by genre (genres are already in database)
- User login/signup to be able to have review ONLY associated with them
- User can favorite certain games that they like
- User can view an infographic showing current overall stats for each console (ie: Average all overall game reviews for each console to determine an average console rating)

<a name="wireframes">

## Initial Mobile Wireframes - created in Figma

<img src="https://res.cloudinary.com/wjclavell/image/upload/v1596219606/project2-videogameratings/VGR_allgames_pze2ig.png">
<img src="https://res.cloudinary.com/wjclavell/image/upload/v1596219743/project2-videogameratings/VideoGameRatings_qossv6.png">

<a name="screenshots">

## Screenshots of App

**Home page displaying all games:**
<img src="https://res.cloudinary.com/wjclavell/image/upload/v1596725297/project2-videogameratings/allgames_cqumwl.png">

**Game description page:**
<img src ="https://res.cloudinary.com/wjclavell/image/upload/v1596725297/project2-videogameratings/gamedesc_m5q66o.png">

**Game review page:**
<img src="https://res.cloudinary.com/wjclavell/image/upload/v1596725296/project2-videogameratings/gamereviews_jj8faj.png">

<a name="techused">

## Technologies Used

#### Frontend

- HTML
- CSS
- JavaScript
- jQuery (to render fetch requests to page)
- Bootstrap (for nav bar)
- Netlify (for deployement)
- Figma

#### Backend

- Node.js
- Express
- Mongodb
- Heroku
- Postman
- Cors
- Nodemon
- Mongoose

<a name="dbstructure">

## Database Structure

### Game Schema

```JS
const gameSchema = new Schema(
  {
    title: { type: String, required: true },
    boxArt: { type: String, required: true },
    console: { type: String, required: true },
    genre: { type: Array, required: true },
    releaseDate: { type: String, required: true },
    criticRating: [
      {
        type: Schema.Types.ObjectId,
        ref: "Critic",
      },
    ],
    userRating: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    description: { type: String, required: true },
  },
  { timestamps: true }
);
```

**With full CRUD controllers/routes along with showing one game and filter by console. References to critic collecion and user collection (user collection is currently created but not yet implemented)**

### Critic Schema

```JS
const criticSchema = new Schema(
  {
    game: { type: String, required: true },
    rating: { type: Number, required: true },
    critic: { type: String, required: true },
    link: { type: String, required: true },
    excerpt: { type: String, required: true },
  },
  { timestamps: true }
);
```

**With full CRUD controllers/routes**

<a name="backend">

### View backend repo here :

[Backend](https://github.com/wjclavell/BackEnd-P2)

<a href="https://consolechamp.netlify.app"><img src="./assets/console-champ-alt.svg"></a>

[back to top](#top)
