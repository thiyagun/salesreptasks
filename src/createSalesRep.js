import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { withRouter} from 'react-router-dom';
import 
{
  required,
  maxLength,
  maxLength15,
  minLength,
  minLength2,
  number,
  minValue,
  email,
  tooOld,
  aol,
  alphaNumeric,
  phoneNumber,
}
from './validateSales';


const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const SaveDataToLocalStorage = (data) =>
{
  try {
    var a = [];
     // Parse the serialized data back into an aray of objects
     var existingArr = localStorage.getItem('SalesRepArray');
     if(existingArr && existingArr.length > 0){
       a = JSON.parse(existingArr);
     }
     // Push the new data (whether it be an object or anything else) onto the array
    // data = JSON.stringify(data)
     a.push(data);
     // Alert the array value
     alert(JSON.stringify(a));  // Should be something like [Object array]
     // Re-serialize the array back into a string and store it in localStorage
     localStorage.setItem('SalesRepArray', JSON.stringify(a));
  } catch (error) {
    console.log('Error in save', error)
    throw error;
  }
}

class CreateSalesRepForm extends React.Component {
  constructor(props){
    super(props);
    this.state={};
    this.formSubmit = this.formSubmit.bind(this);
    localStorage.removeItem('salesRep');
  }
  formSubmit = (values)=> {
    return sleep(1000) // simulate server latency
    .then(() => {
      if (!values.email) {
        throw new SubmissionError({ email: 'Email is required', _error: 'Create Sales rep failed!' })
      } else if (!values.name) {
        throw new SubmissionError({ name: 'Name is required', _error: 'Create Sales rep failed!' })
      } 
      const SalesRepObj = {
        name: values.name,
        email: values.email,
        experience: values.experience,
        phone: values.phone,
      }
     // localStorage.removeItem('SalesRepArray')
      SaveDataToLocalStorage(SalesRepObj)
      localStorage.setItem("salesRep", JSON.stringify(SalesRepObj));
      this.props.history.push('/sales');
    })
  }
  render()
  {
  const { handleSubmit, pristine, reset, submitting, error } = this.props;
  return (
    <form onSubmit={handleSubmit(this.formSubmit)}>
      <div className="row">
        <Field
          name="name"
          type="text"
          component={renderField}
          label="Name"
          validate={[required, maxLength15, minLength2]}
          warn={alphaNumeric}
        />
        <Field
          name="email"
          type="email"
          component={renderField}
          label="Email"
          validate={email}
          warn={aol}
        />
        <Field
          name="experience"
          type="number"
          component={renderField}
          label="Experience"
          validate={[required, number]}
          warn={tooOld}
        />
        <Field
          name="phone"
          type="text"
          component={renderField}
          label="Phone number"
          validate={[required, phoneNumber]}
        />
      <div>
        <button type="submit" className="button buttonBlue" disabled={submitting}>
          Submit
        </button>
        <button type="button" className="button buttonClear" disabled={pristine || submitting} onClick={reset}>
          Clear
        </button>
      </div>
      <div className="row">
          {error && <div style={{color:'red'}}>{error}</div>} 
        </div>
    </div>
    </form>
    )
  }
}
const CreateSalesRepWizard = reduxForm({
  // a unique name for the form
  form: 'CreateSalesRepWizard',
})(CreateSalesRepForm);

export default withRouter(CreateSalesRepWizard);