import styles from "./select.module.css";

// A single Select option for the Select component.
type SelectOption = {
  label: string;
  value: string;
};

// Props to be passed to the Select component.
type SelectProps = {
  value?: SelectOption;
  options: SelectOption[];
  onChange: (value?: SelectOption) => void;
};

const Select = ({ value, onChange, options }: SelectProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.value}>Value</span>
      <button className={styles["clear-button"]}>&times;</button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={styles.options}>
        {options.map((option: SelectOption) => {
          return (
            <li key={option.value} className={styles.option}>
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
