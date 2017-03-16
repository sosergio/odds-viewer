# Odds Viewer
This app shows the best odds available from different bookmakers for the winner of the 2016/2017 UEFA Champions League.

### Tech
* [AngularJS] - HTML enhanced for web apps!
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [MongoDb] - NoSql database


### Running the server

Install the dependencies and devDependencies and start the server.

```sh
$ cd odds-viewer.server
$ npm install
$ npm start
```
This will start the server at the following address

```sh
localhost:5000
```

### Running the client
Install the dependencies and devDependencies and start the server.

```sh
$ cd odds-viewer.client
$ npm install
$ npm start
```
This will open your browser at the following address


```sh
localhost:3000
```

You can adjust the client to read from the running node server or from a static mock file by changing the environment in:
```sh
odd-viewer.client\config\env.json
{
    "env":"backend|mock"
}
```


### Todos

 - Migrate to webpack
 - add unit tests


   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angular.io>
   [MongoDb]: <https://www.mongodb.com>
