import { Router } from "express";
import { addRegistration } from "../../controllers/tpoRegistration/addRegistration";
import { getRegistrationsByUser } from "../../controllers/tpoRegistration/getRegistrations";
import { deleteRegistration } from "../../controllers/tpoRegistration/deleteRegistration";
// import { requireAuth } from "../../middleware/auth"; // uncomment if auth is needed

const router = Router();

router.post("/registrations", addRegistration);
router.get("/registrations/user/:userId", getRegistrationsByUser);
router.delete("/:id", deleteRegistration);

export default router;
