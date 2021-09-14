import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startDeleteProdData,startUpdateProdData } from "../action/productAction"
import { Link } from 'react-router-dom'
const ListingProducts = (props) => {

    const products = useSelector((state) => {
        return state.products
    })

    useEffect(() => {
        setListingProducts(products)
    }, [products])

    const [listingProducts, setListingProducts] = useState(products)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [search, setSearch] = useState('')
    const [id, setId] = useState('')
    const [toggle, setToggle] = useState(false)

    const dispatch = useDispatch()



    const handleChange = (e) => {

        const attr = e.target.name
        if (attr == 'name') {
            setName(e.target.value)
        }
        if (attr == 'price') {
            setPrice(e.target.value)
        }
    }

   

    const handleEdit = (_id, name, price) => {
        handleToggle()
        setId(_id)
        setName(name);
        setPrice(price)
    }


    const handleToggle = () => {
        setToggle(!toggle)
    }

    const handleDelete = (_id) => {
        dispatch(startDeleteProdData(_id))
    }

    const handleSave = (id) => {
        const _id = id
        const editData = {
            name: name,
            price: price,
        }
        console.log('d', editData)
        const resetForm = () => {
            setName('')
            setPrice('')
        }
        dispatch(startUpdateProdData(editData, resetForm, handleToggle, _id))
    }

    const handleSearchChange = (e) => {
        const searchValue = e.target.value
        setSearch(searchValue)

        let searchProducts = products.filter((product) => {
            if (product.name.includes(searchValue)) {
                return product
            }
        })
        console.log(searchProducts)
        setListingProducts(searchProducts)
    }

    return (
        <div className="row">
            <div className="col-md-8">
                <h2>ListingProducts</h2>
            </div>
            <div className="col-md-4">
                <input className='form-control' type='search' value={search} name='search' placeholder='search' onChange={handleSearchChange} />
            </div>
            {
                products.length > 0 ? (
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>name</th>
                                    <th>price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listingProducts.map((product) => {
                                        return <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>
                                                {toggle && product._id == id ? <input type='text' name='name' value={name} placeholder='name' onChange={handleChange} /> : <React.Fragment>{product.name}</React.Fragment>}
                                            </td>
                                            <td>
                                                {toggle && product._id == id ? <input type='number' name='price' value={price} placeholder='price' onChange={handleChange} /> : <React.Fragment>{product.price}</React.Fragment>}
                                            </td>
                                            <td>
                                                {toggle && product._id == id ?
                                                    <React.Fragment>
                                                        <button onClick={() => { handleSave(product._id) }}>save</button>
                                                        <button onClick={handleToggle}>Cancel</button>
                                                    </React.Fragment> :
                                                    <React.Fragment>
                                                        <Link to='#'><img src='icons8-edit-64.png' width='30px' height='32px' onClick={() => { handleEdit(product._id, product.name, product.price) }} /></Link>
                                                        <Link to='#'><img src='delete-64.ico' width='30px' height='32px' onClick={() => { handleDelete(product._id) }} /></Link>
                                                    </React.Fragment>
                                                }
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>) : (
                    <div>
                        Add products
                    </div>
                )
            }
        </div>
    )
}

export default ListingProducts