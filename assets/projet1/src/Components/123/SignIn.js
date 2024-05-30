import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Person, Lock } from "@material-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import SubmitForm from './SubmitForm';
import './style.css'
import { RiH3 } from "react-icons/ri";


const SignIn = () => {
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required"),
      password: Yup.string().min(5).required("Password is required"),
    }),

    onSubmit: (values) => {
      console.log(values);
      setIsSubmitSuccess(true)
    },
  });

  return (
    <section className='main container section'>
    <div className={!isSubmitSuccess ? "signin signin_wrapper" : "signin signin_success"} style={{margin:"8px 100px"}}>

    <div className='secContent grid'>
        {isSubmitSuccess ? (
          <SubmitForm />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className='secTitlemain'>
                    <h2>
                        Connexion
                    </h2>
            </div>
            
            <TextField
              name="email"
              type="text"
              placeholder="Email"
              className="textField"
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <Person />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            
            {formik.touched.email && formik.errors.email ? (
              <div className="error_msg">{formik.errors.email}</div>
            ) : null}

            <TextField
              name="password"
              type="password"
              placeholder="Password"
              className="textField"
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <Lock />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error_msg">{formik.errors.password}</div>
            ) : null}

            <button className="buttonIndetification" type="submit">Connexion</button>
            <button className="buttonIndetification" type="submit">Inscription</button>
          </form>
        )}
      </div>
      </div>
    </section>
  );
};

export default SignIn;