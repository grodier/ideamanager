import { useSpring, animated } from 'react-spring';

function FormContainer({
  children,
  onSubmit,
  title,
  errorMessage,
  submitAttempts
}) {
  const { x } = useSpring({
    from: { x: 0 },
    x: submitAttempts % 2,
    config: { duration: 650 },
    immediate: !errorMessage
  });

  const myStyle = {
    transform: x
      .interpolate({
        range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
        output: [0, -3, 8, -5, 5, -8, 3, 0]
      })
      .interpolate(x => `rotate(${x}deg)`)
  };

  return (
    <div className="h-screen flex items-center bg-gray-300">
      <animated.div className="w-full max-w-xs mx-auto">
        <animated.form
          style={myStyle}
          onSubmit={onSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="capitalize text-center mb-4 text-gray-800 text-lg font-bold pb-2 border-b">
            {title}
          </h2>
          {errorMessage && (
            <p className="text-center text-md text-red-600 pb-2">
              {errorMessage}
            </p>
          )}
          {children}
        </animated.form>
      </animated.div>
    </div>
  );
}

export default FormContainer;
