
CITYBIKES FRONTEND


Installing and running the project
==================================

If you haven't already, go to https://nodejs.org/en/download/ and install node.js on your local machine.

Clone the project from GitHub into a local folder. Change into that folder. Open a console and enter 'npm install'. Then enter 'npm start'. The project will open in your browser at 'localhost:3000'

(The backend is already deployed and running on the server at https://citybikes-backend.herokuapp.com, so no more setup steps are needed.)


Features
========

The frontend displays data from journeys made with city bikes in the Helsinki Capital area, and also details about bike stations.

* navigation panel to switch between journeys view and stations view
* paginated view for list of stations and list of journeys, navigate using Back and Forward buttons beneath the list view, or jump to a neighboring page using the Page # buttons
* option to change the number of items per page (default is 10)
* server-side pagination for list of journeys
* in list of stations, each entry has a button which brings up a view with the address, as well as number of departures and number of returns for that station


Technologies
============

* React
* React Router
* Ant Design


TO DO
=====

* showing station location on map
* server-side pagination also for list of stations

