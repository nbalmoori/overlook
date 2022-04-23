import Room from './room';

class RoomRepository {
  constructor(roomsInfo) {
    this.rawData = roomsInfo
    this.roomList = roomsInfo.map(roomInfo => new Room(roomInfo))
  }
}

export default RoomRepository;
