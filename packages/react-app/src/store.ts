import create from "zustand";

type Store = {
  connectedETHAddress: null | string;
  setConnectedETHAddress: (newConnectedETHAddress: null | string) => void;
};

export const useStore = create<Store>((set) => ({
  connectedETHAddress: null,
  setConnectedETHAddress: (newConnectedETHAddress: null | string) =>
    set({ connectedETHAddress: newConnectedETHAddress }),
}));
