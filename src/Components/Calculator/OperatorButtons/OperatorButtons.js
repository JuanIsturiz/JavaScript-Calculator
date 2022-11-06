import "./OperatorButtons.css";

const OperatorButtons = ({ operators, onOperator }) => {
  return (
    <>
      {operators.map((digit) => (
        <button
          className="operators"
          key={digit.id}
          value={digit.value}
          style={{ gridArea: digit.id, backgroundColor: "#a5a392" }}
          onClick={onOperator}
        >
          {digit.value}
        </button>
      ))}
    </>
  );
};

export default OperatorButtons;
