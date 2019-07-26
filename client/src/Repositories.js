import React from "react";
import axios from "axios";
import "./Repositories.css";
import { List, Header } from "semantic-ui-react";

class Repositories extends React.Component {
  constructor() {
    super();
    this.state = {
      repositories: []
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3031/repos/${this.props.organisation}`)
      .then(resp => {
        console.log(resp);
        this.setState({ repositories: resp.data });
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div>
        <Header as="h1">Repositories:</Header>
        {Array.isArray(this.state.repositories) && this.state.repositories.map(repository => {
          return (
            <List divided relaxed key={repository.node_id}>
              <List.Item>
                <List.Icon name="github" size="large" verticalAlign="middle" />
                <List.Content>
                  <List.Header
                    as="a"
                    onClick={e => {
                      this.props.handler(repository.name);
                    }}
                  >
                    {repository.full_name}
                  </List.Header>
                  <List.Description as="a">
                    Language: {repository.language}
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

export default Repositories;
