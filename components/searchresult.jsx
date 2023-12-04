"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Servicedetails } from "@/redux/features/showservicedetails";

import { useRouter } from "next/navigation";
import { getReview } from "@/redux/features/reviewdisplay";
import { showfavourite } from "@/redux/features/showfavourite";
import { Box, Rating, Skeleton } from "@mui/material";
import serviceNavbar from "./Navbar 2";

function Searchresult() {
  const router = useRouter();

  const dispatch = useDispatch();
  const avgreviews = useSelector((state) => state.avgreview.review.data);
  const search = useSelector((state) => state.search.search.data);

  console.log(avgreviews);

  const handleshowservice = (id) => {
    dispatch(Servicedetails(id));
    dispatch(getReview(id));

    dispatch(showfavourite());

    router.push(`/user/servicedetails/${id}`);
  };
  return (
    <div className="row   m-3  ">
      <div className="col-md-7">
        {search?.length != 0 ? (
          <>
            {search?.map((data,index) =>
              data ? (
                <Card
                  sx={{ display: "flex", height: "150px" }}
                  className="mt-3 col-md-12"
                  key={index}
                  onClick={() => {
                    handleshowservice(data._id);
                  }}

                >
                  <CardMedia
                    component="img"
                    sx={{ width: 160 }}
                    image={data.Image[0]}
                    alt="Live from space album cover"
                  />
                  <div className="d-flex gap-5">
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h5">
                          {data.serviceName}
                        </Typography>
                        <Typography
                          variant="p"
                          color="text.secondary"
                          component="div"
                        >
                          <Rating
                            name="read-only"
                            precision={0.5}
                            value={data?.Avgrating}
                            readOnly
                          />
                          <p>{data.Timing}</p>
                        </Typography>
                      </CardContent>
                    </Box>
                    <div className="d-flex flex-column mt-4"></div>
                  </div>
                </Card>
              ) : (
                <Skeleton variant="rectangular" key={index} width={210} height={60} />
              )
            )}
          </>
        ) : (
          <div>
            <h1>Service Not Available</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Searchresult;
