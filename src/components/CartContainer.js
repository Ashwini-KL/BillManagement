import BillForm from "./BillForm"
import BillData from "./BillData"
import { useDispatch } from "react-redux"

const CartContainer = (props) => {

    const dispatch = useDispatch()
 
    return (
        <div> 
            <BillForm />
            <BillData/>
        </div>
    )
}
export default CartContainer