import React from "react";

import { SwitchButtonBar, Item } from "../switch-button-bar";
import {useLocation, useNavigate} from "react-router-dom";

const SWITCH_BUTTON_BAR_ITEMS = [
  {
    label: "TL",
    value: "TL",
  },
  {
    label: "ETH",
    value: "ETH",
  },
];

function ClaimBoxSwitchButtonBar() {
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

export { ClaimBoxSwitchButtonBar };
