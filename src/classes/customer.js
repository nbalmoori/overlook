import BookingRepository from './bookingRepository'


class Customer {
  constructor(name, id, bookingRepo) {
    this.name = name;
    this.id = id;
    this.loginCredentials = {
      username: `customer${id}`,
      password: "overlook2021"
    };
  }


  getUserBookings(bookingRepo) {
    return bookingRepo.findBookingByUser(this.id)
  }

  getTodaysDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() +1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return `${yyyy}/${mm}/${dd}`;
  };

  getCurrentBookings(bookingRepo) {
    let current = []
    this.getUserBookings(bookingRepo).forEach(booking => {
      let bookingDate = booking.data.date;
      if (bookingDate >= this.getTodaysDate()) {
        current.push(booking)
      }
    })
    return current
  }

  getPastBookings(bookingRepo) {
    let past = []
    this.getUserBookings(bookingRepo).forEach(booking => {
      let bookingDate = booking.data.date;
      if (bookingDate < this.getTodaysDate()) {
        past.push(booking)
      }
    })
    return past
  }

  getTotalSpent(bookingRepo, roomRepo) {
    return this.getUserBookings(bookingRepo).reduce((total, booking) => {
      let bookedRoom = roomRepo.roomList.find(room => room.data.number === booking.data.roomNumber)
      total += bookedRoom.data.costPerNight
      return total
    }, 0).toFixed(2)
  }
};

export default Customer;
