import Room from './room';

class RoomRepository {
  constructor(roomsInfo) {
    this.rawData = roomsInfo;
    this.roomList = roomsInfo.map(roomInfo => new Room(roomInfo));
  };

  getRoomById(id) {
    return this.roomList.find(room => room.data.number === id);
  };
};

export default RoomRepository;
