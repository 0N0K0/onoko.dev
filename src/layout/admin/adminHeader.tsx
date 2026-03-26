import { Link } from "react-router-dom";

export default function PublicHeader() {
  return (
    <nav style={{ marginBottom: 20 }}>
      <Link to="/">Accueil</Link> | <Link to="/admin">Espace Admin</Link>
    </nav>
  );
}
