import { React, useState, useEffect, useContext } from "react";
import "./TermSheetData.css";
import { getData, postData } from "../../../Api/Api";
import JsonData from "./TermSheetState.json";
import Filter from "./filter";
import StoreContext from "../../../ContextApi";
import { Spin } from "antd";
import Modal from "react-bootstrap/Modal";
// Pagination Component here
import TermSheetPagination from "../../Pagination";
// import { Pagination } from "@mui/material";

let itemsPerPage = 5;

export default function TermSheetData() {
  const [user, setUser] = useState({ accountName: "buyer1" });
  // const [termsheets, setTermSheets] = useState(JsonData);
  const [item, setItem] = useState(null);
  const contextData = useContext(StoreContext);
  const [loading, setloading] = useState(true);
  const [show, setShow] = useState(false);
  const [PrivacyShow, setPrivacyShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [filterItem, setfilterItem] = useState(JsonData);
  const [Check, setCheck] = useState(false);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filterItem.length / itemsPerPage);



  console.log(contextData.SignInData, "Term Sheet Context Data");

  useEffect(() => {
    setUser(contextData.SignInData);
    let payload = {
      account: contextData.SignInData.UserAccountNo,
      consumable: "",
    };
    getData("received-TermSheets", payload, setfilterItem);
  }, [contextData.SignInData]);
  const handleReaccept = async () => {
    let api = "termsheet/accept";

    setloading(false);
    setTimeout(() => {
      setloading(true); // 1
      handleClose(); // 2
    }, 2000);


    let payload = {
      stateId: item.termSheetReference,
      account: user.UserAccountNo,
    };
    console.log("In accept TermSheet", payload);
    const resp = await postData(api, payload);
  };

  let PrivacyShowClose = () => setPrivacyShow(false);
  let PrivacyShowOpen = () => setPrivacyShow(true);
  useEffect(() => {
    if (!Check) {
      PrivacyShowClose();
    } else {
      PrivacyShowOpen();
    }
  }, [Check]);


  // paginatio function here
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedData = filterItem.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  console.log("ali Data==>",filterItem)
  return (
    <div>
      <div className="card card-cascade narrower">
        <Filter data={{ JsonData, setfilterItem }} />
        <div
          className="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 d-flex justify-content-between align-items-center"
          style={{ marginTop: "-4%" }}
        >
          {/* <div>
            <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
              <i class="fas fa-th-large mt-0"></i>
            </button>
            <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
              <i class="fas fa-columns mt-0"></i>
            </button>
          </div>

          

          <div>
            <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
              <i class="fas fa-pencil-alt mt-0"></i>
            </button>
            <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
              <i class="far fa-trash-alt mt-0"></i>
            </button>
            <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
              <i class="fas fa-info-circle mt-0"></i>
            </button>
          </div> */}
        </div>
        <div className="container mt-3">
          <h2 className="text-center">Term Sheet Details</h2>

          <table className="table table-hover">
            <thead className="bg-light">
              <tr>
                <th>Bank</th>
                <th>Term Sheet Ref</th>
                <th>Limit</th>
                <th>Tenor</th>
                <th>Rate</th>
                <th>Expire</th>
                <th></th>
              </tr>
            </thead>
            {displayedData?.map((v, i) => {
              return (
                <tbody>
                  <tr>
                    <td>{v?.bankAccountInfo.name}</td>
                    <td>{v?.termSheetReference}</td>
                    <td>{v?.limit}</td>
                    <td>{v?.tenor}</td>
                    <td>{v?.referenceRate}</td>
                    <td>{v?.expiryDate}</td>

                    <td>
                      <span
                        type="button"
                        className="btn btn-warning btn-rounded"
                        data-toggle="modal"
                        data-target="#myModal"
                        onClick={() => handleShow(setItem(v))}
                      >
                        View
                      </span>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <TermSheetPagination count={totalPages} page={page} onChange={handlePageChange} data={JsonData} />
          {/* <h1>Some Pagination testing here</h1> */}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Term Sheet Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <!-- Modal body --> */}
          {item != null ? (
            <div className="modal-body">
              <table id="customers">
                <tr>
                  <td>Bank</td>
                  <td>{item.bankAccountInfo.name}</td>
                </tr>
                <tr>
                  <td>Refernce No</td>
                  <td>{item.termSheetReference}</td>
                </tr>
                <tr>
                  <td>Limit</td>
                  <td>{item.limit}</td>
                </tr>
                <tr>
                  <td>Tenor</td>
                  <td>{item.tenor}</td>
                </tr>
                <tr>
                  <td>Refernce Rate</td>
                  <td>{item.referenceRate}</td>
                </tr>
                <tr>
                  <td>Spread</td>
                  <td>{item.spread}</td>
                </tr>
                <tr>
                  <td>Issue Date</td>
                  <td>{item.issueDate}</td>
                </tr>
                <tr>
                  <td>Expiry Date</td>
                  <td>{item.expiryDate}</td>
                </tr>
                <tr>
                  <td>Acceptance</td>
                  {item.isAccepted ? (
                    <td>Received</td>
                  ) : (
                    <td>{item.IsAccepted}</td>
                  )}
                </tr>
              </table>


            </div>
          ) : (
            <></>
          )}

          {/* <!-- Modal footer --> */}
        </Modal.Body>
        <div className="modal-footer d-flex justify-content-evenly">
          {loading ? (
            <button
              type="button"
              className="btn btn-success"
              onClick={handleReaccept}
            >
              Accept Term Sheet
            </button>
          ) : (
            <Spin size="large" />
          )}
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              onChange={(e) => setCheck(e.target.checked)}
            />
            <label className="custom-control-label" for="customControlInline">
              Terms & Condition
            </label>
          </div>
        </div>
      </Modal>

      <Modal show={PrivacyShow} onHide={PrivacyShowClose} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Privacy Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            THIS MURABAHA FACILITY AGREEMENT (this &quot;Agreement&quot;) is
            made at_____on ___ day of _____ by and
          </p>
          <p>BETWEEN</p>
          <p>
            ##########Client########### (hereinafter referred to as the
            &quot;Client&quot; which expression shall where the context so
            permits mean and include its successors in interest and permitted
            assigns) of the one part
          </p>
          <p>AND</p>
          <p>
            ##########Institution###########(hereinafter referred to as the
            &quot;Institution&quot; which expression shall where the context so
            permits mean and include its successors in interest and assigns) of
            the other part.
          </p>
          <p>IT IS AGREED BY THE PARTIES as follows:</p>
          <p>1. PURPOSE AND DEFINITIONS</p>
          <p>
            1.01 This Agreement sets out the terms and conditions upon and
            subject to which the Institution has agreed to purchase the Goods
            from time to time from the Suppliers and upon which the Institution
            has agreed to sell the same to the Client from time to time by way
            of Murabaha facility.
          </p>
          <p>1.02 In this Agreement, unless the context otherwise requires:</p>
          <p>
            &quot;Act&quot; means the Banking Companies (Recovery of Loans,
            Advances, Credits and Finances) Act, 1997 or any statutory
            modification or re-promulgation thereof;
          </p>
          <p>
            &quot;Agent&quot; means the person appointed under the terms of the
            Agency Agreement;
          </p>
          <p>
            &quot;Agency Agreement&quot; means the Agency Agreement between the
            Institution and the Client as provided in the Murabaha Document # 2;
          </p>
          <p>
            &quot;Business Day&quot; means a day on which banks are open for
            normal business in Pakistan;
          </p>
          <p>
            &quot;Cost Price&quot; means the amount which may be incurred by
            and/or on behalf of the Institution for the acquisition of Goods
            plus all costs, duties, taxes and charges incidental to and
            connected with acquisition of Goods;
          </p>
          <p>
            &quot;Contract Price&quot; means aggregate of Cost Price and a
            Profit of ___ per cent calculated thereon payable by the Client to
            the Institution for Goods as stipulated in Part-III of the
            Declaration (Murabaha Document # 5) to be issued by the Institution
            from time to time;
          </p>
          <p>
            &quot;Declaration&quot; means Declaration as set out in Murabaha
            Document # 5;
          </p>
          <p>
            &quot;Event of Default&quot; means any of the events or
            circumstances described in Clause 9 hereto;
          </p>
          <p>
            &quot;Goods&quot; means the Goods as may be specified in the
            Purchase Requisition(s) to be issued by the Client from time to
            time;
          </p>
          <p>
            &quot;Indebtedness&quot; means any obligation of the Client for the
            payment or any sum of money due or, payable under this Agreement;
          </p>
          <p>
            &quot;License&quot; means any license, permission, authorization,
            registration, consent or approval granted to the Client for the
            purpose of or relating to the conduct of its business;
          </p>
          <p>
            &quot;Lien&quot; shall mean any mortgage, charge, pledge,
            hypothecation, security interest, lien, right of set-off,
            contractual restriction (such as negative covenants) and any other
            encumbrance;
          </p>
          <p>
            &quot;Payment Date&quot; or &quot;Payment Dates&quot; means the
            respective dates for the payment of the installments of the Contract
            Price or part thereof by the Client to the Institution as specified
            in Murabaha Document # 6 hereto, or, if such respective due date is
            not a Business Day, the next Business Day;
          </p>
          <p>
            &quot;Profit&quot; means any part of the Contract Price which is not
            a part of the Cost Price;
          </p>
          <p>&quot;Parties&quot; mean the parties to this Agreement;</p>
          <p>
            &quot;Principal Documents&quot; means this Agreement, the Agency
            Agreement; and the Security Documents;
          </p>
          <p>
            &quot;Promissory Note&quot; is defined in Clause 3.02 and is
            negotiable only at the face value, if required;
          </p>
          <p>
            &quot;Prudential Regulations&quot; means Prudential Regulations or
            other regulations as are notified from time to time by SBP;
          </p>
          <p>
            &quot;Purchase Requisition&rdquo; means a request from time to time
            by the Client to the Institution as per Murabaha Document # 3/1;
          </p>
          <p>
            &ldquo;Receipt&rdquo; means a confirmation by the Client (as Agent
            of the Institution) of receipt of funds by the Supplier for the
            supply of Goods Murabaha Document # 4.
          </p>
          <p>
            &quot;Security Documents&quot; and &quot;Security&quot; is defined
            in Clause 3;
          </p>
          <p>
            &quot;Supplier&quot; means the supplier from whom the Institution
            acquires Title to the Goods;
          </p>
          <p>
            &quot;Secured Assets&quot; means (insert description of assets in
            respect of which charge/mortgage may be created) offered as security
            by the Client;
          </p>
          <p>
            &quot;Rupees&quot; or &quot;Rs.&quot; means the lawful currency of
            Pakistan;
          </p>
          <p>&quot;SBP&quot; means the State Bank of Pakistan;</p>
          <p>
            &quot;Title&quot; means such title or other interest in the Goods as
            the Institution receives from the Supplier;
          </p>
          <p>
            &quot;Taxes&quot; iincludes all present and future taxes (including
            central excise duty and sales tax), levies, imposts, duties, stamp
            duties, penalties, fees or charges of whatever nature together with
            delayed payment charges thereon and penalties in respect thereof and
            &quot;Taxation&quot; shall be construed accordingly;
          </p>
          <p>
            &quot;Value Date&quot; means the date on which the Cost Price will
            be disbursed by the Institution as stated in the Purchase
            Requisition. 1.01 Clause headings and the table of contents are
            inserted for convenience of reference only and shall be ignored in
            the interpretation of this Agreement. In this Agreement, unless the
            context otherwise requires, references to Clauses and Murabaha
            Documents are to be construed as references to the clauses of, and
            Murabaha Documents to, this Agreement and references to this
            Agreement include its Murabaha Documents; words importing the plural
            shall include the singular and vice versa and reference to a person
            shall be construed as including references to an individual, firm,
            Institution, corporation, unincorporated body of persons or any
            state or any Agency thereof.
          </p>
          <p>
            1.02 The recitals herein above and Murabaha Documents to this
            Agreement shall form an integral part of this Agreement.
          </p>
          <p>2. SALE AND PURCHASE OF THE GOODS</p>
          <p>
            2.01 The Institution agrees to sell the Goods to the Client to a
            maximum amount of Rs____________ and the Client agrees to purchase
            the Goods from the Institution from time to time at the Contract
            Price. Upon receipt by the Institution of the Client's Purchase
            Requisition advising the Institution to purchase the Goods and
            making payment therefore, the Institution shall acquire the Goods
            either directly or through the Agent. The payment for such goods
            shall be made by the institution directly to the Supplier on
            submission of Purchase Advice by the client/agent. The said Receipt
            shall be substantially in a form given in Murabaha Document # 4.
            (For making payment to the Supplier the bank should prepare a Pay
            Order/Cross cheque, etc in the name of Supplier that should be
            handed over to him through client/agent. The supplier should issue
            invoice in the name of Bank Account Client e.g. &lsquo;1st Islamic
            Bank &ndash; ABC Company&rsquo;. This way, the problem of claiming
            Sales or other Taxes Refund could be solved easily).
          </p>
          <p>
            2.02 Upon receipt of purchase of Goods by the Institution, directly
            or through an Agent, from the Supplier, the Goods shall be at the
            risk and cost of the Institution until such time that these Goods
            are sold to the Client, to be evidenced by the acceptance, duly
            signed and endorsed by the Institution in Part-III of the
            Declaration.
          </p>
          <p>
            2.03 After the purchase of Goods by the Institution, the Client
            shall offer to purchase the Goods from the Institution at the
            Contract Price in the manner provided in the Part-II of the
            Declaration.
          </p>
          <p>
            2.04 The Client&rsquo;s purchase of Goods from the Institution shall
            be effected by the exchange of an offer and acceptance between the
            Client and the Institution as stipulated in the Declaration. 3.
            SECURITY
          </p>
          <p>
            3.01 As security for the indebtedness of the Client under this
            Agreement, the Client shall:-
          </p>
          <p>
            (a) Furnish to the Institution collateral(s)/security(ies),
            substantially in the form and substance attached hereto as Murabaha
            Document # 7;
          </p>
          <p>
            (b) Execute such further deeds and documents as may from time to
            time be required by the Institution for the purpose of more fully
            securing and or perfecting the security created in favour of the
            Institution; and
          </p>
          <p>
            (c) Create such other securities to secure the Client&rsquo;s
            obligations under the Principal Documents as the parties hereto, may
            by mutual consent agree from time to time.
          </p>
          <p>
            (The above are hereinafter collectively referred to as the
            &quot;Security&quot;).
          </p>
          <p>
            3.02 In addition to above, the Client shall execute a demand
            promissory note in favour of the Institution for the amount of the
            Contract Price (the &quot;Promissory Note&quot;); (The Security and
            the Promissory Note are hereinafter collectively referred to as the
            &quot;Security Documents&quot;). 4. FEES AND EXPENSES The Client
            shall pay to the Institution on demand within 15 days of such demand
            being made, all expenses (including legal and other ancillary
            expenses) incurred by the Institution in connection with the
            negotiation, preparation and execution of the Principal Documents
            and of amendment or extension of or the granting of any waiver or
            consent under the Principal Documents.
          </p>
          <p>5. PAYMENT OF CONTRACT PRICE</p>
          <p>
            5.01 All payments to be made by the Client under this Agreement
            shall be made in full, without any set-off, roll over or
            counterclaim whatsoever, on the due date and when the due date is
            not a Business Day, the following Business Day and save as provided
            in Clause 5.02, free and clear of any deductions or withholdings, to
            a current account of the Institution as may be notified from time to
            time, and the Client will only be released from its payment
            obligations hereunder by paying sums due into the aforementioned
            account.
          </p>
          <p>
            5.02 If at any time the Client is required to make any non
            refundable and non-adjustable deduction or withholding in respect of
            Taxes from any payment due to the Institution under this Agreement,
            the sum due from the Client in respect of such payment shall be
            increased to the extent necessary to ensure that, after the making
            of such deduction or withholding, the Institution receives on the
            Payment Date, a net sum equal to the sum which it would have
            received had no such deduction or withholding been required to be
            made and the Client shall indemnify the Institution against any
            losses or costs incurred by the Institution by reason of any failure
            of the Client to make any such deduction or withholding. The Client
            shall promptly deliver to the Institution any receipts, certificates
            or other proof evidencing the amounts (if any) paid or payable in
            respect of any deduction or withholding as aforesaid. 6.
            REPRESENTATIONS AND WARRANTIES
          </p>
          <p>a. The Client warrants and represents to the Institution that:</p>
          <p>
            b. The execution, delivery and performance of the Principal
            Documents by the Client will not
          </p>
          <p>
            (i) contravene any existing law, regulations or authorization to
            which the Client is subject
          </p>
          <p>
            (ii) result in any breach of or default under any agreement or other
            instrument to which the Client is a party or is subject to, or
          </p>
          <p>
            (iii) contravene any provision of the constitutive documents of the
            Client or any resolutions adopted by the board of directors or
            members of the Client;
          </p>
          <p>
            c. The financial statements submitted together with the notes to the
            accounts and all contingent liabilities and assets that are
            disclosed therein represent a true and fair financial position of
            the business and to the best of the knowledge of the client, its
            directors and principal officers, there are no material omissions
            and/or mis-repsentations;
          </p>
          <p>
            d. All requisite corporate and regulatory approvals required to be
            obtained by the Client in order to enter into the Principal
            Documents are in full force and effect and such approvals permit the
            Client, inter alia, to obtain financial facilities under this
            Agreement and perform its obligations hereunder and that the
            execution of the Principal Documents by the Client and the exercise
            of its rights and performance of its obligations hereunder,
            constitute private and commercial acts done for private and
            commercial purposes;
          </p>
          <p>
            e. No material litigation, arbitration or administrative proceedings
            is pending or threatened against the Client or any of its assets;
          </p>
          <p>
            f. It shall inform the Institution within ____ business days of an
            event or happening which may have an adverse effect on the financial
            position of the company, whether such an event is recorded in the
            financial statements or not as per applicable International
            Accounting Standards.
          </p>
          <p>
            7. UNDERTAKING The Client covenants to and undertakes with the
            Institution that so long as the Client is indebted to the
            Institution in terms of this Agreement:
          </p>
          <p>
            (a) It shall inform the Institution of any Event of Default or any
            event, which with the giving of notice or lapse of time or both
            would constitute an Event of Default forthwith upon becoming aware
            thereof;
          </p>
          <p>
            (b) It shall provide to the Institution, upon written request,
            copies of all contracts, agreements and documentation relating to
            the purchase of the Goods;
          </p>
          <p>
            (c) The Client shall do all such things and execute all such
            documents which in the judgment of the Institution may be necessary
            to; (i) enable the Institution to assign or otherwise transfer the
            liability of the Client in respect of the Contract Price to any
            creditor of the Institution or to any third party as the Institution
            may deem fit at its absolute discretion; (ii) create and perfect the
            Security; (iii) maintain the Security in full force and effect at
            all times including the priority thereof; (iv) maintain, insure and
            pay all Taxes assessed in respect of the Secured Assets and protect
            and enforce its rights and title, and the rights of the Institution
            in respect of the Secured Assets, and; (v) preserve and protect the
            Secured Assets. The Client shall at its own expense cause to be
            delivered to the Institution such other documentation and legal
            opinion(s) as the Institution may reasonably require from time to
            time in respect of the foregoing;
          </p>
          <p>
            (d) It will satisfactorily insure all its insurable assets with
            reputable companies offering protection under the Islamic concept of
            Takaful. The Secured Assets shall be comprehensively insured (with a
            reputable insurance company to the satisfaction of the Institution)
            against all insurable risks, which may include fire, arson, theft,
            accidents, collision, body and engine damage, vandalism, riots and
            acts of terrorism, and to assign all policies of insurance in favour
            of the Institution to the extent of the amount from time to time due
            under this Agreement, and to cause the notice of the interest of the
            Institution to be noted on the policies of insurance, and to
            punctually pay the premium due for such insurances and to
            contemporaneously therewith deliver the premium receipts to the
            Institution. Should the Client fail to insure or keep insured the
            Secured Assets and/or to deliver such policies and premium receipts
            to the Institution, then it shall be lawful for the Institution, but
            not obligatory, to pay such premia and to keep the Secured Assets so
            insured and all cost charges and expenses incurred by it for the
            purpose shall be charged to and paid by the Client as if the same
            were part of the Indebtedness. The Client expressly agrees that the
            Institution shall be entitled to adjust, settle or compromise any
            dispute with the insurance company(ies) and the insurance arising
            under or in connection with the policies of insurance and such
            adjustments/compromises or settlements shall be binding on the
            Client and the Institution shall be entitled to appropriate and
            adjust the amount, if any received, under the aforesaid policy or
            policies towards part or full satisfaction of the Client's
            indebtedness arising out of the above arrangements and the Client
            shall not raise any question or objection that larger sums might or
            should have been received under the aforesaid policy nor the Client
            shall dispute its liability(ies) for the balance remaining due after
            such payment/adjustment;
          </p>
          <p>
            (e) Except as required in the normal operation of its business, the
            Client shall not, without the written consent of the Institution,
            sell, transfer, lease or otherwise dispose of all or a sizeable part
            of its assets, or undertake or permit any merger, consolidation,
            dismantling or re organization which would materially affect the
            Client&rsquo;s ability to perform its obligations under any of the
            Principal Documents;
          </p>
          <p>
            (f) The Client shall not (and shall not agree to), except with the
            written consent of the Institution, create, incur, assume or suffer
            to exist any Lien whatsoever upon or with respect to the Secured
            Assets and any other assets and properties owned by the Client which
            may rank superior, pari passu or inferior to the security created or
            to be created in favour of the Institution pursuant to the Principal
            Documents;
          </p>
          <p>(g) It shall forthwith inform the Institution of:</p>
          <p>
            (i) Any event or factor, any litigation or proceedings pending or
            threatened against the Client which could materially and adversely
            affect or be likely to materially and adversely affect:
          </p>
          <p>(a) the financial condition of the Client;</p>
          <p>(b) business or operations of the Client; and</p>
          <p>
            (c) the Client&rsquo;s ability to meet its obligations when due
            under any of the Principal Documents; (ii) Any change in the
            directors of the Client;
          </p>
          <p>
            (iii) Any actual or proposed termination, rescission, discharge
            (otherwise than by performance), amendment or waiver or indulgence
            under any material provision of any of the Principal Documents;
          </p>
          <p>
            (iv) Any material notice or correspondence received or initiated by
            the Client relating to the License, consent or authorization
            necessary for the performance by the Client of its obligations under
            any of the Principal Documents 8. CONDITIONS PRECEDENT
          </p>
          <p>
            8.01 The obligation of the Institution to pay the Cost Price shall
            be subject to the receipt by the Institution (in form and substance
            acceptable to the Institution) at least ___ Business Days prior to
            the Value Date of:
          </p>
          <p>(i) Documentary evidence that:</p>
          <p>
            (a) This Agreement and the Agency Agreement (should the Institution
            appoint the Client as its Agent) have been executed and delivered by
            the Client;
          </p>
          <p>
            (b) The Client&rsquo;s representatives are duly empowered to sign
            the Principal Documents for and on behalf of the Client and to enter
            into the covenants and undertakings set out herein or which arise as
            a consequence of the Client entering into the Principal Documents;
          </p>
          <p>
            (c) The Client has taken all necessary steps and executed all
            documents required under or pursuant to the Principal Documents or
            any documents creating or evidencing the Security in favour of the
            Institution and has perfected the Security as required by the
            Institution. (ii) Certified copy of the Memorandum and Articles of
            Association of the Client.
          </p>
          <p>
            (iii) Certified copies of the Client&rsquo;s audited financial
            statements for the last ____ years
          </p>
          <p>(iv) The Purchase Requisition.</p>
          <p>
            8.02 The obligation of the Institution to pay the Cost Price on the
            Value Date shall be further subject to the fulfillment of the
            following conditions (as shall be determined by the Institution in
            its sole discretion):
          </p>
          <p>
            (a) The payment of Cost Price by the Institution to the Supplier on
            the Value Date shall not result in any breach of any law or existing
            agreement;
          </p>
          <p>
            (b) The Security has been validly created, perfected and is
            subsisting in terms of this Agreement;
          </p>
          <p>
            (c) The Institution has received such other documents as it may
            reasonably require in respect of the payment of the Cost Price;
          </p>
          <p>
            (d) No event or circumstance which constitutes or which with the
            giving of notice or lapse of time or both, would constitute an Event
            of Default shall have occurred and be continuing or is likely to
            occur and that the payment of the Cost Price shall not result in the
            occurrence of any Event of Default;
          </p>
          <p>
            (e) Delivery by the Client to the Institution of a true and complete
            extract of all relevant parts of the minutes of a duly convened
            meeting of its Board of Directors approving the Principal Documents
            and granting the necessary authorizations for entering into,
            execution and delivery of the Principal Documents which shall be
            duly signed and certified by the person authorized by the Board for
            this purpose;
          </p>
          <p>
            (f) All fees, commission, expenses required to be paid by the Client
            to the Institution have been received by the Institution.
          </p>
          <p>
            {" "}
            8.03 Any condition precedent set forth in this Clause 8 may be
            waived and or modified by the mutual written consent of the parties
            hereto. 9. EVENTS OF DEFAULT
          </p>
          <p>
            9.01 There shall be an Event of Default if in the opinion of the
            Institution
          </p>
          <p>
            (a) Any representation or warranty made or deemed to be made or
            repeated by the Client in or pursuant to the Principal Documents or
            in any document delivered under this Agreement is found to be
            incorrect;
          </p>
          <p>
            (b) Any Indebtedness of the Client to the Institution in excess of
            Rs.___________________________ (Rupees
            ______________________________ only) is not paid when due or becomes
            due or capable of being declared due prior to its stated maturity;
            9.02 Notwithstanding anything contained herein, the Institution may
            without prejudice to any of its other rights, at any time after the
            happening of an Event of Default by notice to the Client declare
            that entire amount by which the Client is indebted to the
            Institution shall forthwith become due and payable. 10. PENALTY
          </p>
          <p>
            10.1. Where any amount is required to be paid by the Client under
            the Principal Documents on a specified date and is not paid by that
            date, or an extension thereof, permitted by the Institution without
            any increase in the Contract Price, the Client hereby undertakes to
            pay directly to the Charity Fund, constituted by the Institution, a
            sum calculated @ ------% per annum for the entire period of default,
            calculated on the total amount of the obligations remaining
            un-discharged. The Charity Fund shall be used at the absolute
            discretion of the Institution, exclusively for the purposes of
            approved charity.
          </p>
          <p>
            10.2. In case (i) any amount(s) referred to in clause 10.01 above,
            including the amount undertaken to be paid directly to the Charity
            Fund, by the Client, is not paid by him, or (ii) the Client delays
            the payment of any amount due under the Principal Documents and/ or
            the payment of amount to the Charity Fund as envisaged under Clause
            10.01 above, as a result of which any direct or indirect costs are
            incurred by the Institution, the Institution shall have the right to
            approach a competent Court (i) for recovery of any amounts remaining
            unpaid as well as (ii) for imposing of a penalty on the Client. In
            this regard the Client is aware and acknowledges that
            notwithstanding the amount paid by the Client to the Charity Fund of
            the Institution, the Court has the power to impose penalty, at its
            discretion, and from the amount of such penalty, a smaller or bigger
            part, depending upon the circumstances, can be awarded as solatium
            to the Institution, determined on the basis of direct and indirect
            costs incurred, other than the opportunity cost. 11. INDEMNITIES The
            Client shall indemnify the Institution against any expense which the
            Institution shall prove as rightly incurred by it as a consequence
            of
          </p>
          <p>(a) the occurrence of any Event of Default,</p>
          <p>
            (b) the purchase and sale of Goods or any part thereof by the Client
            or the ownership thereof, and
          </p>
          <p>
            (c) any mis-representation. 12. SET-OFF The Client authorizes the
            Institution to apply any credit balance to which the Client is
            entitled or any amount which is payable by the Institution to the
            Client at any time in or towards partial or total satisfaction of
            any sum which may be due or payable from the Client to the
            Institution under this Agreement.
          </p>
          <p>13. ASSIGNMENT</p>
          <p>
            13.01 This Agreement shall be binding upon and inure to the benefit
            of and be enforceable by the Institution, the Client, and respective
            successors permitted assigns and transferees of the parties hereto,
            provided that the Client shall not assign or transfer any of its
            rights or obligations under this Agreement without the written
            consent of the Institution. The Institution may assign all or any
            part of its rights or transfer all or any part of its obligations
            and/or commitments under this Agreement to any Institution, or other
            person. The Client shall not be liable for the costs of the
            assignment and/or transfer of commitments hereunder by the
            Institution. If the Institution assigns all or any part of its
            rights or transfers all or any part of its obligations and
            commitments as provided in this Clause, all relevant references in
            this Agreement to the Institution shall thereafter be construed as a
            reference to the Institution and/or its assignee(s) or transferee(s)
            (as the case may be) to the extent of their respective interests.
          </p>
          <p>
            13.02 The Institution may disclose to a potential assignee or
            transferee or to any other person who may propose entering into
            contractual relations with the Institution in relation to this
            Agreement such information about the Client as the Institution shall
            consider appropriate. 14. FORCE MAJEURE Any delays in or failure by
            a Party hereto in the performance hereunder if and to the extent it
            is caused by the occurrences or circumstances beyond such
            Party&rsquo;s reasonable control, including but not limited to, acts
            of God, fire, strikes or other labor disturbances, riots, civil
            commotion, war (declared or not) sabotage, any other causes, similar
            to those herein specified which cannot be controlled by such Party.
            The Party affected by such events shall promptly inform the other
            Party of the occurrence of such events and shall furnish proof of
            details of the occurrence and reasons for its non-performance of
            whole or part of this Agreement. The parties shall consult each
            other to decide whether to terminate this Agreement or to discharge
            part of the obligations of the affected Party or extend its
            obligations on a best effort and on an arm&rsquo;s length basis.
          </p>
          <p>15. GENERAL</p>
          <p>
            15.01 No failure or delay on the part of the Institution to exercise
            any power, right or remedy under this Agreement shall operate as a
            waiver thereof nor a partial exercise by the Institution of any
            power, right or remedy preclude any other or further exercise
            thereof or the exercise of any other power right or remedy. The
            remedies provided in this Agreement are cumulative and are not
            exclusive of any remedies provided by law;
          </p>
          <p>
            15.02 This Agreement represents the entire agreement and
            understanding between the Parties in relation to the subject matter
            and no amendment or modification to this Agreement will be effective
            or binding unless it is in writing, signed by both Parties and
            refers to this Agreement;
          </p>
          <p>
            15.03 This Agreement is governed by and shall be construed in
            accordance with Pakistan law. All competent courts at ________ shall
            have the non-exclusive jurisdiction to hear and determine any
            action, claim or proceedings arising out of or in connection with
            this Agreement.
          </p>
          <p>
            15.04 Nothing contained herein shall prejudice or otherwise affect
            the rights and remedies that may otherwise be available under law to
            the parties.
          </p>
          <p>
            15.05 Any reconstruction, division, re-organization or change in the
            constitution of the Institution or its absorption in or amalgamation
            with any other person or the acquisition of all or part of its
            undertaking by any other person shall not in any way prejudice or
            affect its rights hereunder.
          </p>
          <p>
            15.06 The two parties agree that any notice or communication
            required or permitted by this agreement shall be deemed to have been
            given to the other party seven days after the same has been posted
            by registered mail or the next Business Day if given by a facsimile
            message or telex or by any other electronic means, or the next
            Business Day as
          </p>{" "}
        </Modal.Body>
        <div className="modal-footer d-flex justify-content-evenly">
          <button
            type="button"
            className="btn btn-warning"
            onClick={PrivacyShowClose}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
