import { useEffect, useState } from "react";
import styles from "./select.module.css";

// A single Select option for the Select component.
type SelectOption = {
  label: string;
  value: string | number;
};

// Props to be passed to the Select component.
type SelectProps = {
  value?: SelectOption;
  options: SelectOption[];
  onChange: (value?: SelectOption) => void;
};

const Select = ({ value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  // Clears the currently selected options.
  function clearOptions() {
    onChange(undefined);
  }

  // Sets the option as the selected option.
  function selectOption(option: SelectOption) {
    if (!isOptionSelected(option)) {
      onChange(option);
    }
  }

  // Returns true if option is currently selected.
  function isOptionSelected(option: SelectOption) {
    return value === option;
  }

  // Resets highlighted index when Select component closes.
  useEffect(() => {
    if (!isOpen) {
      setHighlightedIndex(0);
    }
  }, [isOpen]);

  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>{value?.label}</span>
      <button
        onClick={(event) => {
          event.stopPropagation();
          clearOptions();
        }}
        className={styles["clear-button"]}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen && styles.show}`}>
        {options.map((option: SelectOption, index) => {
          return (
            <li
              onClick={(event) => {
                event.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              key={option.value}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`${styles.option} ${
                isOptionSelected(option) && styles.selected
              } ${index === highlightedIndex && styles.highlighted}`}
            >
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
export type { SelectOption };
