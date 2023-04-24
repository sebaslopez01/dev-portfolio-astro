import { useState, useEffect } from "react";

import { navLinks } from "../constants";
import logo from "../images/logo.svg";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;

    scrollTop > 100 ? setScrolled(true) : setScrolled(false);
  };

  const handleFileSubmit = async () => {
    const res = await fetch("Dev_Sebastian_Lopez_Martinez_CV.pdf");

    const blob = await res.blob();

    const fileURL = window.URL.createObjectURL(blob);
    const aLink = document.createElement("a");
    aLink.href = fileURL;
    aLink.download = "Dev_Sebastian_Lopez_Martinez_CV.pdf";
    aLink.click();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`paddingX w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            setActive("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src={logo.src}
            width={logo.width}
            height={logo.height}
            alt="Logo"
            className="w-14 h-14 object-contain"
          />
          <p className="text-white text-[18px] font-bold flex">
            Sebas &nbsp;
            <span className="sm:block hidden">| Full-Stack Master</span>
          </p>
        </div>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
          <li>
            <button
              onClick={handleFileSubmit}
              className="text-secondary hover:text-white text-[18px] font-medium"
            >
              Resume
            </button>
          </li>
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close.src : menu.src}
            width={toggle ? close.width : menu.width}
            height={toggle ? close.height : menu.height}
            alt="Menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle((t) => !t)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-white" : "text-secondary"
                  } text-[16px] font-medium cursor-pointer`}
                  onClick={() => {
                    setToggle((t) => !t);
                    setActive(link.title);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    handleFileSubmit();
                    setToggle((t) => !t);
                  }}
                  className="text-secondary hover:text-white text-[18px] font-medium"
                >
                  Resume
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
