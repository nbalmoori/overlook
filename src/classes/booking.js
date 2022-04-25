class Booking {
  constructor(bookingsData) {
    this.data = bookingsData;
  }

  //ADD TEST FOR THIS

  getRoomInfo(roomRepo) {
    return roomRepo.roomList.find(room => room.data.number === this.data.roomNumber)
  }

};

export default Booking;
