import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { getProfile } from "../../actions/profileActions";
import { getUser } from "../../actions/userActions";
import { createProfile } from "../../actions/profileActions";
class UserItems extends Component {
  onVerifyClick(id) {
    this.props.getProfile(id);
  }

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
          <Link to="add-user-details">
            <button
              onClick={this.onVerifyClick.bind(this, user._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              Add Details
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

UserItems.propTypes = {
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile })(UserItems);
