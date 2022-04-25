// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// ----------------- IMPORTS ------------------------------------------------- //

import { getFetch, addBooking, postErrorMessage } from './apiCalls.js';
import CustomerRepository from './classes/customerRepository';
import Customer from './classes/customer';
import RoomRepository from './classes/roomRepository';
import BookingRepository from './classes/bookingRepository';

// ----------------- QUERY SELECTORS ----------------------------------------- //

// --------DASHBOARD-------- //
let dashboard = document.querySelector('.dashboard');
let header = document.querySelector('header');
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
let searchTypeDropdown = document.querySelector('.type-dropdown-content');
let clearSearchButton = document.querySelector('.clear-search-button');
let availableRoomsSection = document.querySelector('.available-rooms-list');
let modal = document.querySelector('.modal');
let modalContent = document.querySelector('.modal-content');
let modalBookingDetails = document.querySelector('.modal-booking-details');
let closeModal = document.querySelector('.close');
let dashboardButton = document.querySelector('.dashboard-button');

// ----------------- GLOBAL VARIABLES ----------------- //
let user;
let customerList;
let roomList;
let bookingList;

// ----------------- FUNCTIONS ----------------- //

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
    getBookings();
    displayTotalSpent();
    displayUserName();
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

const createDataInstances = (data) => {

  roomList = new RoomRepository(data[1].rooms);
  bookingList = new BookingRepository(data[2].bookings);
  customerList = new CustomerRepository(data[0].customers, bookingList);
  //UPDATE USER FUNCTIONALITY IN ITERATION 3
  user = customerList.customerList[25];
}

const refreshDataInstances = (data) => {

  roomList = new RoomRepository(data[1].rooms);
  bookingList = new BookingRepository(data[2].bookings);
  customerList = new CustomerRepository(data[0].customers, bookingList);
  user = customerList.customerList.find(customer => user.id === customer.id);
}

const getBookings = () => {
  let current = user.getCurrentBookings(bookingList)
  let past = user.getPastBookings(bookingList)

  upcomingBookings.innerHTML = '';
  current.forEach(booking => {
    upcomingBookings.innerHTML += `
    <li class="reservation">
      <p>Date: ${booking.data.date} </p>
      <p>Type: ${booking.getRoomInfo(roomList).data.roomType}</p>
      <p>Bed: ${booking.getRoomInfo(roomList).data.numBeds} x ${booking.getRoomInfo(roomList).data.bedSize}</p>
      <p>Cost: $${booking.getRoomInfo(roomList).data.costPerNight}</p>
      <p>Bidet: ${booking.getRoomInfo(roomList).data.bidet}</p>
    </li>`;
  });

  pastBookings.innerHTML = '';
  past.forEach(booking => {
    pastBookings.innerHTML += `
    <li class="reservation">
      <p>Date: ${booking.data.date} </p>
      <p>Type: ${booking.getRoomInfo(roomList).data.roomType}</p>
      <p>Bed: ${booking.getRoomInfo(roomList).data.numBeds} x ${booking.getRoomInfo(roomList).data.bedSize}</p>
      <p>Cost: $${booking.getRoomInfo(roomList).data.costPerNight}</p>
      <p>Bidet: ${booking.getRoomInfo(roomList).data.bidet}</p>
    </li>`;
  });
};

const displayTotalSpent = () => {
  totalSpent.innerHTML = `Total Spent to Date: $${user.getTotalSpent(bookingList, roomList)}`;
};

const displayUserName = () => {
  header.innerText = `Welcome, ${user.name}`;
};

// ----------------- EVENT LISTENERS ----------------- //

window.addEventListener('load', getApiData);

bookButton.addEventListener('click', (e) => {
  hideElement(dashboard);
  showElement(bookingView);
  showElement(availableRoomsSection);
  showElement(searchOptions);
  availableRoomsSection.innerHTML = '';
  searchHeader.innerText = `Search to Book!`;
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
  availableRoomsSection.innerHTML = '';
  if (availableRooms.length > 0) {
    availableRooms.forEach(room => {
      availableRoomsSection.innerHTML += `
        <button class="available-room" id='${room.data.number}'>
          <p>Type: ${room.data.roomType}</p>
          <p>Bed: ${room.data.numBeds} ${room.data.bedSize}</p>
          <p>Cost: $${room.data.costPerNight}</p>
        </button>`;
    });
  } else {
    availableRoomsSection.innerHTML = `<h2>We are sorry - we're all booked for the options chosen! Please clear your search to visit us on a different date.</h2>`;
  }

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
    availableRoomsSection.innerHTML = '';
    availableRoomsByDate.forEach(room => {
      availableRoomsSection.innerHTML += `
        <button class="available-room" id='${room.data.number}'>
          <p>Type: ${room.data.roomType}</p>
          <p>Bed: ${room.data.numBeds} ${room.data.bedSize}</p>
          <p>Cost: $${room.data.costPerNight}</p>
        </button>`;
    });
  } else {
    availableRoomsSection.innerHTML = '';
    availableRoomsByFilter.forEach(room => {
      availableRoomsSection.innerHTML += `
        <button class="available-room" id='${room.data.number}'>
          <p>Type: ${room.data.roomType}</p>
          <p>Bed: ${room.data.numBeds} ${room.data.bedSize}</p>
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
})

availableRoomsSection.addEventListener('click', (e) => {
  let targetId = e.target.getAttribute('id');
  let selectedRoom = roomList.getRoomById(parseInt(targetId));
  modal.style.display = 'block';
  modalBookingDetails.innerHTML = `
    <h2>CONFIRM BOOKING</h2>
    <p>Date: ${searchByDateInput.value.split("-").join("/")}</p>
    <p>Type: ${selectedRoom.data.roomType}</p>
    <p>Bed: ${selectedRoom.data.numBeds} ${selectedRoom.data.bedSize}</p>
    <p>Cost: $${selectedRoom.data.costPerNight}</p>
    <button class="confirm-booking-button" id="${targetId}">Book this room!</button>`;
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

export {refreshBookings, header};
