import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { startPostBillData } from "../action/billAction"
import ShowAddItems from "./ShowAddItems"
import Select from 'react-select'
import { Modal, Button } from "react-bootstrap"

const BillForm = (props) => {

    const customers = useSelector((state) => {
        return state.customers
    })

    const products = useSelector((state) => {
        return state.products
    })

    const custOptions = []
    customers.map((ele) => {
        custOptions.push({ value: ele._id, label: ele.name })
    })

    const prodOptions = []
    products.map((ele) => {
        prodOptions.push({ value: ele._id, label: ele.name })
    })

    const [date, setDate] = useState('')
    const [selectCustomer, setSelectCustomer] = useState('')
    const [customer, setCustomer] = useState([])
    const [selectProduct, setSelectProduct] = useState('')
    const [product, setProduct] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [itemsInCart, setItemsInCart] = useState([])
    const [formErrors, setFormErrors] = useState('')
    const errors = {}

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const input = e.target.value
        setDate(input)
    }

    const handleCustomerChange = (custOptions) => {
        // const input = e.target.value
        // console.log(e.target.value)
        setSelectCustomer(custOptions.value)
        setCustomer(custOptions)
    }

    const handleProductChange = (prodOptions) => {
        // const input = e.target.value
        // console.log(e.target.value)
        setSelectProduct(prodOptions.value)
        setProduct(prodOptions)
    }

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value)
    }

    const Validation = () => {
        if (quantity < 0) {
            errors.quantity = 'add quantity'
        }
        if (date.length === 0) {
            errors.date = 'pick the date'
        }
        if (selectProduct.trim().length === 0) {
            errors.selectProduct = 'product cannot be empty'
        }
        if (selectCustomer.trim().length === 0) {
            errors.selectCustomer = 'choose customer'
        }
    }

    const handleAdd = () => {
        Validation()
        if (Object.keys(errors).length == 0) {
            setFormErrors({})
            const data = {
                product: selectProduct,
                quantity: quantity
            }
            const items = [data, ...itemsInCart]
            setItemsInCart(items)
        }
        else {
            setFormErrors(errors)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        Validation()
        if (Object.keys(errors).length == 0) {
            setFormErrors({})
            const billData = {
                date: date,
                customer: selectCustomer,
                lineItems: itemsInCart
            }
            const resetForm = () => {
                setDate('')
                setSelectCustomer('')
                setSelectProduct('')
                setCustomer([])
                setProduct([])
                setQuantity(1)
                setItemsInCart([])
            }
            dispatch(startPostBillData(billData, resetForm))
        }
        else {
            setFormErrors(errors)
        }
    }

    return (
        <div>
            <button onClick={handleShow} className="mt-2 bg-secondary text-white">AddBill</button>
            <Modal show={show} style={{ textAlign: 'center' }}>
                <Modal.Header>
                    <Modal.Title>
                        Add Bill
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit}>
                                <input className='form-control' type='date' name='date' value={date} onChange={handleChange} />
                                {
                                    formErrors.date && <span className='text-danger'>{formErrors.date}</span>
                                }
                                <br />
                                <Select value={customer} onChange={handleCustomerChange} options={custOptions} />
                                {
                                    formErrors.selectCustomer && <span className='text-danger'>{formErrors.selectCustomer}</span>
                                }
                                <br />
                                <Select value={product} onChange={handleProductChange} options={prodOptions} />
                                {
                                    formErrors.selectProduct && <span className='text-danger'>{formErrors.selectProduct}</span>
                                }
                                <br />
                                <input className='form-control ' type='number' min='1'
                                    name='number' value={quantity} onChange={handleQuantityChange} />
                                {
                                    formErrors.quantity && <span className='text-danger'>{formErrors.quantity}</span>
                                }
                                <br />
                                <a className='btn btn-info mb-2 text-right' onClick={handleAdd}>AddItems</a>
                                <br />
                                <input type='submit' className='align-center' className='btn btn-primary' value='submit' />
                            </form>
                        </div>
                        <div className="col-md-4">
                            {itemsInCart.length > 0 &&
                                <ShowAddItems itemsInCart={itemsInCart} />
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}
export default BillForm