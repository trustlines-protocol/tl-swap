import React from "react";
import Modal from "react-modal";

import { NavBar } from "./components/nav-bar";
import { CommitBox } from "./components/commit-box";

import { useStore } from "./store";

Modal.setAppElement("#root");

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
    <div>
      <NavBar />
      {activeNavBarSwitchItem === "commit" ? <CommitBox /> : null}
    </div>
  );
}

export default App;
