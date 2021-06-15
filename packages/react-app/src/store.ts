import create from "zustand";

export type ActiveNavBarSwitchItem = "commit" | "claim" | "history";

export type ActiveCommitBoxSwitchItem = "tlToEth" | "ethToTl";

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
}));
