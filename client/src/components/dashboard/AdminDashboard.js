import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

class AdminDashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.auth;

    let dashboardContent;

    dashboardContent = (
      <div>
        <p className="lead text-muted">
          Welcome <Link to={`/user/${user.id}`}>{user.name}</Link>
        </p>
        <div>
          <Link to="/add-user" className="btn btn-lg btn-info">
            Add User Details
          </Link>
        </div>
        <div className="btn-group mb-4" role="group">
          <Link to="/edit-user-details" className="btn btn-light">
            <i className="fas fa-user-circle text-info mr-1" /> Edit User
            Details
          </Link>
        </div>
        <div className="btn-group mb-4" role="group">
          <Link to="/verify-user" className="btn btn-light">
            <i className="fas fa-user-circle text-info mr-1" /> Verify User
          </Link>
        </div>
        <div style={{ marginBottom: "60px" }} />
        <button
          onClick={this.onDeleteClick.bind(this)}
          className="btn btn-danger"
        >
          Delete User Account
        </button>
      </div>
    );

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  user: state.user,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  AdminDashboard
);
