import React, {Component} from "react";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { checkCode }  from "../utils";
import { AppState } from "../types";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

export interface FormProps {
  appState: AppState,
  setAppState: (appState: AppState) => any
}

interface Values {
  [key:string]: string | boolean,
  firstName: string,
  surName: string,
  email: string,
  phone: string,
  voucher: string,
  accept: boolean
}

interface Errors {
  [key:string]: string,
  firstName: string,
  surName: string,
  email: string,
  phone: string,
  voucher: string,
  accept: string
}

interface FormState {
  success?: boolean;
  values: Values;
  errors: Errors;
}

export class Form extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
      values: {
        firstName: "",
        surName: "",
        email: "",
        phone: "",
        voucher: "",
        accept: false
      },
      errors: {
        firstName: "",
        surName: "",
        email: "",
        phone: "",
        voucher: "",
        accept: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let submissionSuccess = true;
    const validatedErrors = (() => {
      const errors = Object.assign({}, this.state.errors);
      Object.keys(this.state.values).forEach(name => {
        errors[name] = this.validateField(name);
        if (errors[name] !== "") {
          submissionSuccess = false;
        }
      });
      return errors;
    })();
    if (!submissionSuccess) {
      this.setState({
        ...this.state,
        errors: validatedErrors
      });
      return;
    }
    const correctCode = await checkCode(this.state.values.voucher);
    if (correctCode) {
      if (Math.floor(Math.random() * 10) === 0) {
        this.props.setAppState("win");
      } else {
        this.props.setAppState("lose");
      }
    } else {
      this.props.setAppState("lose");
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    const name = event.target.name;
    const values = Object.assign({}, this.state.values);
    values[name] = value;
    this.setState({
      ...this.state,
      values
    });
  }

  validateField(name: string): string {
    if (name !== "accept" && typeof this.state.values[name] === "string") {
      let value: any = this.state.values[name];
      if (value.length < 1) {
        return `${name} field can not be empty!`;
      }
    }

    let isValid: boolean = true;
    switch (name) {
      case "email":
        isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.values[name]);
        if (!isValid) {
          return "Invalid email address.";
        }
        break;
      case "firstName":
        isValid = this.state.values[name].length > 2;
        if (!isValid) {
          return "First name must be longer than two characters.";
        }
        isValid = /[a-zA-Z]+/.test(this.state.values[name]);
        if (!isValid) {
          return "First name should only consist of alphabetic characters."
        }
        break;
      case "voucher":
        isValid = (() => {
          if (!/^[1-9]\d{8}$/.test(this.state.values[name])) return false;
          const digitSet = [];

          for (let digit of this.state.values[name]) {
            digitSet.push(digit);
            if (digitSet.filter(c => c === digit).length > 2) return false;
          }

          return ((number: string) => {
            let total = 0;
            for (let i = 0; i < 9; i++) {
              total += Number(number[i]) * (10 - i - 1);
            }
            return total % 11 === 0;
          })(this.state.values[name]);
        })();
        if (!isValid) {
          return "Invalid voucher code";
        }
        break;
      case "accept":
        isValid = this.state.values.accept;
        if (!isValid) {
          return "You must accept privacy settlement before continuing";
        }
        break;
      default:
        return "";
    }
    return "";
  }

  handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const element = event.target;
    const errors = Object.assign({}, this.state.errors);
    if (element.value.length < 1) {
      errors[element.name] = element.name + " field can not be empty!";
      this.setState({
        ...this.state,
        errors
      });
    }
  }

  handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    const errors = Object.assign({}, this.state.errors);
    errors[event.target.name] = "";
    this.setState({
      ...this.state,
      errors
    });
  }

  render() {
    return <section>
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>
              Check your personal lucky code!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name
              printed on it?
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth={true} margin="normal" error={!!this.state.errors.firstName}>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Input id="firstName" name="firstName" value={this.state.values.firstName} onChange={this.handleChange} onBlur={this.handleBlur} onFocus={this.handleFocus} placeholder="Enter first name"/>
              {this.state.errors.firstName ? <FormHelperText>{this.state.errors.firstName}</FormHelperText> : ""}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth={true} margin="normal" error={!!this.state.errors.surName}>
              <InputLabel htmlFor="surName">Surname</InputLabel>
              <Input id="surName" name="surName" value={this.state.values.surName} onChange={this.handleChange} onBlur={this.handleBlur} onFocus={this.handleFocus} placeholder="Enter surname"/>
              {this.state.errors.surName ? <FormHelperText>{this.state.errors.surName}</FormHelperText> : ""}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth={true} margin="normal" error={!!this.state.errors.email}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" name="email" type="email" value={this.state.values.email} onChange={this.handleChange} onBlur={this.handleBlur} onFocus={this.handleFocus} placeholder="Enter your email address"/>
              {this.state.errors.email ? <FormHelperText>{this.state.errors.email}</FormHelperText> : ""}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth={true} margin="normal" error={!!this.state.errors.phone}>
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <Input id="phone" name="phone" type="number" value={this.state.values.phone} onChange={this.handleChange} onBlur={this.handleBlur} onFocus={this.handleFocus} placeholder="Enter your phone number"/>
              {this.state.errors.phone ? <FormHelperText>{this.state.errors.phone}</FormHelperText> : ""}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth={true} margin="normal" error={!!this.state.errors.voucher}>
              <InputLabel htmlFor="voucher">Voucher</InputLabel>
              <Input id="voucher" name="voucher" type="number" value={this.state.values.voucher} onChange={this.handleChange} onBlur={this.handleBlur} onFocus={this.handleFocus} placeholder="Enter your voucher code" />
              {this.state.errors.voucher ? <FormHelperText>{this.state.errors.voucher}</FormHelperText> : ""}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth={true} margin="normal" error={!!this.state.errors.accept}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="accept"
                    checked={this.state.values.accept}
                    onChange={this.handleChange}
                    color="primary"
                  />
                }
                label="Accept Privacy Settlement"
              />
              {this.state.errors.accept ? <FormHelperText>{this.state.errors.accept}</FormHelperText> : ""}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" size="large" type="submit">
              Get Offer >
            </Button>
          </Grid>
        </Grid>
      </form>
    </section>;
  }
}
