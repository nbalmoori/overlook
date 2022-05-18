import chai from 'chai';
const expect = chai.expect;
import { rooms } from './test-data'
import RoomRepository from '../src/classes/roomRepository'

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

  it('should be able to return a room by Id', () => {
    expect(roomRepository.getRoomById(2)).to.deep.equal({
      number: 2,
      roomType: 'suite',
      bidet: false,
      bedSize: 'full',
      numBeds: 2,
      costPerNight: 477.38
  });
  });
});
