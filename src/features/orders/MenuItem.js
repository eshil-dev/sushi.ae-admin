import './OrderCard.css';

const MenuItem = ({ orders }) => {

    let totalPrice = 0

    const menuItem = orders.map(ordered => {
        totalPrice += ordered.menu.price * ordered.qty
        return (
            <div className='d-flex justify-content-between' key={ordered._id}>
                <p className='fs-5'>
                    <span className='border border-sushi p-2 py-0 m-2'>{ordered.qty}</span>
                    {ordered.menu.name}
                </p>
                <p className='fs-5'>{ordered.menu.price}</p>
            </div>
        )
    })

    return (
        <div className='col-sm-12 col-md-4 border-start-end-sm cards'>
            <div className='p-2'>
                {menuItem}
                <hr className='mt-0 ' />
                <div className='d-flex justify-content-between'>
                    <p className='fs-4'>Total Bill</p>
                    <p className='fs-4'>{totalPrice}</p>
                </div>
            </div>
        </div>
    )
}

export default MenuItem;