"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  title: string;
  subtitle: string;
  thumbnail?: string;
  screenshots?: { src: string; caption?: string }[];
  stack: string;
  liveUrl?: string;
  githubUrl: string;
  isMobile?: boolean;
};

const featuredProjects: Project[] = [
  {
    title: "Interneefy",
    subtitle:
      "An internship management system designed to streamline the internship process for organizations from onboarding to evaluation.",
    thumbnail: "/images/interneefy-thumbnail.png",
    stack:
      "Next.js · React.js · TypeScript · Tailwind CSS · Node.js · PostgreSQL · Prisma",
    liveUrl: "https://interneefy-frontend.vercel.app/",
    githubUrl: "https://github.com/Nuga25/interneefy-frontend",
  },
  {
    title: "ExamPulse",
    subtitle:
      "A mobile-based exam notification and scheduling system built with React Native and Firebase, featuring AI-powered course parsing via the Gemini API to auto-generate schedules, push notifications for exam reminders, and a Next.js admin dashboard for managing courses.",
    screenshots: [
      { src: "/images/exampulse.png", caption: "Home screen" },
      { src: "/images/exampulse.png", caption: "Exam schedule" },
      { src: "/images/exampulse.png", caption: "Notifications" },
    ],
    stack: "Expo · React Native · Firebase · Gemini AI · Next.js",
    githubUrl: "https://github.com/Nuga25/exampulse",
    isMobile: true,
  },
  {
    title: "Portfolio Website",
    subtitle:
      "A personal portfolio website built with Next.js, TypeScript, and Tailwind CSS to showcase my projects and skills, with custom animations and a fully responsive layout across devices.",
    thumbnail: "/images/portfolio_thumbnail.png",
    stack: "Next.js · TypeScript · Tailwind",
    liveUrl: "https://ifee-xoxo.vercel.app/",
    githubUrl: "https://github.com/Nuga25/ifee_xoxo",
  },
];

const achievements = [
  {
    src: "/images/upskill.jpg",
    caption: "One of the winners of Upskill with Cardtonic 3.0",
  },
  {
    src: "/images/cil-certificate.jpg",
    caption: "Internship Completion Certification from CIL",
  },
  {
    src: "/images/altschool_certificate.jpg",
    caption: "Frontend Engineering Certification from Altschool Africa",
  },
];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <div
      className={`flex flex-col ${
        reversed ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center gap-8 lg:gap-14 py-12 border-b border-gray-700/60 last:border-none`}
    >
     {/* Image */}
      <div className="w-full lg:w-1/2 flex justify-center">
        {project.isMobile && project.screenshots ? (
          <div className="w-full max-w-[230px]">
            <Carousel
              slides={project.screenshots}
              autoPlay
              autoPlayInterval={4000}
              showIndicators
              showArrows
              variant="portrait"
            />
          </div>
        ) : (
          <div className="relative w-full rounded overflow-hidden transition-all duration-300">
            <Image
              src={project.thumbnail!}
              alt={`${project.title} thumbnail`}
              width={640}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </div>

      {/* Text */}
      <div
        className={`w-full lg:w-1/2 text-center ${
          reversed ? "lg:text-right" : "lg:text-left"
        }`}
      >
        <h3 className="font-bold text-white text-[22px] sm:text-[28px] mb-3">
          {project.title}
        </h3>
        <p className="text-my-primary text-[13px] tracking-wide mb-2">
          {project.stack}
        </p>
        <p className="text-gray-300 text-[14px] sm:text-[15px] leading-relaxed">
          {project.subtitle}
        </p>

        <div
          className={`flex gap-3 mt-6 justify-center ${
            reversed ? "lg:justify-end" : "lg:justify-start"
          }`}
        >
          
          <a  href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-gray-700/60 text-white text-[13px] font-semibold hover:border-my-primary transition-all"
          >
            Live ↔
          </a>
          
          <a  href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-gray-700/60 text-white text-[13px] font-semibold hover:border-my-primary transition-all"
          >
            Github &gt;
          </a>
        </div>
      </div>
    </div>
  );
}

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState<"projects" | "achievements">(
    "projects"
  );

  return (
    <section
      id="projects"
      className="space-y-16 my-40 px-5 sm:px-32 relative scroll-mt-10 md:scroll-mt-32"
    >
      <Image
        src="/assets/dots-small.svg"
        alt="Background pattern"
        width={80}
        height={80}
        className="absolute top-16 md:right-60 right-10 w-10 sm:w-16"
      />

      <Image
        src="/assets/ellipse-large.png"
        alt="Background pattern"
        width={80}
        height={80}
        className="absolute top-48 -left-40 w-[250px] sm:w-[500px] -z-10"
      />

      <div>
        <h2 className="font-semibold text-[24px] lg:text-[32px] flex items-center mb-6">
          <span className="text-my-primary">#</span>projects/achievements{" "}
          <span className="ml-6">
            <Image
              src="/assets/line.png"
              alt="line"
              width={32}
              height={1}
              className="sm:w-60 w-32 h-[0.5px]"
            />
          </span>
        </h2>

        {/* tabs */}
        <div className="flex justify-between w-full lg:w-[70%] mx-auto my-10 text-[12px] lg:text-[18px] gap-3">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-2 rounded-full transition-all border backdrop-blur-sm
            ${
              activeTab === "projects"
                ? "bg-[#2b2035] border-[#C778DD] shadow-[0_0_20px_#C778DD33]"
                : "border-gray-700 hover:border-gray-500"
            }`}
          >
            {`{ Projects }`}
          </button>

          <button
            onClick={() => setActiveTab("achievements")}
            className={`px-6 py-2 rounded-full transition-all border backdrop-blur-sm
            ${
              activeTab === "achievements"
                ? "bg-[#2b2035] border-[#C778DD] shadow-[0_0_20px_#C778DD33]"
                : "border-gray-700 hover:border-gray-500"
            }`}
          >
            {`{ Achievements }`}
          </button>
        </div>

        {/* tab content with animation */}
        <div className="w-[90%] mx-auto">
          <AnimatePresence mode="wait" initial={false}>
            {activeTab === "projects" ? (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <div className="flex flex-col">
                  {featuredProjects.map((project, index) => (
                    <ProjectRow
                      key={project.title}
                      project={project}
                      index={index}
                    />
                  ))}
                </div>

                <p className="flex justify-end my-10 lg:mr-10">
                  <Link
                    href="/projects/all"
                    className="flex items-center text-sm hover:text-my-primary"
                  >
                    view more
                    <Image
                      src="/assets/view-all-arrow.svg"
                      alt="arrow icon"
                      width={20}
                      height={20}
                      className="inline-block ml-2"
                    />
                  </Link>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="flex flex-col items-center"
              >
                <div className="w-full lg:w-[85%] max-w-4xl">
                  <p className="text-center mx-auto mb-10 font-semibold text-[14px] sm:text-md">
                    Achievements / Certifications
                  </p>
                  <Carousel
                    slides={achievements}
                    autoPlay
                    autoPlayInterval={6000}
                    showIndicators
                    showArrows
                  />
                </div>

                <p className="mt-6 text-[10px] text-center sm:text-sm text-gray-300">
                  Swipe to explore — or use the arrows / dots.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;