import { Link } from "react-router-dom";
import { config } from "../config";
import { MdArrowOutward } from "react-icons/md";
import "./MyWorks.css";

const MyWorks = () => {
  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          All <span>Works</span>
        </h1>
        <p>A collection of all my projects and creations</p>
      </div>

      <div className="myworks-grid">
        {config.projects.map((project, index) => (
          <div className="myworks-card" key={project.id} data-cursor="disable">
            <div className="myworks-card-number">0{index + 1}</div>
            <div className="myworks-card-image">
              {project.demo ? (
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <img src={project.image} alt={project.title} />
                </a>
              ) : (
                <img src={project.image} alt={project.title} />
              )}
            </div>
            <div className="myworks-card-info">
              <h3>
                {project.demo ? (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "var(--accentColor)" }}>
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </h3>
              <p className="myworks-card-category">{project.category}</p>
              <p className="myworks-card-description">{project.description}</p>
              <p className="myworks-card-tech">{project.technologies}</p>
              {project.demo && (
                <div style={{ marginTop: "15px" }}>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "14px",
                      color: "var(--accentColor)",
                      fontWeight: 600,
                      textDecoration: "none"
                    }}
                  >
                    Visit Live Demo <MdArrowOutward />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWorks;
