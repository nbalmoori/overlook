
class RoomRepository {
  constructor(roomsInfo) {
    this.roomList = roomsInfo;
  };

  getRoomById(id) {
    return this.roomList.find(room => room.number === id);
  };
};

export default RoomRepository;
