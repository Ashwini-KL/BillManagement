import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startGetSingleBill, startDeleteBillData } from "../action/billAction"
import { Modal, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import ProductDetails from "./ProductDetails"
import html2pdf from 'html2pdf.js'
import { format } from 'date-fns'

const BillData = (props) => {

    const customers = useSelector((state) => {
        return state.customers
    })

    const bills = useSelector((state) => {
        return state.bill
    })

    useEffect(() => {
        setListingBills(bills)
    }, [bills])

    const [listingBills, setListingBills] = useState(bills)
    const [show, setShow] = useState(false)
    const [singleBillData, setSingleBillData] = useState({})
    const [search, setSearch] = useState('')

    const handleClose = () => setShow(false)

    const getSingleBillData = (singleBill) => {
        const result = singleBill
        console.log('single', result)
        setSingleBillData(result)
    }

    const handleShow = (_id) => {
        setShow(true)
        dispatch(startGetSingleBill(_id, getSingleBillData))
    }

    const dispatch = useDispatch()

    const handleDelete = (_id) => {
        dispatch(startDeleteBillData(_id))
    }

    const getCustomerName = (_id) => {
        let customer = customers.filter((c) => {
            return c._id == _id
        })
        return customer.length > 0 ? customer[0].name : null
    }

    const handleSearchChange = (e) => {
        const searchValue = e.target.value
        setSearch(searchValue)

        let searchBill = bills.filter((bill) => {
            if (format(new Date(bill.date), 'dd/MM/yyy').includes(searchValue) || getCustomerName(bill.customer).includes(searchValue)) {
                return bill
            }
        })
        console.log('se', searchBill)
        setListingBills(searchBill)
    }

    const generatePDF = () => {
        const content = document.getElementById('pdf')
        html2pdf(content)
    }

    return (
        <div className="row">
            <div className="col-md-8">
                <h1>ListBillData</h1>
            </div>
            <div className="col-md-4">
                <input className='form-control' type='search' value={search} name='search' placeholder='search' onChange={handleSearchChange} />
            </div>
            {
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>View</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listingBills.map((b) => {
                                return <tr key={b._id}>
                                    <td>{b._id}</td>
                                    <td>{format(new Date(b.date), 'dd/MM/yyy')}</td>
                                    <td>{getCustomerName(b.customer)}</td>
                                    <td>
                                        <button className='btn btn-primary' onClick={() => { handleShow(b._id) }}>view</button>
                                    </td>
                                    <td><Link to='#'><img src='delete-64.ico' width='30px' height='32px' onClick={() => { handleDelete(b._id) }} /></Link></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    {Object.keys(singleBillData).length > 0 && <Modal show={show}>
                        <Modal.Header>
                            <Modal.Title>
                                Bill
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ProductDetails bills={singleBillData} getCustomerName={getCustomerName} handleClose={handleClose} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => { generatePDF() }}>
                                Generate Bill
                            </Button>
                        </Modal.Footer>
                    </Modal>}
                </div>
            }
        </div >
    )
}

export default BillData