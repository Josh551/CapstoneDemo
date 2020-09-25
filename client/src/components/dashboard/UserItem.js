import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { Snackbar } from "./Snackbar";
import { VerifyUser } from "../../actions/userActions";
class UserItem extends Component {
  onVerifyClick(id) {
    this.props.VerifyUser(id);
  }
  snackbarRef = React.createRef();

  _showSnackbarHandler = () => {
    this.snackbarRef.current.openSnackBar("User has been verified");
  };
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

          <button
            onClick={
              (this.onVerifyClick.bind(this, user._id),
              this._showSnackbarHandler)
            }
            type="button"
            className="btn btn-light mr-1"
          >
            <i className="text-secondary fas fa-check" />
          </button>
          <button
            onClick={this.onVerifyClick.bind(this, user._id)}
            type="button"
            className="btn btn-light mr-1"
          >
            Add User Details
          </button>
          <Snackbar ref={this.snackbarRef} />
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
