import { useState, useEffect } from "react";
import "./styles/Certifications.css";
import { config } from "../config";
import { MdArrowOutward, MdOutlinePictureAsPdf } from "react-icons/md";
import { trackEvent } from "../utils/analytics";

const Certifications = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [availablePDFs, setAvailablePDFs] = useState<Record<string, boolean>>({});

  const filters = [
    "All",
    "AI",
    "Machine Learning",
    "LLM",
    "Data Analytics",
    "Python",
    "Marketing"
  ];

  // Dynamically check if PDFs exist on local dev server on mount
  useEffect(() => {
    config.certifications.forEach((cert) => {
      if (cert.pdf) {
        fetch(cert.pdf, { method: "HEAD" })
          .then((res) => {
            setAvailablePDFs((prev) => ({
              ...prev,
              [cert.id]: res.ok,
            }));
          })
          .catch(() => {
            setAvailablePDFs((prev) => ({
              ...prev,
              [cert.id]: false,
            }));
          });
      }
    });
  }, []);

  // Sort and filter certifications based on active selection
  const filteredCerts = config.certifications
    .filter((cert) => {
      if (activeFilter === "All") return true;
      return cert.category.toLowerCase() === activeFilter.toLowerCase();
    })
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="cert-section" id="certifications">
      <h2>
        Licenses <span>&</span>
        <br /> Certifications
      </h2>

      {/* Filter Chips */}
      <div className="cert-filters">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter)}
            data-cursor="disable"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid of Certifications */}
      <div className="cert-grid">
        {filteredCerts.length > 0 ? (
          filteredCerts.map((cert, index) => (
            <div key={index} className="cert-card">
              <div>
                <div className="cert-card-header">
                  <span className="cert-badge">{cert.category}</span>
                  <span className="cert-platform">{cert.platform}</span>
                </div>
                <div className="cert-title-area">
                  <span style={{ fontSize: "12px", color: "var(--accentColor)", fontWeight: 600, display: "block", marginBottom: "4px" }}>
                    {cert.relevanceGroup}
                  </span>
                  <h3>{cert.title}</h3>
                  <h4 className="cert-issuer">{cert.issuer}</h4>
                </div>
              </div>

              <div style={{ marginTop: "20px" }}>
                <div className="cert-skills">
                  {cert.skillsGained.map((skill, idx) => (
                    <span key={idx} className="cert-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dynamic Buttons: View PDF & Verify Credential */}
              <div className="cert-card-footer" style={{ gap: "10px", flexWrap: "wrap" }}>
                {cert.pdf && (
                  availablePDFs[cert.id] ? (
                    <a
                      href={cert.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-link-btn"
                      style={{ gap: "4px" }}
                      data-cursor="disable"
                      onClick={() => trackEvent('Certificate Viewed', { id: cert.id, type: 'pdf' })}
                    >
                      <MdOutlinePictureAsPdf style={{ fontSize: "16px" }} /> View PDF
                    </a>
                  ) : (
                    <span
                      className="cert-link-btn"
                      style={{ gap: "4px", opacity: 0.5, cursor: "not-allowed" }}
                      title="PDF file not found in public assets"
                    >
                      <MdOutlinePictureAsPdf style={{ fontSize: "16px" }} /> PDF not available
                    </span>
                  )
                )}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-link-btn"
                    data-cursor="disable"
                    onClick={() => trackEvent('Certificate Viewed', { id: cert.id, type: 'verify' })}
                  >
                    Verify Credential <MdArrowOutward />
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="cert-empty">
            No certifications added under "{activeFilter}" yet. (Coming Soon)
          </div>
        )}
      </div>
    </div>
  );
};

export default Certifications;
