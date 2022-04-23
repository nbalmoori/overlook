// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'






// ----------------- IMPORTS ----------------- //


import { getFetch } from './apiCalls.js';
import CustomerRepository from './classes/customerRepository';
import Customer from './classes/customer';
import RoomRepository from './classes/roomRepository';
import BookingRepository from './classes/bookingRepository';



// ----------------- QUERY SELECTORS ----------------- //

// --------DASHBOARD-------- //
let upcomingBookings = document.querySelector('.upcoming-bookings');
let pastBookings = document.querySelector('.past-bookings');

// ----------------- GLOBAL VARIABLES ----------------- //
let currentDate;
let user;
let customerList;
let roomList;
let bookingList;


// ----------------- FUNCTIONS ----------------- //

const getApiData = () => {
  Promise.all([
    getFetch('customers'),
    getFetch('rooms'),
    getFetch('bookings')
  ]).then(data => {
    createDataInstances(data)
    displayUpcomingBookings()
  });
};

const createDataInstances = (data) => {
  console.log(data)
  customerList = new CustomerRepository(data[0].customers);
  roomList = new RoomRepository(data[1].rooms);
  bookingList = new BookingRepository(data[2].bookings);
  //UPDATE USER FUNCTIONALITY IN ITERATION 2
  user = customerList.customerList[25]
}

const getTodaysDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() +1).padStart(2, '0');
  let yyyy = today.getFullYear();
  currentDate = `${yyyy}/${mm}/${dd}`;
};

const displayUpcomingBookings = () => {
  let current = [];
  let past = [];

  getTodaysDate();
  let splitCurrentDate = currentDate.split("/");

  let userBookings = user.getBookings(bookingList);

  userBookings.forEach(booking => {
    let splitBookingDate = booking.data.date.split("/")
    if (splitBookingDate[0] < splitCurrentDate[0]) {
      past.push(booking)
    }
    else if ((splitBookingDate[1] < splitCurrentDate[1]) && (splitBookingDate[0] === splitCurrentDate[0])) {
      past.push(booking)
    }
    else if ((splitBookingDate[2] < splitCurrentDate[2]) && (splitBookingDate[0] === splitCurrentDate[0]) && (splitBookingDate[1] === splitCurrentDate[1])) {
      past.push(booking)
    }
    else current.push(booking)
  });

  current.forEach(booking => {
    upcomingBookings.innerHTML += `<button class="reservation">Date:${booking.data.date}</button>`
  });

  past.forEach(booking => {
    pastBookings.innerHTML += `<button class="reservation">Date:${booking.data.date}</button>`
  });

};




// ----------------- EVENT LISTENERS ----------------- //

window.addEventListener('load', getApiData);
