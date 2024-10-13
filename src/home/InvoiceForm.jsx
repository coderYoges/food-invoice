import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { PageTitles, menuCombosList, ButtonLabels } from "../config/constants";
import {
  FaUserPlus,
  FaRegAddressBook,
  FaLocationArrow,
  FaCalendarAlt,
  FaArchive,
  FaArrowAltCircleRight,
  FaCity
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import { MdOutlineMenuBook, MdOutlineClose } from "react-icons/md";
import { Modal } from "react-responsive-modal";
import { TiDelete, TiTick } from "react-icons/ti";
import { SiVirustotal } from "react-icons/si";
import { TbBrandUnity } from "react-icons/tb";
import {
  InvoiceInitialValues,
  InvoiceSchema,
  InvoiceFormItem,
} from "../config/yup-config";
import { isEmpty } from "lodash";
import { setInvoice, resetInvoice } from "../redux/reducer";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const InvoiceWrapper = styled.div`
  width: 75%;
  min-height: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  margin: auto;
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

const ErrorStyled = styled.div`
  color: #000;
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.2;
  word-spacing: 0.2rem;
  font-weight: 400;
  user-select: none;
`;

const InvoiceForm = ({ resetInvoice, setInvoice, invoiceHistory }) => {
  console.log(invoiceHistory);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(
    menuCombosList[0]["items"]
  );
  useEffect(() => {
    resetInvoice();
  }, [resetInvoice]);

  const lastInvNumber = isEmpty(invoiceHistory)
    ? 0
    : invoiceHistory[invoiceHistory.length - 1]["invoiceNumber"];

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <InvoiceWrapper>
      <Formik
        initialValues={InvoiceInitialValues}
        validationSchema={InvoiceSchema}
        onSubmit={async (values, actions) => {
          const docData = {
            invoiceNumber: lastInvNumber + 1,
            customerName: values.customerName,
            customerAddress1: values.customerAddress1,
            customerAddress2: values.customerAddress2,
            customerLocality: values.customerLocality,
            customerCity: values.customerCity,
            customerPinCode: values.customerPinCode,
            functionName: values.functionName,
            functionDate: new Date(values.functionDate).toJSON().slice(0, 10),
            invoiceDate: new Date().toJSON().slice(0, 10),
            totalUnits: values.totalUnits,
            comboSelection: values.comboSelection,
            pricePerPlate: values.pricePerPlate,
            totalPrice: values.totalPrice,
            selectedItems: selectedItems,
          };
          setInvoice(docData);
          const myCollection = collection(db, "invoice-items-list");
          await addDoc(myCollection, docData);
          navigate("/review", { replace: true });
          actions.resetForm();
        }}
      >
        {({ values, errors, handleChange, setFieldValue }) => {
          return (
            <Form className="mt-4" autoComplete="off">
              <InvoiceSubHeader>{PageTitles.CUSTOMER_DETAILS}</InvoiceSubHeader>
              <div className="input-group uf-input-group input-group-lg mb-3">
                <FaUserPlus className="form-icon-style" />
                <Field
                  type="text"
                  name={InvoiceFormItem.customerName}
                  className="form-control"
                  placeholder={InvoiceFormItem.customerNamePL}
                  autoComplete="off"
                  maxLength={20}
                />
              </div>
              <ErrorStyled>
                <ErrorMessage name={InvoiceFormItem.customerName} />
              </ErrorStyled>

              <div className="input-group uf-input-group input-group-lg mb-3">
                <FaRegAddressBook className="form-icon-style" />
                <Field
                  type="text"
                  name={InvoiceFormItem.customerAddress1}
                  className="form-control"
                  placeholder={InvoiceFormItem.customerAddress1PL}
                  autoComplete="off"
                  maxLength={20}
                />
              </div>
              <ErrorStyled>
                <ErrorMessage name={InvoiceFormItem.customerAddress1} />
              </ErrorStyled>

              <div className="input-group uf-input-group input-group-lg mb-3">
                <FaRegAddressBook className="form-icon-style" />
                <Field
                  type="text"
                  name={InvoiceFormItem.customerAddress2}
                  className="form-control"
                  placeholder={InvoiceFormItem.customerAddress2PL}
                  autoComplete="off"
                  maxLength={20}
                />
              </div>
              <ErrorStyled>
                <ErrorMessage name={InvoiceFormItem.customerAddress2} />
              </ErrorStyled>

              <div className="input-group uf-input-group input-group-lg mb-3">
                <FaLocationArrow className="form-icon-style" />
                <Field
                  type="text"
                  name={InvoiceFormItem.customerLocality}
                  className="form-control"
                  placeholder={InvoiceFormItem.customerLocalityPL}
                  autoComplete="off"
                  maxLength={20}
                />
              </div>
              <ErrorStyled>
                <ErrorMessage name={InvoiceFormItem.customerLocality} />
              </ErrorStyled>

              <div className="input-group uf-input-group input-group-lg mb-3">
                <FaCity className="form-icon-style" />
                <Field
                  type="text"
                  name={InvoiceFormItem.customerCity}
                  className="form-control"
                  placeholder={InvoiceFormItem.customerCityPL}
                  autoComplete="off"
                  maxLength={10}
                />
              </div>
              <ErrorStyled>
                <ErrorMessage name={InvoiceFormItem.customerCity} />
              </ErrorStyled>
              <div className="input-group uf-input-group input-group-lg mb-3">
                <FaLocationDot className="form-icon-style" />
                <Field
                  type="text"
                  name={InvoiceFormItem.customerPinCode}
                  className="form-control"
                  placeholder={InvoiceFormItem.customerPinCodePL}
                  autoComplete="off"
                  maxLength={6}
                />
              </div>
              <ErrorStyled>
                <ErrorMessage name={InvoiceFormItem.customerPinCode} />
              </ErrorStyled>

              <InvoiceSubHeader>{PageTitles.FUNCTION_DETAILS}</InvoiceSubHeader>
              <div className="input-group uf-input-group input-group-lg mb-3">
                <GrGroup className="form-icon-style" />
                <Field
                  type="text"
                  name={InvoiceFormItem.functionName}
                  className="form-control"
                  placeholder={InvoiceFormItem.functionNamePL}
                  autoComplete="off"
                  maxLength={10}
                />
              </div>
              <ErrorStyled>
                <ErrorMessage name={InvoiceFormItem.functionName} />
              </ErrorStyled>

              <div className="input-group uf-input-group input-group-lg mb-3">
                <FaCalendarAlt className="form-icon-style" />
                <Field
                  type="date"
                  name={InvoiceFormItem.functionDate}
                  className="form-control"
                  placeholder={InvoiceFormItem.functionDatePL}
                  autoComplete="off"
                />
              </div>
              <ErrorStyled>
                <ErrorMessage name={InvoiceFormItem.functionDate} />
              </ErrorStyled>

              <div className="input-group uf-input-group input-group-lg mb-3">
                <FaArchive className="form-icon-style" />
                <Field
                  type="number"
                  name={InvoiceFormItem.totalUnits}
                  className="form-control"
                  placeholder={InvoiceFormItem.totalUnitsPL}
                  autoComplete="off"
                  maxLength={10}
                />
              </div>

              <InvoiceSubHeader>{PageTitles.MENU_DETAILS}</InvoiceSubHeader>

              <div className="input-group uf-input-group input-group-lg mb-3">
                <MdOutlineMenuBook className="form-icon-style" />
                <Field
                  name={InvoiceFormItem.comboSelection}
                  as="select"
                  className="form-select"
                  placeholder={InvoiceFormItem.comboSelectionPL}
                  autoComplete="off"
                  style={{
                    background: "#ffffff70",
                    border: "unset",
                    fontWeight: "400",
                    lineHeight: "1.5",
                    fontSize: "1rem",
                  }}
                  onChange={(e) => {
                    setSelectedItems(menuCombosList[e.target.value]["items"]);
                    handleChange(e);
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
                <TbBrandUnity className="form-icon-style" />
                <Field
                  type="number"
                  name={InvoiceFormItem.pricePerPlate}
                  className="form-control"
                  placeholder={InvoiceFormItem.pricePerPlatePL}
                  autoComplete="off"
                  maxLength={10}
                />
              </div>

              <div className="input-group uf-input-group input-group-lg mb-3">
                <SiVirustotal className="form-icon-style" />
                <Field
                  type="number"
                  name={InvoiceFormItem.totalPrice}
                  className="form-control"
                  placeholder={InvoiceFormItem.totalPricePL}
                  autoComplete="off"
                />
              </div>
              <ErrorStyled>
                <ErrorMessage name={InvoiceFormItem.totalPrice} />
              </ErrorStyled>

              <Modal
                open={open}
                onClose={onCloseModal}
                center
                classNames={{
                  modal: "customModal",
                }}
              >
                <h2 className="mt-4 mb-4 text-center ">
                  {PageTitles.MENU_ITEMS}
                </h2>
                <ul className="row m-0 p-0">
                  {selectedItems.map((item, index) => (
                    <li
                      className="col-6 p-2"
                      style={{ border: "1px solid #808080" }}
                      key={`menu-item-${item}-${index}`}
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
                    className="col-6 p-2 d-flex"
                    style={{ border: "1px solid #808080" }}
                  >
                    <Field
                      type="text"
                      style={{
                        border: "1px solid #000",
                        display: "flex",
                        width: "80%",
                        backgroundColor: "#b2dbbf",
                      }}
                      placeholder={InvoiceFormItem.newItemPL}
                      name="newItem"
                      autoComplete="off"
                    />
                    <TiTick
                      className="cross-icon-style text-success mx-2"
                      onClick={() => {
                        if (values.newItem) {
                          const updatedItem = [
                            ...selectedItems,
                            values.newItem,
                          ];
                          setSelectedItems(updatedItem);
                          setFieldValue(InvoiceFormItem.newItem, "");
                        }
                      }}
                    />
                    <MdOutlineClose
                      className="cross-icon-style text-secondary mx-2"
                      onClick={() => setFieldValue(InvoiceFormItem.newItem, "")}
                    />
                  </li>
                </ul>
              </Modal>

              <div className="d-flex mt-5 justify-content-around">
                <button
                  type="reset"
                  className="btn uf-btn-secondary btn-lg w-100"
                >
                  {ButtonLabels.RESET}
                </button>
                <div className="d-flex w-50" />
                <button
                  type="submit"
                  disabled={!isEmpty(errors)}
                  className="btn uf-btn-primary btn-lg w-100"
                >
                  {ButtonLabels.SUBMIT}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </InvoiceWrapper>
  );
};

const mapStateToProps = (state) => ({
  invoiceCurrentItems: state.auth.invoiceCurrentItems,
  invoiceHistory: state.auth.invoiceHistory,
});

const mapDispatchToProps = {
  setInvoice: setInvoice,
  resetInvoice: resetInvoice,
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm);
