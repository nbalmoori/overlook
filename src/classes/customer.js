import BookingRepository from './bookingRepository'

class Customer {
  constructor(name, id, bookingRepo) {
    this.name = name;
    this.id = id;
    this.loginCredentials = {
      username: `customer${id}`,
      password: "overlook2021"
    };
  };

  getUserBookings(bookingRepo) {
    return bookingRepo.findBookingByUser(this.id);
  };

  getTodaysDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() +1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return `${yyyy}/${mm}/${dd}`;
  };

  getCurrentBookings(bookingRepo) {
    let current = [];
    this.getUserBookings(bookingRepo).forEach(booking => {
      let bookingDate = booking.date;
      if (bookingDate >= this.getTodaysDate()) {
        current.push(booking);
      };
    });
    return current;
  };

  getPastBookings(bookingRepo) {
    let past = [];
    this.getUserBookings(bookingRepo).forEach(booking => {
      let bookingDate = booking.date;
      if (bookingDate < this.getTodaysDate()) {
        past.push(booking)
      };
    });
    return past;
  };

  getTotalSpent(bookingRepo, roomRepo) {
    return this.getUserBookings(bookingRepo).reduce((total, booking) => {
      let bookedRoom = roomRepo.roomList.find(room => room.number === booking.roomNumber)
      total += bookedRoom.costPerNight
      return total
    }, 0).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };
};

export default Customer;
