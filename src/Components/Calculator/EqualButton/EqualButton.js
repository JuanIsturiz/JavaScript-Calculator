import "./EqualButton.css";

const EqualButton = ({ equals, onEqual }) => {
  return (
    <button
      value={equals.value}
      style={{ gridArea: equals.id, backgroundColor: "#5d737eff" }}
      onClick={onEqual}
    >
      {equals.value}
    </button>
  );
};

export default EqualButton;
