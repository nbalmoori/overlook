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
      expect(booking1.id).to.equal('5fwrgu4i7k55hl6sz');
      expect(booking1.userID).to.equal(4);
      expect(booking1.date).to.equal('2022/04/22');
      expect(booking1.roomNumber).to.equal(1);

      expect(booking2.id).to.equal('5fwrgu4i7k55hl6t5');
      expect(booking2.userID).to.equal(3);
      expect(booking2.date).to.equal('2022/01/24');
      expect(booking2.roomNumber).to.equal(2);
    });

  it('should be able to get room info', function() {
    expect(booking1.getRoomInfo(roomRepository)).to.deep.equal({
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4
    });
  });

  it('should be able to determine whether a room has a bidet', function() {
    expect(booking1.getBidetInfo(roomRepository)).to.equal("Extra Amenity: bidet");
    expect(booking2.getBidetInfo(roomRepository)).to.equal("");
  });
});
