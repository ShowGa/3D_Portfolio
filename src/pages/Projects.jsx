import React from "react";
import { projects } from "../contants/inidex";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";
import CTA from "../components/CTA";

const Projects = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        My <span className="green-yellow-gradient_text">Projects</span>
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          The best way for a newbie to learning is inmitation . Just like a kid
          imitate speaking from the adult . So I done project by finding youtube
          video and add some personal ingredient . Thank those tutors for
          creating amazing course , so I could learn fundamental concept faster
          .
        </p>
      </div>

      <div className="flex flex-wrap my-20 gap-16">
        {projects.map((project, i) => {
          return (
            <div className="lg:w-[400px] w-full" key={`project-${i}`}>
              <div className="block-container w-12 h-12">
                <div className={`btn-back rounded-xl ${project.theme}`} />
                <div className="btn-front flex items-center justify-center rounded-xl">
                  <img
                    src={project.iconUrl}
                    alt="Project icon"
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col">
                <h4 className="text-2xl font-poppins font-semibold">
                  {project.name}
                </h4>
                <p className="mt-2 text-slate-500">{project.description}</p>
                <div className="mt-5 flex items-center gap-2 font-poppins">
                  <Link
                    to={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600"
                  >
                    Live Link
                  </Link>
                  <img
                    src={arrow}
                    alt="arrow"
                    className="w-4 h-4 object-contain"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <hr className="border-slate-200" />
      <CTA />
    </section>
  );
};

export default Projects;
