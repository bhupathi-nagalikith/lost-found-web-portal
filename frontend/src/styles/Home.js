const styles = {
  pageBg: (color1, color2) => ({
    minHeight: "100vh",
    width: "100vw",
    background: `linear-gradient(135deg, ${color1}, ${color2})`,
    fontFamily: "'Inter', sans-serif",
    overflowX: "hidden", // Prevents horizontal scroll on mobile
  }),

  // Container to keep content centered with padding
  contentWrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },

  heroContainer: {
    paddingTop: "80px",
    paddingBottom: "30px",
    textAlign: "center",
    color: "white",
  },

  heroTitle: {
    fontSize: "clamp(2rem, 8vw, 3.5rem)", // Fluid typography: shrinks on mobile, grows on desktop
    fontWeight: "800",
    marginBottom: "1rem",
    lineHeight: "1.2",
  },

  heroDesc: {
    fontSize: "clamp(1rem, 4vw, 1.25rem)",
    maxWidth: "700px",
    margin: "0 auto 2.5rem auto",
    opacity: 0.9,
    lineHeight: "1.6",
  },

  ctaBtn: {
    padding: "16px 32px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    borderRadius: "50px", // Rounded pill shape
    border: "none",
    backgroundColor: "white",
    color: "#7e22ce",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    transition: "transform 0.2s",
  },

  featuresSection: {
    padding: "80px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  featuresHeading: {
    textAlign: "center",
    color: "white",
    fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
    marginBottom: "50px",
  },

  featuresGrid: {
    display: "grid",
    // This is the magic line for responsiveness:
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
  },

  featureCard: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)", // Safari support
    padding: "30px",
    borderRadius: "20px",
    color: "white",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  featureEmoji: {
    fontSize: "40px",
    marginBottom: "15px",
  },

  featureTitle: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginBottom: "10px",
  },

  featureDesc: {
    fontSize: "0.95rem",
    lineHeight: "1.5",
    opacity: 0.85,
  },
};

export default styles;