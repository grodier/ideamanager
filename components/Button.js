function Button({ children, onClick, additionalCss, disabled, ...rest }) {
  const disabledCSS =
    'bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed';
  const enabledCSS =
    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
  return (
    <button
      className={`${disabled ? disabledCSS : enabledCSS} ${additionalCss}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
