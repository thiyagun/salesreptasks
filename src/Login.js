import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'email',
    'password',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) =>
  <TextField
    hintText={label}
    fullWidth
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />

const renderPasswordField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) =>
  <TextField
    type="password"
    hintText={label}
    fullWidth
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.formSubmit = this.formSubmit.bind(this)
  }
  formSubmit = (values)=> {
    return sleep(1000) // simulate server latency
    .then(() => {
      if (values.email !=='admin@test.com') {
        throw new SubmissionError({ email: 'Email does not exist', _error: 'Login failed!' })
      } else if (values.password !== 'admin123') {
        throw new SubmissionError({ password: 'Wrong password', _error: 'Login failed!' })
      } 
      localStorage.setItem("email", values.email);
      localStorage.setItem("password", values.password);
      localStorage.setItem("isLoggedIn", true);
      this.props.history.push('/');
    })
  }
  render(){
    const { handleSubmit, pristine, reset,error, submitting } = this.props
    return(
      <form ref="loginForm"  onSubmit={handleSubmit(this.formSubmit)}>
        <div className="row">
          <div className="col-lg-8 col-md-8">
           <Field name="email" component={renderTextField} label="Email" />
          </div>
        </div>
        <div className="row">
        <div className="col-lg-8 col-md-8">
           <Field name="password" component={renderPasswordField} label="Password" />
          </div>
        </div>

        <div className="row">
        <div className="col-lg-8 col-md-8">
          <button  type="submit" className="button buttonBlue"  disabled={submitting}> Login</button> 
          <button  type="button" className="button buttonClear"  disabled={pristine || submitting} onClick={reset}>Clear</button>
        </div>
        </div>
        <div className="row">
          {error && <div style={{color:'red'}}>{error}</div>} 
        </div>
      </form>
    )
  }
}
const LoginForm = reduxForm({
  // a unique name for the form
  form: 'loginform',
  validate,
})(Login)

export default LoginForm;