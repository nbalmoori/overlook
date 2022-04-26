# OVERLOOK hotel booking

## Overview
OVERLOOK is a frontend application that allows users to login to a hotel website and view their past and upcoming bookings.  The user can make a new reservation by searching available rooms by date and room type.

This application was the final solo project built by Nikki Balmoori during Mod 2 of Turing School of Software & Design. The main objective was to use Object Oriented Programming to drive the design of the application and the code, work with an API to send and receive data, and utilize Test Driven Development.  

## Installation

### Access API
- Clone the [local server](https://github.com/turingschool-examples/overlook-api)
- `cd` into the local server folder, and run `npm install` and `npm start` 
- You will need to have this running in a separate tab in your terminal in order to access the data needed for this application
  - If you need to stop running the local server, run Control + C

### Access Application
- Clone the repository to your local machine
- `cd` into the application
- Run `npm install` to install the project dependencies
- Run npm start to run the local server to see the HTML page
  - Paste http://localhost:8080/ into your browser to view the HTML page
  - If you need to stop running the application, run Control + C
- To view tests, run npm test

## Application in Action


- To log in, enter `customer` followed by a number between 1 and 50 in the username field. The password for all users is `overlook2021`.

![overlook-giphy-login](https://user-images.githubusercontent.com/95309774/165387954-ebb30b7f-9b35-4c9b-bca6-5d7a92a887c2.gif)

- On the dashboard view, a user can see their upcoming and past bookings, as well as the total amount they have spent at the hotel so far.

![overlook-giphy-reservation](https://user-images.githubusercontent.com/95309774/165388944-c1baf16e-ad73-4a78-9d36-3efebfad36aa.gif)

- After clicking the "Make a Reservation" button, the user is taken to a new page where they can search for a new reservation based on date and room type.

## Future Additions
- A "manager" class that can: 
  - login and see hotel information such ass rooms available, revenue, and percentage of rooms occupied for today
  - search for any user by name, view their info, and add or delete a user's room bookings
- Enhance styling of the user dashboard
- Increase accessibility for users that utilize screen-readers or cannot use a mouse

## Technologies Used
- JavaScript
- CSS
- HTML
- Test Driven Development using Mocha & Chai

## Challenges & Wins
- Gained more experience in the following areas:
  - building processes with <b>webpack</b>
  - implementing <b>fetch API</b> and <b>post API</b> to access remote data
  - <b>Test Driven Development</b> by writing tests and classes before implementing code related to the DOM
- As we progress through the Turing program, the project expectations become less defined. This project allowed me to create Class objects/methods and user functionaity as I saw fit. Having flexibility is great, but can also cause decision fatigue.
