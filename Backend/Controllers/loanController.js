import { loanDetails } from "../models/loanModel.js";
//create a loan application.
export const createLoan = async (req, res) => {
  try {
    const { name, email, phone, loanamount, loantype, loanplan } = req.body;
    const existingLoan = await loanDetails.findOne({ email, loantype });
    if (existingLoan) {
      return res
        .status(400)
        .json({ message: "Loan already exists for this type and email." });
    }
    const loan = new loanDetails({
      name,
      email,
      phone,
      loanamount,
      loantype,
      loanplan,
    });
    const savedLoan = await loan.save();

    res.status(200).json({
      message: "Loan created successfully",
      loan: savedLoan,
    });
  } catch (error) {
    console.error("Error creating loan:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Get All Loans API.
export const getAllLoans = async (req, res) => {
  try {
    const loans = await loanDetails.find();
    res.status(200).json(loans);
  } catch (error) {
    console.error("Error fetching loans:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getLoansPending = async (req, res) => {
  try {
    const loans = await loanDetails.find({ loanstatus: "pending" });
    res.status(200).json(loans);
  } catch (error) {
    console.error("Error fetching loans:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Delete Loan API.
export const deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLoan = await loanDetails.findByIdAndDelete(id);
    if (!deletedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json({ message: "Loan deleted successfully" });
  } catch (error) {
    console.error("Error deleting loan:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//update the status of loan application.
export const updateLoanStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { loanStatus } = req.body;
    const validStatuses = ["approved", "decline"];
    if (!validStatuses.includes(loanStatus)) {
      return res.status(400).json({
        message: `Invalid loan status. Valid statuses are: ${validStatuses.join(
          ", "
        )}`,
      });
    }
    const updatedLoan = await loanDetails.findByIdAndUpdate(
      id,
      { loanstatus: loanStatus },
      { new: true }
    );
    if (!updatedLoan) {
      return res.status(404).json({
        message: "Loan not found",
      });
    }
    res.status(200).json({
      message: "Loan status updated successfully",
      loan: updatedLoan,
    });
  } catch (error) {
    console.error("Error updating loan status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//get single user loan details.
export const getLoanByEmail = async (req, res) => {
  try {
    const { email } = req.params; // Email from the request parameters
    // Find the loan using the email
    const loan = await loanDetails.findOne({ email });

    if (!loan) {
      return res.status(404).json({
        message: "Loan not found for the provided email",
      });
    }
    // Return the loan details
    res.status(200).json({
      loan,
    });
  } catch (error) {
    console.error("Error fetching loan by email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
