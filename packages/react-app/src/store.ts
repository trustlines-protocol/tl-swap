import create from "zustand";

export type ActiveNavBarSwitchItem = "commit" | "claim" | "history";

export type ActiveCommitBoxSwitchItem = "tlToEth" | "ethToTl";
export type ActiveClaimBoxSwitchItem = "TL" | "ETH";

type Store = {
  connectedETHAddress: null | string;
  setConnectedETHAddress: (newConnectedETHAddress: null | string) => void;
  activeNavBarSwitchItem: ActiveNavBarSwitchItem;
  setActiveNavBarSwitchItem: (
    newActiveNavBarSwitchItem: ActiveNavBarSwitchItem
  ) => void;
  activeCommitBoxSwitchItem: ActiveCommitBoxSwitchItem;
  setActiveCommitBoxSwitchItem: (
    newActiveCommitBoxSwitchItem: ActiveCommitBoxSwitchItem
  ) => void;
  activeClaimBoxSwitchItem: ActiveClaimBoxSwitchItem;
  setActiveClaimBoxSwitchItem: (
      newActiveClaimBoxSwitchItem: ActiveClaimBoxSwitchItem
  ) => void;
};

export const useStore = create<Store>((set) => ({
  connectedETHAddress: null,
  setConnectedETHAddress: (newConnectedETHAddress: null | string) =>
    set({ connectedETHAddress: newConnectedETHAddress }),
  activeNavBarSwitchItem: "commit",
  setActiveNavBarSwitchItem: (
    newActiveNavBarSwitchItem: ActiveNavBarSwitchItem
  ) => set({ activeNavBarSwitchItem: newActiveNavBarSwitchItem }),
  activeCommitBoxSwitchItem: "tlToEth",
  setActiveCommitBoxSwitchItem: (
      newActiveCommitBoxSwitchItem: ActiveCommitBoxSwitchItem
  ) => set({ activeCommitBoxSwitchItem: newActiveCommitBoxSwitchItem }),
  activeClaimBoxSwitchItem: "TL",
  setActiveClaimBoxSwitchItem: (
      newActiveClaimBoxSwitchItem: ActiveClaimBoxSwitchItem
  ) => set({ activeClaimBoxSwitchItem: newActiveClaimBoxSwitchItem }),
}));
