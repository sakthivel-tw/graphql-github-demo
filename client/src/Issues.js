import React from "react";
import axios from "axios";
import "./Repositories.css";
import { List, Header } from "semantic-ui-react";

class Issues extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.repository !== this.props.repository) {
      axios
        .get(
          `http://localhost:3031/repos/${this.props.organisation}/issues/${
            this.props.repository
          }`
        )
        .then(resp => {
          this.setState({ issues: resp.data });
        });
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">Issues:</Header>
        {this.state.issues.map(issue => {
          return (
            <List divided relaxed key={issue.node_id}>
              <List.Item>
                <img
                  alt=""
                  class="ui avatar image"
                  src={issue.user.avatar_url}
                />
                <List.Content>
                  <List.Header
                    as="a"
                    onClick={e => {
                      this.props.handler(issue.number);
                    }}
                  >
                    {issue.title}
                  </List.Header>
                  <List.Description as="a">
                    Status: {issue.state}
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
          );
        })}
      </div>
    );
  }
}

export default Issues;
