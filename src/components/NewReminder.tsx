import React from "react";
import FormInput from "./FormInput";
import FormTextArea from "./FormTextArea";
import InfoBastion from "./InfoBastion";

function NewReminder() {
  return (
    <div>
      <form className="flex flex-col gap-4">
        <label>
          <b className="flex gap-2 items-center">
            <span>Drug</span>
            <InfoBastion message="Name of the drug you're creating the reminder for." />
          </b>
          <FormInput className="mt-2" placeholder="Eg: Amoxicillin" />
        </label>
        <label>
          <b className="flex gap-2 items-center">
            Dosage
            <InfoBastion message="Dosage of the drug you're creating the reminder for." />
          </b>
          <FormInput className="mt-2" placeholder="Eg: 40mg. Two tablets." />
        </label>
        <label>
          <b className="flex gap-2 items-center">
            Message
            <InfoBastion message="Optional additional message to be sent with reminder." />
          </b>
          <FormTextArea
            className="mt-2"
            placeholder="Eg: Red capped bottle. Take with food."
          />
        </label>
        <button className="bg-sky-500 hover:bg-sky-600  text-white p-2 rounded-lg">
          Create Reminder
        </button>
      </form>
    </div>
  );
}

export default NewReminder;
