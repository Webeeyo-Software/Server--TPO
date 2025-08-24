// routes/studentRoutes.ts
import {Router} from "express";
import { createAddressDetails,getAddressDetails,updateAddressDetails} from "../../controllers/profile/AddressDetails.controller";

const Addressrouter = Router();


// POST /students/address
Addressrouter.post("/", createAddressDetails);

// GET /students/address/:registrationNo
Addressrouter.get("/:registrationNo", getAddressDetails);

// PUT /students/address/:registrationNo
Addressrouter.put("/:registrationNo", updateAddressDetails);

export default Addressrouter;
