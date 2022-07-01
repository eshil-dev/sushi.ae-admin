import { useGetOrdersQuery, useUpdateOrderStatusMutation } from "../api/apiSlice";

import OrderStatus from "./OrderStatus";
import MenuItem from "./MenuItem";
import CustomerCard from "./CustomerCard";

import { orderStatusTextToIndex } from "../../utils/findOrderStatusIndex";
import '../../assets/css/OrderList.css';

const OrderList = () => {

    const { data, isLoading, isSuccess, isError } = useGetOrdersQuery();

    if (isLoading && !isSuccess) {
        return <h2>Loading...</h2>
    } else if (isError) {
        return <h2>Something went wrong</h2>
    }
    if(data.length === 0) {
        return <h2>Order not found.</h2>
    }
    const order = data.map(order => {
        const statusIndex = orderStatusTextToIndex(order.status)
        return (
            <div className='order-container' key={order._id}>
                <OrderStatus orderID={order._id} orderStatusIndex={statusIndex} />
                <div style={{ borderRight: '0.1px solid lightgrey' }} />
                <MenuItem orders={order.ordered_menu} />
                <div style={{ borderRight: '0.1px solid lightgrey' }} />
                <CustomerCard
                    name={order.customerName}
                    phone={order.phone}
                    address={order.address}
                    location={order.location}
                />
            </div>
        )
    })

    return order;

}

export default OrderList;