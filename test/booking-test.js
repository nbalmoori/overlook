import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/classes/booking'
import { bookings } from './test-data'

describe('Room', function() {

  let booking1, booking2;

  beforeEach(() => {
    booking1 = new Booking(bookings[0]);
    booking2 = new Booking(bookings[1]);
  });

  it('should be a function', function() {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of a Booking', function() {
    expect(booking1).to.be.an.instanceOf(Booking);
  });

  it('should be able to take bookings data', () => {
    expect(booking1.data).to.deep.equal({
      id: '5fwrgu4i7k55hl6sz',
      userID: 4,
      date: '2022/04/22',
      roomNumber: 1
    });
    expect(booking2.data).to.deep.equal({
      id: '5fwrgu4i7k55hl6t5',
      userID: 3,
      date: '2022/01/24',
      roomNumber: 2
    });
  });
});
