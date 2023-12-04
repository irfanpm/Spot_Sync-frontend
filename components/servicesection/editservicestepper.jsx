'use client'
import React, { useState,useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  Autocomplete,
  StepLabel,
  Modal,
  Fade,
  Box,
  Grid,
  Card,
  CardMedia,
  IconButton,
  FormControl,
  InputLabel,
  NativeSelect,
  FormHelperText,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import ImageUploader from './imageuploader';
import axios from "axios"
import { getCookie } from "cookies-next";
import { useSelector,useDispatch } from 'react-redux';
import { deletearray,deleteImage } from '@/redux/features/serviceimage';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useRouter } from "next/navigation";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {findService} from '@/redux/features/findService';
import {  ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "./constants";
import AddNewImage from "./addnewImage";
import EditServiceimg from "./editserviceimage";
import { axiosInstance } from "@/redux/features/axioseInstance";
// import Map from "./mapsection";
const useStyles = styled((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },

}));

function getSteps() {
  return [
    "Basic Service information",
    "Address Information",
    "Upload Images",
    "Location",
  ];
}
const BasicForm = () => {
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const { control } = useFormContext();
  return (
    <div >
      <Controller
        control={control}
        name="Servicename"
        render={({ field }) => (
          <TextField
            id="service-name"
            label="Service Name"
            variant="outlined"
            placeholder="Enter Your Service Name"
            sx={{ m: 1, width: '45%' }}
                 margin="normal"
            {...field}
          />
        )}
      />
         <Controller
        control={control}
        name="companyname"
        render={({ field }) => (
          <TextField
            id="company-name"
            label="companyname"
            variant="outlined"
            placeholder="Enter Your Company Name"
            sx={{ m: 1, width: '45%' }}
            margin="normal"
            {...field}
          />
        )}
      />
       <Controller
        control={control}
        name="whatsapp"
        render={({ field }) => (
          <TextField
            id="Whatsapp-number"
            label="Service Whatsapp Number"
            variant="outlined"
            placeholder="Enter Your  Service Whatsapp Number"
            sx={{ m: 1, width: '45%' }}
            margin="normal"
            {...field}
          />
        )}
      />

    
        <Controller
        control={control}
        name="phone"
        render={({ field }) => (
          <TextField
            id="phone-number"
            label="Service Phone Number"
            variant="outlined"
            placeholder="Enter Your  Service Phone Number"
            sx={{ m: 1, width: '45%' }}
            margin="normal"
            {...field}
          />
        )}
      />
        <Controller
                 control={control}
                 name="category"
                 render={({ field }) => (
                   <FormControl  sx={{ m: 1, width: '45%' }} variant="outlined"  >
                 <InputLabel id="demo-multiple-name-label">Category</InputLabel>
                 <NativeSelect
                   id="demo-customized-select-native"
                   value={age}
                   onChange={handleChange}
                   {...field}
         
                 >
                   <option aria-label="None" value="" />
                   <option value='hospital'>Hospital</option>
                   <option value="education">Education</option>
                   <option value=  "docter">Doctors</option>
                   <option value= "repair">Repairs</option>
                   <option value= "beautyspa">beautyspa</option>
                   <option value=  "events">events</option>
                   <option value= "hotel" >hotel</option>
                   <option value= "logistics">logistics</option>
                   <option value= "gym" >gym</option>
                   <option value=  "shop" >shop</option>
                   <option value= "more" >more</option>








                 </NativeSelect>
               </FormControl>
                    )}
                    />
                    
        <Controller
        control={control}
        name="features"
        render={({ field }) => (
          <TextField
            id="features"
            label="Service Extra Features"
            variant="outlined"
            placeholder="Enter Your extra features"
            sx={{ m: 1, width: '45%' }}
            margin="normal"
            {...field}
          />
        )}
      />

     
       <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <TextField
          name='description'
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                sx={{ m: 1, width: '45%' }}
                margin="normal"
                id='description'
                {...field}
                />
                )}
      />
         {/* <Controller
        control={control}
        name="companyname"
        render={({ field }) => (
          <TextField
                name='description'
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                sx={{ m: 1, width: '45%' }}
                margin="normal"
                id='description'
            {...field}
          />
        )}
      />
     */}
    </div>
  );
};
const ContactForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="emailAddress"
        render={({ field }) => (
          <TextField
            id="email"
            label="E-mail"
            variant="outlined"
            placeholder="Enter Your E-mail Address"
            sx={{ m: 1, width: '45%' }}

            margin="normal"
            {...field}
          />
        )}
      />

    
      <Controller
        control={control}
        name="streetaddress"
        render={({ field }) => (
            <TextField
            name='street'
            label="Street address"
            variant="outlined"
            sx={{ m: 1, width: '45%' }}

            margin="normal"
            id='street'
            {...field}
          />
          
        )}
      />
       <Controller
        control={control}
        name="website"
        render={({ field }) => (
            <TextField
            name='website'
            label="Service Website"
            variant="outlined"
            sx={{ m: 1, width: '45%' }}

            margin="normal"
            id='website'
            {...field}
          />
          
        )}
      />
        <Controller
        control={control}
        name="city"
        render={({ field }) => (
          
            <TextField
            label="city"
            id="city"
            name="city"
            sx={{ m: 1, width: '22%' }}
            {...field}
          />
          
        )}
      /> 
          
         <Controller
        control={control}
        name="state"
        render={({ field }) => (
          
          <TextField
          label="state"
          id="state"
          name="state"
            sx={{ m: 1, width: '22%' }}
            {...field}
          />
          
        )}
      />
       <Controller
        control={control}
        name="instagram"
        render={({ field }) => (
            <TextField
            name='website'
            label="Service Instagram link"
            variant="outlined"
            sx={{ m: 1, width: '45%' }}

            margin="normal"
            id='website'
            {...field}
          />
          
        )}
      />
      
     
         <Controller
        control={control}
        name="timing"
        render={({ field }) => (
          <>
              

            <TextField
            name='service timing'
            helperText="  Mon-Sun 9:00-7:00"
            label="Service timing"
            variant="outlined"
            sx={{ m: 1, width: '45%' }}

            margin="normal"
            id='timing'
            {...field}
          />
       
          </>
     
          
        )}
       
      />
          <Controller
        control={control}
        name="address"
        render={({ field }) => (
          
          <TextField
          name='address'
          label="Address"
          variant="outlined"
          multiline
          rows={3}
        
          fullWidth
          margin="normal"
          id='address'
            sx={{ m: 1, width: '45%' }}
            {...field}
          />
          
        )}
      />
        
        
           
        
   

    </>
  );
};
const Imageuploadsection = () => {
      const service=useSelector((state)=>state.findservie.service.data)

   return( <>
      <div className="d-flex flex-column justify-content-center align-items-center">
    <div>
   <EditServiceimg id={service[0]._id}/>
    </div>
    <div >

    <AddNewImage id={service[0]._id} />
    </div>

  </div>
    </>)

};
const Mapsection =  (props) => {
  const { control,setValue} = useFormContext();

    const DEFAULT_LATITUDE = 11.145923857417905;
    const DEFAULT_LONGITUDE = 75.96342891454698;
  
    const [markerPosition, setMarkerPosition] = useState(null);
    console.log( markerPosition?.lat)
    
  useEffect(() => {
    // Update the default values when markerPosition changes
    setValue("lat", markerPosition?.lat);
    setValue("long", markerPosition?.lng);
  }, [markerPosition, control]);

  
    const handleMapClick = (e) => {
      setMarkerPosition(e.latlng);
    };
  
    const latitude = props.coords ? props.coords.latitude : DEFAULT_LATITUDE;
    const longitude = props.coords ? props.coords.longitude : DEFAULT_LONGITUDE;
  
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
      <MapContainer
        className="leaflet-map w-75 "
        center={[latitude, longitude]}
        zoom={17}
        scrollWheelZoom={true}
        style={{ height: "80vh" }}
    
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler setMarkerPosition={setMarkerPosition} />
        {markerPosition && (
          <Marker position={markerPosition} icon={icon}>
            <Popup>Clicked position ^_^</Popup>
          </Marker>
        )}
      </MapContainer>
      <Controller
        control={control}
        name="lat"
        render={({ field }) => (
            <TextField
            name='latitude'
            label="location latitude"
            variant="outlined"
            sx={{ m: 1, width: '45%' }}

            margin="normal"
            id='website'
            {...field}
          />
          
        )}
      />
         <Controller
        control={control}
        name="long"
        render={({ field }) => (
            <TextField
            name='longtitude'
            label="location longtitude"
            variant="outlined"
            sx={{ m: 1, width: '45%' }}

            margin="normal"
            id='website'
            {...field}
          />
          
        )}
      />
      </div>
    );
  };
  
  const MapClickHandler = ({ setMarkerPosition }) => {
    const map = useMapEvents({
      click: (e) => {
        setMarkerPosition(e.latlng);
      },
    });
  
  
    return null;
  };
  
 


