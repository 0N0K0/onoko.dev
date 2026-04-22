import Layout from "..";

/**
 * Composant de layout pour les pages d'authentification (connexion, inscription, etc.)
 * Fournit une structure de base avec un titre, un formulaire et des boutons d'action
 * @param {React.ReactNode} props.children Contenu du formulaire (champs de saisie, etc.)
 * @param {string} props.title Titre de la page (ex: "Connexion", "Inscription")
 * @param {{ to: string; text: string; disabled: boolean }} props.returnButton Configuration du bouton de retour (lien, texte et état désactivé)
 * @param {{ text: string; disabled: boolean }} props.submitButton Configuration du bouton de soumission (texte et état désactivé)
 * @param {function} props.onSubmit Fonction à appeler lors de la soumission du formulaire
 * @param {boolean} props.hasResetPasswordLink Indique si le lien de réinitialisation de mot de passe doit être affiché
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout
      sx={{
        alignItems: "center",
        justifyContent: "center !important",
      }}
    >
      {children}
    </Layout>
  );
}
