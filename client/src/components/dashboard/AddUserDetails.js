import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { getUsers } from "../../actions/userActions";
import { createProfile } from "../../actions/userActions";

class AddUserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      InstitutionId: "",
      location: "",
      status: "",
      branch: "",
      designation: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      status: this.state.status,
      InstitutionId: this.state.InstitutionId,
      location: this.state.location,
      branch: this.state.branch,
      designation: this.state.designation,
    };

    this.props.createProfile(profileData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    const options = [
      { label: "* Select your status", value: 0 },
      { label: "Student", value: "Student" },
      { label: "Teacher", value: "Teacher" },
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                />
                <TextFieldGroup
                  placeholder="status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                />
                <TextFieldGroup
                  placeholder="InstitutionId"
                  name="InstitutonId"
                  value={this.state.InstitutonId}
                  onChange={this.onChange}
                  error={errors.InstitutonId}
                />

                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />

                <TextFieldGroup
                  placeholder="branch"
                  name="branch"
                  value={this.state.branch}
                  onChange={this.onChange}
                  error={errors.branch}
                />
                <TextFieldGroup
                  placeholder="designation"
                  name="des"
                  value={this.state.des}
                  onChange={this.onChange}
                  error={errors.des}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddUserDetails.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(AddUserDetails)
);
