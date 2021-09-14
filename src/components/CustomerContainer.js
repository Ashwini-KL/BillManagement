import CustomerForm from "./CustomerForm"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { startPostCustomerData } from "../action/customersAction"
import ListingCustomers from "./ListingCustomers"
const CustomerContainer = () => {

    const [addForm, setAddForm] = useState(false)

    const dispatch = useDispatch()

    const formSubmit = (formData, resetForm) => {
        dispatch(startPostCustomerData(formData, resetForm, handleAddForm))
    }

    const handleAddForm = () => {
        setAddForm(!addForm)
    }

    return (
        <div>
            <CustomerForm formSubmit={formSubmit} />
            <ListingCustomers />
        </div>
    )
}

export default CustomerContainer
