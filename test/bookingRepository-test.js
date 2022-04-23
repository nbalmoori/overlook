import chai from 'chai';
const expect = chai.expect;
import { bookings } from './test-data'
import BookingRepository from '../src/classes/bookingRepository'
import Booking from '../src/classes/booking'

describe('BookingRepository', function() {

  let bookingRepository;

  beforeEach(() => {
    bookingRepository = new BookingRepository(bookings);
  });

  it('should be a function', function() {
    expect(BookingRepository).to.be.a('function');
  });

  it('should be an instance of a BookingRepository', function() {
    expect(bookingRepository).to.be.an.instanceOf(BookingRepository);
  });

  it('should be able to take in a booking data set', () => {
    expect(bookingRepository.rawData).to.equal(bookings);
  });

  it('should hold instances of Booking class', () => {
    expect(bookingRepository.bookingList[0]).to.be.an.instanceOf(Booking);
    expect(bookingRepository.bookingList[0]).to.deep.equal( {
      data: {
        id: '5fwrgu4i7k55hl6sz',
        userID: 4,
        date: '2022/04/22',
        roomNumber: 1
      }
    });
  });
});
