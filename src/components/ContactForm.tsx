import { Button, TextField } from "@mui/material";
import CustomDialog from "./custom/CustomDialog";
import { ResponsiveStack } from "./custom/ResponsiveLayout";
import CustomSelect from "./custom/CustomSelect";
import { useState } from "react";
import ClosableSnackbarAlert from "./custom/ClosableSnackbarAlert";
import SnackbarAlert from "./custom/SnackbarAlert";
import {
  SEND_CONTACT_MUTATION,
  type ContactSubject,
} from "../services/contact/contactService";
import { useMutation } from "@apollo/client/react";

const PROJECT_MESSAGE_TEMPLATE = `Bonjour,

J'aimerais que nous collaborions sur un projet ensemble. En voici une brève description :

Objectif principal :
Public cible :
Maquette ? (Oui/Non)
Fonctionnalites à implémenter :
- ...
- ...
- ...
Hébergement ? (Oui/Non)
Référencement ? (Oui/Non)
Contraintes :
- ...
- ...
- ...
Delais :
Budget indicatif :

Merci !`;

const RDV_MESSAGE_TEMPLATE =
  "Bonjour,\n\nJe souhaiterais échanger avec vous par téléphone ou en visio. Voici mes disponibilités :\n- ...\n- ...\n- ...\n\nMerci !";

function extractGraphQLErrorMessage(graphQLError: any): string | null {
  const extensionMessage =
    graphQLError?.extensions?.originalError?.message ||
    graphQLError?.extensions?.exception?.message;

  if (Array.isArray(extensionMessage) && extensionMessage.length > 0) {
    return String(extensionMessage[0]);
  }
  if (typeof extensionMessage === "string" && extensionMessage.trim()) {
    return extensionMessage;
  }
  if (
    typeof graphQLError?.message === "string" &&
    graphQLError.message.trim()
  ) {
    return graphQLError.message;
  }

  return null;
}

function getServerErrorMessage(error: any): string {
  const graphQLErrorSources = [
    error?.graphQLErrors,
    error?.cause?.graphQLErrors,
    error?.networkError?.result?.errors,
    error?.cause?.networkError?.result?.errors,
  ];

  for (const source of graphQLErrorSources) {
    if (Array.isArray(source) && source.length > 0) {
      for (const gqlError of source) {
        const message = extractGraphQLErrorMessage(gqlError);
        if (message) return message;
      }
    }
  }

  const bodyTextSources = [
    error?.networkError?.bodyText,
    error?.cause?.networkError?.bodyText,
    error?.bodyText,
    error?.cause?.bodyText,
  ];

  for (const bodyText of bodyTextSources) {
    if (typeof bodyText !== "string" || !bodyText.trim()) continue;
    try {
      const parsed = JSON.parse(bodyText);
      const parsedErrors = parsed?.errors;
      if (Array.isArray(parsedErrors) && parsedErrors.length > 0) {
        for (const gqlError of parsedErrors) {
          const message = extractGraphQLErrorMessage(gqlError);
          if (message) return message;
        }
      }
    } catch {
      // Ignore invalid JSON and continue with other sources.
    }
  }

  const networkStatusSources = [
    error?.networkError?.statusCode,
    error?.cause?.networkError?.statusCode,
    error?.statusCode,
    error?.cause?.statusCode,
  ];
  if (networkStatusSources.some((status) => Number(status) === 429)) {
    return "Vous avez atteint la limite de messages. Reessayez plus tard.";
  }

  if (typeof error?.message === "string" && error.message.trim()) {
    return error.message;
  }
  if (typeof error?.cause?.message === "string" && error.cause.message.trim()) {
    return error.cause.message;
  }

  return "Erreur lors de l'envoi du message.";
}

function getDefaultMessage(subject: string) {
  if (subject === "project") return PROJECT_MESSAGE_TEMPLATE;
  if (subject === "rdv") return RDV_MESSAGE_TEMPLATE;
  return "";
}

export default function ContactForm({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [object, setObject] = useState<ContactSubject>("project");
  const [customSubject, setCustomSubject] = useState("");
  const [message, setMessage] = useState(getDefaultMessage("project"));
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [sendContact, { loading: submitting }] = useMutation(
    SEND_CONTACT_MUTATION,
    {
      onCompleted: () => {
        setSuccessSnackbarOpen(true);
        setOpen(false);
      },
      onError: (error) => {
        setErrorMessage(getServerErrorMessage(error));
      },
    },
  );

  const handleObjectChange = (value: ContactSubject) => {
    setObject(value);
    if (!message || message === getDefaultMessage(object))
      setMessage(getDefaultMessage(value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    sendContact({
      variables: {
        company: company.trim() || undefined,
        name: name.trim() || undefined,
        email: email.trim(),
        phone: phone.trim() || undefined,
        subject: object,
        customSubject: customSubject.trim() || undefined,
        message: message.trim(),
      },
    });
  };

  return (
    <>
      <CustomDialog
        key="contactFormDialog"
        onClose={() => setOpen(false)}
        open={open}
        width={8}
        height="100%"
        title="Me contacter"
        content={
          <form
            id="contact-form"
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "1.5rem",
            }}
          >
            <ResponsiveStack
              rowGap={3}
              sx={{ flexDirection: { xs: "column", sm: "row" }, columnGap: 1 }}
            >
              <TextField
                label="Société"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <TextField
                label="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </ResponsiveStack>
            <ResponsiveStack
              rowGap={3}
              sx={{ flexDirection: { xs: "column", sm: "row" }, columnGap: 1 }}
            >
              <TextField
                label="Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Téléphone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </ResponsiveStack>
            <CustomSelect
              label="Sujet"
              labelId="object-label"
              options={[
                { id: "project", label: "Demande de collaboration" },
                { id: "rdv", label: "Demande de contact téléphonique" },
                { id: "other", label: "Autre" },
              ]}
              value={object}
              onChange={(e) => {
                const value = Array.isArray(e.target.value)
                  ? e.target.value[0]
                  : e.target.value;
                handleObjectChange(value as ContactSubject);
              }}
              emptyOption={false}
            />
            {object === "other" && (
              <TextField
                label="Objet personnalisé"
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
              />
            )}
            <TextField
              label="Message"
              multiline
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>
        }
        actions={
          <Button
            type="submit"
            form="contact-form"
            disabled={submitting || !email.trim() || !message.trim()}
          >
            {submitting ? "Envoi..." : "Envoyer"}
          </Button>
        }
      />
      <ClosableSnackbarAlert
        open={successSnackbarOpen}
        setOpen={setSuccessSnackbarOpen}
        message="Votre message a bien été envoyé."
        severity="success"
      />
      <SnackbarAlert
        open={!!errorMessage}
        message={errorMessage || "Une erreur est survenue"}
        severity="error"
        onClose={() => setErrorMessage("")}
      />
    </>
  );
}
