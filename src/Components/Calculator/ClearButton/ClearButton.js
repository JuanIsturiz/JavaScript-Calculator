import "./ClearButton.css";

const ClearButton = ({ clear, onClear }) => {
  return (
    <button
      value={clear.value}
      style={{
        gridArea: clear.id,
        backgroundColor: "#d64933ff",
      }}
      onClick={onClear}
    >
      {clear.value}
    </button>
  );
};

export default ClearButton;
