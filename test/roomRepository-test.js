import chai from 'chai';
const expect = chai.expect;
import { rooms } from './test-data'
import RoomRepository from '../src/classes/roomRepository'
import Room from '../src/classes/room'

describe('RoomRepository', function() {

  let roomRepository;

  beforeEach(() => {
    roomRepository = new RoomRepository(rooms);
  });

  it('should be a function', function() {
    expect(RoomRepository).to.be.a('function');
  });

  it('should be an instance of a RoomRepository', function() {
    expect(roomRepository).to.be.an.instanceOf(RoomRepository);
  });

  it('should be able to take in a customer data set', () => {
    expect(roomRepository.rawData).to.equal(rooms);
  });

  it('should hold instances of Room class', () => {
    expect(roomRepository.roomList[0]).to.be.an.instanceOf(Room);
  });

  it('should be able to return a room by Id', () => {
    expect(roomRepository.getRoomById(2)).to.deep.equal({
      data: {
        number: 2,
        roomType: 'suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 477.38
      }
    });
  });
});
