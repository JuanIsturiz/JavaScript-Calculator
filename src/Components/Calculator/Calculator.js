import { useState } from "react";
import "./Calculator.css";
import Screens from "./Screens/Screens";
import ClearButton from "./ClearButton/ClearButton";
import OperatorButtons from "./OperatorButtons/OperatorButtons";
import NumericButtons from "./NumericButtons/NumericButtons";
import DecimalButton from "./DecimalButton/DecimalButton";
import EqualButton from "./EqualButton/EqualButton";
import { digits } from "../../Utilities/buttonDigits";

//destructuring buttonDigits values
const { clear, operators, numerics, decimalDot, equals } = digits;

const Calculator = () => {
  //yellow screen display state
  const [yellowScreen, setYellowScreen] = useState("");
  //white screen display state
  const [whiteScreen, setWhiteScreen] = useState("");
  //operation state
  const [operation, setOperation] = useState("");
  //enter button state
  const [enter, setEnter] = useState(false);
  //decimal state
  const [decimal, setDecimal] = useState(true);

  //function that handles operator interactions
  const handleOperator = (e) => {
    if (
      (operation.length < 1 && e.target.value === "/") ||
      (operation.length < 1 && e.target.value === "X") ||
      (operation === "-" && e.target.value === "/") ||
      (operation === "+" && e.target.value === "/") ||
      (operation === "-" && e.target.value === "X") ||
      (operation === "+" && e.target.value === "X")
    )
      return;
    if (!decimal) setDecimal(true);
    setWhiteScreen(e.target.value);
    if (enter) {
      setYellowScreen(operation);
      setEnter(false);
    }
    if (/\D/gm.test(operation.charAt(operation.length - 1))) {
      setOperation(
        operation.substring(0, operation.length - 1) + e.target.value
      );
      setYellowScreen(
        operation.substring(0, operation.length - 1) + e.target.value
      );
      return;
    }
    setOperation((prev) => prev + e.target.value);
    setYellowScreen((prev) => prev + e.target.value);
  };

  //function that handles number interactions
  const handleNumber = (e) => {
    if (operation === "0" && e.target.value === "0") return;
    if (
      /\D/gm.test(operation.charAt(operation.length - 2)) &&
      operation[operation.length - 1] === "0" &&
      e.target.value === "0"
    )
      return;
    if (whiteScreen === "0") {
      setWhiteScreen("");
      setYellowScreen("");
    }
    if (enter) {
      setYellowScreen("");
      setWhiteScreen("");
      setOperation("");
      setDecimal(true);
      setEnter(false);
    }

    if (whiteScreen.length > 16) {
      setWhiteScreen("number length exceeded");
      setOperation("");
      setYellowScreen("");
      setTimeout(() => setYellowScreen(""), 2000);
      return;
    }

    setOperation((prev) => prev + e.target.value);
    setYellowScreen((prev) => prev + e.target.value);
    setWhiteScreen((prev) => prev + e.target.value);
  };

  //function that handles the clear button interactions
  const handleClear = () => {
    setOperation("");
    setWhiteScreen("");
    setYellowScreen("");
    setDecimal(true);
    setEnter(false);
  };

  //helper funtion to make the operation state a valid operation
  const splitter = (str) =>
    /\+|X|\/|-/gm.test(str)
      ? str
          .split("")
          .map((x) => (/\+|X|\/|-/.test(x) ? `~${x}~` : x))
          .join("")
          .split("~")
          .map((y) => (isNaN(y) ? y : Number(y)))
      : str;

  //helper function that operates the operation state
  const superMath = (arr) => {
    let result;
    const [num1, sign, num2] = arr.splice(0, 3);
    switch (sign) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "/":
        result = num1 / num2;
        break;
      case "X":
        result = num1 * num2;
        break;
      default:
        return;
    }
    arr.unshift(result);
    return arr.length > 1 ? superMath(arr) : result.toFixed(2);
  };

  //function that handles the decimal interactions
  const handleDecimal = (e) => {
    if (isNaN(operation[operation.length - 1]) || !decimal) return;
    setOperation((prev) => prev + e.target.value);
    setYellowScreen((prev) => prev + e.target.value);
    setWhiteScreen((prev) => prev + e.target.value);
    setDecimal(false);
  };

  //function that handles the equal button interactions
  const handleEqual = () => {
    if (!operation) return;
    if (/\D/gm.test(operation.charAt(operation.length - 1))) {
      setYellowScreen("Syntax Error");
      setOperation("");
      setWhiteScreen("0");
      return;
    }

    const result = !Array.isArray(splitter(operation))
      ? splitter(operation)
      : superMath(splitter(operation));

    if (result > 1000000000000000) {
      setWhiteScreen("");
      setOperation("");
      setYellowScreen("result length exceeded");
      setTimeout(() => setYellowScreen(""), 2000);
      return;
    }
    setWhiteScreen(new Intl.NumberFormat("en-US").format(result));
    setOperation(result.toString());
    setYellowScreen((prev) => prev + " = " + result.toString());
    setDecimal(false);
    setEnter(true);
  };

  return (
    <div className="border">
      <div className="calculator">
        <Screens
          yellowScreen={yellowScreen}
          whiteScreen={whiteScreen}
          enter={enter}
        />
        <ClearButton clear={clear} onClear={handleClear} />
        <OperatorButtons operators={operators} onOperator={handleOperator} />
        <NumericButtons numerics={numerics} onNumber={handleNumber} />
        <DecimalButton decimalDot={decimalDot} onDecimal={handleDecimal} />
        <EqualButton equals={equals} onEqual={handleEqual} />
      </div>
    </div>
  );
};

export default Calculator;
