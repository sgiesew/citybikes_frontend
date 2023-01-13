
CITYBIKES FRONTEND


Installing and running the project
==================================

If you haven't already, please go to https://nodejs.org/en/download/ and install node.js on your local machine.

Clone the project from GitHub into a local folder. Change into that folder. Open a console and enter 'npm install'. Then enter 'npm start'. The project will open in your browser at 'localhost:3000'

(The backend is already deployed and running in the cloud at https://citybikes-backend.herokuapp.com, so no more setup steps are needed.)


Features
========

The app displays data from journeys made with city bikes in the Helsinki Capital area, and also details about the bike stations.
- Use the panel on the left side of the screen to switch between the map view of the stations, the list view of the stations, and the list view of the journeys

### Map view of the stations

The app opens with a map view of all the bike stations. Use the mouse wheel to zoom in or out at the mouse pointer position. Click on a yellow dot to open the details view for a station. 

### Details view of a station

The station details view displays:
- The name and address of the station
- The location of the station on the map
- The total number of departures from this station
- The total number of returns to this station
- The average length of a journey starting from this station
- The average length of a journey ending at this station
- The 5 most popular return stations of journeys starting at this station
- The 5 most popular departure stations of journeys ending at this station
- A graph of the daily departures from this station
- A graph of the daily returns to this station

### List of stations

A paginated list of the bike stations
- Click on an entry in the list to open the details view for a station
- Use the search field on top to do a search in the stations
- Use the filter symbol in the header of the 'City' column to filter for 'Helsinki' or 'Espoo' (works in conjunction with a search)
- Click the Reset button to reset the list

### List of journeys

A paginated list of journeys
- Click on the header of the 'Distance' and 'Duration' columns to order the journeys by distance and/or duration, descending or ascending. Click again to cancel sorting.
- Use the filter symbol in the header of the 'From' and 'To' columns to filter for journeys starting/ending at metro stations, or at train stations


Technologies
============

- React
- React Router
- Ant Design
- Leaflet


