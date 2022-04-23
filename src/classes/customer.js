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

  getBookings(bookingRepo) {
    return bookingRepo.bookingList.filter(booking => booking.data.userID === this.id
    )
  }

  getTotalSpent(bookingRepo, roomRepo) {
    return this.getBookings(bookingRepo).reduce((total, booking) => {
      let bookedRoom = roomRepo.roomList.find(room => room.data.number === booking.data.roomNumber)
      total += bookedRoom.data.costPerNight
      return total
    }, 0).toFixed(2)
  }

};

export default Customer;
