import Booking from './booking';

class BookingRepository {
  constructor(bookingsInfo) {
    this.rawData = bookingsInfo
    this.bookingList = bookingsInfo.map(bookingInfo => new Booking(bookingInfo))
  }
}

export default BookingRepository;
