import { useGetOrdersQuery } from "../api/apiSlice";
import OrderStatus from "./OrderStatus";
import MenuItem from "./MenuItem";
import Loader from '../../layouts/loader/Loader'
import CustomerCard from "./CustomerCard";
import { orderStatusTextToIndex } from "../../utils/findOrderStatusIndex";

const OrderList = () => {

    const { data, isLoading, isSuccess, isError } = useGetOrdersQuery();

    if (isLoading)
        return <Loader />
    if (isError)
        return (
            <div className="container">
                <div
                    class="alert text-center alert-warning shadow"
                    role="alert">
                    Something went wrong please refresh the page.
                </div>
            </div>
        )
    if (data.length === 0) {
        return (
            <div className="container">
                <p
                    class="alert text-center alert-info shadow"
                    role="alert">
                    No order found.
                </p>
            </div>
        )
    }
    if (isSuccess && data.length !== 0) {
        const order = data.map(order => {
            const statusIndex = orderStatusTextToIndex(order.status)
            return (
                <div className='card shadow-md' key={order._id}>
                    <div className='row p-2'>
                        <OrderStatus orderID={order._id} orderStatusIndex={statusIndex} />
                        <MenuItem orders={order.ordered_menu} />
                        <CustomerCard
                            name={order.customer.name}
                            phone={order.customer.phone}
                            address={order.customer.address}
                            location={order.location.location}
                        />
                    </div>
                </div>
            )
        })
        return order;
    }
}

export default OrderList;