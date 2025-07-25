import { menuOptions } from "@/types/menu.types";
import { useMenuBarOption } from "@/store/menuStore";

export const MenuBar = () => {
  const options = menuOptions;

  const {selected, setSelected} = useMenuBarOption();

  return (
    <div className="flex h-18 justify-start options-center">
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={`self-stretch px-5 bg-transparent inline-flex flex-col justify-between options-center overflow-hidden pt-4`}
          >
            <div className="self-stretch h-0"></div>

            <div
              className={`inline-flex justify-start options-center gap-2
                ${isSelected ? "text-[#B99976]" : "text-black/90"} 
                text-sm font-normal leading-snug`}
            >
              {option}
            </div>

            {isSelected ? (
              <div className="self-stretch h-0 outline-2 outline-offset-[-1px] outline-[#B99976]"></div>
            ) : (
              <div className="self-stretch h-0"></div>
            )}
          </button>
        );
      })}
    </div>
  );
}