import { useState } from "react";

import SigninForm from "./child/SigninForm";

const Signin = () => {
  const [currentTab, setCurrentTab] = useState("signin");

  const createTabContent = () => {
    return <SigninForm />;
  };

  return (
    <div className="signin-signup-page">
      <div className="signin-signup-container">
        <div className="sign-tab-header row">
          <div
            className={currentTab === "signin" ? "tab-btn active" : "tab-btn"}
          >
            Sign in
          </div>
        </div>
        <div className="sign-tab-content">{createTabContent()}</div>
      </div>
    </div>
  );
};

export default Signin;
