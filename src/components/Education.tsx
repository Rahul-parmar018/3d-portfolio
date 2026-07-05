import "./styles/Career.css";
import { config } from "../config";
import { MdArrowOutward } from "react-icons/md";

const Education = () => {
  return (
    <div className="career-section section-container" id="education" style={{ paddingBottom: "80px" }}>
      <div className="career-container" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h2>
          Edu<span>cation</span>
        </h2>
        
        {/* Academic Summary Paragraph */}
        <p style={{
          textAlign: "center",
          color: "#eae5ec",
          fontSize: "16px",
          lineHeight: "26px",
          maxWidth: "800px",
          margin: "-60px auto 40px auto",
          fontWeight: 300
        }}>
          My academic journey has built a strong foundation in Computer Science, Full-Stack Development, and Artificial Intelligence. Through L.J. University and continuous self-learning, I am developing practical skills in Machine Learning, LLMs, and production AI systems while preparing for an international AI Engineering career.
        </p>

        {/* Quick Stats Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginBottom: "60px",
          width: "100%"
        }}>
          {[
            { label: "🎓 2 Degrees", desc: "Integrated M.Sc. & B.Sc." },
            { label: "🏅 6+ Certifications", desc: "Deloitte, Google, IBM, Vanderbilt" },
            { label: "💼 Bluehole", desc: "Full-Stack Web & AI Developer" },
            { label: "🎯 Target: AI/ML", desc: "Applied AI Engineer Journey" }
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "12px",
                padding: "15px",
                textAlign: "center",
                backdropFilter: "blur(10px)"
              }}
            >
              <h4 style={{ margin: "0 0 5px 0", fontSize: "15px", color: "var(--accentColor)", fontWeight: 600 }}>
                {stat.label}
              </h4>
              <p style={{ margin: 0, fontSize: "12px", color: "#a59fa7" }}>
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {config.education.map((edu, index) => (
            <div key={index} className="career-info-box">
              <div className="career-info-in">
                <div className="career-role">
                  <h4 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    🎓 {edu.degree}
                  </h4>
                  <h5>{edu.institution}</h5>
                </div>
                {/* Clean formatted dates */}
                <h3 style={{ fontSize: "28px", color: "var(--accentColor)" }}>
                  {edu.period.includes("2028") ? "2024 – 2028" : "2020 – 2023"}
                </h3>
              </div>
              
              <div style={{ width: "45%" }}>
                <p style={{ width: "100%", marginBottom: "15px" }}>
                  <strong>Highlights:</strong> {edu.highlights.join(", ")}
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "10px" }}>
                  {edu.coursework.map((course, idx) => (
                    <span
                      key={idx}
                      className="tag-chip"
                      style={{
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(194, 164, 255, 0.15)",
                        borderRadius: "8px",
                        fontSize: "12px",
                        color: "#eae5ec",
                        padding: "5px 12px",
                        transition: "all 0.3s ease",
                        cursor: "default"
                      }}
                    >
                      📘 {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action at the bottom */}
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <a
            href="#certifications"
            className="contact-social"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "15px",
              padding: "10px 25px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "30px",
              color: "#eae5ec"
            }}
            data-cursor="disable"
          >
            View Certifications <MdArrowOutward />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Education;
