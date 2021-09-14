import { useSelector, useDispatch } from "react-redux"
import { startDeleteCustData, startUpdateCustData} from "../action/customersAction"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ListingCustomers = (props) => {

    const customers = useSelector((state) => {
        return state.customers
    })

    useEffect(() => {
        setListingCustomers(customers)
    }, [customers])

    const [listingCustomers, setListingCustomers] = useState(customers)
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [search, setSearch] = useState('')
    const [id, setId] = useState('')
    const [toggle, setToggle] = useState(false)

    const dispatch = useDispatch()

    const handleDelete = (_id) => {
        dispatch(startDeleteCustData(_id))
    }

    const handleEdit = (_id, name, mobile, email) => {
        //console.log(id,name)
        //const obj = { _id: _id, name: name, phone: phone, email: email }
        //setData(obj)
        handleToggle()
        setId(_id)
        setName(name);
        setMobile(mobile)
        setEmail(email)
        //handleToggle()
    }

    const handleSave = (id) => {
        const _id = id
        const editData = {
            name: name,
            mobile: mobile,
            email: email
        }
        console.log('d', editData)
        const resetForm = () => {
            setName('')
            setMobile('')
            setEmail('')

        }
        dispatch(startUpdateCustData(editData, resetForm, handleToggle, _id))
    }

    const handleChange = (e) => {
        // //console.log({...data,[e.target.name]:e.target.value})
        // console.log({[e.target.name]:e.target.value})
        // const value={...data,[e.target.name]:e.target.value}
        // setData(value)
        const attr = e.target.name
        if (attr == 'name') {
            setName(e.target.value)
        }
        if (attr == 'mobile') {
            setMobile(e.target.value)
        }
        if (attr == 'email') {
            setEmail(e.target.value)
        }
    }

    const handleToggle = () => {
        setToggle(!toggle)
    }

    const handleSearchChange = (e) => {
        const searchValue = e.target.value
        setSearch(searchValue)

        let searchCustomers = customers.filter((customer) => {
            if (customer.name.includes(searchValue) || customer.mobile.includes(searchValue)) {
                return customer
            }
        })
        console.log(searchCustomers)
        setListingCustomers(searchCustomers)
    }

    return (
        
            
            <div className="row">
                <div className="col-md-8">
                    <h1>Listingcustomers</h1>
                </div>
                <div className="col-md-4">
                    <input className='form-control' type='search' value={search} name='search' placeholder='search' onChange={handleSearchChange} />
                </div>
                {
                    customers.length > 0 ? (
                        <div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Mobile</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listingCustomers.map((customer) => {
                                        return <tr key={customer._id}>
                                            <td>{customer._id}</td>
                                            <td>
                                                {toggle && customer._id == id ? <input type='text' name='name' value={name} placeholder='name' onChange={handleChange} /> : <React.Fragment>{customer.name}</React.Fragment>}
                                            </td>
                                            <td>
                                                {toggle && customer._id == id ? <input type='number' name='mobile' value={mobile} placeholder='mobileNumber' onChange={handleChange} /> : <React.Fragment>{customer.mobile}</React.Fragment>}
                                            </td>
                                            <td>
                                                {toggle && customer._id == id ? <input type='text' name='email' value={email} placeholder='email' onChange={handleChange} /> : <React.Fragment>{customer.email}</React.Fragment>}
                                            </td>
                                            <td>
                                                {toggle && customer._id == id ?
                                                    <React.Fragment>
                                                        <button onClick={() => { handleSave(customer._id) }}>save</button>
                                                        <button onClick={handleToggle}>Cancel</button>
                                                    </React.Fragment> :
                                                    <React.Fragment>
                                                        <Link to='#'><img src='icons8-edit-64.png' width='30px' height='32px' onClick={() => { handleEdit(customer._id, customer.name, customer.mobile, customer.email) }} /></Link>
                                                        <Link to='#'><img src='delete-64.ico' width='30px' height='32px' onClick={() => { handleDelete(customer._id) }} /></Link>
                                                    </React.Fragment>
                                                }
                                            </td>
                                        </tr>

                                    })}
                                </tbody>
                            </table>

                        </div>) : (
                        <div>
                            <p>Add customers</p>
                        </div>
                    )
                }            
            </div >
            
        
    )
}

export default ListingCustomers