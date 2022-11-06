import "./Screens.css";

const Screens = ({ whiteScreen, yellowScreen, enter }) => {
  return (
    <>
      <div
        className="screen"
        id="yellow"
        style={{
          gridArea: "yellow",
          color: "#ffc400",
          fontSize: "1.5rem",
          height:
            yellowScreen.length > 16 && enter
              ? `${yellowScreen.length / 16 + 1}rem`
              : "auto",
        }}
      >
        {yellowScreen}
      </div>
      <div
        className="screen"
        id="white"
        style={{ gridArea: "white", color: "#fff", fontSize: "2rem" }}
      >
        {whiteScreen ? whiteScreen : "0"}
      </div>
    </>
  );
};

export default Screens;
