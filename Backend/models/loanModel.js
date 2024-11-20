import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
import mongoConnect from "../Database/db.js";
mongoConnect();
const connection = mongoose.connection;
const AutoIncrement = AutoIncrementFactory(connection);

const loanSchema = new mongoose.Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    loanamount: {
      type: Number,
      required: true,
    },
    loantype: {
      type: String,
      required: true,
    },
    loanstatus: {
      type: String,
      required: true,
      default: "pending",
    },
    loanplan: {
      type: String,
      required: true,
    },
  },
  { _id: false, timestamps: true }
);

// Add auto-increment to the schema
loanSchema.plugin(AutoIncrement, { id: "loan_id_counter", inc_field: "_id" });

export const loanDetails = mongoose.model("LoanDetails", loanSchema);
