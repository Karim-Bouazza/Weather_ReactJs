import { createContext } from "react";
import { useState } from "react";
import MySnackBar from "../Components/MySnackBar";

export const SnackContext = createContext({});

export const SnackProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast() {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (
    <SnackContext.Provider value={{ showHideToast, setMessage }}>
      {children}
      <MySnackBar open={open} message={message} />
    </SnackContext.Provider>
  );
};
