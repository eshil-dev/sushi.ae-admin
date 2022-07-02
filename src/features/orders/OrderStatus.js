
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useUpdateOrderStatusMutation } from "../api/apiSlice";

const ORDER_STATUS = [
    'Ordered',
    'Accepted',
    'On the way',
    'Completed'
]

const OrderStatus = ({ orderID, orderStatusIndex }) => {

    const [updateOrderStatus, {
        isLoading: isUpdateOrderLoading,
        isSuccess: isUpdateOrderSuccess,
        isError: isUpdateOrderError
    }] = useUpdateOrderStatusMutation();

    const handleNext = async (orderIndex, order_id) => {
        switch (orderIndex) {
            case 0:
                await updateOrderStatus({ _id: order_id, newStatus: 'Ordered' }).unwrap()
                break;
            case 1:
                await updateOrderStatus({ _id: order_id, newStatus: 'Accepted' }).unwrap()
                break;
            case 2:
                await updateOrderStatus({ _id: order_id, newStatus: 'On the way' }).unwrap()
                break;
            case 3:
                await updateOrderStatus({ _id: order_id, newStatus: 'Completed' }).unwrap()
                break;
        }
    }

    const handleReject = async order_id => {
        await updateOrderStatus({ _id: order_id, newStatus: 'Rejected' }).unwrap()
    }

    return (
        <div className='col p-3 '>
            <div className='bg-success bg-opacity-50 text-center '>
                <p className='text-dark'>ORDER STATUS</p>
            </div>
            <div className='mx-2'>
                <Box>
                    <Stepper activeStep={orderStatusIndex} orientation="vertical">
                        {ORDER_STATUS.map((status, index) =>
                        (<Step key={index}>
                            <StepLabel
                                optional={
                                    index === 5 ? (
                                        <Typography variant="caption">Done</Typography>
                                    ) : null
                                }
                            >
                                {status}
                            </StepLabel>
                            <StepContent>
                                <Box>
                                    <div>
                                        <Button
                                            size='small'
                                            variant="contained"
                                            onClick={() => handleNext(index, orderID)}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === ORDER_STATUS.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                        {index === 1 ?
                                            <Button
                                                size='small'
                                                color='warning'
                                                variant="contained"
                                                sx={{ mt: 1, mr: 1 }}
                                                onClick={() => handleReject(orderID)}
                                            >
                                                Reject
                                            </Button>
                                            : ''
                                        }
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>))}
                    </Stepper>
                </Box>
            </div>
        </div>
    )
}

export default OrderStatus;