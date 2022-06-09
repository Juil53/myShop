import { useState } from "react";
import SigninForm from "./child/SigninForm";
import SignupForm from "./child/SignupForm";

const SigninSignup = () => {
  const [currentTab, setCurrentTab] = useState("signin");

  function handleChangeTab() {
    if (currentTab === "signin") {
      return setCurrentTab("signup");
    } else {
      return setCurrentTab("signin");
    }
  }

  const createTabContent = () => {
    if (currentTab === "signin") {
      return <SigninForm />;
    } else {
      return <SignupForm />;
    }
  };

  return (
    <div className="signin-signup-page">
      <ul className="breadcums">
        <li>
          <a href="home">Home</a>
          <span>/</span>
        </li>
        <li>Login</li>
      </ul>
      <div className="signin-signup-container">
        <div className="sign-tab-header row">
          <div
            className={currentTab === "signin" ? "tab-btn active" : "tab-btn"}
            onClick={handleChangeTab}
          >
            Sign in
          </div>
          <div
            className={currentTab === "signup" ? "tab-btn active" : "tab-btn"}
            onClick={handleChangeTab}
          >
            Sign up
          </div>
        </div>
        <div className="sign-tab-content">{createTabContent()}</div>
      </div>
    </div>
  );
};

export default SigninSignup;
