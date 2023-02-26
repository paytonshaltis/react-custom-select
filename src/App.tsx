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
  const [value, setValue] = useState<SelectOption | undefined>(options[0]);
  return (
    <Select
      onChange={(option) => setValue(option)}
      options={options}
      value={value}
    ></Select>
  );
}

export default App;
