const InputField = (props) => {
  const { id, title, value, onChange } = props;

  const handleChangeValue = (e) => {
    return onChange(e.target.value);
  };

  return (
    <div className="input_field">
      <input
        id={id}
        className="field-input"
        placeholder=" "
        autoComplete="off"
        onChange={handleChangeValue}
      />
      <label htmlFor={id} className="field-name">
        {title}
      </label>
    </div>
  );
};

export default InputField;
