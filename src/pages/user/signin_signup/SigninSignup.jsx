import { useEffect, useState } from "react";
import Breadcrumb from "../../../components/breadcumb/BreadCumb";

import SigninForm from "./child/SigninForm";
import SignupForm from "./child/SignupForm";

const SigninSignup = () => {
  const [currentTab, setCurrentTab] = useState("signin");

  const array = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Signin",
      url: "/sign",
    },
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentTab]);

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
      <div className="breadcums">
        <Breadcrumb pages={array} />
      </div>
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
