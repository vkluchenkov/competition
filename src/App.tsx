/** @jsxImportSource @emotion/react */
import { Suspense } from "react";
import "./App.css";
import { Main } from "./pages/Main";
import { Header } from "./components/Header";
import { UserProvider, useUser } from "./store/User";
import { Login } from "./pages/Login";
import { Signup } from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from '@date-io/luxon';
import { styles } from "./pages/Main/styles";
import { StylesProvider } from "@material-ui/styles";
import { Register } from "./components/Register";
import { QueryClient, QueryClientProvider } from 'react-query'
import GuardedRoute from "./components/GuardedRoute";
import { EventsList } from "./components/EventsList";
import { PasswordReset } from "./pages/PasswordReset";

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
                    <Route path="/festivals/:festivalUrl/register" element={
                      <GuardedRoute>
                        <section css={styles.section}>
                          <Register />
                        </section>
                      </GuardedRoute>
                    } />
                    <Route path="my-festivals" element={
                      <GuardedRoute>
                        <section css={styles.section}>
                          <EventsList />
                        </section>
                      </GuardedRoute>
                    } />
                    <Route path="/login" element={
                      <section css={styles.section}>
                        <Login />
                      </section>
                    } />
                    <Route path="/restore" element={
                      <section css={styles.section}>
                        <PasswordReset />
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
