class Booking {
  constructor(bookingsData) {
    this.data = bookingsData;
  }

  getRoomInfo(roomRepo) {
    return roomRepo.roomList.find(room => room.data.number === this.data.roomNumber)
  }

};

export default Booking;
