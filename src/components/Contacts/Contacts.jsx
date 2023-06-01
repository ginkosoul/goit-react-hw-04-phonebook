import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import css from '../Contacts/Contacts.module.css';

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
const nameRegExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      nameRegExp,
      'Name may contain only letters, apostrophe, dash and spaces.'
    )
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phone: Yup.string()
    .matches(
      phoneRegExp,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Required'),
});

export default function Contacts({ handleSubmit }) {
  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <Field className={css.input} name="name" />
          {errors.name && touched.name ? <div>{errors.name}</div> : null}
          <Field className={css.input} name="phone" />
          {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
          <button className={css.btn} type="submit">
            add contact
          </button>
        </Form>
      )}
    </Formik>
  );
}

Contacts.propTypes = {
  handleSubmit: PropTypes.func,
};
