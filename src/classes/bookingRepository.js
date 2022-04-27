import Booking from './booking';

class BookingRepository {
  constructor(bookingsInfo) {
    this.rawData = bookingsInfo;
    this.bookingList = bookingsInfo.map(bookingInfo => new Booking(bookingInfo));
  };

  findBookingByUser(userID) {
    return this.bookingList.filter(booking => booking.data.userID === userID);
  };
};

export default BookingRepository;
