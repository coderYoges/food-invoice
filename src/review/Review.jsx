import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { PageTitles, ReviewPageLiterals } from "../config/constants";
import { ReviewContent } from "./Content";
import { ReviewFooter } from "./Footer";
import html2canvas from "html2canvas";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

const StyledContainer = styled.div`
  color: #666;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  overflow-x: hidden;
  background-color: #f5f6fa;
`;

const StyledWrapper = styled.div`
  max-width: 880px;
  padding: 30px 15px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  margin-top: 0;
`;

const ReviewWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0;
  background-color: #f3ebdb;
`;

const InvoiceWrapper = styled.div`
  position: relative;
  z-index: 100;
`;

const HeaderWrapper = styled.div`
  height: 100px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const HeaderStyledLine1 = styled.div`
  width: 300px;
  height: 40px;
  background: #000;
`;

const HeaderStyledLine2 = styled.div`
  margin-top: 10px;
  width: 150px;
  height: 20px;
  background: #000;
`;

const HeaderStyledLine3 = styled.div`
  margin-top: 10px;
  width: 90px;
  height: 20px;
  background: #000;
`;

const HeaderStyledRight = styled.div`
  width: 500px;
  height: 100px;
  background: #b17726;
  font-size: 3rem;
  color: #000;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderLogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 0;
  margin-bottom: 1.5rem;
  margin-left: 2rem;
  margin-right: 2rem;
  line-height: 1.5;
`;

const HeaderLogoStyled = styled.div`
  font-size: 1.5rem;
  color: #000;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-decoration: underline;
`;

const HeaderLogoText = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #000;
  margin-left: 1rem;
  text-align: right;
`;

const HeaderCustWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 0;
  margin-bottom: 1.5rem;
  margin-left: 3rem;
  margin-right: 2rem;
`;

const CustNameStyled = styled.div`
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 600;
  color: #000;
`;

const CustDetailsStyled = styled.div`
  font-size: 1rem;
  font-weight: 400;
`;

const HomeHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  background-color: #000;
  height: fit-content;
  align-items: center;
`;

const DownloadIcon = styled(FaDownload)`
  display: flex;
  color: #fff;
  font-size: 2rem;
  word-spacing: 0.2rem;
  font-weight: 500;
  cursor: pointer;
`;

const BackIcon = styled(IoArrowBackSharp)`
  display: flex;
  color: #fff;
  font-size: 2rem;
  word-spacing: 0.2rem;
  font-weight: 500;
  cursor: pointer;
`;

const ReviewPage = ({ invoiceCurrentItems, invoiceHistory }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isEmpty(invoiceCurrentItems.selectedItems)) onPressBack();
    // eslint-disable-next-line
  }, []);
  const onPressBack = () => {
    navigate("/home", { replace: true });
  };
  const lastInvNumber = isEmpty(invoiceHistory)
    ? 0
    : invoiceHistory[invoiceHistory.length - 1]["invoiceNumber"];

  const handleDownload = async () => {
    const element = document.getElementById("download-action"),
      canvas = await html2canvas(element),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;
    link.download = `${invoiceCurrentItems.invoiceDate}-INV${
      lastInvNumber + 1
    }.jpg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Fragment>
      <HomeHeader>
        <BackIcon onClick={onPressBack} />
        <DownloadIcon onClick={handleDownload} />
      </HomeHeader>

      <StyledContainer id="download-action">
        <StyledWrapper>
          <div className="position-relative">
            <ReviewWrapper>
              <InvoiceWrapper>
                <HeaderWrapper>
                  <div>
                    <HeaderStyledLine1 />
                    <HeaderStyledLine2 />
                    <HeaderStyledLine3 />
                  </div>
                  <HeaderStyledRight>{PageTitles.INVOICE}</HeaderStyledRight>
                </HeaderWrapper>

                <HeaderLogoWrapper>
                  <HeaderLogoStyled>
                    <img
                      src={require("../assets/images/invoice-icon.png")}
                      width={100}
                      height={100}
                      alt="invoice-logo"
                    />
                    <div className="d-flex">
                      {ReviewPageLiterals.TITLE1}
                      <br />
                      {ReviewPageLiterals.TITLE2}
                    </div>
                  </HeaderLogoStyled>
                  <div className="d-flex">
                    <div>
                      <div>{ReviewPageLiterals.INVOICE_NO}</div>
                      <div>{ReviewPageLiterals.INVOICE_DATE}</div>
                      <div>{ReviewPageLiterals.FUNCTION_NAME}</div>
                      <div>{ReviewPageLiterals.FUNCTION_DATE}</div>
                      {invoiceCurrentItems.totalUnits && (
                        <div>{ReviewPageLiterals.TOTAL_UNITS}</div>
                      )}
                    </div>

                    <HeaderLogoText>
                      <div>
                        {"INV-NUM-"}
                        {lastInvNumber + 1}
                      </div>
                      <div>{invoiceCurrentItems.invoiceDate || ""}</div>
                      <div>{invoiceCurrentItems.functionName || ""}</div>
                      <div>{invoiceCurrentItems.functionDate || ""}</div>
                      {invoiceCurrentItems.totalUnits && (
                        <div>{invoiceCurrentItems.totalUnits || ""}</div>
                      )}
                    </HeaderLogoText>
                  </div>
                </HeaderLogoWrapper>
                <HeaderCustWrapper>
                  <div>
                    <CustNameStyled>
                      {invoiceCurrentItems.customerName}
                    </CustNameStyled>
                    <CustDetailsStyled>
                      {invoiceCurrentItems.customerAddress1}
                    </CustDetailsStyled>
                    <CustDetailsStyled>
                      {invoiceCurrentItems.customerAddress2}
                    </CustDetailsStyled>
                    <CustDetailsStyled>
                      {invoiceCurrentItems.customerCity}
                    </CustDetailsStyled>
                    <CustDetailsStyled>
                      {invoiceCurrentItems.customerLocality},
                      {invoiceCurrentItems.customerPinCode}
                    </CustDetailsStyled>
                  </div>
                  <div className="mt-auto">{ReviewPageLiterals.GST_NO}</div>
                </HeaderCustWrapper>
                <ReviewContent
                  invoiceCurrentItems={invoiceCurrentItems}
                  invoiceHistory={invoiceHistory}
                />
                <div style={{ height: "2px", background: "#000" }}></div>
                <ReviewFooter
                  invoiceCurrentItems={invoiceCurrentItems}
                  invoiceHistory={invoiceHistory}
                />
                <div style={{ height: "2px", background: "#000" }}></div>
              </InvoiceWrapper>
            </ReviewWrapper>
          </div>
        </StyledWrapper>
      </StyledContainer>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  invoiceCurrentItems: state.auth.invoiceCurrentItems,
  invoiceHistory: state.auth.invoiceHistory,
});

export default connect(mapStateToProps)(ReviewPage);
