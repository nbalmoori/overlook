import Customer from './customer';

class CustomerRepository {
  constructor(customerInfo) {
    this.rawData = customerInfo
    this.customerList = customerInfo.map(customer => new Customer(customer.name, customer.id))
  }
}

export default CustomerRepository;
