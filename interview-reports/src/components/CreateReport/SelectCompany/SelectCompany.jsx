import { useEffect, useState } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import numberOne from "../assets/numberOneInCircle.png";
import numberTwo from "../assets/numberTwoInCircle.png";
import numberThree from "../assets/numberThreeInCircle.png";
import { getCompanies } from "../../../Services/getCompanies";
import { SearchBar } from "../../SearchBar/SearchBar";
import "./SelectCompany.css";

export const SelectCompany = ({ stepBack, nextStep, selectedCandidate, selectedCompany, setSelectedCompany }) => {

    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [searchQuery, setSearchQuery] = useState([]);
    const [warningText, setWarningText] = useState("");


    let token = localStorage.getItem("tokenNibble");

    
    useEffect(() => {
        getCompanies(token)
            .then(data => {
                setCompanies(data)
                setFilteredCompanies(data)
            })

    }, [token])


    const filterFunction = (event) => {
        setSearchQuery(event.target.value.trim().toLowerCase())
    }


    useEffect(() => {
        const filtCompanies = companies.filter(company => {
            console.log(company.name)
            return company.name.toLowerCase().includes(searchQuery)
        })
        setFilteredCompanies(filtCompanies)
    }, [searchQuery])


    const validateSelectedCompany = () => {
        if (selectedCompany.length !== 0) {
            setWarningText("");
            nextStep()
        } else {
            setWarningText("Please select company!")
        }
    }



    return (
        <>
            <div className="row">
                <div className="steps border-end border-dark col-xs-12 col-sm-12 col-md-4">
                    <div className="m-5">
                        <Link className="selectWizardLinks" to="/create/1">
                            <p className="fs-3"><img className="numberOne m-3" src={numberOne} alt="" /> Select Candidate</p>
                        </Link>

                        <Link className="selectWizardLinks" to="/create/2">
                            <p className="fw-bold fs-3"><img className="numberTwo m-3" src={numberTwo} alt="" /> Select Company</p>
                        </Link>
                        {(selectedCompany.length !== 0) ?
                            <Link className="selectWizardLinks" to="/create/3">
                                <p className="fs-3"><img className="numberThree m-3" src={numberThree} alt="" /> Fill Report Details</p>
                            </Link>
                            :
                            <p className="fs-3"><img className="numberThree m-3" src={numberThree} alt="" /> Fill Report Details</p>
                        }
                    </div>
                    <hr />
                    <p className="ms-5 fs-3">Candidate:</p>
                    <p className="ms-5 fw-bold fs-1">{selectedCandidate.name}</p>
                    <p className="ms-5 fs-3">Company:</p>
                    <p className="ms-5 fw-bold fs-1">{selectedCompany.name}</p>
                </div>
                <div className="companies col-7 bg-light p-5 pt-1 m-3 ">
                    <div className="searchBarCompanies">
                        <SearchBar passedHeadline={"Search companies"} filterFunction={filterFunction} />
                    </div>

                    <div className="text-danger fs-1 fw-bold text-center">
                        {warningText}
                    </div>

                    {filteredCompanies.map((company, index) => (
                        <p onClick={() => { setSelectedCompany(company) }} className="bg-info p-1 ps-3 rounded me-5 user-select-all" key={index}>{company.name}</p>
                    ))}
                </div>
            </div>
            <div className="BackAndNextButtons position-relative me-5">
                <button className="btn btn-info p-3 ps-5 pe-5 position-absolute bottom-10 backButtonCompany" onClick={stepBack}>BACK</button>
                <button className="btn btn-info p-3 ps-5 pe-5 position-absolute bottom-10 me-5 nextButtonCompany" onClick={validateSelectedCompany}>NEXT</button>
            </div>

        </>
    )
}