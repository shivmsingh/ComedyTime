import { themeChange } from "theme-change";
import { useEffect } from "react";

const ThemeSelector = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <select className="select select-bordered" data-choose-theme>
      <option value="cupcake">Cupcake</option>
      <option value="dracula">Dracula</option>
      <option value="synthwave">Synthwave</option>
      <option value="valentine">Valentine</option>
      <option value="halloween">Halloween</option>
    </select>
  );
};

export default ThemeSelector;
