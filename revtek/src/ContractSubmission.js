import React, { Component } from "react";
import fire from "./fire.js";
import TopBar from "./top-bar";
import "./ContractSubmission.css";

import { Form, Input, Button } from "antd";
const FormItem = Form.Item;

export default class ContractSubmission extends Component {
  constructor() {
    super();
    this.state = {
      client: "",
      email: "",
      project: "",
      description: "",
      numinterns: "",
      skills: "",
      clicked: false
    };
  }

  handleClick = e => {
    e.preventDefault();
    this.setState({
      clicked: !this.state.clicked
    });
  };
  // updates each input's corresponding state
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name + "Message"]: "",
      [e.target.name + "Validate"]: ""
    });
  };

  // When the submit button is clicked, the user input gets put on firebase
  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.client === "" ||
      this.state.email === "" ||
      this.state.project === "" ||
      this.state.description === "" ||
      this.state.numinterns === "" ||
      this.state.skills === ""
    ) {
      if (this.state.client === "") {
        this.setState({
          clientMessage: "Please enter your client or company name.",
          clientValidate: "error"
        });
      }
      if (this.state.email === "") {
        this.setState({
          emailMessage: "Please enter your email.",
          emailValidate: "error"
        });
      }
      if (this.state.project === "") {
        this.setState({
          projectValidate: "error",
          projectMessage: "Please enter your project name."
        });
      }
      if (this.state.description === "") {
        this.setState({
          descriptionMessage: "Please enter your project description.",
          descriptionValidate: "error"
        });
      }
      if (this.state.numinterns === "") {
        this.setState({
          numinternsMessage: "Please enter the number of interns needed.",
          numinternsValidate: "error"
        });
      }
      if (this.state.skills === "") {
        this.setState({
          skillsMessage: "Please enter preferred skills for your project.",
          skillsValidate: "error"
        });
      }
      if (this.state.description === "") {
        this.setState({
          descriptionMessage: "Please enter your project description.",
          descriptionValidate: "error"
        });
      }
      if (this.state.numinterns === "") {
        this.setState({
          numinternsMessage: "Please enter the number of interns needed.",
          numinternsValidate: "error"
        });
      }
      if (this.state.skills === "") {
        this.setState({
          skillsMessage: "Please enter preferred skills for your project.",
          skillsValidate: "error"
        });
      }
    } else {
      const contractname = this.state.project.split(" ").join("-");
      const contractsRef = fire
        .database()
        .ref("contracts/" + contractname)
        .set({
          client: this.state.client,
          email: this.state.email,
          project: this.state.project,
          description: this.state.description,
          numinterns: this.state.numinterns,
          skills: this.state.skills
        });
      this.setState({
        client: "",
        email: "",
        project: "",
        description: "",
        numinterns: "",
        skills: "",
        clicked: !this.state.clicked,
        clientMessage: "",
        emailMessage: "",
        projectMessage: "",
        descriptionMessage: "",
        numinternsMessage: "",
        skillsMessage: "",
        clientValidate: "",
        emailValidate: "",
        projectValidate: "",
        descriptionValidate: "",
        numinternsValidate: "",
        skillsValidate: ""
      });
    }
  };
  render() {
    if (this.state.clicked === false) {
      return (
        <div className="contract">
          <TopBar
            status="home"
            user={this.props.user}
            updateField={this.props.updateField}
          />
          {/* renders a form where users can input their contract information */}
          <section className="add-contract">
            <h1 className="contractHeader"> Submit a Contract </h1>
            <Form
              onSubmit={this.handleSubmit}
              className="login-form"
              layout="horizontal"
            >
              <FormItem
                label="Client Name"
                validateStatus={this.state.clientValidate}
                required={true}
                help={this.state.clientMessage}
              >
                <Input
                  className="client"
                  name="client"
                  placeholder="Client Name"
                  onChange={this.handleChange}
                  value={this.state.client}
                />
              </FormItem>
              <FormItem
                label="Email"
                validateStatus={this.state.emailValidate}
                required={true}
                help={this.state.emailMessage}
              >
                <Input
                  className="email"
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </FormItem>
              <FormItem
                label="Project Name"
                validateStatus={this.state.projectValidate}
                required={true}
                help={this.state.projectMessage}
              >
                <Input
                  className="project"
                  name="project"
                  placeholder="Project Name"
                  onChange={this.handleChange}
                  value={this.state.project}
                />
              </FormItem>
              <FormItem
                label="Project Description"
                validateStatus={this.state.descriptionValidate}
                required={true}
                help={this.state.descriptionMessage}
              >
                <Input
                  className="description"
                  name="description"
                  placeholder="Project Description"
                  onChange={this.handleChange}
                  value={this.state.description}
                />
              </FormItem>
              <FormItem
                label="Interns Needed"
                validateStatus={this.state.numinternsValidate}
                required={true}
                help={this.state.numinternsMessage}
              >
                <Input
                  className="numinterns"
                  name="numinterns"
                  placeholder="Number of Interns Needed"
                  onChange={this.handleChange}
                  value={this.state.numinterns}
                />
              </FormItem>
              <FormItem
                label="Skills Needed"
                validateStatus={this.state.skillsValidate}
                required={true}
                help={this.state.skillsMessage}
              >
                <Input
                  className="skills"
                  name="skills"
                  placeholder="Preferred Intern Skills"
                  onChange={this.handleChange}
                  value={this.state.skills}
                />
              </FormItem>
              <Button
                type="primary"
                onClick={this.handleSubmit}
                className="submitBut"
              >
                Submit Contract{" "}
              </Button>
            </Form>
          </section>
          <br />
        </div>
      );
    } else {
      return (
        <div style={{ background: "#ECECEC", padding: "30px" }}>
          <TopBar
            status="home"
            updateField={this.props.updateField}
            user={this.props.user}
          />
          <h1 className="contractHeader">
            Thank you for submitting a contract!
          </h1>
          <h3 font-family="Roboto">
            {" "}
            We will get back to you as soon as possible{" "}
          </h3>
          <button type="primary" onClick={this.handleClick}>
            Submit Another Contract{" "}
          </button>
        </div>
      );
    }
  }
}
