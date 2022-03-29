import { Suspense } from "react";
import "./App.css";
import { Main } from "./pages/Main";
import { Header } from "./components/Header";

import { Login } from "./pages/Login";
import { Signup } from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { styles } from "./pages/Main/styles";
import { Register } from "./components/Register";
import { QueryClient, QueryClientProvider } from 'react-query'
import GuardedRoute from "./components/GuardedRoute";
import { EventsList } from "./components/EventsList";
import { PasswordReset } from "./pages/PasswordReset";
import { Profile } from "./pages/Profile";
import AdapterLuxon from "@mui/lab/AdapterLuxon"
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box, StyledEngineProvider, ThemeProvider } from "@mui/material";
import { theme } from "./ui-kit/mui-theme/mui-theme";
import { OrderPage } from "./pages/Order";
import { useUser } from "./store/User";


function App() {
  const queryClient = new QueryClient()
  const [{ initFlag }] = useUser();

  if (!initFlag) {
    return (
      <></>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback="loading">
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <Router>
                <Header />
                <Box>
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

                    <Route path="my-order" element={
                      // <GuardedRoute>
                      <section css={styles.section}>
                        <OrderPage />
                      </section>
                      // </GuardedRoute>
                    } />

                    <Route path="profile" element={
                      <GuardedRoute>
                        <section css={styles.section}>
                          <Profile />
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
                </Box>
              </Router>
            </ThemeProvider>
          </StyledEngineProvider>
        </LocalizationProvider>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
