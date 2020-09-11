import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUser } from "../../actions/userActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUser();
    fetch("/api/users/current").then((res) => console.log(res.json()));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.user === null) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { user } = this.props.user;
    let dashboardContent = <h1>Welcome,{user.name}</h1>;

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>

              {(user.stat = true ? dashboardContent : "User not verified")}
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
