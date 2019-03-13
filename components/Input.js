import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import cxs from "cxs";

const Input = (props) => {
  let clazz = classNames(
    "fd-form__control",
    cxs({
      width: "250px !important",
      margin: "0 5px !important",
    })
  );

  return <input className={clazz} type="text" value={props.value} onChange={(e) => props.handleOnChange(e.target.value)} />;
};

Input.propTypes = {
  operator: PropTypes.string,
  value: PropTypes.string,
  handleOnChange: PropTypes.func,
};

export default Input;
