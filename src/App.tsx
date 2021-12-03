/** @jsxImportSource @emotion/react */
import React from "react";
import { Suspense } from "react";
import "./App.css";
import { Main } from "./pages/Main";
import { Header } from "./components/Header";
import { UserProvider } from "./store/User";
import { Login } from "./pages/Login";
import { Signup } from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from '@date-io/luxon';
import { styles } from "./pages/Main/styles";

function App() {
  return (
    <Suspense fallback="loading">
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <UserProvider>
          <Router>
            <Header />
            <main css={{ display: "flex", backgroundColor: "#f8f8f8" }}>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={
                  <section css={styles.section}>
                    <Login />
                  </section>
                } />
                <Route path="/signup" element={
                  <section css={styles.section}>
                    <Signup />
                  </section>
                } />
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
          </Router>
        </UserProvider>
      </MuiPickersUtilsProvider>
    </Suspense>
  );
}

export default App;
