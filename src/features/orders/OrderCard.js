
import * as React from 'react';
import { Button as BButton } from 'reactstrap';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ContentCopy } from '@mui/icons-material';
import { LocationOn } from '@mui/icons-material';

import './OrderCard.css';

const steps = [
    {
        label: 'Placed',
        description: `Order just placed.`,
    },
    {
        label: 'Accepted',
        description:
            'Order accpeted.',
    },
    {
        label: 'Marked ready',
        description: `Oreder marked as ready.`,
    },
];

const OrderCard = () => {

    const [activeStep, setActiveStep] = useState(3);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const menuItem = [0, 1, 2].map(() => {
        return (
            <div className='menu-item'>
                <div className='item'>
                    <i className='bi bi-arrow-right-circle' /> &nbsp;
                    <p style={{ fontWeight: '700', fontSize: '12px' }}>1 x Mortal pizza[7 inches]</p>
                </div>
                <p style={{ fontWeight: '700', fontSize: '12px' }}>100 $</p>
            </div>
        )
    })

    return (
        <div className='order-container'>
            <div className='order-card'>
                <div className='order-status'>
                    <p>ORDER STATUS</p>
                </div>
                <div className='order-stepper'>
                    <Box sx={{ maxWidth: 200, padding: '0px' }}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel
                                        optional={
                                            index === 2 ? (
                                                <Typography variant="caption">Done</Typography>
                                            ) : null
                                        }
                                    >
                                        {step.label}
                                    </StepLabel>
                                    <StepContent>
                                        <Typography>{step.description}</Typography>
                                        <Box sx={{ mb: 2 }}>
                                            <div>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleNext}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                                </Button>
                                                <Button
                                                    disabled={index === 0}
                                                    onClick={handleBack}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    Back
                                                </Button>
                                            </div>
                                        </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </div>
            </div>
            <div style={{ borderRight: '0.1px solid lightgrey' }} />
            <div className='menu-card'>
                {menuItem}
                <hr style={{ marginTop: '0px' }} />
                <div className='menu-total-price'>
                    <p style={{ fontWeight: 'bolder' }}>Total bill</p>
                    <p style={{ fontWeight: 'bold' }}>400 $</p>
                </div>
                <hr style={{ marginTop: '0px' }} />
                <BButton color="info" block>Picked up</BButton>
            </div>
            <div style={{ borderRight: '0.1px solid lightgrey' }} />
            <div className='customer-card'>
                <div className='customer-name'>
                    <p id='c-name'>Fatimah Sajjadi</p>
                    <p id='c-phone' className='bi bi-telephone-fill'> +938483993393</p>
                </div>
                <hr />
                <div className='customer-addres'>
                    <h5 className='customer-address-label'>Customer Address</h5>
                    <p className='customer-full-address'>404, South Ridge 5, Downtown, Downtown Dubai</p>
                </div>
                <div className='copy-and-location-icon'>
                    <ContentCopy onClick={() => console.log('oaky')} id='copy-icon' />
                    <LocationOn onClick={() => console.log('oaky')} id='location-icon' />
                </div>
            </div>
        </div>
    )
}

export default OrderCard;