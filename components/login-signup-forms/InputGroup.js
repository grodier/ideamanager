function InputGroup({
  groupId,
  label,
  type,
  placeholder,
  value,
  onChange,
  name
}) {
  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={groupId}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={groupId}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value || ''}
        name={name ? name : groupId}
      />
    </>
  );
}

export default InputGroup;
