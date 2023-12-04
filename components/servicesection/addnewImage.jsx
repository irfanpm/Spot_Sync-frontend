"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getCookies } from "cookies-next";

import NewServiceupload from "./newimageuploader";
import findService from "@/redux/features/findService";
import { useDispatch } from "react-redux";

const cookie = getCookies("token");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddNewImage({id}) {
  const dispatch=useDispatch()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [banner, setBanner] = useState(null);
  const [imageURL, setImageURL] = useState(null);
const [tr,settr]=useState(true)
  const router = useRouter();
  const handleRefresh = () => {
    dispatch(findService(id))

  };

  const handleupload = async () => {
    try {
      const url = await NewServiceupload(banner);

      await axios.put(
        "http://127.0.0.1:8000/api/service/addimage",
        {
          url: url,
          serviceid:id
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      handleRefresh();
      setOpen(false);
    } catch (error) {
      console.log("from upload", error.message);
    }
  };
  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    setBanner(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setImageURL(url);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    e.target.reset()
  };

  return (
    <div>
        <Button  onClick={handleOpen} style={{background:"red",color:"white"}}>Add new Image</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={style}
          style={{ backgroundColor: "#fffff", borderRadius: "25px" }}
          onSubmit={handlesubmit}
        >
          <Typography component="h5" variant="h6" align="center">
            Add New image
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "90%",
                maxWidth: "400px",
                minHeight: "100px",
                border: "2px dashed #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                padding: "20px",
              }}
            >
              {imageURL ? (
                <img
                  src={imageURL}
                  alt="Selected Banner"
                  style={{ maxWidth: "100%" }}
                />
              ) : (
                <IconButton component="label" color="secondary">
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageUpload(e)}
                  />
                  <AddPhotoAlternateIcon
                    fontSize="large"
                    style={{ color: "grey" }}
                  />
                </IconButton>
              )}
            </div>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => handleupload()}
              style={{
                background: "red",
                color: "white",
                borderRadius: "25px",
              }}
              sx={{ mt: 3, mb: 2 }}
            >
              Set Banner
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}