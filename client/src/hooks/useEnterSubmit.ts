import { KeyboardEvent, RefObject } from "react";

interface UseEnterSubmitProps {
  onSubmit: () => void;
  formRef?: RefObject<HTMLFormElement>;
}

export const useEnterSubmit = ({ onSubmit }: UseEnterSubmitProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      onSubmit();
    }
  };

  return { handleKeyDown };
};
