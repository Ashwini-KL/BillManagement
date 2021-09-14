import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const CustomerForm = (props) => {
    console.log('form', props)

    const { formSubmit } = props
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [show, setShow] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const errors = {}



    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    const handleChange = (e) => {
        const attr = e.target.name
        if (attr == 'name') {
            setName(e.target.value)
        }
        if (attr == 'phone') {
            setPhone(e.target.value)
        }
        if (attr == 'email') {
            setEmail(e.target.value)
        }
    }

    const validation = () => {
        if (name.trim().length == 0) {
            errors.name = 'name cannot be empty'
        }
        if (phone.trim().length == 0) {
            errors.phone = 'phone cannot be empty'
        }
        if (email.trim().length == 0) {
            errors.email = 'email cannot be empty'
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        validation()
        if (Object.keys(errors).length == 0) {
            setFormErrors({})
            const customerData = {
                name: name,
                mobile: phone,
                email: email
            }
            console.log('cus', customerData)

            const resetForm = () => {
                setName('')
                setPhone('')
                setEmail('')
            }
            formSubmit(customerData, resetForm)
        }
        else {
            setFormErrors(errors)
        }
    }
    return (
        <div>
            <button onClick={handleShow}>Add customer</button>
            <Modal show={show} style={{ textAlign: 'center' }}>
                <Modal.Header>
                    <Modal.Title>
                        CustomerForm
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <input type='text' className='form-control text-center' name='name' value={name} placeholder='name' onChange={handleChange} />
                        {
                            formErrors.name && <span  className='text-danger'>{formErrors.name}</span>
                        }
                        <br />
                        <input type='number' className='form-control text-center' name='phone' value={phone} placeholder='phoneNumber' onChange={handleChange} />
                        {
                            formErrors.phone && <span  className='text-danger'>{formErrors.phone}</span>
                        }
                        <br />
                        <input type='text' className='form-control text-center' name='email' value={email} placeholder='email' onChange={handleChange} />
                        {
                            formErrors.email && <span  className='text-danger'>{formErrors.email}</span>
                        }
                        <br />
                        <input type='submit' className='align-center' className='btn btn-primary' value='Add' />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>

                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div >
    )
}
export default CustomerForm