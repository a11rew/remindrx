import clsx from "clsx";
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

function FormInput({ className, ...rest }: Props) {
  return (
    <input
      className={clsx([
        "border p-2 rounded-lg w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
        className,
      ])}
      {...rest}
    />
  );
}

export default FormInput;
