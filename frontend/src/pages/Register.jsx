import { useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";
import { registerUser } from "../api/authApi";
import "../styles/Auth.css";

const Register = () => {
  const { formData, setFormData, setRoute } = useContext(GlobalContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === "section") {
      finalValue = value.toUpperCase();
    }

    setFormData({
      ...formData,
      [name]: finalValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please check again.");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    const { confirmPassword, phone, ...rest } = formData;
    const dataToSend = {
      ...rest,
      phoneNumber: phone,
    };
    try {
      await registerUser(dataToSend);
      setRoute("login");
      alert("Registration successful!");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <section className="auth-panel">
          <div className="auth-panel-brand">
            <span>LF</span>
            Campus Lost and Found
          </div>
          <div className="auth-panel-copy">
            <h2>Create your account.</h2>
            <p>
              Join the platform to report items quickly, search the shared feed, and help reunite belongings across campus.
            </p>
          </div>
          <div className="auth-panel-list">
            <div className="auth-panel-list-item">
              <strong>Modern dashboard</strong>
              <span>Clean sections for lost reports, found reports, and your success stories.</span>
            </div>
            <div className="auth-panel-list-item">
              <strong>Clear ownership info</strong>
              <span>Student details make follow-ups easier when items need to be claimed.</span>
            </div>
            <div className="auth-panel-list-item">
              <strong>Better mobile experience</strong>
              <span>The refreshed forms are easier to use on phones, tablets, and laptops.</span>
            </div>
          </div>
        </section>

        <main className="auth-card">
          <div className="auth-card-header">
            <h2>Sign up</h2>
            <p>Enter your details to start using the platform.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-grid">
              <div className="auth-field auth-span-full">
                <label htmlFor="register-name">Full name</label>
                <input
                  id="register-name"
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="register-email">Email address</label>
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="register-phone">Phone number</label>
                <input
                  id="register-phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="register-regd">Registration number</label>
                <input
                  id="register-regd"
                  type="text"
                  name="regdNo"
                  placeholder="Your registration number"
                  value={formData.regdNo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-grid-3 auth-span-full">
                <div className="auth-field">
                  <label htmlFor="register-course">Course</label>
                  <select
                    id="register-course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your course</option>
                    <option value="CSE">CSE</option>
                    <option value="EEE">EEE</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                    <option value="AIML">AIML</option>
                    <option value="AI">AI</option>
                  </select>
                </div>

                <div className="auth-field">
                  <label htmlFor="register-section">Section</label>
                  <input
                    id="register-section"
                    type="text"
                    name="section"
                    placeholder="A"
                    value={formData.section}
                    onChange={handleChange}
                    maxLength="5"
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="register-password">Password</label>
                <input
                  id="register-password"
                  type="password"
                  name="password"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="register-confirm-password">Confirm password</label>
                <input
                  id="register-confirm-password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-submit">
              Create Account
            </button>

            <p className="auth-footer">
              Already have an account?
              <button type="button" onClick={() => setRoute("login")}>
                Sign in
              </button>
            </p>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Register;
