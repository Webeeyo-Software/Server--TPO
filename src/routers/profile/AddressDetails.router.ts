// routes/studentRoutes.ts
import {Router} from "express";
import { createAddressDetails,getAddressDetails,updateAddressDetails} from "../../controllers/profile/AddressDetails.controller";

const Addressrouter = Router();


// POST /students/address
Addressrouter.post("/address", createAddressDetails);

// GET /students/address/:registrationNo
Addressrouter.get("/address/:registrationNo", getAddressDetails);

// PUT /students/address/:registrationNo
Addressrouter.put("/address/:registrationNo", updateAddressDetails);

export default Addressrouter;
