import { useContext, useState } from "react";
import { GlobalContext } from "../components/GlobalContext";
import { loginUser } from "../api/authApi";
import "../styles/Auth.css";

export default function Login() {
  const { setFormData, setIsLoggedIn, setRoute, setUser } = useContext(GlobalContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!loginData.email || !loginData.password) {
      setLoginError("Please fill in all fields.");
      return;
    }

    try {
      const response = await loginUser(loginData);
      const nextUser = response.data.user;

      localStorage.setItem("token", response.data.token);
      setUser(nextUser);
      setFormData((prev) => ({
        ...prev,
        course: nextUser?.course || "",
        email: nextUser?.email || "",
        name: nextUser?.name || "",
        phone: nextUser?.phoneNumber || "",
        regdNo: nextUser?.regdNo || "",
        section: nextUser?.section || "",
      }));
      setIsLoggedIn(true);
      setRoute("dashboard");
    } catch (error) {
      setLoginError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell auth-shell-compact">
        <section className="auth-panel">
          <div className="auth-panel-brand">
            <span>LF</span>
            Campus Lost and Found
          </div>
          <div className="auth-panel-copy">
            <h1>Welcome back.</h1>
            <p>
              Sign in to manage reports, review matches, and keep the lost and found flow moving smoothly.
            </p>
          </div>
          <div className="auth-panel-list">
            <div className="auth-panel-list-item">
              <strong>Quick dashboard access</strong>
              <span>Jump straight into lost reports, found reports, and active search.</span>
            </div>
            <div className="auth-panel-list-item">
              <strong>Built for speed</strong>
              <span>Large touch targets and cleaner visual hierarchy across desktop and mobile.</span>
            </div>
            <div className="auth-panel-list-item">
              <strong>Safer handoffs</strong>
              <span>Track returned items and confirm matches with less confusion.</span>
            </div>
          </div>
        </section>

        <main className="auth-card">
          <div className="auth-card-header">
            <h2>Sign in</h2>
            <p>Use your registered email and password to continue.</p>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </div>

            {loginError && <div className="auth-error">{loginError}</div>}

            <button className="auth-submit" type="submit">
              Sign In
            </button>

            <p className="auth-footer">
              Don&apos;t have an account?
              <button type="button" onClick={() => setRoute("register")}>
                Create one
              </button>
            </p>
          </form>
        </main>
      </div>
    </div>
  );
}
