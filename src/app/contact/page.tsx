"use client";

import Image from "next/image";

const contactLinks = [
  {
    label: "Email",
    value: "osinugaifeoluwa1@gmail.com",
    href: "mailto:osinugaifeoluwa1@gmail.com",
    icon: "/assets/gmail-icon.svg",
  },
  {
    label: "GitHub",
    value: "@Nuga25",
    href: "https://github.com/Nuga25",
    icon: "/assets/github-icon.svg",
  },
  {
    label: "LinkedIn",
    value: "osinugaifeoluwa",
    href: "https://www.linkedin.com/in/osinugaifeoluwa/",
    icon: "/assets/linkedIn-icon.svg",
  },
  {
    label: "WhatsApp",
    value: "+234 916 059 1907",
    href: "https://wa.me/+2349160591907",
    icon: "/assets/whatsapp-icon.svg",
  },
  {
    label: "Resume / CV",
    value: "Download PDF",
    href: "/files/001-Ifeoluwa-Osinuga-CV.pdf",
    icon: "/assets/download-icon.svg",
    isDownload: true,
  },
];

const ContactPage = () => {
  return (
    <section
      id="contact"
      className="space-y-16 my-40 mb-20 px-5 sm:px-32 relative scroll-mt-10 md:scroll-mt-32"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/dots-large.svg"
          alt="Background pattern"
          width={80}
          height={80}
          className="absolute bottom-60 sm:-bottom-16 -left-12 w-36 sm:w-60"
        />
        <Image
          src="/assets/pattern-big.svg"
          alt="Background pattern"
          width={80}
          height={80}
          className="absolute -top-14 -right-10 w-20 sm:w-32 opacity-40"
        />
        <Image
          src="/assets/ellipse-large.png"
          alt="Background pattern"
          width={80}
          height={80}
          className="-z-10 absolute -bottom-32 -right-20 w-[270px]"
        />
      </div>

      <div>
        {/* overall section heading, like Alok's "Experience & Socials" */}
        <h2 className="font-fira-code font-semibold text-[24px] lg:text-[32px] flex items-center mb-6">
          <span className="text-my-primary">#</span>contact{" "}
          <span className="ml-6">
            <Image
              src="/assets/line.png"
              alt="line"
              width={32}
              height={1}
              className="w-32 sm:w-60 h-[0.5px]"
            />
          </span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 mt-16 items-stretch">
          {/* Left box */}
          <div className="flex flex-col justify-between flex-1 px-6 sm:px-8 py-8 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm shadow-[inset_1px_0.5px_2px_rgba(255,255,255,0.9)]">
            <div>
              <h3 className="italic font-medium text-[26px] sm:text-[32px] leading-tight mb-5">
                Connect with me
              </h3>

              <p className="text-gray-300 text-[14px] sm:text-[15px] leading-relaxed">
                Hiring or just want to chat? I&apos;m quick to respond and easy to work with. Pick whichever
                channel&apos;s easiest for you, email, LinkedIn, or WhatsApp.
              </p>
            </div>

            
            <a  href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="self-start mt-8 px-6 py-2.5 rounded-full bg-my-primary text-black font-semibold text-[14px] hover:opacity-90 transition-all"
            >
              See my work
            </a>
          </div>

          {/* Right box: stacked contact list, matching Alok's structure */}
          <div className="flex flex-col flex-1 px-6 sm:px-8 py-8 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm shadow-[inset_1px_0.5px_2px_rgba(255,255,255,0.9)]">

            <div className="flex flex-col gap-3">
              {contactLinks.map((link) => (
                
                <a  key={link.label}
                  href={link.href}
                  target={link.isDownload ? undefined : "_blank"}
                  rel={link.isDownload ? undefined : "noopener noreferrer"}
                  download={link.isDownload}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg border border-white/10 hover:border-my-primary transition-all group"
                >
                  <Image
                    src={link.icon}
                    alt={link.label}
                    width={24}
                    height={24}
                  />
                  <div className="flex flex-col">
                    <span className="text-[11px] text-gray-400 uppercase tracking-wide">
                      {link.label}
                    </span>
                    <span className="text-[14px] text-white group-hover:text-my-primary transition-all">
                      {link.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;