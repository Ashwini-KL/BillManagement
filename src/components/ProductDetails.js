
import React from 'react'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

const ProductDetails = (props) => {
    
    const { bills,getCustomerName} = props

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
                <p><b>date:</b>{format(new Date(bills.date),'dd/MM/yyy')}</p>
                <p><b>customerName:</b>{getCustomerName(bills.customer)}</p>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>price</th>
                        <th>Quantity</th>
                        <th>subTotal</th>
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
                                <td>{item.subTotal}</td>
                            </tr>
                        }
                    })}
                </tbody>
            </table>
            <p className="text-center">Total-{bills.total}</p>
            </div>
    )
}
export default ProductDetails