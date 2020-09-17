import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { getUsers } from "../../actions/userActions";
import { createProfile } from "../../actions/profileActions";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTeacherInputs: false,
      displayStudentInputs: false,
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
      InstitutionId: this.state.InstitutionId,
      location: this.state.location,
      branch: this.state.branch,
      designation: this.state.designation,
      status: this.state.status,
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for status
    const options = [
      { label: "* Select your status", value: 0 },
      { label: "Student", value: "Student" },
      { label: "Teacher", value: "Teacher" },
    ];
    // Select options for status
    const options2 = [
      { label: "* Select your branch", value: 0 },
      { label: "CSE", value: "CSE" },
      { label: "IT", value: "IT" },
      { label: "ECE", value: "ECE" },
      { label: "MECH", value: "MECH" },
      { label: "Other", value: "Other" },
    ];
    // Select options for status
    const options3 = [
      { label: "* Select your designation", value: 0 },
      { label: "Teaching Associate", value: "Teaching Associate" },
      { label: "Assistant Professor", value: "Assistant Professor" },
      { label: "Professor", value: "Professor" },
      { label: "Visiting Faculty", value: "Visiting Faculty" },
      { label: "Other", value: "Other" },
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
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="InstitutionId"
                  name="InstitutonId"
                  value={this.state.InstitutonId}
                  onChange={this.onChange}
                  error={errors.InstitutonId}
                  info="Give your id given by the Institution"
                />

                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Bengaluru,Karnataka)"
                />
                <SelectListGroup
                  placeholder="branch"
                  name="branch"
                  value={this.state.branch}
                  onChange={this.onChange}
                  options={options}
                  error={errors.branch}
                  info="Branch of specialization"
                />

                <SelectListGroup
                  placeholder="Designation"
                  name="des"
                  value={this.state.des}
                  onChange={this.onChange}
                  error={errors.des}
                  info="Designation of occupation"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddUser.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { createProfile })(withRouter(AddUser));
