import { useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";
import "../styles/Home.css";

const FEATURES = [
  { icon: "01", title: "Smart Search", desc: "Filter reports by item name and description so people can spot likely matches faster." },
  { icon: "02", title: "Quick Reports", desc: "Submit a lost or found item in seconds with details and a clear photo." },
  { icon: "03", title: "Match Visibility", desc: "See the latest reports in one place and reduce missed reunions across campus." },
  { icon: "04", title: "Safe Returns", desc: "Mark items as returned when ownership is confirmed and keep records clean." },
  { icon: "05", title: "Student Friendly", desc: "Built for campus communities with simple flows that work well on mobile." },
  { icon: "06", title: "Real Stories", desc: "Celebrate successful returns and build trust in the lost and found process." },
];

export default function Home() {
  const { isLoggedIn, setRoute } = useContext(GlobalContext);

  return (
    <div className="home-page">
      <div className="home-shell">
        <header className="home-nav">
          <div className="home-brand">
            <div className="home-brand-badge">LF</div>
            <div>
              <h1>Campus Lost and Found</h1>
              <p>Modern item recovery for students, staff, and communities.</p>
            </div>
          </div>
          <div className="home-nav-actions">
            {isLoggedIn ? (
              <>
                <button className="button-secondary" onClick={() => setRoute("dashboard")}>
                  Open Dashboard
                </button>
                <button className="button-primary" onClick={() => setRoute("dashboard")}>
                  Manage Reports
                </button>
              </>
            ) : (
              <>
                <button className="button-ghost" onClick={() => setRoute("login")}>
                  Login
                </button>
                <button className="button-primary" onClick={() => setRoute("register")}>
                  Get Started
                </button>
              </>
            )}
          </div>
        </header>

        <section className="hero-section">
          <div className="hero-copy">
            <div className="hero-eyebrow">Campus recovery, redesigned</div>
            <h2>Find it faster. Return it with confidence.</h2>
            <p>
              A cleaner lost and found experience for modern campuses. Report items,
              search the feed, track likely matches, and celebrate safe returns in one place.
            </p>
            <div className="hero-actions">
              <button
                className="button-primary"
                onClick={() => setRoute(isLoggedIn ? "dashboard" : "register")}
              >
                {isLoggedIn ? "Go to Dashboard" : "Create Account"}
              </button>
              {!isLoggedIn && (
                <button className="button-secondary" onClick={() => setRoute("login")}>
                  Sign In
                </button>
              )}
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <strong>2 min</strong>
                <span>to submit a report</span>
              </div>
              <div className="hero-stat">
                <strong>1 feed</strong>
                <span>for all lost and found activity</span>
              </div>
              <div className="hero-stat">
                <strong>100%</strong>
                <span>focused on clearer campus handoffs</span>
              </div>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="hero-panel-top">
              <h3>Designed for daily campus use</h3>
              <p>
                The interface now favors quick scanning, focused actions, and mobile-friendly layouts.
              </p>
            </div>
            <div className="hero-timeline">
              <div className="hero-timeline-item">
                <div className="hero-timeline-icon">A</div>
                <div>
                  <strong>Report what happened</strong>
                  <span>Create a lost or found post with details and photos.</span>
                </div>
              </div>
              <div className="hero-timeline-item">
                <div className="hero-timeline-icon">B</div>
                <div>
                  <strong>Review likely matches</strong>
                  <span>Browse the latest records in a single searchable space.</span>
                </div>
              </div>
              <div className="hero-timeline-item">
                <div className="hero-timeline-icon">C</div>
                <div>
                  <strong>Close the loop</strong>
                  <span>Confirm the item is returned and preserve the success story.</span>
                </div>
              </div>
            </div>
            <div className="hero-panel-bottom">
              <h4>Better UX, same app logic</h4>
              <p>The upgrade keeps your existing workflow while making the product feel more polished and trustworthy.</p>
            </div>
          </aside>
        </section>

        <section className="feature-section">
          <div className="section-heading">
            <div>
              <h3>Built to feel like a real product</h3>
              <p>
                The refreshed interface emphasizes hierarchy, readability, and confidence at every step.
              </p>
            </div>
          </div>
          <div className="feature-grid">
            {FEATURES.map((feature) => (
              <div key={feature.icon} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="feature-section">
          <div className="section-heading">
            <div>
              <h3>Why this feels more modern now</h3>
              <p>The interface is organized around clear actions, glass surfaces, stronger typography, and better spacing.</p>
            </div>
          </div>
          <div className="showcase-grid">
            <div className="showcase-card">
              <strong>Cleaner</strong>
              <span>Sharper layouts and more intentional visual hierarchy.</span>
            </div>
            <div className="showcase-card">
              <strong>Faster</strong>
              <span>Less friction when posting, searching, and managing reports.</span>
            </div>
            <div className="showcase-card">
              <strong>More trusted</strong>
              <span>A polished look helps users feel confident completing returns.</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
