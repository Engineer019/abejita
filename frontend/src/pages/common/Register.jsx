import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../../api/user";

export function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (formValues) => {
      try {
        await registerApi({
          username: formValues.username,
          email: formValues.email,
          telefono: formValues.telefono,
          password: formValues.password,
        });
        toast.success("Usuario registrado, ahora inicia sesión");
        navigate("/login");
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="register-admin">
      <div className="register-admin__content">
        <h1>Registro</h1>
        <Form className="register-form-admin" onSubmit={formik.handleSubmit}>
          <label>Username</label>
          <Form.Input
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={(e) =>
              formik.setFieldValue("username", e.target.value.replace(/\s+/g, ""))
            }
            onBlur={formik.handleBlur}
            error={formik.errors.username}
          />
          <label>Correo electrónico</label>
          <Form.Input
            name="email"
            placeholder="Correo electrónico"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
          />
          <label>Teléfono (opcional)</label>
          <Form.Input
            name="telefono"
            placeholder="10 dígitos"
            value={formik.values.telefono}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.telefono}
          />
          <label>Contraseña</label>
          <Form.Input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
            autoComplete="off"
          />
          <label>Confirmar contraseña</label>
          <Form.Input
            name="password_confirm"
            type="password"
            placeholder="Confirmar contraseña"
            value={formik.values.password_confirm}
            onChange={formik.handleChange}
            error={formik.errors.password_confirm}
            autoComplete="off"
          />
          <Button type="submit" content="Registrarse" primary fluid />
        </Form>
        <p style={{ textAlign: "center", marginTop: 20 }}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

function initialValues() {
  return {
    username: "",
    email: "",
    telefono: "",
    password: "",
    password_confirm: "",
  };
}

function validationSchema() {
  return Yup.object({
    username: Yup.string()
      .required("El username es obligatorio")
      .matches(/^\S*$/, "El username no debe contener espacios"),
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
    telefono: Yup.string().matches(/^\d{10}$/, {
      message: "El teléfono debe tener 10 dígitos",
      excludeEmptyString: true,
    }),
    password: Yup.string()
      .required("La contraseña es obligatoria")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
      .matches(/\d/, "Debe contener al menos un número")
      .matches(/[@$!%*?&#]/, "Debe contener un carácter especial (@$!%*?&#)"),
    password_confirm: Yup.string()
      .required("La confirmación de contraseña es obligatoria")
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
  });
}