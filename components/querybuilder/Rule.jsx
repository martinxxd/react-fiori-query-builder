import React from "react";

export default class Rule extends React.Component {
  render() {
    const {
      field,
      operator,
      value,
      translations,
      schema: { fields, controls, getOperators, getLevel, classNames },
    } = this.props;
    const level = getLevel(this.props.id);

    return (
      <div className="rule">
        {React.createElement(controls.fieldSelector, {
          options: fields,
          value: field,
          handleOnChange: this.onFieldChanged,
          level: level,
        })}
        {React.createElement(controls.operatorSelector, {
          title: translations.operators.title,
          options: getOperators(field),
          value: operator,
          handleOnChange: this.onOperatorChanged,
          level: level,
        })}
        {operator !== "null" &&
          operator !== "notNull" &&
          React.createElement(controls.valueEditor, {
            field: field,
            value: value,
            handleOnChange: this.onValueChanged,
            level: level,
          })}
        {React.createElement(controls.removeRuleAction, {
          title: translations.removeRule.title,
          type: "negative",
          handleOnClick: this.removeRule,
          level: level,
        })}
      </div>
    );
  }

  onFieldChanged = (value) => {
    this.onElementChanged("field", value);
  };

  onOperatorChanged = (value) => {
    this.onElementChanged("operator", value);
  };

  onValueChanged = (value) => {
    this.onElementChanged("value", value);
  };

  onElementChanged = (property, value) => {
    const {
      id,
      schema: { onPropChange },
    } = this.props;

    onPropChange(property, value, id);
  };

  removeRule = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.props.schema.onRuleRemove(this.props.id, this.props.parentId);
  };
}
