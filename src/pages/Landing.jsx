import React from 'react'
import { Link } from 'react-router-dom'


function Landing() {
  return (
    <div className="page landing">
      <div className="landing-orb orb-one" />
      <div className="landing-orb orb-two" />

      <header className="landing-nav">
        <div className="brand">
          <span className="brand-mark">SM</span>
          <span className="brand-text">Student Management</span>
        </div>
        <div className="nav-actions">
          <Link to="/auth" className="btn-ghost">Teacher Login</Link>
          <Link to="/auth" className="btn-brand">Get Started</Link>
        </div>
      </header>

      <section className="landing-hero">
        <div className="hero-copy">
          <p className="hero-kicker">Built for teachers, shaped for students</p>
          <h1 className="hero-title">
            One space to manage every student record with clarity.
          </h1>
          <p className="hero-subtitle">
            Create, update, and track student details in seconds. Give every student an
            individual dashboard that stays up-to-date across your classes.
          </p>
          <div className="cta-row">
            <Link to="/auth" className="btn-brand">Start Managing</Link>
            <Link to="/auth" className="btn-ghost">Explore Dashboard</Link>
          </div>
          <div className="hero-stats">
            <div>
              <h3>CRUD Ready</h3>
              <p>Fast add, edit, and delete workflows.</p>
            </div>
            <div>
              <h3>Teacher Focused</h3>
              <p>Designed for everyday classroom routines.</p>
            </div>
            <div>
              <h3>Student Profiles</h3>
              <p>Individual dashboards at a glance.</p>
            </div>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-card">
            <div className="hero-card-header">
              <span>Classroom Snapshot</span>
              <span className="status-pill">Live</span>
            </div>
            <div className="hero-card-body">
              <div className="mini-row">
                <div>
                  <p>Total Students</p>
                  <h2>128</h2>
                </div>
                <div>
                  <p>Active Batches</p>
                  <h2>6</h2>
                </div>
              </div>
              <div className="mini-list">
                <div className="mini-item">
                  <div className="mini-avatar" />
                  <div>
                    <h4>Priya Sharma</h4>
                    <span>Batch 2026 · Updated</span>
                  </div>
                  <button className="btn-ghost small">View</button>
                </div>
                <div className="mini-item">
                  <div className="mini-avatar alt" />
                  <div>
                    <h4>Adrian Cole</h4>
                    <span>Batch 2025 · Pending</span>
                  </div>
                  <button className="btn-ghost small">View</button>
                </div>
                <div className="mini-item">
                  <div className="mini-avatar accent" />
                  <div>
                    <h4>Mei Lin</h4>
                    <span>Batch 2027 · New</span>
                  </div>
                  <button className="btn-ghost small">View</button>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-card glass">
            <h3>Teacher Toolkit</h3>
            <p>Automated reminders, clean student records, and zero clutter.</p>
            <div className="pill-row">
              <span>Attendance</span>
              <span>Grades</span>
              <span>Notes</span>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-grid">
        <div className="feature-card">
          <h3>Unified Profiles</h3>
          <p>Store contact details, batch info, and images in one secure space.</p>
        </div>
        <div className="feature-card">
          <h3>Quick Actions</h3>
          <p>Trigger edits or removals without leaving the student table.</p>
        </div>
        <div className="feature-card">
          <h3>Teacher Dashboards</h3>
          <p>See your class status instantly with live counts and updates.</p>
        </div>
      </section>
    </div>
  )
}

export default Landing
