import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Samuel Paul</h1>
        <p>Graphic Designer Portfolio</p>
      </header>

      <main>
        <section>
          <h2>About</h2>
          <p>Professional Graphic Designer specializing in branding, digital campaigns, and creative design solutions.</p>
        </section>

        <section>
          <h2>Portfolio</h2>
          {loading ? (
            <p>Loading projects...</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {projects.map((project) => (
                <div key={project._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                    {project.category}
                  </span>
                  {project.mediaUrl && (
                    <div style={{ marginTop: '10px' }}>
                      {project.mediaType === 'video' ? (
                        <video controls style={{ width: '100%', maxHeight: '200px' }}>
                          <source src={`${API_URL}${project.mediaUrl}`} type="video/mp4" />
                        </video>
                      ) : (
                        <img 
                          src={`${API_URL}${project.mediaUrl}`} 
                          alt={project.title}
                          style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={{ marginTop: '40px' }}>
          <h2>Contact</h2>
          <p>Phone: +91 99122 26742</p>
          <p>Email: kandulachandrapal@gmail.com</p>
          <p>Location: Hyderabad, India</p>
        </section>
      </main>
    </div>
  );
}

export default App;