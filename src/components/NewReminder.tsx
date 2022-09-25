import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import FormInput from "./FormInput";
import FormTextArea from "./FormTextArea";
import InfoBastion from "./InfoBastion";
import NotificationMethods from "./NotificationMethods";
import RecurringDateInput from "./RecurringDateInput";

function NewReminder() {
  const methods = useForm({ defaultValues });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = methods;

  const onSubmit = (data: typeof defaultValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <label>
            <b className="flex gap-2 items-center">
              <span>Drug</span>
              <InfoBastion message="Name of the drug you're creating the reminder for." />
            </b>
            <FormInput
              className="mt-2"
              placeholder="Eg: Amoxicillin"
              error={
                errors.drug?.message ? String(errors.drug.message) : undefined
              }
              {...register("drug", {
                required: "You'd need to provide a drug name",
              })}
            />
          </label>
          <label>
            <b className="flex gap-2 items-center">
              Dosage
              <InfoBastion message="Dosage of the drug you're creating the reminder for." />
            </b>
            <FormInput
              className="mt-2"
              placeholder="Eg: 40mg. Two tablets."
              {...register("dosage")}
            />
          </label>
          <label>
            <b className="flex gap-2 items-center">
              Message
              <InfoBastion message="Optional additional message to be sent with reminder." />
            </b>
            <FormTextArea
              className="mt-2"
              placeholder="Eg: Red capped bottle. Take with food."
              {...register("message")}
            />
          </label>
          <div>
            <label>
              <b className="flex gap-2 items-center mb-2">
                When
                <InfoBastion message="Optional additional message to be sent with reminder." />
              </b>
            </label>
            <Controller
              name="when"
              control={control}
              render={({ field: { onChange } }) => (
                <RecurringDateInput reportCronExpression={onChange} />
              )}
            />
          </div>
          <div>
            <label>
              <b className="flex gap-2 items-center mb-2">
                How
                <InfoBastion message="Optional additional message to be sent with reminder." />
              </b>
            </label>
            <Controller
              name="when"
              control={control}
              render={({ field: { onChange } }) => (
                <NotificationMethods reportNotificationMethods={onChange} />
              )}
            />
          </div>
          <button className="bg-sky-500 hover:bg-sky-600  text-white p-2 rounded-lg">
            Create Reminder
          </button>
        </form>
      </div>
    </FormProvider>
  );
}

export default NewReminder;

const defaultValues = {
  drug: "",
  dosage: "",
  message: "",
  when: "00 14 * * *",
  methods: [],
};
