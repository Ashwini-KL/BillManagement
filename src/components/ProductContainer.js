import ProductForm from "./ProductForm"
import { useDispatch } from "react-redux"
import { startPostProductData } from "../action/productAction"
import ListingProducts from "./ListingProducts"

const ProductContainer = (props) => {

    const dispatch = useDispatch()

    const formSubmit = (productData, resetForm) => {
        dispatch(startPostProductData(productData, resetForm))
    }

    return (
        <div>
            <ProductForm formSubmit={formSubmit} />
            <ListingProducts />
        </div>
    )
}
export default ProductContainer