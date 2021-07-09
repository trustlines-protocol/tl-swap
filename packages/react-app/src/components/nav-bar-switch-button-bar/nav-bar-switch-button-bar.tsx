import React from "react";
import { SwitchButtonBar, Item } from "../switch-button-bar";
import { useNavigate, useLocation } from "react-router-dom";

const SWITCH_BUTTON_BAR_ITEMS = [
  {
    label: "Offers",
    value: "offers",
  },
  {
    label: "Commit",
    value: "commit/tlToEth",
  },
  {
    label: "Claim",
    value: "claim/TL",
  },
  {
    label: "History",
    value: "history",
  },
];

function NavBarSwitchButtonBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClickItem = (item: Item) => {
    navigate(item.value);
  };

  const activeEntry = location.pathname !== '/' ? location.pathname : "offers"

  return (
    <SwitchButtonBar
      items={SWITCH_BUTTON_BAR_ITEMS.map((item) => ({
        ...item,
        isActive: activeEntry.includes(item.value) ,
      }))}
      onClickItem={handleClickItem}
    />
  );
}

export { NavBarSwitchButtonBar };
