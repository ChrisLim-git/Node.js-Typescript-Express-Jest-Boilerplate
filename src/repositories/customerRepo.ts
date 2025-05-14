import { ICustomer } from '../interfaces/customer'
import { BaseRepo } from './baseRepo'

class CustomerRepo extends BaseRepo<ICustomer> { }

export const customerRepo = new CustomerRepo()
