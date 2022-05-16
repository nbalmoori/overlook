// ----------------- IMPORTS ------------------------------------------------- //

import './css/styles.css';
import dayjs from 'dayjs';
import { getFetch, addBooking } from './apiCalls.js';
import CustomerRepository from './classes/customerRepository';
import RoomRepository from './classes/roomRepository';
import BookingRepository from './classes/bookingRepository';

// ----------------- QUERY SELECTORS ----------------------------------------- //

// --------LOGIN--------------- //
let loginView = document.querySelector('.login');
let logInButton = document.querySelector('.login-button');
let usernameInput = document.querySelector('#username');
let passwordInput = document.querySelector('#password');
let loginError = document.querySelector('.login-error');

// --------DASHBOARD----------- //
let dashboard = document.querySelector('.dashboard');
let header = document.querySelector('.welcome-header');
let upcomingBookings = document.querySelector('.upcoming-bookings-list');
let pastBookings = document.querySelector('.past-bookings-list');
let totalSpent = document.querySelector('.total-spent');
let bookButton = document.querySelector('.book-button');

// --------BOOKING VIEW-------- //
let bookingView = document.querySelector('.booking-view');
let searchHeader = document.querySelector('.search-header');
let searchOptions = document.querySelector('.search-options');
let searchByDateForm = document.querySelector('.search-by-date-form');
let searchByDateInput = document.querySelector('#dateToBook');
let searchByTypeForm = document.querySelector('.search-by-type-form');
let searchFilterByTypeSelection = document.querySelector('.room-type-selection');
let clearSearchButton = document.querySelector('.clear-search-button');
let availableRoomsSection = document.querySelector('.available-rooms-list');
let modal = document.querySelector('.modal');
let modalBookingDetails = document.querySelector('.modal-booking-details');
let closeModal = document.querySelector('.close');
let dashboardButton = document.querySelector('.dashboard-button');

// ----------------- GLOBAL VARIABLES ---------------------------------------- //

let user;
let customerList;
let roomList;
let bookingList;

// ----------------- FUNCTIONS ----------------------------------------------- //

const showElement = (element) => {
  element.classList.remove('hidden');
};

const hideElement = (element) => {
  element.classList.add('hidden');
};

const getApiData = () => {
  Promise.all([
    getFetch('customers'),
    getFetch('rooms'),
    getFetch('bookings')
  ]).then(data => {
    createDataInstances(data);
  });
};

const refreshBookings = () => {
  Promise.all([
    getFetch('customers'),
    getFetch('rooms'),
    getFetch('bookings')
  ]).then(data => {
    refreshDataInstances(data);
    getBookings();
    displayTotalSpent();
  })
}

const verifyUser = () => {
  if (
    usernameInput.value.startsWith('customer') &&
    0 < usernameInput.value.slice(8) < 50 &&
    passwordInput.value === 'overlook2021'
  ) {
    user = customerList.customerList.find(user => user.id === parseInt(usernameInput.value.slice(8)))
    getBookings();
    displayTotalSpent();
    displayUserName();
    hideElement(loginView);
    showElement(dashboard);
  } else {
    loginError.innerText = 'Incorrect username or password. Please try again!';
  }
}

const createDataInstances = (data) => {
  roomList = new RoomRepository(data[1].rooms);
  bookingList = new BookingRepository(data[2].bookings);
  customerList = new CustomerRepository(data[0].customers, bookingList);
}

const refreshDataInstances = (data) => {
  roomList = new RoomRepository(data[1].rooms);
  bookingList = new BookingRepository(data[2].bookings);
  customerList = new CustomerRepository(data[0].customers, bookingList);
  user = customerList.customerList.find(customer => user.id === customer.id);
  
}

const getBookings = () => {
  let current = user.getCurrentBookings(bookingList);
  let past = user.getPastBookings(bookingList);

  upcomingBookings.innerHTML = '';
  current.forEach(booking => {
    upcomingBookings.innerHTML += `
    <li class="upcoming-reservation">
      <h3 class="reservation-title">Room ${booking.getRoomInfo(roomList).data.number} on ${dayjs(booking.data.date).format('MM/DD/YYYY')}</h3>
      <ul>
        <li>Room Type: ${booking.getRoomInfo(roomList).data.roomType}</li>
        <li>Bed: ${booking.getRoomInfo(roomList).data.numBeds} x ${booking.getRoomInfo(roomList).data.bedSize}</li>
        <li>Cost: $${booking.getRoomInfo(roomList).data.costPerNight}</li>
        <li>${booking.getBidetInfo(roomList)}</li>
      </ul>
    </li>`;
  });

  pastBookings.innerHTML = '';
  past.forEach(booking => {
    pastBookings.innerHTML += `
    <li class="past-reservation">
      <h3 class="reservation-title">Room ${booking.getRoomInfo(roomList).data.number} on ${dayjs(booking.data.date).format('MM/DD/YYYY')}</h3>
       <ul>
        <li>Room Type: ${booking.getRoomInfo(roomList).data.roomType}</li>
        <li>Bed: ${booking.getRoomInfo(roomList).data.numBeds} x ${booking.getRoomInfo(roomList).data.bedSize}</li>
        <li>Cost: $${booking.getRoomInfo(roomList).data.costPerNight}</li>
        <li>${booking.getBidetInfo(roomList)}</li>
      </ul>
    </li>`;
  });
};

const displayTotalSpent = () => {
  totalSpent.innerHTML = `<p>Total Spent to Date: $${user.getTotalSpent(bookingList, roomList)}</p>`;
};

const displayUserName = () => {
  header.innerText = `Welcome, ${user.name}`;
};

// ----------------- EVENT LISTENERS ----------------------------------------- //

window.addEventListener('load', getApiData);

