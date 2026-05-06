import { gql } from "@apollo/client";

export type ContactSubject = "project" | "rdv" | "other";

export type ContactPayload = {
  company?: string;
  name?: string;
  email: string;
  phone?: string;
  subject: ContactSubject;
  customSubject?: string;
  message: string;
};

export const SEND_CONTACT_MUTATION = gql`
  mutation SendContact(
    $company: String
    $name: String
    $email: String!
    $phone: String
    $subject: ContactSubject!
    $customSubject: String
    $message: String!
  ) {
    sendContact(
      company: $company
      name: $name
      email: $email
      phone: $phone
      subject: $subject
      customSubject: $customSubject
      message: $message
    )
  }
`;
