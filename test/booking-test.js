import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/classes/booking'
import RoomRepository from '../src/classes/roomRepository'
import { bookings, rooms } from './test-data'

describe('Booking', function() {

  let booking1, booking2, roomRepository;

  beforeEach(() => {
    booking1 = new Booking(bookings[0]);
    booking2 = new Booking(bookings[1]);
    roomRepository = new RoomRepository(rooms);
  });

  it('should be a function', function() {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of a Booking', function() {
    expect(booking1).to.be.an.instanceOf(Booking);
  });

  it('should be able to take bookings data', function() {
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

  it('should be able to get room info', function() {
    expect(booking1.getRoomInfo(roomRepository)).to.deep.equal({
      data: {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4
      }
    });
  });

  it('should be able to determine whether a room has a bidet', function() {
    expect(booking1.getBidetInfo(roomRepository)).to.equal("This room has a bidet!");
    expect(booking2.getBidetInfo(roomRepository)).to.equal();
  });
});
