import React, { Fragment } from "react";
import styled from "styled-components";
import { InvoiceFormItem } from "../config/yup-config";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

const ContentTableHeader = styled.div`
  background: #000;
  padding: 0.5rem;
  color: #fff;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
`;

const HeaderCustWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 3rem;
`;

const CustNameStyled = styled.div`
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 0.5rem;
`;

const CustDetailsStyled = styled.div`
  display: flex;
  font-size: 1rem;
  font-weight: 400;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const OwnerWrapper = styled.div`
  margin-top: 4rem;
  text-align: center;
  border-top: 1px solid #666;
  padding-top: 0.25rem;
`;

const OwnerNameStyled = styled.div`
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 600;
  color: #000;
  letter-spacing: 1px;
`;

const FooterNotes = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 400;
  margin-bottom: 2rem;
`;

export const ReviewFooter = ({ invoiceCurrentItems }) => {
  return (
    <Fragment>
      <div className="row mt-4">
        <div className="col-7"></div>
        <ContentTableHeader
          className="col-2"
          style={{ borderRight: "1px solid #fff" }}
        >
          <div>{InvoiceFormItem.total}</div>
        </ContentTableHeader>
        <ContentTableHeader className="col-3">
          <div>{invoiceCurrentItems.totalPrice}</div>
        </ContentTableHeader>
      </div>
      <HeaderCustWrapper className="row">
        <div className="col-8">
          <CustNameStyled>{InvoiceFormItem.message}</CustNameStyled>
          <CustDetailsStyled>
            <FaPhoneSquareAlt className="invoice-icon-style" />
            {InvoiceFormItem.mobileNumber}
          </CustDetailsStyled>
          <CustDetailsStyled>
            <MdEmail className="invoice-icon-style" />
            {InvoiceFormItem.emailAddress}
          </CustDetailsStyled>
          <CustDetailsStyled>
            <TbWorld className="invoice-icon-style" />
            {InvoiceFormItem.website}
          </CustDetailsStyled>
        </div>
        <OwnerWrapper className="col-4">
          <OwnerNameStyled>{InvoiceFormItem.ownerName}</OwnerNameStyled>
          <div>{InvoiceFormItem.companyName}</div>
        </OwnerWrapper>
      </HeaderCustWrapper>
      <FooterNotes>{InvoiceFormItem.footerNotes}</FooterNotes>
    </Fragment>
  );
};
