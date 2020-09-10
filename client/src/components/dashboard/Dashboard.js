import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUser } from "../../actions/userActions";

class Dashboard extends Component {
  render() {
    const { user } = this.props.user;

    let dashboardContent;

    dashboardContent = <h4>Welcome,{user.name}</h4>;

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              <p>j{user.stat}j</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  user: state.auth,
});

export default connect(mapStateToProps, { getUser })(Dashboard);
