import { useCallback } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";

export const useNewWindow = (children) => {
  const openNewWindow = useCallback(() => {
    let newWindow = window.open(
      "",
      "_blank",
      "left=1000,top=100,width=320,height=320,popup=yes"
    );

    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<Provider store={store}>{children}</Provider>);
    newWindow.document.body.appendChild(div);
  }, [children]);

  return {
    openNewWindow,
  };
};
