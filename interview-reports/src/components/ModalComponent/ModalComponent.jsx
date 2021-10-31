import { useEffect, useState } from "react/cjs/react.development";
import { getDate } from "../../Services/getDate";
import "./ModalComponent.css";



export const ModalComponent = ({ reports, setModalIsOpen }) => {

    let singleId = localStorage.getItem("modalNibble");
    const [singleReport, setSingleReport] = useState([]);

    useEffect(() =>
        reports.forEach((report) => {
            if (report.id.toString() === singleId) {
                setSingleReport(report)
            }
        }), [setModalIsOpen])


    return (
        <div className="containerModal">
            <p className="topModalInfo ms-5 mt-3 h3 mb-3 col-9">{singleReport.candidateName}</p>
            <button onClick={() => setModalIsOpen(false)} className="closeButtonModal col-1 mb-0"><i className="far fa-times-circle fa-2x"></i></button>
            <hr className="hrLineModal" />

            <div className="row">
                <div className="candidateInfoPopUp ms-5 col-4">
                    <p className="m-0 mt-2 text-black-50">Company</p>
                    <p className="m-0 h4 mb-2">{singleReport.companyName}</p>
                    <p className="m-0 text-black-50">Interview Date</p>
                    <p className="m-0 h4 mb-2">{getDate(singleReport.interviewDate)}</p>
                    <p className="m-0 text-black-50">Phase</p>
                    <p className="m-0 h4 mb-2">{singleReport.phase}</p>
                    <p className="m-0 text-black-50">Status</p>
                    <p className="m-0 mb-3 h4 mb-2">{singleReport.status}</p>
                </div>

                <div className="candidateNotes me-5 ms-5 col-5">
                    <p className="m-0 mb-1 mt-2 text-black-50 notesModal col-11">Notes</p>
                    <p className="m-0 mb-3 notesTextModal">{singleReport.note}</p>
                </div>
            </div>
        </div >
    )
}
