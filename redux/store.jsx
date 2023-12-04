import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth";
import getuser from "./features/getuser";
import getService from "./features/getService";
import serviceimage from "./features/serviceimage";
import deleteService from "./features/deleteService";
import findService from "./features/findService";
import showservice from "./features/showservice";
import showservicedetails from "./features/showservicedetails";
import reviewdisplay from "./features/reviewdisplay";
import averagerating from "./features/averagerating";
import favourite from "./features/favourite";
import showfavourite from "./features/showfavourite";
import getuserfavourite from "./features/getuserfavourite";
import deleteimageservice from "./features/deleteimageservice";
import adminfeatures from "./features/adminredux/adminfeatures";
import searchredux from "./features/searchredux";

export const store = configureStore({
    reducer:{
        service:getService,
        user:getuser ,
        Auth:auth ,
        image:serviceimage,
        delete:deleteService,
        findservie:findService,
        showservice:showservice,
        servicedetails:showservicedetails,
        review:reviewdisplay,
        avgreview:averagerating,
        fav:favourite,
        showfav:showfavourite,
        userfav:getuserfavourite,
        deletimg:deleteimageservice,
        search:searchredux,

        //adminstore
        admin:adminfeatures




    }




})

 