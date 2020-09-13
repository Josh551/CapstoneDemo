import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUser } from "../../actions/userActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.user === null) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { user } = this.props.user;
    let dashboardContent;
    if (user.stat == false) {
      dashboardContent = "User not verified.Wait for the admin to verify you.";
    } else {
      dashboardContent = <h1>Welcome,{user.name}</h1>;
    }
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

Dashboard.propTypes = {
  getUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
});

export default connect(mapStateToProps, { getUser })(Dashboard);
