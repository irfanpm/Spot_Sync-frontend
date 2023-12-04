'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import ImageUploader from './servicesection/imageuploader';



const steps = ['Add business detailse', 'add business address and location', 'add business image uploaded'];

export default function Addbusiness() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
 const myservice=React.useRef()
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const handleAddservice=(event)=>{
    event.preventDefault()
    const Servicename=myservice.current.value
    const ownerfirst=event.target.ownerfirst.value
    const ownerlast=event.target.ownerlast.value
    const phone=event.target.phone.value
    const category=event.target.category.value
    const descriptioon=event.target.description.value
    const street=event.target.street.value
    const state=event.target.state.value
    const city=event.target.city.value 
    const zip=event.target.zip.value
    const address=event.target.address.value 
    console.log(Servicename)
    
    // console.log(Servicename,ownerfirst,ownerlast,phone,category,descriptioon,street,state,city,zip,address)
  
  
  }

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: '100%' }} className="container">
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label} 
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished 
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
            </Typography>
                <div className='w-50'>
            <Typography id="transition-modal-title" variant="h6" component="h2">
            Add Service
            </Typography>
              {activeStep === 0 && (
                <div  >
                  {/* <TextField
                name="servicename"
                label="Service name"
                variant="outlined"
                ref={myservice}
                fullWidth
                margin="normal"
                id='servicename'
              />
               <TextField
               name='"ownerfirst"'
          id="ownerfirst"
          label="OWNER first Name"
          multiline
        />
        &nbsp;&nbsp;
        <TextField
          id="ownerlast"
          name="ownerlast"
          label=" OWNER Last Name"
          placeholder="Placeholder"
          multiline
        />
              <TextField
                name='phone'
                label="Business PhoneNumber"
                variant="outlined"
                fullWidth
                margin="normal"
                
                id='phone'
              />
                  <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      renderInput={(params) => <TextField {...params} label="Category" id='category'  name='category' fullWidth   />}
    />
                 <TextField
                name='description'
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                id='description'
                
              /> */}
            
                </div>
              )}
              {activeStep === 1 && (
                <div>
  
                          <TextField
                name='street'
                label="Street address"
                variant="outlined"
                fullWidth
                margin="normal"
                id='street'
              />
          <TextField
           label="state"
           id="state"
           sx={{ m: 1, width: '25ch' }}
           name="state"
           InputProps={{
           }}
         />
          
                <TextField
          label="city"
          id="city"
          name="city"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
          }}
        />
          <TextField
           label="Zip code"
           id="zip"
           name="zip"
           sx={{ m: 1, width: '25ch' }}
           InputProps={{
           }}
         />
            <TextField
                name='address'
                label="Address"
                variant="outlined"
                multiline
                rows={3}
              
                fullWidth
                margin="normal"
                id='address'
              />
      
                    
                </div>
              )}
              {activeStep === 2 && (
                <div>
                  <ImageUploader/>
                  <input
                    type="text"
                    name="field3"
                    placeholder="Field 3"
                  />
                  
                  {/* Add more form fields as needed */}
                </div>
              )}
              </div>
   
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 ' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button  onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "finish"
                      : 'Complete Step'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
  ];