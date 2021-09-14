import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { startGetAccountDetails } from "../action/usersAction"

const Account = (props) => {

    const user = useSelector((state) => {
        return state.user
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetAccountDetails())
    }, [])

    return (
        <div>
            <p>userName :{user.username}</p>
            <p>Email:{user.email}</p>
            <p>Password:{user.password}</p>
            <p>buisnessName:{user.businessName}</p>
            <p>Address:{user.address}</p>
        </div>
    )
}
export default Account