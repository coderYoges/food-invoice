import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PageTitles, menuCombosList } from "../config/constants";
import {
  FaUserPlus,
  FaRegAddressBook,
  FaLocationArrow,
  FaCalendarAlt,
  FaArchive,
  FaArrowAltCircleRight,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import { MdOutlineMenuBook } from "react-icons/md";
import { Modal } from "react-responsive-modal";
import { TiDelete } from "react-icons/ti";

const InvoiceWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const InvoiceSubHeader = styled.div`
  color: #fff;
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  line-height: 1.2;
  word-spacing: 0.2rem;
  font-weight: 400;
  user-select: none;
`;

const SignupSchema = Yup.object().shape({
  username: Yup.string().min(4, "Too Short!").required("Required"),
  password: Yup.string()
    .min(4, "Too Short!")
    .max(12, "Too Long!")
    .required("Required"),
});

const InvoiceForm = () => {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(
    menuCombosList[0]["items"]
  );
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <InvoiceWrapper>
      <Formik
        initialValues={{
          customerName: "",
          customerAddress1: "",
          customerAddress2: "",
          customerLocality: "",
          customerPinCode: "",
          functionName: "",
          functionDate: "",
          totalUnits: "",
          comboSelection: 0,
          pricePerPlate: "",
          totalPrice: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          // signInWithEmailAndPassword(auth, values.username, values.password)
          //   .then((userCreditionals) => setAuth(true))
          //   .then(() => navigate("/home", { replace: true }))
          //   .catch((error) => alert("Incorrect username or password"));
          // actions.resetForm();
        }}
      >
        {({ values, errors, isSubmitting }) => {
          return (
            <Form className="mt-4" autoComplete="off">
              <InvoiceSubHeader>{PageTitles.CUSTOMER_DETAILS}</InvoiceSubHeader>
              <div className="input-group uf-input-group input-group-lg mb-3">
                <FaUserPlus className="form-icon-style" />
                <Field
                  type="text"
                  name="customerName"
                  className="form-control"
                  placeholder="Customer Name"
                  autoComplete="off"
                />
              </div>

              <div className="input-group uf-input-group input-group-lg mb-3">
                <FaRegAddressBook className="form-icon-style" />
                <Field
                  type="text"
                  name="customerAddress1"
                  className="form-control"
                  placeholder="Address Line 1"
                  autoComplete="off"
                />
              </div>

              <div className="input-group uf-input-group input-group-lg mb-3">
                <FaRegAddressBook className="form-icon-style" />
                <Field
                  type="text"
                  name="customerAddress2"
                  className="form-control"
                  placeholder="Address Line 2"
                  autoComplete="off"
                />
              </div>

              <div className="input-group uf-input-group input-group-lg mb-3">
                <FaLocationArrow className="form-icon-style" />
                <Field
                  type="text"
                  name="customerLocality"
                  className="form-control"
                  placeholder="Customer Locality"
                  autoComplete="off"
                />
              </div>

              <div className="input-group uf-input-group input-group-lg mb-3">
                <FaLocationDot className="form-icon-style" />
                <Field
                  type="number"
                  name="customerPinCode"
                  className="form-control"
                  placeholder="Customer Pincode"
                  autoComplete="off"
                />
              </div>
              <InvoiceSubHeader>{PageTitles.FUNCTION_DETAILS}</InvoiceSubHeader>
              <div className="input-group uf-input-group input-group-lg mb-3">
                <GrGroup className="form-icon-style" />
                <Field
                  type="text"
                  name="functionName"
                  className="form-control"
                  placeholder="Function Name"
                  autoComplete="off"
                />
              </div>

              <div className="input-group uf-input-group input-group-lg mb-3">
                <FaCalendarAlt className="form-icon-style" />
                <Field
                  type="date"
                  name="functionDate"
                  className="form-control"
                  placeholder="Function Date"
                  autoComplete="off"
                />
              </div>

              <div className="input-group uf-input-group input-group-lg mb-3">
                <FaArchive className="form-icon-style" />
                <Field
                  type="number"
                  name="totalUnits"
                  className="form-control"
                  placeholder="Function Total Units"
                  autoComplete="off"
                />
              </div>

              <InvoiceSubHeader>{PageTitles.MENU_DETAILS}</InvoiceSubHeader>

              <div className="input-group uf-input-group input-group-lg mb-3">
                <MdOutlineMenuBook className="form-icon-style" />
                <Field
                  name="comboSelection"
                  as="select"
                  className="form-select"
                  placeholder="Function Combo Selection"
                  autoComplete="off"
                  style={{
                    background: "#ffffff70",
                    border: "unset",
                    fontWeight: "400",
                    lineHeight: "1.5",
                    fontSize: "1rem",
                  }}
                >
                  {menuCombosList.map((menu, index) => (
                    <option key={menu.comboName} value={index}>
                      {menu.comboName}
                    </option>
                  ))}
                </Field>
                <FaArrowAltCircleRight
                  className="form-icon-style-right"
                  onClick={onOpenModal}
                />
              </div>

              <div className="input-group uf-input-group input-group-lg mb-3">
                <FaArchive className="form-icon-style" />
                <Field
                  type="number"
                  name="pricePerPlate"
                  className="form-control"
                  placeholder="Price per Plate"
                  autoComplete="off"
                />
              </div>

              <div className="input-group uf-input-group input-group-lg mb-3">
                <FaArchive className="form-icon-style" />
                <Field
                  type="number"
                  name="totalPrice"
                  className="form-control"
                  placeholder="Total Amount"
                  autoComplete="off"
                />
              </div>

              <Modal open={open} onClose={onCloseModal} center>
                <h2 className="mt-4 mb-4 text-center ">
                  List of Selected Items
                </h2>
                <ul className="row m-0 p-0">
                  {selectedItems.map((item, index) => (
                    <li
                      className="col-6 p-2"
                      style={{ border: "1px solid #808080" }}
                      key={item}
                    >
                      {item}
                      <TiDelete
                        className="cross-icon-style"
                        onClick={() => {
                          const updatedItem = selectedItems.toSpliced(index, 1);
                          setSelectedItems(updatedItem);
                        }}
                      />
                    </li>
                  ))}
                  <li
                    className="col-6 p-2"
                    style={{ border: "1px solid #808080" }}
                  >
                    <input
                      type="text"
                      style={{ width: "100%", border: "0" }}
                      placeholder="add item"
                    />
                  </li>
                </ul>
              </Modal>

              {/* <div className="d-grid mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !isEmpty(errors)}
                  className="btn uf-btn-primary btn-lg"
                >
                  {isSubmitting ? (
                    <div
                      className="spinner-border text-light"
                      role="status"
                    ></div>
                  ) : (
                    "Login"
                  )}
                </button>
              </div> */}
            </Form>
          );
        }}
      </Formik>
    </InvoiceWrapper>
  );
};

export default InvoiceForm;
