function CheckBox({ label, check, ...rest }) {
  return (
    <div className="mb-3 form-check ">
      <label htmlFor={rest.name} className="form-label">
        {label}
      </label>
      <input
        {...rest}
        className="form-check-input"
        id={rest.name}
        value={check}
        onChange={rest.onChange}
      />
    </div>
  );
}

export default CheckBox;
