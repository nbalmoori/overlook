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
let dashboard = document.querySelector('.dashboard');
let header = document.querySelector('header');
let upcomingBookings = document.querySelector('.upcoming-bookings-list');
let pastBookings = document.querySelector('.past-bookings-list');
let totalSpent = document.querySelector('.total-spent');
let bookButton = document.querySelector('.book-button');

// --------BOOKING VIEW-------- //
let bookingView = document.querySelector('.booking-view');
let searchByDateForm = document.querySelector('.search-by-date-form');
let searchByTypeForm = document.querySelector('.search-by-type-form');
let searchFilterByTypeSelection = document.querySelector('.room-type-selection');
let searchTypeDropdown = document.querySelector('.type-dropdown-content');
let availableRoomsSection = document.querySelector('.available-rooms-list')
let modal = document.querySelector('.modal')
let modalContent = document.querySelector('.modal-content')
let closeModal = document.querySelector('.close')




let dashboardButton = document.querySelector('.dashboard-button');


// ----------------- GLOBAL VARIABLES ----------------- //
let currentDate;
let user;
let customerList;
let roomList;
let bookingList;
let searchDate;
let searchFilter;


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
    createDataInstances(data)
    displayUpcomingBookings()
    displayTotalSpent()
    displayUserName()
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
    upcomingBookings.innerHTML += `
    <li class="reservation">
      <p>Date: ${booking.data.date} </p>
      <p>Type: ${booking.getRoomInfo(roomList).data.roomType}</p>
      <p>Bed: ${booking.getRoomInfo(roomList).data.numBeds} ${booking.getRoomInfo(roomList).data.bedSize}</p>
      <p>Cost: $${booking.getRoomInfo(roomList).data.costPerNight}</p>
    </li>`
  });

  past.forEach(booking => {
    pastBookings.innerHTML += `
    <li class="reservation">
      <p>Date: ${booking.data.date} </p>
      <p>Type: ${booking.getRoomInfo(roomList).data.roomType}</p>
      <p>Bed: ${booking.getRoomInfo(roomList).data.numBeds} ${booking.getRoomInfo(roomList).data.bedSize}</p>
      <p>Cost: $${booking.getRoomInfo(roomList).data.costPerNight}</p>
    </li>`
  });

};

const displayTotalSpent = () => {
  totalSpent.innerHTML = `Total Spent to Date: $${user.getTotalSpent(bookingList, roomList)}`
}

const displayUserName = () => {
  header.innerText = `Welcome, ${user.name}`
}





// ----------------- EVENT LISTENERS ----------------- //

window.addEventListener('load', getApiData);

bookButton.addEventListener('click', (e) => {
  hideElement(dashboard)
  showElement(bookingView)
  availableRoomsSection.innerHTML = ''
})

dashboardButton.addEventListener('click', (e) => {
  showElement(dashboard)
  hideElement(bookingView)
})

searchByDateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  searchDate = formData.get('dateToBook').split("-").join("/")
  console.log(searchDate)
  let bookedRoomsByDate = bookingList.bookingList.filter(booking => booking.data.date === searchDate).map(booking => booking.data.roomNumber)
  let availableRooms = roomList.roomList.filter(room => (!bookedRoomsByDate.includes(room.data.number)))
  availableRoomsSection.innerHTML = '';
  availableRooms.forEach(room => {
    availableRoomsSection.innerHTML += `
      <button class="available-room" id='${room.data.number}'>
        <p>Type: ${room.data.roomType}</p>
        <p>Bed: ${room.data.numBeds} ${room.data.bedSize}</p>
        <p>Cost: $${room.data.costPerNight}</p>
      </button>`
  })

  showElement(searchByTypeForm)

  let roomTypes = [];
  availableRooms.forEach(room => {
    if (!roomTypes.includes(room.data.roomType)) {
      roomTypes.push(room.data.roomType)
    }
  })
  searchFilterByTypeSelection.innerHTML = '<option value="any">any</option>'
  roomTypes.forEach(room => {
  searchFilterByTypeSelection.innerHTML += `
    <option value="${room}">${room}</option>`
  })
})

searchFilterByTypeSelection.addEventListener('change', (e) => {
  console.log(searchFilterByTypeSelection.value)
  console.log(searchDate)

  let bookedRoomsByDate = bookingList.bookingList.filter(booking => booking.data.date === searchDate).map(booking => booking.data.roomNumber)
  let availableRoomsByDate = roomList.roomList.filter(room => (!bookedRoomsByDate.includes(room.data.number)))
  let availableRoomsByFilter = availableRoomsByDate.filter(room => room.data.roomType === searchFilterByTypeSelection.value)

  availableRoomsSection.innerHTML = ''
  availableRoomsByFilter.forEach(room => {
    availableRoomsSection.innerHTML += `
      <button class="available-room" id='${room.data.number}'>
        <p>Type: ${room.data.roomType}</p>
        <p>Bed: ${room.data.numBeds} ${room.data.bedSize}</p>
        <p>Cost: $${room.data.costPerNight}</p>
      </button>`
  })
})

availableRoomsSection.addEventListener('click', (e) => {
  let targetId = e.target.getAttribute('id');
  modal.style.display = 'block';
  modalContent.innerHTML += targetId
})

closeModal.addEventListener('click', (e) => {
  console.log("close")
  modal.style.display = 'none';
})
