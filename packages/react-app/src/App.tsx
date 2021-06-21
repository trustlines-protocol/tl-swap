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

  return (
    <div>
      <NavBar />
      {activeNavBarSwitchItem === "commit" ? <CommitBox /> : null}
    </div>
  );
}

export default App;
