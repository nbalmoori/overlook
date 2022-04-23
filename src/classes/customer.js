import BookingRepository from './bookingRepository'


class Customer {
  constructor(name, id, bookingRepository) {
    this.name = name;
    this.id = id;
    this.loginCredentials = {
      username: `customer${id}`,
      password: "overlook2021"
    };
  }

  getBookings(bookingRepository) {
    return bookingRepository.bookingList.filter(booking => booking.data.userID === this.id
    )
  }

  getTotalSpent(bookingRepository, roomRepository) {
    return this.getBookings(bookingRepository).reduce((total, booking) => {
      let bookedRoom = roomRepository.roomList.find(room => room.data.number === booking.data.roomNumber)
      total += bookedRoom.data.costPerNight
      return total
    }, 0).toFixed(2)
  }

};

export default Customer;
