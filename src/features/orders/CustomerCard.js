import { ContentCopy } from '@mui/icons-material';
import { LocationOn } from '@mui/icons-material';

import '../../assets/css/CustomerCard.css';

const CustomerCard = ({ name, phone, address, location }) => {
    return (
        <div className='customer-card'>
            <div className='customer-name'>
                <p id='c-name'>{name}</p>
                <p id='c-phone' className='bi bi-telephone-fill'> {phone} </p>
            </div>
            <hr />
            <div className='customer-addres'>
                <h5 className='customer-address-label'>Customer Address</h5>
                <p className='customer-full-address'>{address}</p>
            </div>
            <div className='copy-and-location-icon'>
                <ContentCopy onClick={() => console.log('oaky')} id='copy-icon' />
                <LocationOn onClick={() => console.log('oaky')} id='location-icon' />
            </div>
        </div>
    )
}

export default CustomerCard;