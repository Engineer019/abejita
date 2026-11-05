import React, { useEffect, useState } from "react";
import { Button, Header, Image, Loader, Segment } from "semantic-ui-react";
import { useAuth } from "../../context/AuthContext";

export function Dashboard() {
  const { logout, auth } = useAuth();
  const user = auth.me;

  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadImage = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      if (!res.ok) throw new Error("Error al consultar la API");
      const data = await res.json();
      setImageUrl(data.message);
    } catch {
      setError("No se pudo cargar la imagen");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImage();
  }, []);

  return (
    <div style={{ padding: 40, maxWidth: 700, margin: "0 auto" }}>
      <h1>Dashboard</h1>
      <h3>
        Bienvenido {user.first_name || user.username} ({user.email})
      </h3>
      <Button type="button" content="Cerrar Sesión" onClick={logout} />

      <Segment style={{ marginTop: 30 }}>
        <Header as="h3">Perro aleatorio (API externa: Dog CEO)</Header>
        {loading && <Loader active inline="centered" />}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && imageUrl && <Image src={imageUrl} size="medium" centered rounded />}
        <Button
          style={{ marginTop: 15 }}
          content="Otra imagen"
          onClick={loadImage}
          primary
        />
      </Segment>
    </div>
  );
}