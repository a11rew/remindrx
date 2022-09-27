import { TrashIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import clsx from "clsx";
import React from "react";
import { trpc } from "../utils/trpc";
import { notificationMethods } from "./NotificationMethods";

function ReminderList() {
  const { data } = trpc.useQuery(["reminders.mine"]);

  console.log(data);

  return (
    <div className="w-full">
      {data?.length ? (
        <ul className="w-full flex flex-col gap-4">
          {data.map((reminder) => (
            <ReminderCard reminder={reminder} key={reminder.id} />
          ))}
        </ul>
      ) : (
        <p className="text-center">No reminders yet.</p>
      )}
    </div>
  );
}

export default ReminderList;

type ReminderWithMethods = Prisma.ReminderGetPayload<{
  include: {
    how: true;
  };
}>;

function ReminderCard({ reminder }: { reminder: ReminderWithMethods }) {
  const { mutate: remove } = trpc.useMutation("reminders.delete");

  return (
    <li className="flex p-2 border rounded-lg justify-between items-center bg-white">
      <div className="flex min-w-0 items-center">
        <div className="flex items-center gap-2 mr-2 md:mr-10 min-w-fit">
          <span className="">
            {
              notificationMethods.find((m) => m.id === reminder.how[0]?.type)
                ?.icon
            }
          </span>
        </div>
        <span className="truncate min-w-0 text-sm md:text-base">
          {reminder.drug}
        </span>
      </div>
      <button
        type="button"
        onClick={() => remove({ id: reminder.id })}
        className={clsx(
          "flex-shrink-0 w-6 h-6 justify-center items-center z-1",
          "text-gray-300 hover:text-gray-600 transition-colors duration-200"
        )}
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </li>
  );
}
