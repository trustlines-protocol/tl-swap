import React from "react";

type Props = {
  id: string;
  label: string;
  value: string;
  onChangeInputValue: (changedInputValue: string) => void;
};

function LabeledInput(props: Props) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        className="mt-2 px-4 py-2 border border-gray-200"
        id={props.id}
        value={props.value}
        onChange={(event) => props.onChangeInputValue(event.target.value)}
      />
    </div>
  );
}

export { LabeledInput };
