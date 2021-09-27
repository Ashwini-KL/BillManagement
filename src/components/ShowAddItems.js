import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

const ShowAddItems = (props) => {

    const { itemsInCart } = props

    const [cartItems, setCartItems] = useState(itemsInCart)

    useEffect(() => {
        setCartItems(itemsInCart)
    }, [itemsInCart])

    const products = useSelector((state) => {
        return state.products
    })

    const getProduct = (itemInCart) => {
        let productsFound = products.filter((p) => {
            return p._id == itemInCart.product
        })
        return productsFound.length > 0 ? productsFound[0] : null
    }

    const decreaseQuan = (product) => {
        let decQuantity = cartItems.map((p) => {
            //console.log('t', p.product == product)
            if (p.product == product) {
                return { ...p, ...{ quantity: p.quantity - 1 } }
            }
            else {
                return { ...p }
            }
        })
        setCartItems(decQuantity)
    }

    const increaseQuan = (product) => {
        let incQuantity = cartItems.map((p) => {
            if (p.product == product) {
                return { ...p, ...{ quantity: p.quantity + 1 } }
            }
            else {
                return { ...p }
            }

        })
        console.log('incQuantity', incQuantity)
        setCartItems(incQuantity)
    }

    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.length > 0 && cartItems.map((item) => {
                        let product = getProduct(item)
                        console.log('item', item)
                        if (product) {
                            return <tr key={item.product}>
                                <td>{product.name}</td>
                                <td><button onClick={() => { decreaseQuan(item.product) }}>-</button>{item.quantity}<button onClick={() => { increaseQuan(item.product) }}>+</button></td>
                            </tr>
                        }
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ShowAddItems