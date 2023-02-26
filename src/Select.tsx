import { useEffect, useState } from "react";
import styles from "./select.module.css";

// A single Select option for the Select component.
type SelectOption = {
  label: string;
  value: string | number;
};

// Props for a generic Select component.
type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

// Single-selection props.
type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value?: SelectOption) => void;
};

type MultipleSelectProps = {
  multiple: true;
  value?: SelectOption[];
  onChange: (value?: SelectOption[]) => void;
};

const Select = ({ multiple, value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  // Clears the currently selected options.
  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }

  // Selects the option from the list of options.
  function selectOption(option: SelectOption) {
    if (multiple) {
      // Clicking on an option already in value removes it.
      if (value?.includes(option)) {
        onChange(value.filter((val) => val !== option));
      }

      // Clicking on an option not in value adds it.
      else {
        onChange([...(value || []), option]);
      }
    } else {
      if (!isOptionSelected(option)) {
        onChange(option);
      }
    }
  }

  // Returns true if option is currently selected.
  function isOptionSelected(option: SelectOption) {
    return multiple ? value?.includes(option) : value === option;
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
      <span className={styles.value}>
        {multiple
          ? value?.map((v) => (
              <button
                key={v.value}
                onClick={(event) => {
                  event.stopPropagation();
                  selectOption(v);
                }}
                className={styles["option-badge"]}
              >
                {v.label}
                <span className={styles["remove-button"]}>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
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
