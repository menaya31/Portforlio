"use client"

import { useEffect, useRef, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./portfolio.css"
import emailjs from "@emailjs/browser"


export default function Portfolio() {



    
const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [status, setStatus] = useState(""); 
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    emailjs.send(
      "service_r82jsls",  
      "template_coq2sn1",   
      formData,
      "KA8rhDsviYxOthN2t"      
    )
    .then(() => {
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" }); 
    })
    .catch((error) => {
      console.error("Failed to send message:", error);
      setStatus("Error sending message. Please try again.");
    });
  };

  


    
  const [isVisible, setIsVisible] = useState({
    about: false,
    skills: false,
    projects: false,
    education: false,
    contact: false,
  })

  const [heroLoaded, setHeroLoaded] = useState(false)

  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const educationRef = useRef(null)
  const contactRef = useRef(null)

  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    
    setTimeout(() => {
      setHeroLoaded(true)
    }, 300)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setIsVisible((prev) => ({
              ...prev,
              [id]: true,
            }))

            
            setActiveSection(id)
          }
        })
      },
      { threshold: 0.2 },
    )

    
    if (aboutRef.current) observer.observe(aboutRef.current)
    if (skillsRef.current) observer.observe(skillsRef.current)
    if (projectsRef.current) observer.observe(projectsRef.current)
    if (educationRef.current) observer.observe(educationRef.current)
    if (contactRef.current) observer.observe(contactRef.current)

    
    const homeSection = document.getElementById("home")
    if (homeSection) observer.observe(homeSection)

    return () => {
      if (aboutRef.current) observer.unobserve(aboutRef.current)
      if (skillsRef.current) observer.unobserve(skillsRef.current)
      if (projectsRef.current) observer.unobserve(projectsRef.current)
      if (educationRef.current) observer.unobserve(educationRef.current)
      if (contactRef.current) observer.unobserve(contactRef.current)
      if (homeSection) observer.unobserve(homeSection)
    }
  }, [])

  
  const handleNavLinkClick = (e) => {
    e.preventDefault()
    const targetId = e.target.getAttribute("href").substring(1)
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight
      const targetPosition = targetElement.offsetTop - navbarHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="portfolio-container dark-theme">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#home">
            Menaya K
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === "home" ? "active" : ""}`}
                  href="#home"
                  onClick={handleNavLinkClick}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === "about" ? "active" : ""}`}
                  href="#about"
                  onClick={handleNavLinkClick}
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === "skills" ? "active" : ""}`}
                  href="#skills"
                  onClick={handleNavLinkClick}
                >
                  Skills
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === "projects" ? "active" : ""}`}
                  href="#projects"
                  onClick={handleNavLinkClick}
                >
                  Projects
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === "education" ? "active" : ""}`}
                  href="#education"
                  onClick={handleNavLinkClick}
                >
                  Education
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
                  href="#contact"
                  onClick={handleNavLinkClick}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-particles"></div>
        <div className="container-fluid h-100 px-4 px-md-5">
          <div className="row h-100 align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">
                <div className={`hero-greeting ${heroLoaded ? "slide-in-top" : ""}`}>
                  <span className="greeting-line"></span>
                  <span>Welcome to my portfolio</span>
                </div>
                <h1 className={`${heroLoaded ? "slide-in-left" : ""}`}>
                  Hello, I'm <span className="highlight">Menaya Karunanayake</span>
                </h1>
                <h2 className={`${heroLoaded ? "slide-in-right" : ""}`}>
                  <span className="typed-text">Computer Science Undergraduate</span>
                </h2>
                <div className={`hero-text ${heroLoaded ? "fade-in" : ""}`}>
                  <p>Passionate about creating innovative solutions through code</p>
                </div>
                <div className={`hero-buttons ${heroLoaded ? "slide-in-bottom" : ""}`}>
                  <a href="#projects" className="btn btn-primary me-3" onClick={handleNavLinkClick}>
                    View Projects
                  </a>
                  <a href="#contact" className="btn btn-outline-light" onClick={handleNavLinkClick}>
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className={`hero-visual ${heroLoaded ? "fade-in-right" : ""}`}>
                <div className="code-terminal">
                  <div className="terminal-header">
                    <div className="terminal-buttons">
                      <span className="terminal-circle red"></span>
                      <span className="terminal-circle yellow"></span>
                      <span className="terminal-circle green"></span>
                    </div>
                    <div className="terminal-title">portfolio.jsx</div>
                  </div>
                  <div className="terminal-body">
                    <pre>
                      <code>
                        {`function Developer() {
  const skills = [
    "JavaScript", "React", 
    "Java", "Python"
  ];
  
  return (
    <div className="developer">
      <h1>Hello World!</h1>
      <p>Let's build something amazing!</p>
    </div>
  );
}`}
                      </code>
                    </pre>
                  </div>
                </div>
                <div className="hero-shape"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-bg-pattern"></div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className={`about-section ${isVisible.about ? "slide-in-left" : ""}`}>
        <div className="container-fluid px-4 px-md-5">
          <div className="section-title">
            <h2>About Me</h2>
            <div className="underline"></div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <div className="about-img">
                <div className="img-placeholder">
                  <div className="inner-circle">
                    <img src="/portfolio.jpg" alt="Portfolio Image" className="portfolio-img" />
                </div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="about-content">
                <h3>Computer Science Undergraduate</h3>
                <p>
                "I'm a Computer Science undergraduate passionate about UI/UX design, web development, and machine 
                learning. I love creating user-friendly applications that solve real-world problems."
                </p>
                <p>
                Always eager to learn and innovate, I explore AI and enjoy collaborating on exciting projects to
                 push the boundaries of technology.
                </p>
                <div className="personal-info">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="info-item">
                        <span>Name:</span> Menaya Karunanayake
                      </div>
                      <div className="info-item">
                        <span>Email:</span> menayakarunanayake@gmail.com
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="info-item">
                        <span>Degree:</span> BSc (Hons) Computer Science
                      </div>
                      <div className="info-item">
                        <span>Location:</span> Sri Lanka
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - from right */}
      <section id="skills" ref={skillsRef} className={`skills-section ${isVisible.skills ? "slide-in-right" : ""}`}>
        <div className="container-fluid px-4 px-md-5">
          <div className="section-title">
            <h2>My Skills</h2>
            <div className="underline"></div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="skills-category">
                <h3>Software Development</h3>
                <div className="skill-item">
                  <div className="skill-name">
                    <span>Java</span>
                    <span>90%</span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: "90%" }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-name">
                    <span>Python</span>
                    <span>85%</span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-name">
                    <span>Javascript</span>
                    <span>75%</span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-name">
                    <span>MongoDB</span>
                    <span>70%</span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: "70%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="skills-category">
                <h3>Web Technologies</h3>
                <div className="skill-item">
                  <div className="skill-name">
                    <span>React</span>
                    <span>88%</span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: "88%" }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-name">
                    <span>Node.js</span>
                    <span>80%</span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: "80%" }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-name">
                    <span>HTML/CSS</span>
                    <span>95%</span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: "95%" }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-name">
                    <span>Express</span>
                    <span>75%</span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </section>

      {/* Projects Section - from left */}
      <section
        id="projects"
        ref={projectsRef}
        className={`projects-section ${isVisible.projects ? "slide-in-left" : ""}`}
      >
        <div className="container-fluid px-4 px-md-5">
          <div className="section-title">
            <h2>My Projects</h2>
            <div className="underline"></div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="project-card">
                <div className="project-img">
                  <div className="project-placeholder">
                    <span>AI</span>
                  </div>
                </div>
                <div className="project-content">
                  <h3>AI Image Recognition</h3>
                  <p>A machine learning project that identifies objects in images using TensorFlow and Python.</p>
                  <div className="project-tags">
                    <span>Python</span>
                    <span>TensorFlow</span>
                    <span>ML</span>
                  </div>
                  <div className="project-links">
                    <a href="#" className="btn btn-sm btn-outline-primary">
                      View Demo
                    </a>
                    <a href="#" className="btn btn-sm btn-outline-secondary">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="project-card">
                <div className="project-img">
                  <div className="project-placeholder">
                    <span>WA</span>
                  </div>
                </div>
                <div className="project-content">
                  <h3>Weather App</h3>
                  <p>A React-based weather application that provides real-time forecasts using OpenWeatherMap API.</p>
                  <div className="project-tags">
                    <span>React</span>
                    <span>API</span>
                    <span>CSS</span>
                  </div>
                  <div className="project-links">
                    <a href="#" className="btn btn-sm btn-outline-primary">
                      View Demo
                    </a>
                    <a href="#" className="btn btn-sm btn-outline-secondary">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="project-card">
                <div className="project-img">
                  <div className="project-placeholder">
                    <span>CM</span>
                  </div>
                </div>
                <div className="project-content">
                  <h3>Campus Navigator</h3>
                  <p>A mobile app that helps students navigate university campuses efficiently.</p>
                  <div className="project-tags">
                    <span>React Native</span>
                    <span>Maps API</span>
                    <span>Firebase</span>
                  </div>
                  <div className="project-links">
                    <a href="#" className="btn btn-sm btn-outline-primary">
                      View Demo
                    </a>
                    <a href="#" className="btn btn-sm btn-outline-secondary">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4"></div>
        </div>
      </section>

      {/* Education Section*/}
      <section
        id="education"
        ref={educationRef}
        className={`education-section ${isVisible.education ? "slide-in-right" : ""}`}
      >
        <div className="container-fluid px-4 px-md-5">
          <div className="section-title">
            <h2>Education & Experience</h2>
            <div className="underline"></div>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>BSc(Hons) Computer Science</h3>
                <h4>University of Westminster, UK</h4>
                <p className="timeline-date">2023 - Present</p>
                <p>
                  Pursuing a bachelor's degree with focus on Software Development and Machine Learning. 
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content right">
                <h3>Data Entry Clerk</h3>
                <h4>Paint Master Lanka (Pvt) Ltd</h4>
                <p className="timeline-date">2022 - 2023</p>
                <p>
                Worked as a Data Entry Clerk, gaining skills in data management, accuracy, and proficiency with 
                tools like Excel.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Foundation Certificate in Higher Education-IT</h3>
                <h4>IIT, Sri Lanka</h4>
                <p className="timeline-date">2022 - 2023</p>
                <p>
                Completed the IT Foundation Certificate, gaining key skills in Communication, Computing, and Business
                 Science for undergraduate progression.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content right">
                <h3>Diploma in English</h3>
                <h4>British Council</h4>
                <p className="timeline-date">2022-2023</p>
                <p>Completed a Diploma in English, enhancing communication and language skills for professional and
                 academic success.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section  */}
      <section id="contact" ref={contactRef} className={`contact-section ${isVisible.contact ? "slide-in-left" : ""}`}>
        <div className="container-fluid px-4 px-md-5">
          <div className="section-title">
            <h2>Get In Touch</h2>
            <div className="underline"></div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="contact-info">
                <h3>Let's Connect</h3>
                <p>Feel free to reach out for collaborations, opportunities, or just to say hello!</p>
                <div className="contact-item">
                  <div className="icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="text">
                    <h4>Email</h4>
                    <p>menayakarunanayake@gmail.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="text">
                    <h4>Phone</h4>
                    <p> +94 74 224 6434</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="text">
                    <h4>Location</h4>
                    <p>Ragama, Sri Lanka</p>
                  </div>
                </div>
                <div className="social-links">

                <div className="social-icons">
                <a href="https://github.com/menaya31" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/menaya-karunanayake-582b0a2aa/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
                </a>
            </div>

            </div>
              </div>
            </div>
            {/*contact form */}

            {/* Contact Form */}
      <div className="col-md-6">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              name="subject"
              className="form-control"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <textarea
              name="message"
              className="form-control"
              rows={5}
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
          {status && <p className="mt-3">{status}</p>}
        </form>
      </div>





          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container-fluid px-4 px-md-5">
          <div className="row">
            <div className="col-md-6">
              <p>&copy; 2025 MenayaK. All Rights Reserved.</p>
            </div>

          </div>
        </div>
      </footer>
    </div>
  )
}

