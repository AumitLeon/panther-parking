const express = require('express');
const path = require('path'); // eslint-disable-line global-require
const utils = require('./utils');
const { MongoError } = require('mongodb');
// Resolve client build directory as absolute path to avoid errors in express
const buildPath = path.resolve(__dirname, '../client/build');
const app = express();

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files as first priority
  app.use(express.static(buildPath));
}

// Valid values for user field
const validUsers = [
  'Student-sPass',
  'Student-ePass',
  'Student-pPass',
  'Student-tPass',
  'Student-uPass',
  'Visitor',
  'Faculty',
  'default'
];

const isFilterArgsValid = (timeIn, timeOut, userType) => {
  let isValid = true;
  if (!validUsers.includes(userType)) {
    isValid = false;
  }
  if (Number.isNaN(Date.parse(timeIn)) || Number.isNaN(Date.parse(timeOut))) {
    isValid = false;
  }
  if (timeOut.getTime() < timeIn.getTime()) {
    isValid = false;
  }
  return isValid;
};

// TODO: Add any middleware here

// Get the mapbox API key from environment
app.get('/api/map/:key', (request, response) => {
  response.send(process.env.MAPBOX_KEY);
});

// Return a list of parkable/non-parkable lots based on filter criteria
app.get(
  '/api/map/filter/:userType/:timeIn/:timeOut',
  (request, response, next) => {
    // Reformat date strings
    const timeIn = new Date(request.params.timeIn.replace(/-+/g, ' '));
    const timeOut = new Date(request.params.timeOut.replace(/-+/g, ' '));
    const { userType } = request.params;

    // Validations
    if (!isFilterArgsValid(timeIn, timeOut, userType)) {
      response.sendStatus(400);
      return;
    }

    // Account for time change from UTC to EST
    timeIn.setHours(timeIn.getHours() + 5);
    timeOut.setHours(timeOut.getHours() + 5);

    const parkableQuery = utils.constructQuery(timeIn, timeOut, userType);
    const nonparkableQuery =
      parkableQuery.$or === undefined
        ? { type: 'Not feature' }
        : { $nor: parkableQuery.$or };

    let parkable;
    let nonparkable;

    app.locals.db
      .collection('parkingLots')
      .find(parkableQuery)
      .toArray()
      .then(documents => {
        parkable = {
          features: documents,
          type: 'FeatureCollection'
        };
        app.locals.db
          .collection('parkingLots')
          .find(nonparkableQuery)
          .toArray()
          .then(docs => {
            nonparkable = {
              features: docs,
              type: 'FeatureCollection'
            };
            response.send({ parkable, nonparkable });
          }, next); // Use "next" as rejection handler
      }, next); // Use "next" as rejection handler
  }
);

// Return lightweight lot objects to fill the sidebar
app.get(
  '/api/sidebar/:userType/:timeIn/:timeOut/:lotSelected',
  (request, response, next) => {
    // Reformat date strings
    const timeIn = new Date(request.params.timeIn.replace(/-+/g, ' '));
    const timeOut = new Date(request.params.timeOut.replace(/-+/g, ' '));
    const { userType } = request.params;
    const lotSelected = request.params.lotSelected.replace(/-+/g, ' ');

    // Validations
    if (!isFilterArgsValid(timeIn, timeOut, userType)) {
      response.sendStatus(400);
      return;
    }

    // Account for time change from UTC to EST
    timeIn.setHours(timeIn.getHours() + 5);
    timeOut.setHours(timeOut.getHours() + 5);

    // If lotSelected isn't false, query only for lot name
    let query = '';
    if (lotSelected === 'false') {
      query = utils.constructQuery(timeIn, timeOut, userType);
    } else {
      query = { 'properties.name': lotSelected };
    }

    app.locals.db
      .collection('parkingLots')
      .find(query)
      .toArray()
      .then(documents => {
        const sidebarLots = documents.map(lot => ({
          name: lot.properties.name,
          description: lot.properties.description
        }));
        response.send(sidebarLots);
      }, next); // Use "next" as rejection handler
  }
);

// A very simple error handler. In a production setting you would
// not want to send information about the inner workings of your
// application or database to the client.
app.use((error, request, response, next) => {
  if (response.headersSent) {
    next(error);
  }
  // uncomment next line to see error messages during testing
  // console.log('Error: ', error);
  if (error instanceof MongoError) {
    response.status(400).send(error.errmsg || {});
  } else {
    response.sendStatus(error.statusCode || error.status || 500);
  }
});

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // All remaining requests return the React app, so it can handle routing.
  app.get('*', (request, response) => {
    response.sendFile(path.join(buildPath, 'index.html'));
  });
}

module.exports = {
  app
};
