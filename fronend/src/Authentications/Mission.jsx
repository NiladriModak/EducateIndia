import React from "react";
import Homeheader from "./Homeheader";
function Mission() {
  return (
    <div>
      <Homeheader />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem" }}>Our Mission And Vision</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <img
          style={{ height: "300px", width: "50%", margin: "3vmax" }}
          src="/mission.jpg"
          alt="mission"
        />
        <div>
          <h2> Vision</h2>
          <h4>
            At Educte India, our vision is to democratize education by providing
            free, high-quality, and accessible learning resources to everyone,
            everywhere. We believe that education is a fundamental human right
            and a powerful tool for personal and societal transformation. Our
            mission is to break down barriers to education and create a global
            community of lifelong learners who are equipped with the knowledge
            and skills needed to thrive in a rapidly changing world. Our Core
            Values: Accessibility: We strive to make education available to
            everyone, regardless of geographical location, socioeconomic status,
            or personal circumstances. Our platform is designed to be
            user-friendly and accessible to all.
          </h4>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div style={{ textWrap: "wrap", width: "60%", margin: "3vmax" }}>
          <h2> Goals</h2>

          <h4 style={{ textWrap: "wrap" }}>
            <ul>
              <li>
                Expand Reach: Increase our global footprint by making our
                platform available in multiple languages and partnering with
                organizations and institutions worldwide.
              </li>
              <li>
                Enhance Content: Continuously improve and diversify our content
                offerings to cover a broader range of subjects and skills,
                ensuring that our users have access to the most comprehensive
                educational resources.
              </li>
              <li>
                Innovate Learning: Leverage technology to create innovative and
                engaging learning experiences. This includes incorporating
                interactive elements, multimedia resources, and personalized
                learning pathways.
              </li>
              <li>
                Support Success: Provide tools and support to help our learners
                achieve their goals, whether it’s gaining new skills, advancing
                their careers, or pursuing personal interests.
              </li>
            </ul>
          </h4>
        </div>
        <div>
          <img
            style={{ height: "300px", width: "80%", margin: "3vmax" }}
            src="/goals.jpg"
            alt="mission"
          />
        </div>
      </div>
    </div>
  );
}

export default Mission;
