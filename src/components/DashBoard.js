import { useSelector } from "react-redux"
const DashBoard = (props) => {

    let totalCustomers = useSelector((state) => {
        return state.customers
    })

    let totalProducts = useSelector((state) => {
        return state.products
    })

    let totalBills = useSelector((state)=>{
        console.log('stbill',state.bills)
        return state.bill
    })
    
    return (
        <div class='bd-example'>
            <div class="card text-white bg-success mb-3  " style={{maxWidth: '18rem'}}>
                <div class="card-header">TotalCustomers</div>
                <div class="card-body">
                    <p class="card-text">{totalCustomers.length}</p>
                </div>
            </div>
            <div class="card text-white bg-primary mb-3  " style={{maxWidth: '18rem'}}>
                <div class="card-header">TotalProducts</div>
                <div class="card-body">
                    <p class="card-text">{totalProducts.length}</p>
                </div>
            </div>
            <div class="card text-white bg-warning mb-3" style={{maxWidth: '18rem'}}>
                <div class="card-header">TotalBill</div>
                <div class="card-body">
                    <p class="card-text">{totalBills.length}</p>
                </div>
            </div>
        </div>
    )
}
export default DashBoard