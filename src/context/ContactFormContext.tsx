import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import ContactForm from "../components/ContactForm";

type ContactFormContextValue = {
  openContactForm: () => void;
  closeContactForm: () => void;
};

const ContactFormContext = createContext<ContactFormContextValue | undefined>(
  undefined,
);

export function ContactFormProvider({ children }: { children: ReactNode }) {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const value = useMemo(
    () => ({
      openContactForm: () => setIsContactFormOpen(true),
      closeContactForm: () => setIsContactFormOpen(false),
    }),
    [],
  );

  return (
    <ContactFormContext.Provider value={value}>
      {children}
      <ContactForm open={isContactFormOpen} setOpen={setIsContactFormOpen} />
    </ContactFormContext.Provider>
  );
}

export function useContactForm() {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error("useContactForm must be used within ContactFormProvider");
  }
  return context;
}
