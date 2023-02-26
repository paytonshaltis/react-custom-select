import { useState } from "react";
import Select, { SelectOption } from "./Select";

const options: SelectOption[] = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
];

function App() {
  const [value1, setValue1] = useState<SelectOption | undefined>(options[0]);
  const [value2, setValue2] = useState<SelectOption[] | undefined>([
    options[0],
  ]);

  return (
    <div>
      <h1>React Custom Select</h1>
      <p>
        This React Select component was implemented in TypeScript. This
        component was implemented using the "em" unit, so options and UI
        elements will scale with its parent's font size.
      </p>
      <p>
        Keyboard accessibility has also been implemented. When a Select
        component has been focused, use "Enter" or "Space" to open the options
        list and choose the hovered option, "Escape" to close the list, and the
        "Up" and "Down" arrow keys to change the currently highlighted option.
      </p>
      <div className="even-columns">
        <div className="half-column">
          <h2>Single Select</h2>
          <Select
            onChange={(option) => setValue1(option)}
            options={options}
            value={value1}
          ></Select>
        </div>
        <div className="half-column">
          <h2>Multiple Select</h2>
          <Select
            multiple={true}
            onChange={(option) => setValue2(option)}
            options={options}
            value={value2}
          ></Select>
        </div>
      </div>
    </div>
  );
}

export default App;
