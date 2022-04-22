import chai from 'chai';
const expect = chai.expect;
import { customers, rooms, bookings } from './test-data'
import Customer from '../src/classes/customer'
import BookingRepository from '../src/classes/bookingRepository';
import Booking from '../src/classes/booking';
import RoomRepository from '../src/classes/roomRepository';
import Room from '../src/classes/room';




describe('Customer', function() {

  let customer1, customer2, bookingRepository1, roomRepository1;

  beforeEach(() => {
    bookingRepository1 = new BookingRepository(bookings);
    roomRepository1 = new RoomRepository(rooms);
    customer1 = new Customer("Leatha Ullrich", 1, bookingRepository1);
    customer2 = new Customer("Rocio Schuster", 2, bookingRepository1);
  });

  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of a Customer', function() {
    expect(customer1).to.be.an.instanceOf(Customer);
  });

  it('should be able to take in a name and id', () => {
    expect(customer1.name).to.equal("Leatha Ullrich");
    expect(customer1.id).to.equal(1);
    expect(customer2.name).to.equal("Rocio Schuster");
    expect(customer2.id).to.equal(2);
  });

  it('should hold login credentials for the user', () => {
    expect(customer1.loginCredentials).to.deep.equal({ username: 'customer1', password: 'overlook2021' });
    expect(customer2.loginCredentials).to.deep.equal({ username: 'customer2', password: 'overlook2021' });
  });

  it('should be able to retrieve the bookings of a customer', () => {
    expect(customer1.getBookings(bookingRepository1)).to.deep.equal([
      {
        data: {
          id: '5fwrgu4i7k55hl6t6',
          userID: 1,
          date: '2022/01/10',
          roomNumber: 3
        }
      },
      {
        data: {
          id: '5fwrgu4i7k55hl6t7',
          userID: 1,
          date: '2022/02/16',
          roomNumber: 4
        }
      }
    ]);
    expect(customer2.getBookings(bookingRepository1)).to.deep.equal([]);
  });

  it('should be able to return the total cost of bookings for a customer', () => {
    expect(customer1.getTotalSpent(bookingRepository1, roomRepository1)).to.deep.equal('920.58');
    expect(customer2.getTotalSpent(bookingRepository1, roomRepository1)).to.deep.equal('0.00');
  });

});
