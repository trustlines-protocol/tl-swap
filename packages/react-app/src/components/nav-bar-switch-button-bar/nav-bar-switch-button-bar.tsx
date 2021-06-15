import React from "react";

import { SwitchButtonBar, Item } from "../switch-button-bar";

import { useStore } from "../../store";

const SWITCH_BUTTON_BAR_ITEMS = [
  {
    label: "Commit",
    value: "commit",
  },
  {
    label: "Claim",
    value: "claim",
  },
  {
    label: "History",
    value: "history",
  },
];

function NavBarSwitchButtonBar() {
  const activeNavBarSwitchItem = useStore(
    (state) => state.activeNavBarSwitchItem
  );
  const setActiveNavBarSwitchItem = useStore(
    (state) => state.setActiveNavBarSwitchItem
  );

  const handleClickItem = (item: Item) => {
    setActiveNavBarSwitchItem(item.value);
  };

  return (
    <SwitchButtonBar
      items={SWITCH_BUTTON_BAR_ITEMS.map((item) => ({
        ...item,
        isActive: activeNavBarSwitchItem === item.value,
      }))}
      onClickItem={handleClickItem}
    />
  );
}

export { NavBarSwitchButtonBar };
