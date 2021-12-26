 import { Formik } from 'formik';

export default function SignInForm(props) {
  const { emailValidation, handleSubmit } = props

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={emailValidation}
      onSubmit={handleSubmit}
    >
     {({
       values,
       errors,
       touched,
       handleChange,
       handleBlur,
       handleSubmit,
       isSubmitting,
     }) => (
       <form onSubmit={handleSubmit}>
         <label>
           email:
           <input
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
             autoComplete={'username'}
             placeholder={'joe@google.com'}
           />
         </label>
         {errors.email && touched.email && errors.email}
         <label>
           password:
           <input
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
             autoComplete={'current-password'}
             placeholder={'*******'}
           />
         </label>
         {errors.password && touched.password && errors.password}
         <button type="submit" disabled={isSubmitting}>
           Submit
         </button>
       </form>
     )}
    </Formik>
  )
}
