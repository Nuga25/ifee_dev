import Image from "next/image";

const experiencePage = () => {
  return (
    <section
      id="experience"
      className="relative space-y-16 my-40 px-6 lg:px-28 scroll-mt-10 md:scroll-mt-32"
    >
      <h2 className="font-semibold text-[24px] lg:text-[32px] flex items-center mb-20">
        <span className="text-my-primary">#</span>experience{" "}
        <span className="ml-6">
          <Image
            src="/assets/line.png"
            alt="line"
            width={22}
            height={1}
            className="w-40 h-[0.5px]"
          />
        </span>
      </h2>

      <div className="relative md:px-[73px] overflow-hidden">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-24 top-0 bottom-0 w-[2px] bg-white/10 rounded-full"></div>

        <div className="relative pl-12 sm:pl-20 pb-16">
          {/* Circle Marker */}
          <div className="absolute left-[10px] md:left-[18px] top-1 w-3 h-3 bg-my-primary rounded-full shadow-[0_0_10px_#c779dd]"></div>
          <p className="text-sm font-semibold text-gray-300 mb-2">2025</p>

          <h3 className="text-xl font-semibold">Software Engineering Intern</h3>
          <p className="text-my-primary font-medium mt-1">
            <a href="https://cecureintel.com" target="_blank">
              Cecure Intelligence Limited
            </a>
          </p>

          <p className="text-gray-400 text-sm mt-1">
            April 2025 — September 2025 · 6 months
          </p>

          <p className="mt-4 text-gray-200 leading-8 text-[17px] max-w-2xl">
             I worked as an
            intern at Cecure Intelligence Limited in the Engineering Department.
            I rotated through four main domains: <strong>Frontend engineering, Design
            engineering, Cloud engineering, and Machine Learning/AI.</strong>
            <br/> Under the
            mentorship of experienced engineers, I expanded my skills and
            knowledge in creating secure, scalable, and user-friendly digital
            solutions. This experience allowed me to actively learn best
            practices, explore new tools, and strengthen my problem-solving
            abilities. <br /> Throughout these rotations, I strengthened my
            basic skills in modern frontend development, UI/UX design, cloud
            infrastructure, and AI systems. I gained hands-on experience with
            tools/languages like React, TypeScript, Tailwind, Figma, Terraform,
            a couple of AWS services, and writing documentations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default experiencePage;
