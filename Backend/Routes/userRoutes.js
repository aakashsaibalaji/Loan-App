import express from "express";
import {
  singleUserDetails,
  updateUser,
  userCreate,
} from "../Controllers/userController.js";

const router = express.Router();

router.post("/", userCreate);
router.get("/:email", singleUserDetails);
router.put("/update/:email", updateUser);

export default router;
