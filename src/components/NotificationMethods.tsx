/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
import {
  ChatBubbleBottomCenterTextIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EnvelopeOpenIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Controller, useForm, useFormContext } from "react-hook-form";
import ListBoxWithIcons from "./ListBoxWithIcons";
import { arrayMove, truncateText } from "../utils";

type Props = {
  reportNotificationMethods: (notificationMethods: string[]) => void;
};

function NotificationMethods({}: Props) {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        name="methods"
        control={control}
        rules={{
          required: "You'd need to select at least one notification method",
        }}
        render={({
          field: { onChange, value: _value },
          fieldState: { error },
        }) => {
          // Force typing value
          const value = _value as NotificationMethodSubmission[];

          const addNotificationMethod = (
            method: NotificationMethodSubmission
          ) => {
            // Check if method already exists
            if (
              value.filter(
                (m) => m.id === method.id && m.value === method.value
              ).length > 0
            ) {
              return;
            } else {
              onChange([...value, method]);
            }
          };

          const removeNotificationMethod = (
            method: NotificationMethodSubmission
          ) => {
            onChange(value.filter((m) => m !== method));
          };

          return (
            <div>
              <NotificationMethodAddCard add={addNotificationMethod} />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
              <div className="flex flex-col gap-4 mt-4">
                <NotificationMethodCardList
                  methods={value}
                  updateMethods={onChange}
                  remove={removeNotificationMethod}
                />
              </div>
              {value.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  You will receive the reminder via{" "}
                  {value[0]?.id === "sms"
                    ? value[0]?.id.toUpperCase()
                    : String(value[0]?.id)}{" "}
                  at <b>{truncateText(String(value[0]?.value), 30)}</b>
                  <br />
                  {value.length > 1 && (
                    <span>
                      If you are unreachable there, we will try to reach you via{" "}
                      {value[1]?.id === "sms"
                        ? value[1]?.id.toUpperCase()
                        : String(value[1]?.id)}{" "}
                      at <b>{truncateText(String(value[1]?.value), 30)}</b> and
                      so on.
                    </span>
                  )}
                </p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}

function NotificationMethodAddCard({
  add,
}: {
  add: (method: NotificationMethodSubmission) => void;
}) {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    resetField,
    watch,
  } = useForm({
    defaultValues: {
      method: notificationMethods[0],
      value: "",
    },
  });

  const selectedMethod = watch("method");

  const onSubmit = handleSubmit((data) => {
    add({
      id: data?.method?.id === "email" ? "email" : "sms",
      value: data.value,
    });
    resetField("value");
  });

  return (
    <div>
      <div className="flex gap-2">
        <Controller
          name="method"
          control={control}
          render={({ field: { value, onChange } }) => (
            <ListBoxWithIcons
              options={notificationMethods}
              selected={value}
              setSelected={(e) => {
                resetField("value");
                onChange(e);
              }}
            />
          )}
        />
        {selectedMethod?.id === "email" ? (
          <input
            className={clsx([
              "border p-2 rounded-lg w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
              errors?.value ? "border-red-500" : "",
            ])}
            type="email"
            placeholder="Email address"
            {...register("value", { required: "We'd need a way to reach you" })}
          />
        ) : (
          <input
            className={clsx([
              "border p-2 rounded-lg w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
              errors?.value ? "border-red-500" : "",
            ])}
            type="tel"
            placeholder="Phone number for SMS notifications"
            {...register("value", { required: "We'd need a way to reach you" })}
          />
        )}
        <button
          className={clsx(
            "flex items-center justify-center bg-sky-500 flex-shrink-0 rounded-lg w-[42px] h-[42px]",
            "hover:bg-sky-600 transition-colors duration-200"
          )}
          onClick={onSubmit}
        >
          <PlusIcon className="h-6 w-6 text-white" />
        </button>
      </div>
      {errors?.value && (
        <div className="text-red-500 text-sm mt-1">
          {errors?.value?.message}
        </div>
      )}
    </div>
  );
}

function NotificationMethodCardList({
  methods,
  remove,
  updateMethods,
}: {
  methods: NotificationMethodSubmission[];
  updateMethods: (methods: NotificationMethodSubmission[]) => void;
  remove: (method: NotificationMethodSubmission) => void;
}) {
  const [animationParent] = useAutoAnimate<HTMLUListElement>();

  const moveInList = (currentIndex: number, dir: "up" | "down") => {
    // Update pos in array
    const updated = arrayMove(
      methods,
      currentIndex,
      dir === "up" ? currentIndex - 1 : currentIndex + 1
    );
    updateMethods(updated);
  };

  return (
    <ul className="space-y-2" ref={animationParent}>
      {methods.map((method) => (
        <NotificationMethodCard
          key={method.id + method.value}
          method={method}
          currentIndex={methods
            .map((m) => m.id + m.value)
            .indexOf(method.id + method.value)}
          moveInList={moveInList}
          remove={() => remove(method)}
        />
      ))}
    </ul>
  );
}

const NotificationMethodCard = ({
  method,
  remove,
  moveInList,
  currentIndex,
}: {
  currentIndex: number;
  moveInList: (currentIndex: number, dir: "up" | "down") => void;
  method: NotificationMethodSubmission;
  remove: () => void;
}) => {
  return (
    <li className="flex p-2 border rounded-lg justify-between items-center bg-white">
      <div className="flex min-w-0 items-center">
        <div className="flex items-center gap-2 mr-2 md:mr-10 min-w-fit">
          <div className="flex flex-col">
            <button type="button">
              <ChevronUpIcon
                className={clsx(
                  "h-4 w-4 text-gray-500",
                  "hover:bg-sky-200 transition-colors duration-200"
                )}
                onClick={() => moveInList(currentIndex, "up")}
              />
            </button>
            <button
              type="button"
              onClick={() => moveInList(currentIndex, "down")}
            >
              <ChevronDownIcon
                className={clsx(
                  "h-4 w-4 text-gray-500",
                  "hover:bg-sky-200 transition-colors duration-200"
                )}
              />
            </button>
          </div>
          <span className="">
            {notificationMethods.find((m) => m.id === method.id)?.icon}
          </span>
        </div>
        <span className="truncate min-w-0 text-sm md:text-base">
          {method.value}
        </span>
      </div>
      <button
        type="button"
        onClick={remove}
        className={clsx(
          "flex-shrink-0 w-6 h-6 justify-center items-center z-1",
          "text-gray-300 hover:text-gray-600 transition-colors duration-200"
        )}
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </li>
  );
};

export const notificationMethods = [
  {
    name: "Email",
    id: "email",
    icon: <EnvelopeOpenIcon className="w-6 h-6" />,
  },
  {
    name: "SMS",
    id: "sms",
    icon: <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />,
  },
];

type NotificationMethodSubmission = {
  id: "sms" | "email";
  value: string;
};

export default NotificationMethods;
