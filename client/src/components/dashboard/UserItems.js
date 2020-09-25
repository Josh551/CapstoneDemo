import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";

class UserItems extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="card bg-light mb-3">
        <div className="row">
          <div className="name-item col-2">
            <p>{user.name}</p>
          </div>
          <div className="email-item col-2">
            <p>{user.email}</p>
          </div>

          <Link to="/add-user-details" className="btn btn-lg btn-info">
            Add User Details
          </Link>
        </div>
      </div>
    );
  }
}

UserItems.propTypes = {
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(UserItems);
