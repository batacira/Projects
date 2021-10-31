import loadingImage from "./assets/loadingScreen.gif";
import "./LoadingPage.css";

export const LoadingPage = () => {
    return (
        <div className="loadingImageDiv">
            <img className="loadingImage text-center" src={loadingImage} alt="Loading..." />
        </div>
    )
}