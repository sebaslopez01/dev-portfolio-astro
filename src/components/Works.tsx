import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import github from "../assets/github.png";
import webPage from "../assets/web-page.png";

import SectionWrapper from "./hoc/SectionWrapper";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import type { ProjectData } from "../interfaces";

interface ProjectCardProps extends ProjectData {
  index: number;
}

function ProjectCard({
  index,
  name,
  description,
  tags,
  image,
  pageLink,
  sourceCodeLink,
}: ProjectCardProps) {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        scale={1.1}
        transitionSpeed={450}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image.src}
            width={image.width}
            height={image.height}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex space-x-2 justify-end m-3 card-img_hover">
            {pageLink && (
              <a
                href={pageLink}
                target="_blank"
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center"
              >
                <img
                  src={webPage.src}
                  width={webPage.width}
                  height={webPage.height}
                  alt="Web Page Icon"
                  className="w-1/2 h-1/2 object-contain"
                />
              </a>
            )}
            {sourceCodeLink && (
              <a
                href={sourceCodeLink}
                target="_blank"
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center"
              >
                <img
                  src={github.src}
                  width={github.width}
                  height={github.height}
                  alt="Github Icon"
                  className="w-1/2 h-1/2 object-contain"
                />
              </a>
            )}
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
}

function Works() {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="sectionSubText">My Work</p>
        <h2 className="sectionHeadText">Projects</h2>
      </motion.div>
      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>
      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(Works, "");
