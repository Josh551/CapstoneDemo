import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsers } from "../../actions/userActions";
import { getProfiles } from "../../actions/profileActions";
import UserItems from "./UserItems";

class AddUser extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getProfiles();
  }

  render() {
    const { users } = this.props.user;
    let userItems;

    if (users) {
      userItems = users.map((user) => <UserItems key={user._id} user={user} />);
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
                  <p>Add Details</p>
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

AddUser.propTypes = {
  auth: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  profile: state.profile,
});

export default connect(mapStateToProps, { getUsers, getProfiles })(AddUser);
