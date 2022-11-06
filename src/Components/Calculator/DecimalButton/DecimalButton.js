import "./DecimalButton.css";

const DecimalButton = ({ decimalDot, onDecimal }) => {
  return (
    <button
      value={decimalDot.value}
      className="decimal"
      style={{ gridArea: decimalDot.id }}
      onClick={onDecimal}
    >
      {decimalDot.value}
    </button>
  );
};

export default DecimalButton;
