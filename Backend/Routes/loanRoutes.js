import express from "express";
import {
  createLoan,
  deleteLoan,
  getAllLoans,
  getLoanByEmail,
  getLoansPending,
  updateLoanStatus,
} from "../Controllers/loanController.js";

const router = express.Router();

router.post("/", createLoan);
router.get("/all", getAllLoans);
router.delete("/:id", deleteLoan);
router.get("/pending", getLoansPending);
router.patch("/:id/status", updateLoanStatus);
router.get("/email/:email", getLoanByEmail);

export default router;
