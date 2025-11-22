import { useError } from "../../contexts/ErrorContext";

export function ErrorModal() {
  const { error, clearError } = useError();

  if (!error) return null;

  return (
    <div></div>
  );
}