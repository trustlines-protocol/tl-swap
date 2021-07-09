import React from "react";

import { SwitchButtonBar, Item } from "../switch-button-bar";

import { useStore } from "../../store";
import {useNavigate, useLocation} from "react-router-dom"

const SWITCH_BUTTON_BAR_ITEMS = [
  {
    label: "TL -> ETH",
    value: "tlToEth",
  },
  {
    label: "ETH -> TL",
    value: "ethToTl",
  },
];

function CommitBoxSwitchButtonBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClickItem = (item: Item) => {
    navigate(item.value)
  };

  return (
    <SwitchButtonBar
      items={SWITCH_BUTTON_BAR_ITEMS.map((item) => ({
        ...item,
        onClick: handleClickItem,
        isActive: location.pathname.includes(item.value),
      }))}
      onClickItem={handleClickItem}
    />
  );
}

export { CommitBoxSwitchButtonBar };
