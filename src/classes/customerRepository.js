import Customer from './customer';

class CustomerRepository {
  constructor(customersInfo, bookingRepo) {
    this.rawData = customersInfo;
    this.customerList = customersInfo.map(customerInfo => new Customer(customerInfo.name, customerInfo.id), bookingRepo);
  };
};

export default CustomerRepository;
