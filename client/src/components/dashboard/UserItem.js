import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { VerifyUser } from "../../actions/userActions";
class UserItem extends Component {
  onVerifyClick(id) {
    this.props.VerifyUser(id);
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
          <div className="email-item col-2">
            <p>{user.stat}</p>
          </div>
          <button
            onClick={this.onVerifyClick.bind(this, user._id)}
            type="button"
            className="btn-lg btn-info mr-2"
          >
            Verify
          </button>
        </div>
      </div>
    );
  }
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  VerifyUser: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { VerifyUser })(UserItem);
