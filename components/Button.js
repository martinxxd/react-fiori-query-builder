import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import cxs from "cxs";

function Button(props) {
  let clazz = classNames(
    {
      "fd-button": props.type !== "negative",
      "fd-button--negative": props.type === "negative",
    },
    cxs({
      margin: "0 5px",
    })
  );

  return (
    <button className={clazz} onClick={(e) => props.handleOnClick(e)}>
      {props.title}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
