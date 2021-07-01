import React from "react";
import Modal from "react-modal";

import { NavBar } from "./components/nav-bar";
import { CommitBox } from "./components/commit-box";
import { ClaimBox } from "./components/claim-box";

import { useStore } from "./store";
import { initializeApp } from "firebase/app"
import config from "./config";

Modal.setAppElement("#root");

initializeApp({
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  databaseURL: config.FIREBASE_DATABASE_URL,
  projectId: config.FIREBASE_PROJECT_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MESSAGINGSENDER_ID,
  appId: config.FIREBASE_APP_ID,
  measurementId: config.FIREBASE_MEASUREMENT_ID
});


function App() {
  const activeNavBarSwitchItem = useStore(
    (state) => state.activeNavBarSwitchItem
  );
  const setActiveNavBarSwitchItem = useStore(
    (state) => state.setActiveNavBarSwitchItem
  );
  const setActiveCommitBoxSwitchItem = useStore(
    (state) => state.setActiveCommitBoxSwitchItem
  );

  React.useEffect(() => {
    const url = new URL(window.location.href);

    if (url.pathname === "/commit") {
      setActiveNavBarSwitchItem("commit");
      setActiveCommitBoxSwitchItem("ethToTl");
    }
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <NavBar />
      {activeNavBarSwitchItem === "commit" ? <CommitBox /> : null}
      {activeNavBarSwitchItem === "claim" ? <ClaimBox /> : null}
    </div>
  );
}

export default App;
