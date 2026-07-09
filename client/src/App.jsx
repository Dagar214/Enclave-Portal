import { lazy, Suspense } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import BootSequence from "./components/BootSequence";

const ContactForm = lazy(() =>
  import("./components/ContactForm")
);

const Admin = lazy(() =>
  import("./pages/Admin")
);

function App() {
  return (
    <main className="app">
      <div className="console-frame">

        <div className="frame-bar">
          <div className="frame-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <p className="frame-path">enclave://secure-portal</p>
          <p className="frame-status">
            <span className="badge-dot" />
            live
          </p>
        </div>

        <section className="container">

          <div className="hero">

            <h1>
              Secure Contact
              <br />
              Portal
            </h1>

            <p className="subtitle">
              A hardened submission pipeline built on
              React, Express and MongoDB — every request
              is validated, throttled and logged.
            </p>

            <BootSequence />

            <div className="nav-buttons">

              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "nav-btn active"
                    : "nav-btn"
                }
              >
                Contact Form
              </NavLink>

              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive
                    ? "nav-btn active"
                    : "nav-btn"
                }
              >
                Admin Dashboard
              </NavLink>

            </div>

          </div>

          <Suspense
            fallback={
              <div className="contact-card">
                <h2>Loading...</h2>
              </div>
            }
          >

            <Routes>

              <Route
                path="/"
                element={<ContactForm />}
              />

              <Route
                path="/admin"
                element={<Admin />}
              />

            </Routes>

          </Suspense>

        </section>

      </div>
    </main>
  );
}

export default App;