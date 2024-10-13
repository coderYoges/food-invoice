import React, { Fragment } from "react";
import styled from "styled-components";
import { ReviewPageLiterals } from "../config/constants";

const ContentTableHeader = styled.div`
  background: #000;
  padding: 1rem;
  color: #fff;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ContentTableStyled = styled.div`
  padding: 1rem;
  text-align: center;
  align-items: center;
`;

const ContentListWrapper = styled.ol`
  list-style-type: square;
  width: fit-content;
  margin: auto;
  text-align: left;
`;

export const ReviewContent = ({ invoiceCurrentItems }) => {
  const isUnitsAvailable = invoiceCurrentItems.totalUnits;
  const isPerPlatePriceAvailable = invoiceCurrentItems.pricePerPlate;
  const isBothRowsAvailable = isUnitsAvailable && isPerPlatePriceAvailable;
  const initialItemsToDisplay = Math.floor(
    invoiceCurrentItems.selectedItems.length / 2
  );

  return (
    <Fragment>
      <ContentTableHeader className="row">
        <div className={isBothRowsAvailable ? "col-8" : "col-10"}>
          {ReviewPageLiterals.DESCRIPTION}
        </div>
        {isUnitsAvailable && (
          <div className="col-2">{ReviewPageLiterals.UNITS}</div>
        )}
        {isPerPlatePriceAvailable && (
          <div className="col-2">{ReviewPageLiterals.AMOUNT}</div>
        )}
      </ContentTableHeader>

      <ContentTableStyled className="row">
        <div className={isBothRowsAvailable ? "col-4" : "col-5"}>
          <ContentListWrapper>
            {invoiceCurrentItems.selectedItems.map(
              (item, index) =>
                index <= initialItemsToDisplay && (
                  <li key={"Invoice-InitialItems-" + index}>{item}</li>
                )
            )}
          </ContentListWrapper>
        </div>
        <div className={isBothRowsAvailable ? "col-4" : "col-5"}>
          <ContentListWrapper>
            {invoiceCurrentItems.selectedItems.map(
              (item, index) =>
                index > initialItemsToDisplay && (
                  <li key={"Invoice-InitialItems-" + index}>{item}</li>
                )
            )}
          </ContentListWrapper>
        </div>
        {invoiceCurrentItems.totalUnits && (
          <div className="col-2">{invoiceCurrentItems.totalUnits}</div>
        )}
        {invoiceCurrentItems.pricePerPlate && (
          <div className="col-2">{invoiceCurrentItems.pricePerPlate}</div>
        )}
      </ContentTableStyled>
    </Fragment>
  );
};
