# Interview Scheduler

Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
Data is persisted by the API server using a PostgreSQL database.
The client application communicates with an API server over HTTP, using the JSON format.
Jest and Cypress tests are used through the development of the project.

## Behavioura
- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

## Final Product
!["Main Page"](https://github.com/EvaProk/scheduler/blob/master/docs/MainPage.png)
!["Adding a new Interview"](https://github.com/EvaProk/scheduler/blob/master/docs/AddNew.png)
!["Deleting an Interview"](https://github.com/EvaProk/scheduler/blob/master/docs/deleting.png)
!["Confirming Deleting"](https://github.com/EvaProk/scheduler/blob/master/docs/Confirm.png)

## Setup

- Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Technical Specifications
- React
- Webpack, Babel
- Axios
- Storybook, Webpack Dev Server, Jest, Testing Library

The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application.
Both servers run concurrently; requests are proxied from the Webpack development server to the API server.


