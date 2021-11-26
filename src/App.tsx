/** @jsxImportSource @emotion/react */
import React from "react";
import "./App.css";
import { Main } from "./pages/Main";
import { Header } from "./components/Header";
import { Menu } from "./components/Menu";
import { QueuePopup } from "./components/QueuePopup";
import { QueueProvider } from "./store/Queue";
import { UserProvider } from "./store/User";
import { Login } from "./pages/Login";
import { SingleVideo } from "./pages/SingleVideo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from '@date-io/luxon';

function App() {
  return (
    <MuiPickersUtilsProvider utils={LuxonUtils}>
      <QueueProvider>
        <UserProvider>
          <Router>
            <Header />
            <main css={{ display: "flex", backgroundColor: "#f8f8f8" }}>
              {/* <Menu /> */}
              <Routes>
                <Route path="/" element={<Main />} />
                {/* <Route path="/single/:videoId" element={<SingleVideo />} />
              <Route path="/login" element={<Login />} /> */}
                <Route
                  path="*"
                  element={
                    <div style={{ padding: "1rem" }}>
                      <p>There's nothing here!</p>
                    </div>
                  }
                />
              </Routes>
            </main>
            <QueuePopup />
          </Router>
        </UserProvider>
      </QueueProvider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
