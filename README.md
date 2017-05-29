# Klarna's home exercise - result
This is a Yellow Pages like application.

## Uses

It gives theu user the ability to search for people by: 

* Name (contains)
* Phone (equals)
* Age (equals)

They can be in any order they user want and any of them.

After the application is up you will be provided with a text field to write the search.
By pressing `Enter` the search will be executed.

## Installation

1. Make sure you have Node.JS installed: https://nodejs.org/en/download/
1. Make sure you have MongoDB installed: https://www.mongodb.com/download-center
1. Run mongod --dbpath `<Path>YellowPages\Data`
1. Run cmd then `mongoimport --db YellowPages --collection people --file <location of people.json>`
1. Run mongo `<Path>\MongoDB\bin` then run `mongo`
1. Clone the git repository
1. Run `npm install` inside the repo directory
1. Run `npm start` to run the server

You should see the following message in the console:

`Comments server listening on port 3000!`

To run the application just navigate to `http://localhost:3000/`