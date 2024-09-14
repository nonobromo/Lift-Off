import { useState } from "react";
import { useAuth } from "../../contexts/auth.context";

function ToolTip({ text }) {
  const [visable, setVisable] = useState(false);
  const { theme } = useAuth();

  const showToolTip = () => setVisable(!visable);

  return (
    <div className="ms-2">
      <i
        className="bi bi-question-circle-fill ms-2"
        onMouseLeave={showToolTip}
        onMouseOver={showToolTip}
      ></i>
      {visable && (
        <span className="t-tip-margin border border-dark bg-primary-subtle border border-primary-subtle">
          {text}
        </span>
      )}
    </div>
  );
}

export default ToolTip;
