import '../../assets/css/MenuItem.css';

const MenuItem = ({ orders }) => {

    let totalPrice = 0

    const menuItem = orders.map(ordered => {
        totalPrice += ordered.menu.price
        return (
            <div className='menu-item' key={ordered.menu._id}>
                <div className='item'>
                    <i className='bi bi-arrow-right-circle' /> &nbsp;
                    <p style={{ fontWeight: '500', fontSize: '14px' }}>{ordered.qty} x {ordered.menu.name}</p>
                </div>
                <p style={{ fontWeight: '500', fontSize: '14px' }}>{ordered.menu.price} $</p>
            </div>
        )
    })

    return (
        <div className='menu-card'>
            {menuItem}
            <hr style={{ marginTop: '0px' }} />
            <div className='menu-total-price'>
                <p style={{ fontWeight: '500' }}>Total bill</p>
                <p style={{ fontWeight: '500' }}>{totalPrice} $</p>
            </div>
        </div>
    );
}

export default MenuItem;