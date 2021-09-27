import { useSelector } from "react-redux"
import { Chart } from 'react-google-charts'

const DashBoard = (props) => {

    let totalCustomers = useSelector((state) => {
        return state.customers
    })

    let totalProducts = useSelector((state) => {
        return state.products
    })

    let totalBills = useSelector((state) => {
        return state.bill
    })

    const DisplayChart = () => {
        const month = ['jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'nov', 'dec']
        const chartData = [['Month', 'Sales']]
        let monthlySales = {};
        totalBills.forEach((bill) => {
            let sum = 0;
            bill.lineItems.forEach((ele) => {
                sum += ele.subTotal
            })
            let d = new Date()
            let monthName = month[d.getMonth()]
            if (monthlySales[monthName]) {
                console.log('date', d.getMonth())
                monthlySales[monthName] = monthlySales[monthName] + sum;
            } else {
                monthlySales[monthName] = sum;
            }
        })

        Object.keys(monthlySales).forEach((s) => {
            chartData.push([s, monthlySales[s]])
        })
        return chartData
    }

    return (
        <div className='row p-2'>
            <div class="card text-white bg-success ms-3  " style={{ maxWidth: '18rem' }}>
                <div class="card-header">TotalCustomers</div>
                <div class="card-body">
                    <p class="card-text">{totalCustomers.length}</p>
                </div>
            </div>
            <div class="card text-white bg-primary ms-3  " style={{ maxWidth: '18rem' }}>
                <div class="card-header">TotalProducts</div>
                <div class="card-body">
                    <p class="card-text">{totalProducts.length}</p>
                </div>
            </div>
            <div class="card text-white bg-warning ms-3" style={{ maxWidth: '18rem' }}>
                <div class="card-header">TotalBill</div>
                <div class="card-body">
                    <p class="card-text">{totalBills.length}</p>
                </div>
            </div>
            <div className='p-3 align-center'>
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={DisplayChart()}
                    options={{
                        chart: {
                            title: 'MonthlySales',
                        },
                    }}
                    rootProps={{ 'data-testid': '2' }}
                />
            </div>
        </div>
    )
}
export default DashBoard