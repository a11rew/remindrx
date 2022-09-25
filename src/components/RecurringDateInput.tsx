import clsx from "clsx";
import React, { useEffect, useState } from "react";
import cronstrue from "cronstrue";

import { createCronExpression, Days } from "../utils/cron";
import FormInput from "./FormInput";
import ListBox from "./ListBox";

type Props = {
  reportCronExpression: (cronExpression: string) => void;
};

function RecurringDateInput({ reportCronExpression }: Props) {
  const [selectedFrequency, setSelectedFrequency] = useState(
    FrequencyOptions[0]
  );
  const [selectedTime, setSelectedTime] = useState("14:00");
  const [selectedDays, setSelectedDays] = useState<string[]>(["Sunday"]);

  const cronExpression = createCronExpression({
    frequency:
      selectedFrequency?.name === "Daily"
        ? "daily"
        : selectedFrequency?.name === "Weekly"
        ? "weekly"
        : "days",
    minute: selectedTime.split(":")[1] || "00",
    hour: selectedTime.split(":")[0] || "00",
    daysOfWeek: selectedDays.map((day) =>
      day.toUpperCase().slice(0, 3)
    ) as unknown as Days[],
  });

  let parsedString = cronstrue.toString(cronExpression, { verbose: true });
  // Mak first letter in string lowercase
  parsedString = parsedString.charAt(0).toLowerCase() + parsedString.slice(1);

  //`Construe doesn't properly add "every week" to the string, so we add it manually
  if (selectedFrequency?.name !== "Daily") {
    parsedString = `${parsedString} every week`;
  }

  // Report cron expression to parent component
  useEffect(() => {
    reportCronExpression(cronExpression);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportCronExpression, selectedFrequency, selectedTime, selectedDays]);

  return (
    <div>
      <div className="flex gap-2">
        <div className="w-1/2">
          <ListBox
            options={FrequencyOptions}
            selected={selectedFrequency}
            setSelected={setSelectedFrequency}
          />
        </div>
        <div className="w-1/2">
          <FormInput
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </div>
      </div>
      {selectedFrequency?.name === "Specific Day(s)" && (
        <div className="flex gap-2 my-4">
          {[...Array(7)].map((_, i) => {
            const day = String(Object.values(DaysOfWeek)[i]);
            return (
              <button
                className={clsx(
                  "rounded-full w-8 h-8 flex items-center justify-center",
                  selectedDays.includes(day)
                    ? "bg-sky-500 text-white"
                    : "bg-gray-200 hover:bg-gray-100",
                  "transition-colors duration-200",
                  "focus:outline-none"
                )}
                key={i}
                type="button"
                onClick={() =>
                  setSelectedDays((e) => {
                    // Remove day if it's already selected
                    if (e.includes(day)) {
                      return e.filter((d) => d !== day);
                    } else {
                      return [...e, day];
                    }
                  })
                }
              >
                <div>{day[0]}</div>
              </button>
            );
          })}
        </div>
      )}
      <div className="text-sm text-gray-500 mt-2">
        You will receive a reminder {parsedString}
      </div>
    </div>
  );
}

export default RecurringDateInput;

enum DaysOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

const FrequencyOptions = [
  { name: "Daily" },
  { name: "Weekly" },
  { name: "Specific Day(s)" },
];
