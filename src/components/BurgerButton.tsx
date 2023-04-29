import type { Dispatch, SetStateAction } from "react";

interface BurgerButtonProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function BurgerButton({ isOpen, setIsOpen }: BurgerButtonProps) {
  return (
    <div
      className="w-8 h-8 md:hidden flex flex-col md:flex-none flex-nowrap justify-around"
      onClick={() => setIsOpen((op) => !op)}
    >
      <div
        className={`bg-white w-8 h-1 rounded-[10px] origin-[1px] transition-all ease-linear duration-300 ${
          isOpen ? "rotate-45" : "rotate-0"
        }`}
      ></div>
      <div
        className={`bg-white w-8 h-1 rounded-[10px] origin-[1px] transition-all ease-linear duration-300 ${
          isOpen
            ? "translate-x-full opacity-0"
            : "rotate-0 translate-x-0 opacity-100"
        }`}
      ></div>
      <div
        className={`bg-white w-8 h-1 rounded-[10px] origin-[1px] transition-all ease-linear duration-300 ${
          isOpen ? "-rotate-45" : "rotate-0"
        }`}
      ></div>
    </div>
  );
}
