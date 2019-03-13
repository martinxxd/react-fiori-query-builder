import QueryBuilder from "./components/querybuilder";
import ReactDOM from "react-dom";
import React from "react";

const preparedFields = [{ name: "firstName", label: "First Name" }, { name: "lastName", label: "Last Name" }];

const preparedQuery = {
  id: "g-8953ed65-f5ff-4b77-8d03-8d8788beb50b",
  rules: [
    {
      id: "r-32ef0844-07e3-4f3b-aeca-3873da3e208b",
      field: "firstName",
      value: "Steve",
      operator: "=",
    },
    {
      id: "r-3db9ba21-080d-4a5e-b4da-d949b4ad055b",
      field: "lastName",
      value: "Vai",
      operator: "=",
    },
  ],
  combinator: "and",
};

class Rules extends React.Component {
  constructor(props) {
    super(props);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.state = {
      query: preparedQuery,
      fields: preparedFields,
    };
  }

  handleQueryChange(query) {
    this.setState({ query });
  }

  formatQuery(query) {
    return `(${query.rules
      .map((rule) => {
        if (rule.rules) {
          return this.formatQuery(rule);
        } else {
          return `${rule.field} ${rule.operator} ${rule.value}`;
        }
      })
      .join(` ${query.combinator} `)})`;
  }

  render() {
    return (
      <div className="flex-box-outer">
        <h1>react-fiori-query-builder</h1>
        <div className="flex-box">
          <QueryBuilder
            query={this.state.query}
            fields={this.state.fields}
            onQueryChange={this.handleQueryChange}
          />
          <div className="shrink query-log">
            <h4>JSON Query</h4>
            <pre>{JSON.stringify(this.state.query, null, 2)}</pre>
            <h4>Query</h4>
            <pre>{this.formatQuery(this.state.query)}</pre>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Rules />, document.getElementById("root"));
