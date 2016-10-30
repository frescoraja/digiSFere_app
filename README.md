# digiSFere

[Live](http://digisfere.herokuapp.com/)

<img src="https://dl.dropboxusercontent.com/s/bzfcl6y2mni4ud7/loginsm.png" width="45%">
<img src="https://dl.dropboxusercontent.com/s/p03py5fukzj4ken/mainpage1sm.png" width="45%">
<img src="https://dl.dropboxusercontent.com/s/9c6oa0r2ox9xeyw/mainpage2sm.png" width="45%">
<img src="https://dl.dropboxusercontent.com/s/ky9crsyfhy1exb7/mainpage3sm.png" width="45%">
<img src="https://dl.dropboxusercontent.com/s/07okg766pa17pfd/modalsm1.png" width="45%">
<img src="https://dl.dropboxusercontent.com/s/n2bh8qs5kigarp9/showsm1.png" width="45%">

## Minimum Viable Product
digiSFere is a web platform for Bay Area software developers to discover and share local opportunities and events.

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [X] Create accounts
- [X] Create secure sessions (log in)
- [X] Create listings (jobs, workspaces, events, companies, startups)
- [X] Create map and markers to represent listings and their geographical location
- [X] View map with all listings within geographical bounds
- [X] Filter listings by location of map and by category
- [X] Search listings by title/name/description/website
- [X] View detailed listings
- [X] Sort listings by category
- [X] User interface

## Implementation Timeline

### Phase 1: User Authentication, Listing Creation (~1 day)
Create rails models, routes, controller actions, and views to allow user to create user
account and securely login. Create listings model, controller, and routes.

### Phase 2: Map features (~2 days)
Integrate interactive map on the listings index view using Google Maps API, with pins
showing available listings, and the ability for the user to drag the map and
select listings from the pins.

### Phase 3: Viewing listings, reviews (~2 days)
I will add API routes to serve listing and review data as JSON, then add Backbone
models and collections that fetch data from those routes. By the end of this
phase, users will be able to create listings using a single page interface. 
Static view at the top of the page will provide a search field to filter 
listings by all text fields in addition to map location.

### Phase 4: Search Listings, upload images (~1 day)
Move search query filtering from front end to backend in the listings controller.
Integrate image upload into new listings form via Cloudinary API.

###	Phase 5: CSS and Styling (~2 days)
Unify views and forms with common CSS styling. Use Bootstrap CSS as foundation.


### Bonus Features (TBD)
- [X] show listing details near pins on map
- [X] save app state - preserve map location and order of filter tiles after
  navigating away from main page
- [ ] third party app integration for listings
