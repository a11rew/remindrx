import type { NextPage } from "next";
import Head from "next/head";
import NewReminder from "../components/NewReminder";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <div className="bg-gradient-to-br from-blue-100 via-blue-300 to-blue-400 min-h-screen">
      <Head>
        <title>RemindRx</title>
        <meta
          name="description"
          content="Get reminded to take your prescription drugs on time."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full p-4 flex items-center justify-center pt-[4vh]">
        <div className="flex flex-col gap-4 bg-white h-[90vh] w-[90vw] p-4 rounded-lg shadow-sm">
          {/* <h1 className="text-center text-5xl mt-6">RemindRx</h1> */}
          <div className="flex flex-col-reverse md:flex-row h-full">
            <div className="md:w-1/2 h-full">
              <h2 className="text-2xl mt-6 text-center underline">
                Your Reminders
                <div className="w-1/2"></div>
              </h2>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl mt-6 text-center underline">
                Create Reminder
              </h2>
              <div className="mt-4">
                <NewReminder />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
