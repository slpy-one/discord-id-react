import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

import BG from "./assets/bg.webp";
import type {
  mainPayload,
  PayloadInterface,
  socketInterface,
} from "./modules/interface/payload";

import { MainCard } from "./components/MainCard";
import { Footer } from "./components/Footer";

const App = () => {
  const [tempUserID, setUserID] = useState<string>("");

  const searchString = window.location.search;
  const userID = new URLSearchParams(searchString).get("id");

  if (userID === null || userID === undefined || userID === "") {
    return (
      <>
        <div
          className="w-full h-screen bg-center! bg-cover! bg-no-repeat!"
          style={{ background: `url(${BG})` }}
        >
          <div className="w-full h-screen backdrop-blur-[10px] bg-radial-[at_50%_75%] from-0% from-drop-overlay to-overlay to-100% flex flex-row items-center justify-center">
            <div className="card p-4 bg-linear-to-tr from-transparent from-0% to-glass-drop to-100% text-whitesmoke border-2 border-solid border-glass-border border-l-0! border-b-0! rounded-xl min-w-[20rem] h-fit">
              <h1 className="text-xl font-bold">
                Welcome to Discord Name card
              </h1>
              <br />
              <p className="w-80 opacity-80">
                This website is made by using API from{" "}
                <a
                  className="underline hover:opacity-60 hover:no-underline"
                  href="https://github.com/phineas/lanyard"
                >
                  Phineas/lanyard
                </a>{" "}
                with my own self-hosted node and on my own server, if you want
                to use just make sure that you have already join our{" "}
                <a
                  href="https://discord.slpy.one"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:opacity-60 hover:no-underline"
                >
                  our discord server
                </a>
              </p>
              <br />
              <form className="w-80 flex flex-col gap-4">
                <div className="flex flex-row flex-wrap gap-2 justify-start items-center w-full">
                  <label htmlFor="userId">Discord User ID: </label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    placeholder="Enter Discord User ID"
                    value={tempUserID}
                    onChange={(e) => setUserID(e.target.value)}
                    required
                    className="border-2 border-l-0! border-b-0! border-solid border-glass-border bg-linear-to-tr from-transparent to-glass-drop px-4 py-2 outline-0 rounded-xl"
                  />
                </div>

                <div className="w-full flex justify-end items-center">
                  <button
                    type="submit"
                    className="bg-linear-to-tr from-transparent to-glass-drop border-2 border-l-0! border-b-0! border-solid border-glass-border rounded-xl px-4 py-2 hover:scale-95 hover:opacity-80 hover:cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const [userData, setUserData] = useState<mainPayload | undefined>();

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    import.meta.env.VITE_WEBSOCKET,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        op: 2,
        d: { subscribe_to_ids: [userID] },
      });
    }
  }, [readyState]);

  useEffect(() => {
    if (lastJsonMessage !== null && lastJsonMessage !== undefined) {
      const payload = lastJsonMessage as PayloadInterface;

      if (payload.op === 0) {
        let finalPayload;

        if (payload.t === "PRESENCE_UPDATE") {
          if (payload.d === undefined) {
            return;
          }

          finalPayload = payload.d as mainPayload;
        } else {
          const data = payload.d as socketInterface;

          if (data[userID] !== null && data[userID] !== undefined) {
            finalPayload = data[userID] as mainPayload;
          }
        }

        setUserData(finalPayload);
      }
    }
  }, [lastJsonMessage]);

  if (userData === undefined) {
    return (
      <>
        <div
          className="w-full h-screen bg-center! bg-cover! bg-no-repeat!"
          style={{ background: `url(${BG})` }}
        >
          <div className="w-full h-screen backdrop-blur-[10px] bg-radial-[at_50%_75%] from-0% from-drop-overlay to-overlay to-100% flex flex-row items-center justify-center">
            {/* Card */}
            <div className="card bg-linear-to-tr from-transparent from-0% to-glass-drop to-100% text-whitesmoke border-2 border-solid border-glass-border border-l-0! border-b-0! rounded-xl min-w-[20rem] h-fit">
              <h1 className="text-2xl text-whitesmoke p-4 text-center">
                Loading
              </h1>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className="w-full h-screen bg-center! bg-cover! bg-no-repeat!"
          style={{ background: `url(${BG})` }}
        >
          <div className="w-full h-screen backdrop-blur-[10px] bg-radial-[at_50%_75%] from-0% from-drop-overlay to-overlay to-100% flex flex-row items-center justify-center">
            {/* Card */}
            <MainCard userData={userData} userID={userID} />
          </div>
          <Footer />
        </div>
      </>
    );
  }
};

export default App;
