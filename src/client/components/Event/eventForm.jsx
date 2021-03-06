import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { EventField } from './eventformfields.jsx';
import { DatePicker, TimePicker } from 'redux-form-material-ui'
const { titleField, locationField,
  descriptionField, keyWordField } = EventField;

let EventForm = (props) => {
  const required = value => value == null ? 'Required' : undefined
  const { handleSubmit, pristine,
    reset, submitting } = props;
  const showBusinessAddress = props.selected_business ?
    props.selected_business.location.display_address.join(', ') : "";
  const showBusinessName = props.selected_business ? props.selected_business.name : "";

  return (
    <form onSubmit={handleSubmit}>
      <Field name='title' component={titleField} />
      <Field name='location' businessAddress={showBusinessAddress} component={locationField} />
      <Field name='business' businessName={showBusinessName} component={keyWordField} />
      <Field name="date"
        component={DatePicker}
        format={null}
        onChange={(value) => {
          console.log('date changed ', value) // eslint-disable-line no-console
        }}
        hintText="Day of meeting?"
        validate={required} />
      <Field name="time"
        component={TimePicker}
        format={null}
        defaultValue={null} // TimePicker requires an object,
        onChange={(value) => {
          console.log('time changed ', value) // eslint-disable-line no-console
        }}
        hintText="At what time?"
        validate={required} />
      <Field name='description' component={descriptionField} />
      <div>
        <button type="submit" disabled={pristine || submitting}>Post Event</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Reset</button>
      </div>
    </form>
  )
}



const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Please enter an title';
  }

  if (!values.location) {
    errors.location = 'Please enter a location';
  }
  if (!values.business) {
    errors.business = 'Please enter a business';
  }
  if (!values.meettime) {
    errors.meettime = 'Please enter a time to meet';
  }

  return errors;
}

EventForm = reduxForm({
  form: 'event-form',
  validate
})(EventForm)

function mapStateToProps(state) {
  return {
    yelp_businesses: state.yelp.businesses,
    selected_business: state.business.selected_business
  };
}

EventForm = connect(mapStateToProps, null)(EventForm)

export default EventForm;