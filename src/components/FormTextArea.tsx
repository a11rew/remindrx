import clsx from "clsx";
import React from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

function FormTextArea({ className, ...rest }: Props) {
  return (
    <textarea
      className={clsx([
        "border p-2 rounded-lg w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
        className,
      ])}
      {...rest}
    />
  );
}

export default FormTextArea;
