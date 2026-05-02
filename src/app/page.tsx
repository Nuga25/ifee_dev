"use client";

import { useState, useEffect } from "react";
import FloatingRobot from "@/components/FloatingRobot";
import AboutPage from "@/app/about/page";
import Image from "next/image";
import ProjectsPage from "./projects/page";
import ContactPage from "./contact/page";
import ExperiencePage from "./experience/page";
import CustomCursor from "@/components/CustomCursor";

const titles = [
  "<Software Engineer/>",
  "<Frontend Engineer/>",
  "<Web Developer/>",
  "<Web Designer/>",
];

const navLinks = [
  { href: "/", label: "home" },
  { href: "#about", label: "about" },
  { href: "#projects", label: "projects" },
  { href: "#experience", label: "experience" },
  { href: "#contact", label: "contact" },
];

export default function Home() {
  const [index, setIndex] = useState(0); // current title
  const [subIndex, setsubIndex] = useState(0); // current letter
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // mobile nav state

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const sectionId = href.substring(1); // Remove the #
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsOpen(false); // Close mobile menu
  };

  useEffect(() => {
    if (index === titles.length) return;

    if (subIndex === titles[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000); //pause at end
      return;
    }

    if (subIndex === 0 && reverse) {
      setTimeout(() => {
        setReverse(false);
        setIndex((prev) => (prev + 1) % titles.length); // next title
      }, 0);
      return;
    }

    const timeout = setTimeout(() => {
      setsubIndex((prev) => prev + (reverse ? -1 : 1));
    }, 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  // function to download CV
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/files/001-Ifeoluwa-Osinuga-CV.pdf";
    link.download = "001-Ifeoluwa-Osinuga-CV.pdf";
    link.click();
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0F] overflow-hidden">
      {/* Custom Cursor */}
      <div className="hidden lg:block">
        <CustomCursor />
      </div>

      {/* bg images */}
      <Image
        src="/assets/dots-small.svg"
        alt="Background pattern"
        className="absolute top-16 left-10 sm:left-40 md:left-80 w-10 sm:w-16"
        width={80}
        height={80}
      />
      <Image
        src="/assets/pattern-small.svg"
        alt="Background pattern"
        className="absolute top-64 right-0 w-14 md:w-16 opacity-30"
        width={80}
        height={80}
      />
      <Image
        src="/assets/pattern-big.svg"
        alt="Background pattern"
        className="absolute top-96 left-10 sm:left-1/4 w-28 md:w-36 opacity-30"
        width={140}
        height={140}
      />
      <Image
        src="/assets/dots-small.svg"
        alt="Background pattern"
        className="absolute top-[650px] right-10 sm:right-44 w-10 sm:w-16"
        width={80}
        height={80}
      />
      <Image
        src="/assets/ellipse-large.png"
        alt="Background pattern"
        className="absolute top-[-150px] right-[-150px] w-[250px] sm:w-[540px]"
        width={540}
        height={540}
      />
      <Image
        src="/assets/ellipse-large.png"
        alt="Background pattern"
        className="absolute top-[420px] left-[-120px] w-[250px] sm:w-[540px]"
        width={540}
        height={540}
      />

      <section className="relative z-10">
        <header>
          <nav className="z-20 fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 px-4 sm:px-8 py-3 flex items-center justify-between w-[90%] sm:w-[70%] lg:w-[55%] h-14 sm:h-16 rounded-full border border-white/20 bg-white/1 backdrop-blur-sm font-semibold shadow-[inset_1px_0.5px_2px_rgba(255,255,255,0.9)]">
            {/* Logo */}
            <Image
              src="/assets/logo.svg"
              alt="Logo"
              width={35}
              height={35}
              className="sm:w-[45px]"
            />

            {/* Desktop Links */}
            <ul className="hidden md:flex gap-3 lg:gap-4 text-white font-semibold text-[14px]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-center hover:underline hover:text-my-primary"
                  >
                    <span className="text-my-primary text-[16px] lg:text-[18px] mr-1">
                      #
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Hamburger for tablets and below */}
            <button
              className="md:hidden fixed top-4 right-6 z-50 text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>

            {/* Mobile dropdown */}
            <ul
              className={`z-50 md:hidden fixed top-16 right-4 w-[92%] bg-bg-dark border border-my-primary/40 backdrop-blur-md rounded-xl p-4 flex flex-col gap-4 text-white font-semibold transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center hover:underline hover:text-my-primary"
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      setIsOpen(false);
                    }}
                  >
                    <span className="text-my-primary text-[18px] mr-1">#</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main className="text-white min-h-screen px-4 sm:px-8">
          {/* SEO boost */}
          <h1 className="sr-only">Ifeoluwa Osinuga Portfolio</h1>

          {/* home page */}
          <section
            className="relative min-h-[100vh] flex flex-col justify-between lg:gap-0 md:gap-[270px] gap-[230px]"
            id="home"
          >
            <div className="flex flex-col justify-center">
              <div className="text-center mt-[42vh]">
                <h3 className="font-bold text-[18px] sm:text-[28px] md:text-[30px]">
                  Hi, I&apos;m{" "}
                  <span className="text-my-primary">Ifeoluwa Osinuga</span>
                </h3>
                <h1 className="font-bold text-[28px] sm:text-[40px] md:text-[50px] mt-5">
                  {titles[index].substring(0, subIndex)}
                  <span className="inline-block w-[1ch]">
                    {blink ? "|" : "|"}
                  </span>
                </h1>
              </div>
            </div>

            {/* CV button */}

            <div className="fixed bottom-5 left-6 z-40">
              <button
                onClick={handleDownload}
                className="z-30 flex w-auto px-3 py-2 rounded-full border border-white/20 bg-white/1 backdrop-blur-sm text-white font-semibold transition-all duration-300 ease-in-out hover:shadow-[0_0_12px_#c779dd] hover:border-purple-400/50 active:shadow-[0_0_40px_#c779dd] active:scale-95 shadow-[inset_1px_1px_1px_rgba(255,255,255,0.8)]"
              >
                <span className="text-my-primary mr-1">{"{"}</span>
                CV{" "}
                <Image
                  src="/assets/download-icon.svg"
                  alt="download icon"
                  width={25}
                  height={25}
                />
                <span className="text-my-primary ml-1">{"}"}</span>
              </button>
            </div>

            {/* Center: arrow */}
            {/* <div>
              <a href="#about">
                <Image
                  src="/assets/arrow.svg"
                  alt="arrow icon"
                  width={30}
                  height={30}
                  className="sm:w-[60px] md:flex hidden animate-bounce cursor-pointer sticky left-1/2"
                />
              </a>
            </div> */}

            {/* Robot */}
            <div className="absolute bottom-6 right-3">
              <FloatingRobot />
            </div>
          </section>

          <AboutPage />

          <ProjectsPage />

          <ExperiencePage />

          <ContactPage />
        </main>

        <footer className="text-center py-3 mb-0">
          <small className="text-white text-[10px]">
            Designed and Coded by{" "}
            <a
              href="https://www.linkedin.com/in/osinugaifeoluwa"
              target="_blank"
              className="underline text-my-primary"
            >
              ifee.xoxo
            </a>
            . Copyright &copy; {new Date().getFullYear()}
          </small>
        </footer>

        {/* social links */}
        <div className="fixed top-0 left-3 sm:left-6 z-20 sm:block hidden">
          <div className="flex justify-center items-center">
            <Image
              src="/assets/line-vertical.png"
              alt="line"
              width={2}
              height={0}
              className="sm:h-48 h-64 opacity-40"
            />
          </div>

          <div className="flex flex-col gap-2 sm:gap-3 mt-6 sm:mt-10">
            <a href="https://github.com/Nuga25" target="_blank">
              <Image
                src="/assets/github-icon.svg"
                alt="GitHub"
                width={35}
                height={35}
                className="sm:w-[45px] hover:scale-110 transition-all"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/osinugaifeoluwa/"
              target="_blank"
            >
              <Image
                src="/assets/linkedIn-icon.svg"
                alt="LinkedIn"
                width={35}
                height={35}
                className="sm:w-[45px] hover:scale-110 transition-all"
              />
            </a>
            <a href="mailto:osinugaifeoluwa1@gmail.com" target="_blank">
              <Image
                src="/assets/gmail-icon.svg"
                alt="Gmail"
                width={35}
                height={35}
                className="sm:w-[45px] hover:scale-110 transition-all"
              />
            </a>
            <a href="https://wa.me/+2349160591907" target="_blank">
              <Image
                src="/assets/whatsapp-icon.svg"
                alt="WhatsApp"
                width={35}
                height={35}
                className="sm:w-[45px] hover:scale-110 transition-all"
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
