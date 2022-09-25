/* eslint-disable react/display-name */
import clsx from "clsx";
import React, { forwardRef } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string | undefined;
};

const FormInput = forwardRef<HTMLInputElement, Props>(
  ({ className, error, ...rest }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          className={clsx([
            "border p-2 rounded-lg w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
            error ? "border-red-500" : "",
            className,
          ])}
          {...rest}
        />
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
      </div>
    );
  }
);

export default FormInput;
