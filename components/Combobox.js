import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import cxs from "cxs";

const Combobox = (props) => {
  const [hide, setHide] = useState(true);

  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }

    setHide(true);
  };

  const handleChange = (selectedValue) => {
    props.handleOnChange(selectedValue);
    setHide(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  let inputClazz = classNames(
    "fd-input",
    cxs({
      "--fd-forms-border-color": "#89919a !important",
      "--fd-forms-color": "#32363a !important",
      borderRadius: "4px !important",
      borderWidth: "1px !important",
      "border-top-right-radius": "0 !important",
      "border-bottom-right-radius": "0 !important",
    })
  );
  let spanClazz = classNames(
    "fd-input-group__addon fd-input-group__addon--after fd-input-group__addon--button",
    cxs({
      "border-top-color": "#89919a !important",
      "border-right-color": "inherit !important",
      "border-radius": " 0 4px 4px 0 !important",
    })
  );
  let outerClazz = classNames(
    "fd-combobox-input",
    cxs({
      display: "inline-block !important",
      margin: "0 5px",
    })
  );

  return (
    <div ref={node} className={outerClazz}>
      <div className="fd-popover">
        <div className="fd-popover__control">
          <div className="fd-combobox-control">
            <div className="fd-input-group fd-input-group--after">
              <input
                type="text"
                className={inputClazz}
                value={props.value}
                readOnly={true}
                onClick={(e) => setHide(!hide)}
                onChange={(e) => props.handleOnChange(e.target.value)}
              />
              <span className={spanClazz}>
                <button className=" fd-button--light sap-icon--navigation-down-arrow" onClick={(e) => setHide(!hide)} />
              </span>
            </div>
          </div>
        </div>
        <div className="fd-popover__body fd-popover__body--no-arrow" aria-hidden={hide}>
          <nav className="fd-menu">
            <ul className="fd-menu__list">
              {props.options.map((option) => {
                const key = option.id ? `key-${option.id}` : `key-${option.name}`;
                return (
                  <li key={key}>
                    <a href="#" className="fd-menu__item" onClick={(e) => handleChange(option.name)}>
                      {option.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

Combobox.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  handleOnChange: PropTypes.func,
};

export default Combobox;
