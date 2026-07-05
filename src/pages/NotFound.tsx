import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0b080c",
      color: "#eae5ec",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Geist', sans-serif",
      textAlign: "center",
      padding: "20px"
    }}>
      <h1 style={{
        fontSize: "120px",
        margin: "0 0 10px 0",
        fontWeight: 300,
        background: "linear-gradient(0deg, #7f40ff, #ffffff)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}>
        404
      </h1>
      <h2 style={{ fontSize: "28px", fontWeight: 400, margin: "0 0 20px 0" }}>
        Page Not Found
      </h2>
      <p style={{ color: "#a59fa7", fontSize: "16px", maxWidth: "450px", margin: "0 0 40px 0", lineHeight: "24px" }}>
        The page you are looking for doesn't exist, has been relocated, or is currently under construction.
      </p>
      
      <div style={{ display: "flex", gap: "15px" }}>
        <Link
          to="/"
          style={{
            background: "var(--accentColor)",
            color: "#0b080c",
            textDecoration: "none",
            padding: "12px 30px",
            borderRadius: "30px",
            fontSize: "14px",
            fontWeight: 600,
            boxShadow: "0 0 15px rgba(194, 164, 255, 0.3)",
            transition: "all 0.3s ease"
          }}
          data-cursor="disable"
        >
          Return Home
        </Link>
        <Link
          to="/myworks"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            color: "#eae5ec",
            textDecoration: "none",
            padding: "12px 30px",
            borderRadius: "30px",
            fontSize: "14px",
            fontWeight: 600,
            transition: "all 0.3s ease"
          }}
          data-cursor="disable"
        >
          View Projects
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
