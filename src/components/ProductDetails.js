
import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Modal, Button } from "react-bootstrap"

const ProductDetails = (props) => {
    console.log('props',props)

    const { bills} = props

    const products = useSelector((state) => {
        return state.products
    })

    const getProduct = (lineItem) => {
        let productsFound = products.filter((p) => {
            return p._id == lineItem.product
        })
        return productsFound.length > 0 ? productsFound[0] : null
    }

    return (
            <div id='pdf'>
                <p>date:{moment(bills.date).format('DD/MM/YYYY')}</p>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.lineItems.map((item) => {
                        let product = getProduct(item)
                        if (product) {
                            return <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        }
                    })}
                </tbody>
            </table>
            <p className='d-flex flex-shrink-1'>Total-{bills.total}</p>
            </div>
           

    )
}

export default ProductDetails