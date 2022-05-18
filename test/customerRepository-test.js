import chai from 'chai';
const expect = chai.expect;
import { customers } from './test-data'
import CustomerRepository from '../src/classes/customerRepository'
import Customer from '../src/classes/customer'

describe('CustomerRepository', function() {

  let customerRepository;

  beforeEach(() => {
    customerRepository = new CustomerRepository(customers);
  });

  it('should be a function', function() {
    expect(CustomerRepository).to.be.a('function');
  });

  it('should be an instance of a CustomerRepository', function() {
    expect(customerRepository).to.be.an.instanceOf(CustomerRepository);
  });

  it('should hold instances of Customer class', () => {
    expect(customerRepository.customerList[0]).to.be.an.instanceOf(Customer);
  });
});
