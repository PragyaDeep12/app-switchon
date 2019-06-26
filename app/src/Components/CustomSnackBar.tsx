import React, { useEffect, useState } from "react";

let openSnackbarFn: any;
export default function CustomSnackbar() {
  interface snack {
    open: boolean;
    message: string;
    timeout: number;
    onhide?: (param?: any) => any;
  }
  const [snack, setSnack] = useState<snack>({
    open: false,
    message: "",
    timeout: 0
  });

  const openSnackbar = ({ message, timeout, onhide }: any) => {
    setSnack({
      timeout: timeout,
      open: true,
      message: message,
      onhide: onhide
    });
    setTimeout(() => {
      setSnack({ ...snack, open: false });
    }, timeout);
  };

  useEffect(() => {
    openSnackbarFn = openSnackbar;
  }, []);
  return (
    <div
      className="alert alert-warning alert-dismissible fade show"
      style={{ position: "fixed", bottom: 0, zIndex: 5, width: "100vw" }}
      role="alert"
      hidden={!snack.open}
    >
      <strong>{snack.message}</strong>
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={() => {
          setSnack({ ...snack, open: false });
        }}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

export function openSnackbar(val: any) {
  openSnackbarFn({ ...val });
}
