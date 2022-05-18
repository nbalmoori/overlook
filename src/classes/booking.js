class Booking {
  constructor(bookingsData) {
    this.id = bookingsData.id;
    this.userID = bookingsData.userID;
    this.date = bookingsData.date;
    this.roomNumber = bookingsData.roomNumber;
  };

  getRoomInfo(roomRepo) {
    return roomRepo.roomList.find(room => room.number === this.roomNumber)
  };

  getBidetInfo (roomRepo) {
    if (this.getRoomInfo(roomRepo).bidet) {
      return "Extra Amenity: bidet"
    } else {
      return "";
    };
  };
};

export default Booking;
