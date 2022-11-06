import "./NumericButtons.css";

const NumericButtons = ({ numerics, onNumber }) => {
  return (
    <>
      {numerics.map((digit) => (
        <button
          key={digit.id}
          className="numerics"
          value={digit.value}
          style={{ gridArea: digit.id }}
          onClick={onNumber}
        >
          {digit.value}
        </button>
      ))}
    </>
  );
};
export default NumericButtons;
