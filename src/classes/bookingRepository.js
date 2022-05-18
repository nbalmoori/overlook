import Booking from './booking';

class BookingRepository {
  constructor(bookingsInfo) {
    this.bookingList = bookingsInfo.map(bookingInfo => new Booking(bookingInfo));
  };

  findBookingByUser(userID) {
    return this.bookingList.filter(booking => booking.userID === userID);
  };
};

export default BookingRepository;
