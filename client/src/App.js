import React from "react";
import "./App.css";
import Repositories from "./Repositories";
import Issues from "./Issues";
import Comments from "./Comments";
import { Grid } from "semantic-ui-react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organisation: new URL(window.location.href).pathname
        ? new URL(window.location.href).pathname.replace("/", "")
        : "Microsoft",
      repository: "",
      issueId: ""
    };
    this.setRepository = this.setRepository.bind(this);
    this.setIssueId = this.setIssueId.bind(this);
  }

  setRepository(name) {
    this.setState({
      repository: name
    });
  }

  setIssueId(issueId) {
    this.setState({
      issueId: issueId
    });
  }

  render() {
    return (
      <div className="app">
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column width={4}>
              <Repositories
                handler={this.setRepository}
                organisation={this.state.organisation}
              />
            </Grid.Column>
            <Grid.Column>
              <Issues
                handler={this.setIssueId}
                repository={this.state.repository}
                organisation={this.state.organisation}
              />
            </Grid.Column>
            <Grid.Column>
              <Comments
                repository={this.state.repository}
                organisation={this.state.organisation}
                issueId={this.state.issueId}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
