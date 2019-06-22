This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Deployed on https://rasyadiabdoellah.github.io/crud-client/ and consumes an [Express.js API using Sequelize](https://github.com/RasyadiAbdoellah/sequelize-api).

## Running Locally

Ensure you've got the sequelize API successfully running ( found [here](https://github.com/RasyadiAbdoellah/sequelize-api) ). Next, clone this repo and `npm install` all dependencies. Finally ensure the API url in the `.env` file is pointing to the local server. Type in `npm start`, hit enter, and it should load up the app at `localhost:3000`.

## Author's notes

I should have used Redux. If not Redux then React Hooks. I chose not to use hooks because I wasn't familiar with their usage. I avoided Redux to save time, since this exercise had a time limit of 5 days and I foolishly thought incorporating it into the project would have slowed me down. Towards the end of this sprint I was seriously regretting the decision. I think having either of those would have made managing application state so much simpler.

Choosing to not use Redux and also to not use React hooks results in code that isn't as clean as I'd like it to be. There are glaringly obvious places where things can be simplified. However I chose to focus on achieving all of the exercise's objectives, and I think I achieved it. This app connects to a deployed API running Sequelize, has a user auth functionality, and CRUDs a single resource.
