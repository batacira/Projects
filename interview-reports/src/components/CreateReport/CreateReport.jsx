import { useHistory } from "react-router";
import { useState } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import { SelectCandidate } from "./SelectCandidate/SelectCandidate";
import { SelectCompany } from "./SelectCompany/SelectCompany";
import { FillReportDetails } from "./FillReportDetails/FillReportDetails";
import { Success } from "./Success/Success";
import "./CreateReport.css";


export const CreateReport = (props) => {

    const [selectedCandidate, setSelectedCandidate] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState([]);
    const [interviewDate, setinterviewDate] = useState("");
    const [phase, setPhase] = useState("");
    const [status, setStatus] = useState("");
    const [notes, setNotes] = useState("");
    const [submit, setSubmit] = useState(false);
    
    let token = localStorage.getItem("tokenNibble");

    const step = +props.match.params.step;      //+ converts any string to number if possible

    const history = useHistory();


    let dataToBeSent = {
        candidateId: selectedCandidate.id,
        candidateName: selectedCandidate.name,
        companyId: selectedCompany.id,
        companyName: selectedCompany.name,
        interviewDate: new Date(interviewDate),
        phase: phase,
        status: status,
        note: notes
    }


    const sendCreateNewReportRequest = () => {
        return fetch("http://localhost:3333/api/reports", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToBeSent),
        })
            .then(res => console.log(res))
    };


    if (submit) {
        sendCreateNewReportRequest()
        setSubmit(false)
        /* setTimeout(() => {
            window.location.replace("/home");
        }, 5000); */
    }


    const renderSwitch = () => {
        switch (step) {
            case 1: return <SelectCandidate nextStep={nextStep} selectedCandidate={selectedCandidate} setSelectedCandidate={setSelectedCandidate} />;
            case 2: return <SelectCompany nextStep={nextStep} stepBack={stepBack} selectedCandidate={selectedCandidate} selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} />;
            case 3: return <FillReportDetails nextStep={nextStep} stepBack={stepBack} selectedCandidate={selectedCandidate} selectedCompany={selectedCompany} interviewDate={interviewDate} setinterviewDate={setinterviewDate} phase={phase} setPhase={setPhase} status={status} setStatus={setStatus} notes={notes} setNotes={setNotes} setSubmit={setSubmit} />;
            case 4: return <Success stepBack={stepBack} />;
            default: <SelectCandidate />;
        }
    }



    const nextStep = () => {
        history.push(`/create/${step + 1}`)
    }


    const stepBack = () => {
        history.push(`/create/${step - 1}`)
    }

    return (
        <>
            <nav className="navbar navbar-light bg-light ps-5">
                <form className="container-fluid justify-content-start">
                    <div className="col-9 h1">Reports Administration </div>
                    <div className="buttonsDiv col-3 text-end pe-5">
                        <Link to={`/create/1`}>
                            <button className="btn btn-secondary text-white btn-outline-success  me-5" type="button">Create New Report</button>
                        </Link>
                    </div>
                </form>
            </nav>

            {renderSwitch()}
        </>
    )
}