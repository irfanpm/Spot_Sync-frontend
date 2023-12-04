"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle"; // You may need to import the icon you want to use
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Avatar, Button, Skeleton } from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { favourite } from "@/redux/features/favourite";
import { Servicedetails } from "@/redux/features/showservicedetails";
import { getReview } from "@/redux/features/reviewdisplay";
import { Avgreview } from "@/redux/features/averagerating";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import {findService} from '@/redux/features/findService';
import {deleteService} from '@/redux/features/deleteService';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "./constants";
function Servicedetailsection({ id }) {
  const servicedetails = useSelector(
    (state) => state.servicedetails.service.data
  );
  const review = useSelector((state) => state.review.review.data);
  const avgreviews = useSelector((state) => state.avgreview.review.data);
  const f = useSelector((state) => state.showfav.fav);
  // console.log(avgreviews)
  console.log(f);
  const [openModal, setOpenModal] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState(4);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fav, setfav] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const dispatch = useDispatch();
  // const myref=useRef(servicedetails[0]._id)

  // console.log(myref.current)
  // dispatch(getReview())
  let latitude
let longitude
  servicedetails?.forEach(item => {
    latitude =  item?.Location?.coordinates[1];
    longitude = item?.Location?.coordinates[0];
  
   
 });
  const favarray = f?.map((item) => item.serviceId);
  console.log(favarray);
  useEffect(() => {
    dispatch(Servicedetails(id));
    dispatch(favourite(id));
    dispatch(getReview(id));
    dispatch(Avgreview(id));
  }, []);

  const router = useRouter();
  const cookie = getCookie("token");
  const handleImageClick = (images, imageIndex) => {
    if (imageIndex >= 3) {
      setModalImages(images);
      setSelectedImage(imageIndex);
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handlefavourite = (id) => {
    dispatch(favourite(id));
  };

  const handleLoadMoreImages = () => {
    setLoadedImages(loadedImages + 4);
  };
  const handleReview = async (event, id) => {
    event.preventDefault();
    const title = event.target.title.value;
    const review = event.target.review.value;
    const rating = event.target.rating.value;
    console.log(rating);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/review",
        {
          serviceid: id,
          title: title,
          rating: rating,
          comment: review,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      console.log(response.data.message);
    } catch (error) {}
  };
  const navlogin = () => {
    alert("please login");
  };
  const handleShowMore = () => {
    setVisibleReviews(visibleReviews + 3); 
  };
    const removeService =(id)=>{
           dispatch(deleteService(id))
           router.push(`/Serviceprovider/serviceprofilepage`)


    }
     const clickservice=(id)=>{
      dispatch(findService(id))
      router.push(`/Serviceprovider/editService/${id}`)

    }

  return (
    <div className="container">
      {servicedetails?.map((item) =>
      
      
          <div key={item.id} className="mt-3">
            <div className="d-flex">
              <div className="col-lg-5 col-12 m-1">
                <ImageListItem style={{ height: "300px" }}>
                  <img
                    src={item.Image[0]}
                    alt="image"
                    style={{ borderRadius: "10px", border: "1px" }}
                  />
                </ImageListItem>
              </div>
              <div className="col-lg-4 m-1 col-md-3">
                <ImageListItem style={{ height: "300px" }}>
                  <img
                    src={item.Image[1]}
                    alt="image"
                    style={{
                      borderRadius: "10px",
                      border: "1px",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </ImageListItem>
              </div>
              <div className="col-lg-3">
                {item.Image.slice(2, loadedImages).map((image, index) => (
                  <ImageListItem
                    key={index}
                    className="mt-1"
                    onClick={() => handleImageClick(item.Image, index + 2)}
                  >
                    <img
                      src={image}
                      alt="image"
                      style={{
                        borderRadius: "10px",
                        border: "1px",
                        objectFit: "cover",
                        height: item.Image.length == 3 ? "292px" : "145px",
                      }}
                    />
                  </ImageListItem>
                ))}
                {loadedImages <= item.Image.length && (
                  <IconButton onClick={handleLoadMoreImages}></IconButton>
                )}
              </div>
            </div>

            <div className="mt-3 ">
              <h2 style={{ fontFamily: "sans-serif", fontWeight: "700" }}>
                {item.serviceName}
              </h2>

              <div className="d-flex mt-2">
                <div
                  style={{
                    width: "35px",
                    height: "25px",
                    background: "green",
                    borderRadius: "5px",
                  }}
                  className="text-center mt-1 text-white"
                >
                  <h5>{avgreviews}</h5>
                </div>
                <Rating
                  name="rating"
                  defaultValue={item.Avgrating}
                  precision={0.5}
                  size="large"
                  readOnly
                />{" "}
                &nbsp;&nbsp;&nbsp;{" "}
                <span className="mt-1" style={{ color: "#919493" }}>
                  {review?.length}Ratings
                </span>
              </div>
              <div className="d-flex gap-2 mt-2  ">
                <span style={{ fontWeight: "600" }} className="fs-6 ">
                  {item.StreetAdrress}
                </span>
                <span style={{ color: "green", fontWeight: "500" }}>
                  Open 24hr
                </span>
              </div>

              <div className="d-flex gap-3 mt-2">
                <div
                  style={{
                    width: "170px",
                    height: "35px",
                    background: "green",
                    borderRadius: "5px",
                    color: "white",
                    boxShadow: "2px 2px #919493",
                  }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <LocalPhoneIcon />
                  <span>{item.Phone}</span>
                </div>
                <a
                  href={`https://wa.me/${item.Phone}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      width: "70px",
                      height: "35px",
                      background: "white",
                      borderRadius: "5px",
                      color: "black",
                      fontWeight: "500",
                    }}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <img src="/whatsapp.png" alt="" style={{ width: "25px" }} />{" "}
                    chat
                  </div>
                </a>
                <Button style={{background:"blue",color:"white"}} onClick={()=>clickservice(item._id)} >Edit</Button>
                <Button style={{background:"red",color:"white"}} onClick={()=>removeService(item._id)} >Delete</Button>
               
              </div>
              <h4 className="text-center mt-5 " style={{ fontWeight: "600" }}>
                  {" "}
                  More info
                </h4>
              <div className="row mt-5 ">
             
                <div className="col-md-4 ">
                  <h5 className=" mt-3" style={{ fontWeight: "bold" }}>
                    General Info
                  </h5>
                  <p className="mt-4">
                    t ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining ess{" "}
                  </p>

                  <h5 className=" mt-4" style={{ fontWeight: "bold" }}>
                    payment method
                  </h5>
                  <h5 className=" mt-4" style={{ fontWeight: "bold" }}>
                    products
                  </h5>
                  <p>
                    s roots in a piece of classical Latin literature from 45 BC,
                    making it over 2000 years old. Richard McClintock, a Latin
                    professor at Hampden-Sydney College in Virginia, looke
                  </p>
                </div>
                <div className="col-md-4 ms-2">

                  <h5 className=" mt-4" style={{ fontWeight: "bold" }}>
                    timing
                  </h5>
                  <p>
                    {" "}
                    <span style={{ fontWeight: "600" }}> Mon-Sat: </span>{" "}
                    9:00-5:00{" "}
                  </p>
                  <h5 className=" mt-4" style={{ fontWeight: "bold" }}>
                    Category
                  </h5>
                  Shop ,Category
                  <h5 className=" mt-4" style={{ fontWeight: "bold" }}>
                    features
                  </h5>
                  ur, or randomised words which <br />
                  look even slightly believable. If <br />
                  going to use a passage of Lorem <br />
                  you need to be sure there
                
                </div>
                <div className="col-md-3 ">
                  <h5 className=" mt-4 " style={{ fontWeight: "bold" }}>
                    Address
                  </h5>
                  <p
                    style={{ listStyle: "none" }}
                    className="d-flex flex-column gap-3 mt-2"
                  >
                    onvallis, ipsum in lacinia facilisis, dui augue fringilla
                    dui, nec pulvinar enim mauris vit mauris. Proin ante urna,
                    aliq
                    <li style={{ fontWeight: "500" }}>
                      <LocalPhoneIcon style={{ color: "#058df5" }} />
                      &nbsp;{item.Phone}
                    </li>
                    <li style={{ fontWeight: "500" }}>
                      <EmailIcon style={{ color: "#058df5" }} />
                      &nbsp; irfanpm@gmail.com
                    </li>
                    <li style={{ fontWeight: "500" }}>
                      <LanguageIcon style={{ color: "#058df5" }} /> &nbsp;Visit
                      Our Website
                    </li>
                    <li style={{ fontWeight: "600" }}>
                      <WhatsAppIcon style={{ color: "#058df5" }} />
                      &nbsp; Whatsapp
                    </li>
                    <li style={{ fontWeight: "600" }}>
                      <LocationOnIcon style={{ color: "#058df5" }} />
                      &nbsp;{item.StreetAdrress}
                    </li>
                    <li style={{ fontWeight: "600" }}>
                      <InstagramIcon style={{ color: "#058df5" }} />
                      &nbsp;Instagram
                    </li>
                    <li style={{ fontWeight: "600" }}>
                      <FacebookIcon style={{ color: "#058df5" }} />
                      &nbsp;Facebook
                    </li>
                  </p>
                </div>
              </div>
             
            </div>
            <div className="row">
            <div className="col-md-6 mt-4">
              <h5 style={{fontWeight:"600"}}>show reviews</h5>
      {review?.slice(0, visibleReviews).map((data, index) => (
        <div key={index} className="mt-5">
          <div className="d-flex align-items-center ">
            <Avatar alt="Remy Sharp" src={data.userId.avatar} />&nbsp;
            <h6 className="mt-1">{data.userId.Username}</h6>
          </div>
          <div>
            <Rating
              name="rating"
              defaultValue={data.Rating}
              precision={0.5}
              size="large"
              readOnly
            />
            <p>{data.Comment}</p>
          </div>
        </div>
      ))}
      {review && visibleReviews < review.length && (

          <button onClick={handleShowMore} style={{fontWeight:"600"}}>Show More</button>
      )}
    </div>
    <div className="col-md-6 mt-4">
                <div>

              <MapContainer
        className="leaflet-map"
        center={[latitude, longitude]}
        zoom={17}
        scrollWheelZoom={true}
        style={{ height: "50vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={icon}>
          <Popup>Here you are ^_^</Popup>
        </Marker>
      </MapContainer>
                </div>  
              </div>
          
          </div>
          </div>
        
      )}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent>
          <ImageList>
            {modalImages.slice(4).map((image, index) => (
              <ImageListItem key={index}>
                <img src={image} alt="image" />
              </ImageListItem>
            ))}
          </ImageList>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Servicedetailsection;
