import chai from 'chai';
const expect = chai.expect;
import Room from '../src/classes/room'
import { rooms } from './test-data'

describe('Room', function() {

  let room1, room2;

  beforeEach(() => {
    room1 = new Room(rooms[0]);
    room2 = new Room(rooms[1]);
  });

  it('should be a function', function() {
    expect(Room).to.be.a('function');
  });

  it('should be an instance of a Room', function() {
    expect(room1).to.be.an.instanceOf(Room);
  });

  it('should be able to take room data', () => {
    expect(room1.data).to.deep.equal({
      number: 1,
      roomType: 'residential suite',
      bidet: true,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 358.4
    });
    expect(room2.data).to.deep.equal({
      number: 2,
      roomType: 'suite',
      bidet: false,
      bedSize: 'full',
      numBeds: 2,
      costPerNight: 477.38
    });
  });
});
