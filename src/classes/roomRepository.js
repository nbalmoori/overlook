import Room from './room';

class RoomRepository {
  constructor(roomInfo) {
    this.rawData = roomInfo
    this.roomList = roomInfo.map(room => new Room(room))
  }
}

export default RoomRepository;
