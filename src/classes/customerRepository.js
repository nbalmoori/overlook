import Customer from './customer';

class CustomerRepository {
  constructor(customersInfo) {
    this.rawData = customersInfo
    this.customerList = customersInfo.map(customerInfo => new Customer(customerInfo.name, customerInfo.id))
  }
}

export default CustomerRepository;
