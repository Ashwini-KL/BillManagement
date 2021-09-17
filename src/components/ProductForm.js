import { useState } from "react"
import { Link } from "react-router-dom"
import { Modal, Button } from 'react-bootstrap'

const ProductForm = (props) => {
    const { formSubmit } = props

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
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
        if (attr == 'price') {
            setPrice(e.target.value)
        }
    }

    const validation = () => {
        if (name.trim().length == 0) {
            errors.name = 'name cannot be empty'
        }
        if (price.trim().length == 0) {
            errors.price = 'price cannot be empty'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        validation()
        if (Object.keys(errors).length == 0) {
            setFormErrors({})
            const productData = {
                name: name,
                price: price
            }
            console.log(productData)
            const resetForm = () => {
                setName('')
                setPrice('')
            }
            formSubmit(productData, resetForm)
        }
        else {
            setFormErrors(errors)
        }
    }

    return (
        <div class='container'>
            <button onClick={handleShow} className="mt-2 bg-secondary text-white">Add Product</button>
            <Modal show={show} style={{ textAlign: 'center' }}>
                <Modal.Header>
                    <Modal.Title>
                        Add Product
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <input className='form-control text-center' type='text' name='name' value={name} placeholder='name' onChange={handleChange} />
                        {
                            formErrors.name && <span className='text-danger'>{formErrors.name}</span>
                        }
                        <br />
                        <input className='form-control text-center' type='number' name='price' value={price} placeholder='price' onChange={handleChange} />
                        {
                            formErrors.price && <span className='text-danger'>{formErrors.price}</span>
                        }
                        <br />
                        <input type='submit' className='btn btn-primary' value='Add' />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default ProductForm