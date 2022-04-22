import Booking from './booking';

class BookingRepository {
  constructor(bookingInfo) {
    this.rawData = bookingInfo
    this.bookingList = bookingInfo.map(booking => new Booking(booking))
  }
}

export default BookingRepository;
