import { useState, useEffect } from "react";
import Modal from "react-modal";
import { getCandidates } from "../../Services/getCandidates";
import { getCompanies } from "../../Services/getCompanies";
import { getDate } from "../../Services/getDate";
import { getReports } from "../../Services/getReports";
import { getSingleCandidate } from "../../Services/getSingleCandidate";
import { ModalComponent } from "../ModalComponent/ModalComponent";
import loadingImage from "./assets/loadingScreen.gif";
import avatar from "./assets/avatar.png";
import "./SingleCandidate.css";


export const SingleCandidate = (props) => {

    const [candidates, setCandidates] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [reports, setReports] = useState([]);
    const [candidate, setCandidate] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [singleReport, setSingleReport] = useState([]);

    let singleId = localStorage.getItem("modalNibble");

    let token = localStorage.getItem("tokenNibble");


    useEffect(() => {
        getCandidates(token).then(candidates => {
            setCandidates(candidates)
        })
        getCompanies(token).then(companies => {
            setCompanies(companies)
        })
    }, [token])


    useEffect(() => {
        getSingleCandidate(props.match.params.id, token).then((candidate) => {
            setCandidate(candidate)
            getReports(token).then(reports => {
                const filtRep = reports.filter((report) => report.candidateId === candidate.id)
                setReports(filtRep)
            })
            reports.forEach((report) => {
                if (report.companyName === singleId) {
                    setSingleReport(report)
                }
            })
        })
    }, [token])



    if (candidates.length < 1 && companies.length < 1 && reports.length < 1 && singleReport.length < 1) {
        return (
            <div className="loadingImageDiv">
                <img className="loadingImage text-center" src={loadingImage} alt="Loading..." />
            </div>
        )
    } else {
        return (
            <>
                <div className="singleCandidateInfo mt-sm-1 mt-md-5 row p-5 text-sm-center text-lg-start">
                    <div className="profilePhoto col-xs-12 col-sm-12 col-md-12 col-lg-4">
                        <img className="imagePlaceholder" src={avatar} alt="candidateProfilePicture"></img>
                    </div>
                    <div className="nameEmail col-xs-12 col-sm-12 col-md-6 col-lg-4 p-5 pt-xs-1 pb-xs-1 pt-sm-1 pb-sm-1 fs-4">
                        <p className="fw-bold">Name:</p>
                        <p className="ms-3">{candidate.name}</p>
                        <p className="fw-bold">Email:</p>
                        <p className="ms-3">{candidate.email}</p>
                    </div>
                    <div className="birthEducation col-xs-12 col-sm-12 col-md-6 col-lg-4 pt-xs-1 pb-xs-1 p-5 pt-sm-1 pb-sm-1 fs-4">
                        <p className="fw-bold">Date of birth:</p>
                        <p className="ms-3">{getDate(candidate.birthday)}</p>
                        <p className="fw-bold">Education:</p>
                        <p className="ms-3">{candidate.education}</p>
                    </div>
                </div>

                <Modal
                    autoFocus={true}
                    centered={true}
                    restoreFocus={true}
                    shouldCloseOnOverlayClick={false}
                    isOpen={modalIsOpen}
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(1, 1, 1, 0.75)',
                            padding: "none",
                        },
                        content: {
                            width: '50%',
                            height: "fit-content",
                            top: '30%',
                            left: '25%',
                        }
                    }}>
                    <ModalComponent reports={reports} setModalIsOpen={setModalIsOpen} />
                </Modal>


                <div className="singleCandidateReports ms-5 me-5">
                    <table className="table table-striped table-hover">
                        <tbody>
                            <tr>

                                <th><i className="fas fa-caret-down"></i> Company</th>
                                <th><i className="fas fa-caret-down"></i> Interview Date</th>
                                <th colSpan="2"><i className="fas fa-caret-down"></i> Status</th>
                            </tr>

                            {reports.map((report, index) => (
                                < tr key={index}>
                                    <td className="col-4">{report.companyName}</td>
                                    <td className="col-4">{getDate(report.interviewDate)}</td>
                                    <td className="col-3">{report.status}</td>
                                    <td className="col-1 text-center"><button className={report.companyName}
                                        onClick={() => {
                                            setModalIsOpen(true)
                                            localStorage.setItem("modalNibble", report.id)
                                        }} ><i className="far fa-eye"></i></button></td>
                                </tr>

                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }

}
