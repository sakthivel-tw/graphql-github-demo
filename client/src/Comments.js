import React from "react";
import axios from "axios";
import "./Repositories.css";
import { List, Header } from "semantic-ui-react";

class Comments extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.issueId !== this.props.issueId) {
      axios
        .get(
          `http://localhost:3031/repos/${this.props.organisation}/issues/${
            this.props.repository
          }/comments/${this.props.issueId}`
        )
        .then(resp => {
          this.setState({ comments: resp.data });
        });
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">Comments:</Header>
        {Array.isArray(this.state.comments) &&
          this.state.comments.map(comment => {
            return (
              <List divided relaxed>
                <List.Item>
                  <List.Icon
                    name="comment"
                    size="large"
                    verticalAlign="middle"
                  />
                  <List.Content>
                    <List.Header>{comment.body}</List.Header>
                    <List.Description as="a">
                      Association: {comment.author_association}
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

export default Comments;
