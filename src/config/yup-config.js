import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  username: Yup.string().min(4, "Too Short!").required("Required"),
  password: Yup.string()
    .min(4, "Too Short!")
    .max(12, "Too Long!")
    .required("Required"),
});

export const SignUpInitialValues = {
  username: "",
  password: "",
};

export const InvoiceSchema = Yup.object().shape({
  customerName: Yup.string()
    .min(4, "* Customer name should be greater than 4 characters")
    .max(20, "* Customer name should be less than 20 characters!")
    .required("* Customer name is required"),
  customerAddress1: Yup.string()
    .min(4, "* Address Line 1 should be greater than 4 characters")
    .max(20, "* Address Line 1 should be less than 20 characters!")
    .required("* Address Line 1 is required"),
  customerAddress2: Yup.string()
    .min(4, "* Address Line 2 should be greater than 4 characters")
    .max(20, "* Address Line 2 should be less than 20 characters!")
    .required("* Address Line 2 is required"),
  customerLocality: Yup.string()
    .min(4, "* Area name should be greater than 4 characters")
    .max(20, "* Area name should be less than 20 characters!")
    .required("* Area name is required"),
  customerCity: Yup.string()
    .min(4, "* City name should be greater than 4 characters")
    .max(20, "* City name should be less than 10 characters!")
    .required("* City name is required"),
  customerPinCode: Yup.string()
    .test(
      "len",
      "* Pin code must be exactly 6 characters",
      (val) => val && val.toString().length === 6
    )
    .required("* Area Pincode is required"),
  functionName: Yup.string()
    .min(3, "* Function name should be greater than 3 characters")
    .max(10, "* Function name should be less than 10 characters!")
    .required("* Function name is required"),
  functionDate: Yup.date().required("* Function date is required"),
  totalPrice: Yup.number()
    .min(100, "* Minimum value should be 100")
    .max(1000000, "* Maximum value should be 10 lakh")
    .required("* Total price is required"),
});

export const InvoiceInitialValues = {
  customerName: "",
  customerAddress1: "",
  customerAddress2: "",
  customerLocality: "",
  customerCity: '',
  customerPinCode: '',
  functionName: "",
  functionDate: "",
  totalUnits: null,
  comboSelection: 0,
  pricePerPlate: null,
  totalPrice: undefined,
  newItem: null,
};

export const InvoiceFormItem = {
  customerName: "customerName",
  customerNamePL: "Customer Name",
  customerAddress1: "customerAddress1",
  customerAddress1PL: "Address Line 1",
  customerAddress2: "customerAddress2",
  customerAddress2PL: "Address Line 2",
  customerLocality: "customerLocality",
  customerLocalityPL: "Customer Locality",
  customerPinCode: "customerPinCode",
  customerPinCodePL: "Customer Pincode",
  functionName: "functionName",
  functionNamePL: "Function Name",
  functionDate: "functionDate",
  functionDatePL: "Function Date",
  totalUnits: "totalUnits",
  totalUnitsPL: "Function Total Units",
  comboSelection: "comboSelection",
  comboSelectionPL: "Function Combo Selection",
  pricePerPlate: "pricePerPlate",
  pricePerPlatePL: "Price per Plate",
  totalPrice: "totalPrice",
  totalPricePL: "Total Amount",
  newItem: "newItem",
  newItemPL: "add new item",
  total: "Total",
  message: "Thank you for your business",
  mobileNumber: "+91 97899-25091",
  emailAddress: "h.a.briyani1974@gmail.com",
  website: "www.ha-biryani.com",
  ownerName: "MUZZAFAR HUSSAIN",
  companyName: "H.A. BRIYANI CATERING",
  footerNotes:
    "#19/49, Teed’s Garden, 7th street, Sembiyum, Perambur, Chennai 600011.",
  customerCity: "customerCity",
  customerCityPL: "Customer City Name",
};
