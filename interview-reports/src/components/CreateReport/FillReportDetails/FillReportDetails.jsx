import "./FillReportDetails.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";
import numberOne from "../assets/numberOneInCircle.png";
import numberTwo from "../assets/numberTwoInCircle.png";
import numberThree from "../assets/numberThreeInCircle.png";

export const FillReportDetails = ({ stepBack, nextStep, selectedCandidate, selectedCompany, interviewDate, setinterviewDate, phase, setPhase, status, setStatus, notes, setNotes, setSubmit }) => {

    const [warningText, setWarningText] = useState("");


    const handleStatus = e => {
        setStatus(e.value);
    }

    const handlePhase = e => {
        setPhase(e.value);
    }

    const sendSubmit = () => {
        if (interviewDate.length < 4) {
            setWarningText("Please select valid date")
        } else if ((phase === undefined) || phase === "") {
            setWarningText("Please select phase")
        } else if ((status === undefined) || status === "") {
            setWarningText("Please select status")
        } else if (notes.length < 4) {
            setWarningText("Please write a longer note")
        } else {
            setWarningText("");
            nextStep()
            setSubmit(true)
        }
    }


    const phaseData = [
        {
            label: "Select phase"
        },
        {
            value: "cv",
            label: "cv"
        },
        {
            value: "hr",
            label: "hr"
        },
        {
            value: "tech",
            label: "tech"
        },
        {
            value: "final",
            label: "final"
        },
    ];


    const statusData = [
        {
            label: "Select status"
        },
        {
            value: "passed",
            label: "passed"
        },
        {
            value: "declined",
            label: "declined"
        },

    ];

    return (
        <>
            <div className="row">
                <div className="steps border-end border-dark col-xs-12 col-sm-12 col-md-4">
                    <div className="m-5">
                        <Link className="selectWizardLinks" to="/create/1">
                            <p className="fs-3"><img className="numberOne m-3" src={numberOne} alt="" /> Select Candidate</p>
                        </Link>
                        <Link className="selectWizardLinks" to="/create/2">
                            <p className="fs-3"><img className="numberTwo m-3" src={numberTwo} alt="" /> Select Company</p>
                        </Link>
                        <Link className="selectWizardLinks" to="/create/3">
                            <p className="fw-bold fs-3"><img className="numberThree m-3" src={numberThree} alt="" /> Fill Report Details</p>
                        </Link>
                    </div>
                    <hr />
                    <p className="ms-5 fs-3">Candidate:</p>
                    <p className="ms-5 fw-bold fs-1">{selectedCandidate.name}</p>
                    <p className="ms-5 fs-3">Company:</p>
                    <p className="ms-5 fw-bold fs-1">{selectedCompany.name}</p>
                </div>

                <div className="reportDetails ms-4 ps-xs-5 ps-sm-4  ms-xs-5 ms-sm-4 col-7">
                    <div className="col-12 m-3">
                        <div className="text-danger fs-1 fw-bold text-center">
                            {warningText}
                        </div>

                        <p>Interview Date:</p>
                        <label htmlFor="">
                            <input type="date" onChange={(event) => setinterviewDate(event.target.value)} />
                        </label>

                        <p className="mt-3">Phase:</p>
                        <Select placeholder="Select Option" value={phaseData.find(obj => obj.value === phase)} options={phaseData} onChange={handlePhase} />


                        <p className="mt-3">Status</p>
                        <Select placeholder="Select Option" value={statusData.find(obj => obj.value === status)} options={statusData} onChange={handleStatus} />
                    </div>

                    <div className="notesReportDetails ms-4">
                        <p>Notes</p>
                        <div className="input-group mb-3">
                            <textarea className="border border-secondary" name="" id="notesTextarea" cols="200" rows="10" onChange={(event) => setNotes(event.target.value)}></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="BackAndNextButtons position-relative">
                <button className="btn btn-info p-3 ps-5 pe-5 position-absolute bottom-10 backButtonFillReports" onClick={stepBack}>BACK</button>
                <button className="btn btn-info p-3 ps-5 pe-5 position-absolute bottom-10 me-5 nextButtonFillReports" onClick={sendSubmit}>SUBMIT</button>
            </div>
        </>
    )
}