import React from "react";

const ForgotPasswordToggle = ({ forgotPassword, toggle }) => {
  return (
    <p onClick={() => toggle((toggleLink) => !toggleLink)}>
      {forgotPassword ? "Login instead" : "Forgot Password?"}
    </p>
  );
};

export default ForgotPasswordToggle;
