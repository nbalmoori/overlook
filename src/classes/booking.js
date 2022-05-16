class Booking {
  constructor(bookingsData) {
    this.data = bookingsData;
  }

  getRoomInfo(roomRepo) {
    return roomRepo.roomList.find(room => room.data.number === this.data.roomNumber)
  }

  getBidetInfo (roomRepo) {
    if (this.getRoomInfo(roomRepo).data.bidet) {
      return "Extra Amenity: bidet"
    } else {
      return "";
    }
  }
};

export default Booking;