logInButton.addEventListener('click', (e) => {
  if (username.value && password.value) {
    e.preventDefault();
    verifyUser();
  };
});

bookButton.addEventListener('click', (e) => {
  hideElement(dashboard);
  showElement(bookingView);
  showElement(availableRoomsSection);
  showElement(searchOptions);
  availableRoomsSection.innerHTML = '';
  searchHeader.innerText = `Search to Book!`;
  searchByDateInput.setAttribute("min", `${user.getTodaysDate().split("/").join("-")}`);
});

dashboardButton.addEventListener('click', (e) => {
  showElement(dashboard);
  hideElement(bookingView);
  hideElement(searchByTypeForm);
  hideElement(clearSearchButton);
  searchByDateInput.value = '';
});

searchByDateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  let searchDate = formData.get('dateToBook').split("-").join("/");
  let bookedRoomsByDate = bookingList.bookingList.filter(booking => booking.data.date === searchDate).map(booking => booking.data.roomNumber);
  let availableRooms = roomList.roomList.filter(room => (!bookedRoomsByDate.includes(room.data.number)));
  availableRoomsSection.innerHTML = ' <h2 class="available-rooms-header">Available Rooms:</h2>';
  if (availableRooms.length > 0) {
    availableRooms.forEach(room => {
      availableRoomsSection.innerHTML += `
        <button class="available-room" id='${room.data.number}'>
          <h3>Room ${room.data.number}</h3>
          <p>available ${room.data.roomType}</p>
          <p>Bed: ${room.data.numBeds} x ${room.data.bedSize}</p>
          <p>Cost: $${room.data.costPerNight}</p>
        </button>`;
    });
  } else {
    availableRoomsSection.innerHTML = `<h2>We are sorry - we're all booked for the options chosen! Please clear your search to visit us on a different date.</h2>`;
  };

  showElement(searchByTypeForm);
  showElement(clearSearchButton);

  let roomTypes = [];
  availableRooms.forEach(room => {
    if (!roomTypes.includes(room.data.roomType)) {
      roomTypes.push(room.data.roomType);
    };
  });
  searchFilterByTypeSelection.innerHTML = '<option value="any">any</option>';
  roomTypes.forEach(room => searchFilterByTypeSelection.innerHTML += `<option value="${room}">${room}</option>`);
});

searchFilterByTypeSelection.addEventListener('change', (e) => {
  let bookedRoomsByDate = bookingList.bookingList.filter(booking => booking.data.date === searchByDateInput.value.split("-").join("/")).map(booking => booking.data.roomNumber);
  let availableRoomsByDate = roomList.roomList.filter(room => (!bookedRoomsByDate.includes(room.data.number)));
  let availableRoomsByFilter = availableRoomsByDate.filter(room => room.data.roomType === searchFilterByTypeSelection.value);

  if (searchFilterByTypeSelection.value === "any") {
    availableRoomsSection.innerHTML = ' <h2 class="available-rooms-header">Available Rooms:</h2>';
    availableRoomsByDate.forEach(room => {
      
      availableRoomsSection.innerHTML += `
        <button class="available-room" id='${room.data.number}'>
          <h3>Room ${room.data.number}</h3>
          <p>available ${room.data.roomType}</p>
          <p>Bed: ${room.data.numBeds} x ${room.data.bedSize}</p>
          <p>Cost: $${room.data.costPerNight}</p>
       </button>`;
    });
  } else {
    availableRoomsSection.innerHTML = ' <h2 class="available-rooms-header">Available Rooms:</h2>';
    availableRoomsByFilter.forEach(room => {
      availableRoomsSection.innerHTML += `
       <button class="available-room" id='${room.data.number}'>
        <h3>Room ${room.data.number}</h3>
        <p>available ${room.data.roomType}</p>
        <p>Bed: ${room.data.numBeds} x ${room.data.bedSize}</p>
        <p>Cost: $${room.data.costPerNight}</p>
       </button>`;
    });
  };
});

clearSearchButton.addEventListener('click', (e) => {
  hideElement(searchByTypeForm);
  hideElement(clearSearchButton);
  availableRoomsSection.innerHTML = '';
  searchByDateInput.value = '';
});

availableRoomsSection.addEventListener('click', (e) => {
  if (event.target.className === 'available-room') {
    let targetId = e.target.getAttribute('id');
    console.log(targetId)
    let selectedRoom = roomList.getRoomById(parseInt(targetId));
    modal.style.display = 'block';
    modalBookingDetails.innerHTML = `
      <h3>ROOM ${selectedRoom.data.number}</h3>
      <p>Date: ${dayjs(searchByDateInput.value).format('MM/DD/YYYY')}</p>
      <p>Type: ${selectedRoom.data.roomType}</p>
      <p>Bed: ${selectedRoom.data.numBeds} ${selectedRoom.data.bedSize}</p>
      <p>Cost: $${selectedRoom.data.costPerNight}</p>
      <p>Bidet: ${selectedRoom.data.bidet}</p>
      <button class="confirm-booking-button" id="${targetId}">Book this room!</button>`;
  };
});

closeModal.addEventListener('click', (e) => {
  modal.style.display = 'none';
});

modalBookingDetails.addEventListener('click', (e) => {
  if (event.target.className === "confirm-booking-button") {
    let targetId = e.target.getAttribute('id');
    const newBooking = {
      userID: user.id,
      date: searchByDateInput.value.split("-").join("/"),
      roomNumber: parseInt(targetId)
    };
    addBooking(newBooking);
    modal.style.display = 'none';
    hideElement(availableRoomsSection);
    hideElement(searchOptions);
    searchHeader.innerText = `Thanks for booking with Overlook!`;
  };
});

export {refreshBookings, header, loginError, searchHeader};
