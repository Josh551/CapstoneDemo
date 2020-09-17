import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsers } from "../../actions/userActions";
import UserItem from "./UserItem";

class VerifyUser extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users } = this.props.user;
    let userItems;

    if (users) {
      userItems = users.map((user) => <UserItem key={user._id} user={user} />);
    } else {
      userItems = <h4>No users found</h4>;
    }

    return (
      <div className="users">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">User Profiles</h1>
              <div className="row">
                <div className="name-item col-2">
                  <p>Name</p>
                </div>
                <div className="email-item col-2">
                  <p>Email</p>
                </div>
                <div className="col-2">
                  <p>Verification</p>
                </div>
              </div>
              {userItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VerifyUser.propTypes = {
  auth: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { getUsers })(VerifyUser);
