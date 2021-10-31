import { useEffect, useState } from "react/cjs/react.development";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { getReports } from "../../Services/getReports";
import { getDate } from "../../Services/getDate";
import { ModalComponent } from "../ModalComponent/ModalComponent";
import { SearchBar } from "../SearchBar/SearchBar";
import { NoUsers } from "../NoUsers/NoUsers";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import "./Reports.css";

export const Reports = () => {

    const [reports, setReports] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredReports, setFilteredReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    let token = localStorage.getItem("tokenNibble")


    useEffect(() => {
        getReports(token).then(reports => {
            setReports(reports.slice(0, 24))
            setFilteredReports(reports.slice(0, 24))
        })
    }, [token])



    const deleteRequest = (token, reportId) => {
        return fetch("http://localhost:3333/api/reports/" + reportId, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then(response => response)
    }


    const onDeleteHandler = (id) => {
        deleteRequest(token, id)
            .then(response => {
                console.log(response)
                let reportsWithoutDeleted = reports.filter(report => report.id !== id)
                setFilteredReports(reportsWithoutDeleted)
            })
    }


    const filterFunction = (event) => {
        setSearchQuery(event.target.value.trim().toLowerCase())
    }


    useEffect(() => {
        const filtReports = reports.filter(report => {
            return (report.candidateName.toLowerCase().includes(searchQuery) || report.companyName.toLowerCase().includes(searchQuery))
        })
        setFilteredReports(filtReports)
        setIsLoading(false)
    }, [searchQuery])



    if (isLoading) {
        return (
            <LoadingPage />
        )
    }

    return !isLoading && filteredReports.length === 0
        ? (
            <>
                <SearchBar filterFunction={filterFunction} />
                <NoUsers />
            </>
        )
        : (
            <>
                <SearchBar filterFunction={filterFunction} />

                < div className="reportsPageDiv bg-light mb-5 pb-5" >
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

                    <div className="text-end m-3 me-5">
                        <Link to={`/create/1`}>
                            <button className="btn btn-info text-center">Create New Report</button>
                        </Link>
                    </div>

                    {filteredReports.map((report, index) => {
                        return (
                            <div className="singleCompanyCandidateReport bg-info p-1 ps-3 pe-3 ms-5 me-5 m-2 row" key={index}>

                                <div className="companyNameReport col-xs-6 col-lg-3">
                                    <div className="me-5 fw-bold">{report.companyName}</div>
                                    <div className="me-5 text-black-50">Company</div>
                                </div>

                                <div className="candidateNameReport col-xs-6 col-lg-4">
                                    <div className="me-5 fw-bold">{report.candidateName}</div>
                                    <div className="me-5 text-black-50">Candidate</div>
                                </div>

                                <div className="interviewDateReport col-xs-6 col-lg-2">
                                    <div className="me-5 fw-bold">{getDate(report.interviewDate)}</div>
                                    <div className="me-5 text-black-50">Interview Date</div>
                                </div>

                                <div className="statusReport col-xs-6 col-lg-2">
                                    <div className="me-5 fw-bold">{report.status}</div>
                                    <div className="me-5 text-black-50">Status</div>
                                </div>

                                <div className="col-xs-6 col-lg-1 text-lg-center">
                                    <button onClick={() => {
                                        setModalIsOpen(true)
                                        localStorage.setItem("modalNibble", report.id)
                                    }} className="me-1"><i className="far fa-eye "></i></button>

                                    <button onClick={() => onDeleteHandler(report.id)} className="me-1"><i className="fas fa-times"></i></button>
                                </div>
                            </div>
                        )
                    })}
                </div >
            </>
        )
}