import { ContentCopy } from '@mui/icons-material';
import { LocationOn } from '@mui/icons-material';
import { Phone } from '@mui/icons-material';

const CustomerCard = ({ name, phone, address, location }) => {
    return (
        <div className='col '>
            <div className='border border-1 p-3 m-2'>
                <div
                    className='d-flex justify-content-between'
                    style={{ marginBottom: "-20px" }}
                >
                    <p className='fs-5 fw-bold'>{name}</p>
                    <p className='fs-5'>{phone}</p>
                </div>
                <hr />
                <div className=''>
                    <h5 className='fw-bold'>Customer Address</h5>
                    <p className=''>{address}</p>
                </div>
                <div className=''>
                    <ContentCopy
                        className='mx-2 fs-2'
                        onClick={() => console.log('oaky')}
                        id='copy-icon'
                    />
                    <LocationOn
                        className='mx-2 fs-2'
                        onClick={() => console.log('oaky')}
                        id='location-icon'
                    />
                    <Phone
                        className='mx-2 fs-2'
                        onClick={() => alert('This will call the customer')}
                        id='phone-icon'
                    />
                </div>
            </div>
        </div>
    )
}

export default CustomerCard;