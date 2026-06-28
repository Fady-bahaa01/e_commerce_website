import { toggleMenu } from "../store";

export default function Overlay() {
  const { closeMenu, value } = toggleMenu();

  return (
    <div>
      {value ? (
        <div
          onClick={closeMenu}
          className={`w-full fixed h-200 md:h-225 inset-0 z-20 bg-black/50 `}
        ></div>
      ) : null}
    </div>
  );
}
