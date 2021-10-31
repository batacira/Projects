import {  useState } from "react";
import { Switch, Route, Redirect } from "react-router";
import Modal from "react-modal";
import { Header } from "./components/Header/Header";
import { Login } from "./components/Login/Login";
import { SingleCandidate } from "./components/SingleCandidate/SingleCandidate";
import { Candidates } from "./components/Candidates/Candidates";
import { Footer } from "./components/Footer/Footer";
import { Reports } from "./components/Reports/Reports";
import { CreateReport } from "./components/CreateReport/CreateReport";
import "./App.css";

Modal.setAppElement("#root")
function App() {

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("tokenNibble"));


  return (
    <div className="App">
      {
        loggedIn
          ?
          <>
            <Header setLoggedIn={setLoggedIn} />
            <Switch>
              <Route path="/home" component={Candidates} />
              <Route path="/single-candidate/:id" component={SingleCandidate} />
              <Route path="/reports" component={Reports} />
              <Route path="/create/:step" component={CreateReport} />
              <Redirect from="/" to="/home" />
            </Switch>
          </>
          :
          <>
          <Login setLoggedIn={setLoggedIn} />
          <Redirect from="/" to="/login" />
          </>
      }
      <Footer />
    </div>
  );
}

export default App;
