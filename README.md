# Brackets-R-US
Brackets-R-Us is where you can create, manage, and join tournaments.

[Link to live site](https://brackets-r-us.herokuapp.com/)

## Technologies Used
- Front-end Technologies
  * HTML
  * CSS
  * React
  * React-router

- Back-end Technologies
  * Django
  * Python
  * SQL
  * Postgres

## User Stories
* A user can view all tournaments.
* A logged in user can join any open tournament.
* A logged in user can create tournaments.
* The owner of a tournament can edit and delete the tournaments that they own, as well as creating rounds within the tournaments.
* A user can share a unique url for a given tournament.

## Approach Taken
* lots of props passing to components
* Router pages for the home page, user page, and each of the tournament details pages
  * routes to the tournament details pages utilizes useParams
* Creating a new round's bracket will randomize the players into pairings. The first round will be composed of all players who joined the tournament, while future rounds will be composed of only the winners of the previous round's pairings. When the playerbase is reduced to two, a champion can be selected rather than creating a new round. 

## Known Issues
* if an owner of a tournament unlocks the tournament after creating a bracket, and a user joins, they'll be added to the participating list, but not the brackets (actually nice and doesn't exactly break our code, but it would be better for that to not happen already)
* editing the locked field doesn't give consistent user feedback

## Features that still need to be implemented
* prevent owners from unlocking tournaments that have already been started
* a way to return to the previous page without using the universal back button
* handling user account deletion (causes display issues since generated from call to backend list of users)
* have the title of the page redirect to the home page
* filter list of tournaments by unlocked, locked, and finished tournaments
