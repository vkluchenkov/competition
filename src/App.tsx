/** @jsxImportSource @emotion/react */
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
import { StylesProvider } from "@material-ui/styles";
import { Dww } from "./components/EventDww";
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback="loading">
        <StylesProvider injectFirst>
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <UserProvider>
              <Router>
                <Header />
                <main css={{ display: "flex", backgroundColor: "#f8f8f8" }}>
                  <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/festivals/danceweekend" element={
                      <section css={styles.section}>
                        <Dww />
                      </section>} />
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
        </StylesProvider>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
