import { ICustomer } from '../interfaces/customer'
import { customerRepo } from '../repositories/customerRepo'

export class CustomerService {
    static createCustomer(customer: Omit<ICustomer, 'id' | 'createdAt' | 'updatedAt'>): ICustomer {
        if (customerRepo.items.some(existingCustomer => existingCustomer.name === customer.name)) {
            throw new Error('Customer name already exists')
        }
        return customerRepo.create(customer)
    }

    static getAllCustomers(): ICustomer[] {
        return customerRepo.getAll()
    }

    static getCustomerById(id: number): ICustomer | null {
        return customerRepo.getById(id)
    }

    static updateCustomer(id: number, updateData: Partial<Omit<ICustomer, 'id' | 'createdAt' | 'updatedAt'>>): ICustomer | null {
        return customerRepo.update(id, updateData)
    }

    static deleteCustomer(id: number): boolean {
        return customerRepo.delete(id)
    }
}