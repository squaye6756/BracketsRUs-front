# Brackets-R-US
Brackets-R-Us is where you can create, manage, and join tournaments.

[Link to live site](https://git.heroku.com/brackets-r-us.git)

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

## Approach Taken
* lots of props passing to components
* many-to-many relationship between users and tournaments
* pseudo (annoyingly so) many-to-many relationship between users and brackets
* one-to-many relationship between owners and tournaments
* one-to-many relationship between tournaments and brackets
* one-to-many relationship between champion and tournaments
* Router pages for the home page, user page, and each of the tournament details pages
  * routes to the tournament details pages utilizes useParams

## User Stories
* A user can view all tournaments.
* A logged in user can join any open tournament.
* A logged in user can create tournaments.
* The owner of a tournament can edit and delete the tournaments that they own.

## Known Issues
* if an owner of a tournament unlocks the tournament after creating a bracket, and a user joins, they'll be added to the participating list, but not the brackets (actually nice and doesn't exactly break our code, but it would be better for that to not happen already)
* editing the locked field doesn't give any user feedback
* cors isn't blocking requests from anyone not on our frontend app (thought it was implemented correctly, but it isn't)

## Features that still need to be implemented
* prevent owners from unlocking tournaments that have already been started
* a way to return to the previous page without using the universal back button
* handling user account deletion (causes display issues since generated from call to backend list of users)
* have the title of the page redirect to the home page
* sort list of tournaments by unlocked, locked, and finished tournaments
