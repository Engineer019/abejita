import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

export function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Tienda Online</h1>
      <Button as={Link} to="/login" primary content="Iniciar sesión" />
      <Button as={Link} to="/register" content="Registrarse" />
    </div>
  );
}