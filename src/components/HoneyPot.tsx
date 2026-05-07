export default function HoneyPot({
  label,
  id,
  autoComplete,
  type = "text",
  onChange,
}: {
  label: string;
  id: string;
  type?: "text" | "email" | "password";
  autoComplete: "username" | "email" | "password";
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: "-9999px",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        autoComplete={autoComplete}
        tabIndex={-1}
        onChange={onChange}
      />
    </div>
  );
}
