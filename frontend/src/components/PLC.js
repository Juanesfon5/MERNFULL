import React, { Component } from "react";
import axios from "axios";

export default class PLC extends Component {
  state = {
    users: [],
    username: ""
  };

  async getInputs() {
    const res = await axios.get("http://localhost:4000/api/PLC");
    this.setState({
      users: res.data
    });
  }

  async componentDidMount() {
    this.getInputs();
    console.log(this.state.users);
  }

  /*

  onChangeUsername = e => {
    this.setState({
      username: e.target.value
    });
  };*/

  deleteUser = async id => {
    await axios.delete("http://localhost:4000/api/PLC/" + id);
    this.getInputs();
  };
  /*
  onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/PLC", {
      username: this.state.username
    });
    this.setState({ username: "" });
    this.getUsers();
  };*/

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <h3>Create New User</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                //onChange={this.onChangeUsername}
                //value={this.state.username}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            {this.state.users.map(user => (
              <li
                className="list-group-item list-group-item-action"
                key={user._id}
                onDoubleClick={() => this.deleteUser(user._id)}
              >
                Circuit: {user.circuit}, with value {user.value}, created at: {user.createdAt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
