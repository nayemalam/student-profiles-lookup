# Student Profiles Search ⚡

\*\*\* This project was only tested on the Google Chrome browser

## Steps to reproduce:

- #### `cd student-profiles`
- #### `npm install`
- #### `npm start`

  - #### Development Mode:

    - `npm start` <br/>
      Runs the app in the development mode. <br/>
      Open http://localhost:3000 to view it in the browser. <br/>
      The page will reload if you make edits.

  - #### Production Mode:
    - `npm run build`
    - `npm run serve` <br/>
      OR <br />
    - `npm run bns` (this will do both build and serve) <br/>
      Runs the app in the production mode. <br/>
      Open http://localhost:5000 to view it in the browser. <br/>
      The page will not reload if you make edits.

#

#### What does this do?

- [x] Fetches a list of student profiles via `https://api.hatchways.io/assessment/students`
- [x] Display search results in a list
- [x] View test scores with a toggle on top right
- [x] Users can add a tag for a specific student profile
- [x] Users can search by:
  - [x] student name
  - [x] tags associated to any student
  - [x] both

#

#### Additional features:

- Notifications for adding duplicate tags
- Notifications for error fetching via API
- Show scrollbar only on hover
- Typescript + SASS support

#

#### Note:

- There is no state or db persistence, so if the user refreshes the page, the page will unmount and the updated will be cleared.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
