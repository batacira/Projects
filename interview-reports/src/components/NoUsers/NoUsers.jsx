import noUsersImage from "./assets/noUsersImage.jpg";
import "./NoUsers.css";

export const NoUsers = () => {

    return (
        <>
            <div className="noUsersDiv">
                <img className="noResultsImage text-center img-fluid mx-auto d-block" src={noUsersImage} alt="No results that match your search" />
                <p className="text-center fw-bold fs-3">There are no results that match your search.</p>
            </div>
        </>
    )
}