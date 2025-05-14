import { CustomerController } from '../src/controllers/customerController'
import { CustomerService } from '../src/services'
import { Request, Response } from 'express'

// Mock services
jest.mock('../src/services/customerService')

describe('CustomerController', () => {
    let controller: CustomerController
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let responseSend: jest.Mock
    let responseJson: jest.Mock
    let responseStatus: jest.Mock

    beforeEach(() => {
        // Reset all mocks
        jest.clearAllMocks()

        // Setup response mock
        responseSend = jest.fn()
        responseJson = jest.fn()
        responseStatus = jest.fn().mockReturnValue({ json: responseJson, send: responseSend })
        mockResponse = {
            status: responseStatus,
            send: responseSend,
            json: responseJson
        }

        controller = new CustomerController()
    })

    describe('Customer Operations', () => {
        it('return 201 when customer is created successfully', () => {
            const expectedCustomer = {
                id: 1,
                name: 'John Doe',
                createdAt: new Date(),
                updatedAt: new Date()
            }
            jest.spyOn(CustomerService, 'createCustomer').mockReturnValue(expectedCustomer)

            mockRequest = {
                body: { name: 'John Doe' }
            }

            controller.createCustomer(mockRequest as Request, mockResponse as Response)

            expect(responseStatus).toHaveBeenCalledWith(201)
            expect(responseJson).toHaveBeenCalledWith(expectedCustomer)
        })

        it('return 500 when customer name is missing', () => {
            mockRequest = {
                body: { name: '' }
            }

            controller.createCustomer(mockRequest as Request, mockResponse as Response)

            expect(responseStatus).toHaveBeenCalledWith(500)
            expect(responseJson).toHaveBeenCalledWith(expect.objectContaining({ error: 'Valid customer name is required' }))
        })

        it('return 500 when service throws error', () => {
            jest.spyOn(CustomerService, 'createCustomer').mockImplementation(() => {
                throw new Error('Service error')
            })
            mockRequest = {
                body: { name: 'John Doe' }
            }

            controller.createCustomer(mockRequest as Request, mockResponse as Response)

            expect(responseStatus).toHaveBeenCalledWith(500)
            expect(responseJson).toHaveBeenCalledWith(expect.objectContaining({ error: new Error('Service error') }))
        })

        it('return 200 when getting existing customer', () => {
            const expectedCustomer = {
                id: 1,
                name: 'John Doe',
                createdAt: new Date(),
                updatedAt: new Date()
            }
            jest.spyOn(CustomerService, 'getCustomerById').mockReturnValue(expectedCustomer)

            mockRequest = {
                params: { id: '1' }
            }

            controller.getCustomerById(mockRequest as Request, mockResponse as Response)

            expect(responseStatus).toHaveBeenCalledWith(200)
            expect(responseJson).toHaveBeenCalledWith(expectedCustomer)
        })

        it('return 500 when customer is not found', () => {
            jest.spyOn(CustomerService, 'getCustomerById').mockReturnValue(null)

            mockRequest = {
                params: { id: '999' }
            }

            controller.getCustomerById(mockRequest as Request, mockResponse as Response)

            expect(responseStatus).toHaveBeenCalledWith(500)
            expect(responseJson).toHaveBeenCalledWith(expect.objectContaining({ error: 'Customer not found' }))
        })
    })
})
