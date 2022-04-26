let customers = [
  {
    id: 1,
    name: "Leatha Ullrich"
  },
  {
    id: 2,
    name: "Rocio Schuster"
  },
  {
    id: 3,
    name: "Kelvin Schiller"
  },
  {
    id: 4,
    name: "Kennedi Emard"
  }
];


let rooms = [
  {
    number: 1,
    roomType: "residential suite",
    bidet: true,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 358.4
  },
  {
    number: 2,
    roomType: "suite",
    bidet: false,
    bedSize: "full",
    numBeds: 2,
    costPerNight: 477.38
  },
  {
    number: 3,
    roomType: "single room",
    bidet: false,
    bedSize: "king",
    numBeds: 1,
    costPerNight: 491.14
  },
  {
    number: 4,
    roomType: "single room",
    bidet: false,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 429.44
  },
];

let bookings = [
  {
    id: "5fwrgu4i7k55hl6sz",
    userID: 4,
    date: "2022/04/22",
    roomNumber: 1
  },
  {
    id: "5fwrgu4i7k55hl6t5",
    userID: 3,
    date: "2022/01/24",
    roomNumber: 2
  },
  {
    id: "5fwrgu4i7k55hl6t6",
    userID: 1,
    date: "2022/01/10",
    roomNumber: 3
  },
  {
    id: "5fwrgu4i7k55hl6t7",
    userID: 1,
    date: "2022/05/16",
    roomNumber: 4
  }
];

export { customers, rooms, bookings }
