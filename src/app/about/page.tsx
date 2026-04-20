import React from "react";
import Image from "next/image";

const skills = [
  "React.js",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "HTML",
  "CSS",
  "Git & GitHub",
  "Figma",
];

const aboutPage = () => {
  return (
    <section
      id="about"
      className="relative mt-32 mb-20 space-y-16 scroll-mt-10"
    >
      <Image
        src="/assets/ellipse-large.png"
        alt="bg"
        width={540}
        height={540}
        className="absolute top-[-200px] left-0 w-[200px] sm:w-[400px] opacity-20"
      />
      <Image
        src="/assets/ellipse-large.png"
        alt="bg"
        width={540}
        height={540}
        className="absolute -bottom-40 -right-44 w-[200px] sm:w-[600px]"
      />
      <Image
        src="/assets/pattern-big.svg"
        alt="bg"
        width={540}
        height={540}
        className="absolute -bottom-40 -left-10 w-[50px] sm:w-[110px] opacity-30"
      />

      <Image
        src="/assets/line-horizontal.png"
        alt="line"
        width={0}
        height={0}
        className="w-96 h-[0.5px] sm:w-96 mx-auto"
      />
      <div className="flex lg:flex-row flex-col gap-20 justify-between items-center px-5 sm:px-32 w-full">
        <div className="flex-[1.2]">
          <h2 className="font-semibold text-[24px] lg:text-[32px] flex items-center mb-6">
            <span className="text-my-primary">#</span>about-me{" "}
            <span className="ml-6">
              <Image
                src="/assets/line.png"
                alt="line"
                width={22}
                height={1}
                className="sm:60 w-32 h-[0.5px]"
              />
            </span>
          </h2>
          <p className="text-center sm:text-left text-[1rem] pt-5">
            Hi! I&apos;m Ifeoluwa Osinuga, a Frontend Engineer with a background in Computer Science
            passionate about building responsive, user-friendly applications. My
            core stack includes Next.js, React, TypeScript, and Tailwind CSS.{" "}
            <br />I am driven by curiosity and a commitment to continuous
            learning, exploring new technologies and best practices to optimize
            performance and user experience. I am eager to learn, work with
            others, and create meaningful technology while staying curious and
            having fun. <br /> Outside of coding, you would probably find me
            reading a book or watching K-dramas.
          </p>
        </div>
        <div className="flex-1 flex justify-center sm:mt-6 mt-10 relative">
          {/* bg patterns */}
          <Image
            src="/assets/star.svg"
            alt="star"
            width={0}
            height={0}
            className="-z-10 w-28 h-28 absolute -top-9 left-0 sm:left-5"
          />
          <Image
            src="/assets/smiley.svg"
            alt="smiley"
            width={0}
            height={0}
            className="w-20 h-20 absolute top-16 -right-4 sm:right-2"
          />
          <Image
            src="/assets/heart.svg"
            alt="heart"
            width={0}
            height={0}
            className="-z-10 w-36 h-36 absolute -bottom-5 -left-9 sm:-left-3"
          />

          {/* portfolio picture */}
          <Image
            src="/images/my-picture-1.png"
            alt="my portrait"
            width={300}
            height={280}
          />
        </div>
      </div>

      <div className="mx-auto w-[95%] sm:w-[75%] px-4 sm:px-8 py-3 sm:py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm font-semibold shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)]">
        <p className="text-[22px]">
          <span className="text-my-primary text-[26px]">/</span>skills
        </p>

        <div className="flex flex-wrap gap-3 text-[14px] font-light mt-5">
          {skills.map((skill) => (
            <p
              key={skill}
              className="px-2 sm:px-3 py-1 sm:py-2 flex items-center justify-between rounded-full bg-white/5 backdrop-blur-sm shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)]"
            >
              {skill}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default aboutPage;
