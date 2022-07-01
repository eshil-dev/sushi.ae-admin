
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
import { LocationOn, Phone } from '@mui/icons-material';

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
            <div className='d-flex justify-content-between'>
                    <p className='fs-5'> 
                        <span className='border border-sushi p-2 py-0 m-2'>1</span>
                        Mortal pizza
                    </p>
                <p className='fs-5'>100 AED</p>
            </div>
        )
    })

    return (
        <div className='card shadow-md'>
            <div className='row p-2'>
                <div className='col p-3 '>
                    <div className='bg-success bg-opacity-50 text-center '>
                        <p className='text-dark'>ORDER STATUS</p>
                    </div>
                    <div className='mx-2'>
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
                <div className='col border-start-end-sm'>
                    <div className='p-2'>
                        {menuItem}
                        <hr className='mt-0 '/>
                        <div className='d-flex justify-content-between'>
                            <p className='fs-4'>Total Bill</p>
                            <p  className='fs-4'>400 AED</p>
                        </div>
                        <hr className='mt-0' />
                        <div className='d-flex justify-content-between'>
                            <BButton color="btn btn-sushi rounded-0 fs-4 mx-2" block>Accept</BButton>
                            <BButton color="btn btn-danger rounded-0 fs-4 mx-2" block>Reject</BButton>
                        </div>
                    </div>
                </div>
                <div className='col '>
                    <div className='border border-1 p-3 m-2'>
                        <div className='d-flex justify-content-between' style={{marginBottom:"-20px"}}>
                            <p className='fs-5 fw-bold'>Fatimah Sajjadi</p>
                            <p className='fs-5'> 0566652534</p>
                        </div>
                        <hr />
                        <div className=''>
                            <h5 className=' fw-bold'>Customer Address</h5>
                            <p className=''>404, South Ridge 5, Downtown, Downtown Dubai</p>
                        </div>
                        <div className=''>
                            <ContentCopy className='mx-2 fs-2' onClick={() => console.log('oaky')} id='copy-icon' />
                            <LocationOn className='mx-2 fs-2' onClick={() => console.log('oaky')} id='location-icon' />
                            <Phone className='mx-2 fs-2' onClick={() => alert('This will call the customer')} id='phone-icon'/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OrderCard;