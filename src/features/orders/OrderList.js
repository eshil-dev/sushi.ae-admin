import { useGetOrdersQuery } from "../api/apiSlice";
import OrderStatus from "./OrderStatus";
import MenuItem from "./MenuItem";
import CustomerCard from "./CustomerCard";
import { orderStatusTextToIndex } from "../../utils/findOrderStatusIndex";

const OrderList = () => {

    const { data, isLoading, isSuccess, isError } = useGetOrdersQuery();

    if (isLoading && !isSuccess) {
        return <h2>Loading...</h2>
    } else if (isError) {
        return (
            <div className="container">
                <div class="alert text-center alert-danger shadow" role="alert"> Something went wrong</div>
            </div>
        )
    }
    if (data.length === 0) {
        return (
            <div className="container">
                <div class="alert text-center alert-warning shadow" role="alert"> No new order</div>
            </div>
        )
    }
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

export default OrderList;