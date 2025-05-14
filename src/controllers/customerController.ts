import { Controller, Route, HttpMethod } from '../decorators'
import { Request, Response } from 'express'
import { CustomerService } from '../services/customerService'

@Controller('/customers')
export class CustomerController {
    @Route(HttpMethod.POST, '')
    createCustomer(req: Request, res: Response): void {
        try {
            let { body } = req
            if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
                throw 'Valid customer name is required'
            }
            const customer = CustomerService.createCustomer({
                name: body.name.trim()
            })
            res.status(201).json(customer)
        } catch (error) {
            res.status(500).json({ error })
        }
    }

    @Route(HttpMethod.GET, '')
    getAllCustomers(req: Request, res: Response): void {
        try {
            const customers = CustomerService.getAllCustomers()
            res.status(200).json(customers)
        } catch (error) {
            res.status(500).json({ error })
        }
    }

    @Route(HttpMethod.GET, '/:id')
    getCustomerById(req: Request, res: Response): void {
        try {
            const customer = CustomerService.getCustomerById(Number(req.params.id))
            if (!customer) {
                res.status(404).json({ error: 'Customer not found' })
                return
            }
            res.status(200).json(customer)
        } catch (error) {
            res.status(500).json({ error })
        }
    }

    @Route(HttpMethod.PUT, '/:id')
    updateCustomer(req: Request, res: Response): void {
        try {
            const updated = CustomerService.updateCustomer(Number(req.params.id), req.body)
            if (!updated) {
                res.status(404).json({ error: 'Customer not found' })
                return
            }
            res.status(200).json(updated)
        } catch (error) {
            res.status(500).json({ error })
        }
    }

    @Route(HttpMethod.DELETE, '/:id')
    deleteCustomer(req: Request, res: Response): void {
        try {
            const deleted = CustomerService.deleteCustomer(Number(req.params.id))
            if (!deleted) {
                res.status(404).json({ error: 'Customer not found' })
                return
            }
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ error })
        }
    }
}