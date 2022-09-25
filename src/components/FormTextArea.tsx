/* eslint-disable react/display-name */
import clsx from "clsx";
import React, { forwardRef } from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const FormTextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, ...rest }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx([
          "border p-2 rounded-lg w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
          className,
        ])}
        {...rest}
      />
    );
  }
);

export default FormTextArea;
