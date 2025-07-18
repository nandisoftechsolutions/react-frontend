import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import BASE_URL from "../api";

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/manageprojects`);
        const updatedProjects = response.data.map((p) => ({
          ...p,
          full_image_url: p.image_url ? `${BASE_URL}${p.image_url}` : "",
        }));
        setProjects(updatedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.service_type === filter);

  const serviceTypes = ["All", "Website", "Mobile App", "Software"];

  const cardStyle = {
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    border: "1px solid #dee2e6",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#fff",
    position: "relative",
    height: "100%",
  };

  const cardHover = {
    transform: "scale(1.03)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "1rem",
    opacity: 0,
    transition: "opacity 0.3s ease",
    zIndex: 2,
  };

  return (
    <div className="container py-5">
      <Helmet>
        <title>Portfolio | Nandi Softech</title>
        <meta
          name="description"
          content="Explore our portfolio showcasing websites, mobile apps, and software solutions developed by Nandi Softech Solutions."
        />
      </Helmet>

      <h1 className="mb-5 text-center text-primary fw-bold">Our Portfolio</h1>

      {/* Filter Buttons */}
      <div className="mb-4 text-center">
        {serviceTypes.map((type) => (
          <button
            key={type}
            className={`btn mx-2 ${
              filter === type ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setFilter(type)}
            style={{ minWidth: "100px" }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="row g-4">
        {filtered.map(
          ({
            id,
            title,
            description,
            full_image_url,
            youtube_link,
            demo_link,
          }) => (
            <div key={id} className="col-12 col-sm-6 col-lg-3">
              <div
                className="card h-100 position-relative"
                style={
                  hoveredId === id
                    ? { ...cardStyle, ...cardHover }
                    : cardStyle
                }
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Project Image */}
                {full_image_url ? (
                  <img
                    src={full_image_url}
                    className="card-img-top rounded-0"
                    alt={title}
                    style={{ objectFit: "cover", height: "180px" }}
                  />
                ) : (
                  <div
                    style={{
                      height: "180px",
                      background: "#eee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#888",
                    }}
                  >
                    No Image Available
                  </div>
                )}

                {/* Hover Overlay */}
                <div
                  style={{
                    ...overlayStyle,
                    opacity: hoveredId === id ? 1 : 0,
                  }}
                >
                  <div>
                    <h5 className="mb-2">{title}</h5>
                    <p className="small">{description?.slice(0, 80)}...</p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <h5 className="card-title text-primary">{title}</h5>
                  <p className="text-muted small">{description?.slice(0, 80)}...</p>
                  <div className="d-flex gap-2 mt-2">
                    {youtube_link && (
                      <a
                        href={youtube_link}
                        target="_blank"
                        rel="noreferrer"
                        className="badge bg-danger text-decoration-none"
                      >
                        🎥 YouTube
                      </a>
                    )}
                    {demo_link && (
                      <a
                        href={demo_link}
                        target="_blank"
                        rel="noreferrer"
                        className="badge bg-success text-decoration-none"
                      >
                        🚀 Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Portfolio;
