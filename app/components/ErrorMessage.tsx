import React, { PropsWithChildren } from "react";
import { Text } from "@radix-ui/themes";

function ErrorMessage({ children }: PropsWithChildren) {
  if (React.isValidElement(children)) return null;

  return (
    <Text color="tomato" as="p">
      {children}
    </Text>
  );
}

export default ErrorMessage;
