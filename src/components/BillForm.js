import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { startPostBillData } from "../action/billAction"
import ShowAddItems from "./ShowAddItems"
import Select from 'react-select'
import { Modal,Button } from "react-bootstrap"


const BillForm = (props) => {

    const customers = useSelector((state) => {
        return state.customers
    })

    const products = useSelector((state) => {
        return state.products
    })
    //console.log('c', customers)
    const custOptions = []
    customers.map((ele) => {
        custOptions.push({ value: ele._id, label: ele.name })
    })
    console.log("selected", custOptions)

    const prodOptions = []
    products.map((ele) => {
        prodOptions.push({ value: ele._id, label: ele.name })
    })

    const [date, setDate] = useState('')
    const [selectCustomer, setSelectCustomer] = useState('')
    const [customer,setCustomer] = useState([])
    const [selectProduct, setSelectProduct] = useState('')
    const [product,setProduct] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [itemsInCart, setItemsInCart] = useState([])
    const [formError, setFormError] = useState('')
    const errors = {}


    const [show, setShow] = useState(false)

   
    const handleShow = () => setShow(true)


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

    const incQuantity = () => {
        setQuantity(quantity + 1)
    }

    const decQuantity = () => {
        setQuantity(quantity - 1)
    }

    const Validation = () => {
        if(quantity < 0){
            errors.quantity = 'quantity cannot be a negative number'
        }
        if(date.length === 0){
            errors.date = 'pick the date'
        }
        if(selectProduct.trim().length === 0){
            errors.selectProduct = 'product cannot be empty'
        }
        if(selectCustomer.trim().length === 0){
            errors.selectCustomer = 'choose customer'
        }
    }

    const handleAdd = () => {
        console.log(selectProduct)

        // if (itemsInCart.length != 0) {
        //     const filterItems = itemsInCart.filter((ele) => {
        //         if (ele.product == selectProduct) {
        //             return ele
        //         }
        //     })
        // }

        //     if (filterItems.length > 0) {
        //         filterItems[0].quantity = filterItems[0].quantity + quantity
        //         // setItemsInCart(filterItems)
        //     } else {
        //         itemsInCart.push({
        //             product: selectProduct,
        //             quantity: quantity
        //         })
        //     }
        // } 

        const data = {
            product: selectProduct,
            quantity: quantity
        }

        const items = [data, ...itemsInCart]
        setItemsInCart(items)
        console.log('add', itemsInCart)

    }

   
    const resetForm = ()=>{
        setDate('')
        setSelectCustomer('')
        setSelectCustomer('')
        setItemsInCart([])
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        Validation()
        const billData = {
            date: date,
            customer: selectCustomer,
            lineItems: itemsInCart
        }
        console.log('addToCArt', itemsInCart)
        
        dispatch(startPostBillData(billData))
    }

    const handleClose = (e) =>{
        e.preventDefault()
        setShow(false)
        const billData = {
            date: date,
            customer: selectCustomer,
            lineItems: itemsInCart
        }
        console.log('addToCArt', itemsInCart)

        dispatch(startPostBillData(billData,resetForm))
    } 

    return (
        <div>
            <button onClick={handleShow}>AddBill</button>
            <Modal show={show} style={{ textAlign: 'center' }}>
                <Modal.Header>
                    <Modal.Title>
                        Add Bill
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <input className='form-control ' type='date' name='date' value={date} onChange={handleChange} />
                    <br />

                    {/* <select className="form-select "  value={selectCustomer} onChange={handleCustomerChange}>
                        <option>customers</option>
                        {
                            customers.map((customer) => {
                                return <option value={customer._id} name='customer' key={customer._id} name='customer'>{customer.name}</option>
                            })
                        }
                    </select> */}
                    <Select value={customer} onChange={handleCustomerChange} options={custOptions} />

                    <br />

                    <Select value={product} onChange={handleProductChange} options={prodOptions} />

                    {/* <select className='form-select' value={selectProduct} onChange={handleProductChange}>
                        <option value=''>Product</option>
                        {
                            products.map((product) => {
                                return <option value={product._id} name='product' key={product._id}>
                                    {product.name}
                                </option>
                            })
                        }
                    </select> */}
                    <br />
                    


                    <a className='rounded-circle btn btn-success' onClick={incQuantity}>+</a>{quantity}<a className='rounded-circle btn btn-danger' onClick={decQuantity}>-</a>
                    <a className='btn btn-info' onClick={handleAdd}>AddItems</a>
                    <br />
                    {/*<input type='submit' className='btn btn-primary mt-3' value='bill' />*/}
                </form>
                <ShowAddItems itemsInCart={itemsInCart} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    bill
                </Button>
            </Modal.Footer>
        </Modal>      
        </div >
    )

}
export default BillForm