function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;

    case 1:
      return <ContactForm />;
    case 2:
      return <Imageuploadsection />;
    case 3:
      return <Mapsection/>;
    default:
      return "unknown step";
  }
}

const EditStepper = ({id}) => {
    console.log(id)
  const image1=useSelector((state)=>state.image.image)
  const dispatch=useDispatch()
  const service=useSelector((state)=>state.findservie.service.data)
 console.log(service)
  useEffect(()=>{
    dispatch(findService(id))


  },[])
  const cookie = getCookie('token');
  const router=useRouter()

  const classes = useStyles();

  const methods = useForm({
    defaultValues: {
        
      Servicename:service && service[0] ? service[0].serviceName : "",
      companyname:service && service[0] ? service[0].serviceName : "",
      phone: service && service[0] ? service[0].Phone : "",
      whatsapp:service && service[0] ? service[0].Whatsapp : "",
      features:service && service[0] ? service[0].Features : "",
      category: service && service[0] ? service[0].Category : "",
      description: service && service[0] ? service[0].Description : "",
      emailAddress: service && service[0] ? service[0].Email : "",
      streetaddress: service && service[0] ? service[0].StreetAdrress : "",
     website:service && service[0] ? service[0].Website : "",
      instagram:service && service[0] ? service[0].Instagram : "",
      timing:service && service[0] ? service[0].Timing : "",
      lat:service && service[0] ? service[0].Location?.coordinates[1] : "",
      long:service && service[0] ? service[0].Location?.coordinates[0] : "",
      state: service && service[0] ? service[0].State : "",
      city: service && service[0] ? service[0].City : "",
      address:service && service[0] ? service[0].Address : "",
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = async(data) => {
    console.log(data);
    // console.log(data.Servicename)
    if (activeStep == steps.length - 1) {
      // fetch("https://jsonplaceholder.typicode.com/comments")
      //   .then((data) => data.json())
      //   .then((res) => {
      //     console.log(res);
      //     setActiveStep(activeStep + 1);
      //   });
      try {
        const response = await axiosInstance.put('http://127.0.0.1:8000/api/service/editservice', {
            serviceid:id,
          servicename: data.Servicename,
          phone:data.phone,
          category:data.category,
          description:data.description,
          streetaddress:data.streetaddress,
          state:data.state,
          city:data.city,
         timing:data.timing,
         whatsapp:data.whatsapp,
         email:data.emailAddress,
         website:data.website,
         instagram:data.instagram,
         features:data.features,
          address:data.address,
    
        //   image:image1,
            lat:data.lat,
            long:data.long
      },{
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      })

      dispatch(deletearray())
      console.log(response)



      toast.success(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      } catch (error) {
         toast.error(" edit service is failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
                setActiveStep(activeStep + 1);


      // router.push('/Serviceprovider/serviceprofilepage')

    } else {
      setActiveStep(activeStep + 1);
      // setSkippedSteps(
      //   skippedSteps.filter((skipItem) => skipItem !== activeStep)
      // );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    // if (!isStepSkipped(activeStep)) {
    //   setSkippedSteps([...skippedSteps, activeStep]);
    // }
    setActiveStep(activeStep + 1);
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };
  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep} >
        {steps.map((step, index) => {

          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
                variant="caption"
                align="center"
                style={{ display: "block" }}
              >
                optional
              </Typography>
            );
          }
          // if (isStepSkipped(index)) {
          //   stepProps.completed = false;
          // }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <div className="d-flex align-items-center flex-column">
                         <ToastContainer />

          <img src="/Check animation.gif" alt="image" srcset="" className="w-25" />

        <Typography variant="h5" align="center">
          
        Successfully edited Services
        </Typography>
        <Button style={{color:"black"}} onClick={()=>{ router.push('/Serviceprovider/serviceprofilepage')}}>Home</Button>
        </div>
      ) : (
        <>
          <FormProvider {...methods}   >
            <form onSubmit={methods.handleSubmit(handleNext)} >
              {getStepContent(activeStep)}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>

              <Button
                className={classes.button}
                disabled={activeStep === 0}
                onClick={handleBack}
                style={{background:"red",color:"white"}}
              >
                <NavigateBeforeIcon/>
                back
              </Button>
              {/* {isStepOptional(activeStep) && (
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  style={{background:"red"}}

                >
                  skip
                </Button>
              )} */}
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                // onClick={handleNext}
                style={{background:"red"}}

                type="submit"
              >
               
                {activeStep === steps.length - 1 ? "Finish" :<> Next <NavigateNextIcon/></>}
              </Button>
              </div>

            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default EditStepper;

const top100Films = [
  { label: 'hospital'},
  { label: 'education' },
  { label: "repair" },
  { label: "docter" },
  { label: "beautyspa" },
  { label: "events" },
  { label: "hotel" },
  { label: "logistics" },
  { label: "gym" },
  { label: "shop" },

  { label: "more" },
  
]
