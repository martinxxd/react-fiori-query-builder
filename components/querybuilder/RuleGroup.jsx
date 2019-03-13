import React from "react";
import Rule from "./Rule";
import classNames from "classnames";

export default class RuleGroup extends React.Component {
  render() {
    const {
      combinator,
      rules,
      translations,
      schema: { combinators, controls, onRuleRemove, isRuleGroup, getLevel },
    } = this.props;
    const level = getLevel(this.props.id);

    let isLastEmptyGroup = !!this.hasParentGroup() && this.props.lastChild;
    let clazz = classNames("line2", { "last-empty-group": isLastEmptyGroup });

    return (
      <div className="rule-group">
        {this.hasParentGroup() && (
          <div className={clazz}>
            <div className="line-horizontal" />
          </div>
        )}
        {React.createElement(controls.combinatorSelector, {
          options: combinators,
          value: combinator,
          title: translations.combinators.title,
          handleOnChange: this.onCombinatorChange,
          rules: rules,
          level: level,
        })}
        <div className="rule-bock">
          <div className="line">{rules.length > 0 && <div className="line-inner" />}</div>
          <div className="control-group">
            {React.createElement(controls.addRuleAction, {
              title: translations.addRule.title,
              handleOnClick: this.addRule,
              rules: rules,
              level: level,
            })}
            {React.createElement(controls.addGroupAction, {
              title: translations.addGroup.title,
              handleOnClick: this.addGroup,
              rules: rules,
              level: level,
            })}
            {this.hasParentGroup()
              ? React.createElement(controls.removeGroupAction, {
                  title: translations.removeGroup.title,
                  type: "negative",
                  handleOnClick: this.removeGroup,
                  rules: rules,
                  level: level,
                })
              : null}
          </div>
        </div>
        {rules.map((r, i, arr) => {
          let lastChild = i === arr.length - 1;
          let clazz = classNames("line", { "last-child": lastChild });

          return isRuleGroup(r) ? (
            <RuleGroup
              key={r.id}
              id={r.id}
              schema={this.props.schema}
              parentId={this.props.id}
              combinator={r.combinator}
              translations={this.props.translations}
              rules={r.rules}
              level={level}
              lastChild={lastChild}
            />
          ) : (
            <div>
              <div className="rule-bock">
                <div className={clazz}>
                  <div className="line-inner" />
                </div>
                <div className="line-horizontal" />
                <Rule
                  key={r.id}
                  id={r.id}
                  field={r.field}
                  value={r.value}
                  operator={r.operator}
                  schema={this.props.schema}
                  parentId={this.props.id}
                  translations={this.props.translations}
                  onRuleRemove={onRuleRemove}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  hasParentGroup() {
    return this.props.parentId;
  }

  onCombinatorChange = (value) => {
    const { onPropChange } = this.props.schema;

    onPropChange("combinator", value, this.props.id);
  };

  addRule = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const { createRule, onRuleAdd } = this.props.schema;

    const newRule = createRule();
    onRuleAdd(newRule, this.props.id);
  };

  addGroup = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const { createRuleGroup, onGroupAdd } = this.props.schema;
    const newGroup = createRuleGroup();
    onGroupAdd(newGroup, this.props.id);
  };

  removeGroup = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.props.schema.onGroupRemove(this.props.id, this.props.parentId);
  };
}
