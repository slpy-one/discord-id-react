import { useState } from "react";

import type { mainPayload } from "../modules/interface/payload";
import { ActivityCard } from "./ActivityCard";

interface childInterface {
  userData: mainPayload;
  userID: string;
}

export const MainCard = (child: childInterface) => {
  const { userData, userID } = child;

  const [actID, setActID] = useState<number>(0);

  return (
    <div className="card bg-linear-to-tr from-transparent from-0% to-glass-drop to-100% text-whitesmoke border-2 border-solid border-glass-border border-l-0! border-b-0! rounded-xl min-w-[20rem] h-fit">
      {/* Heading Container */}
      <div className="relative">
        <div className="w-full flex flex-row flex-wrap gap-4 bg-drop-overlay backdrop-blur-[2px] relative z-2 p-4 rounded-xl">
          <div
            className={`profile-image aspect-square bg-center! bg-cover! bg-no-repeat! rounded-full w-25`}
            style={{
              background: `url(https://cdn.discordapp.com/avatars/${userID}/${userData?.discord_user.avatar}.png)`,
            }}
          ></div>
          {/* Text Container */}
          <div className="w-fit text-whitesmoke">
            <h1 className="text-xl font-bold">
              {userData?.discord_user.display_name}
            </h1>
            <p className="opacity-60">@{userData?.discord_user.username}</p>
            {/* Online Status */}
            <div className="w-fit text-lg flex flex-row gap-0.5">
              <p
                className={
                  userData?.active_on_discord_desktop
                    ? "text-online"
                    : "text-offline"
                }
              >
                <span className="icon-font material-symbols-outlined">
                  computer
                </span>
              </p>
              <p
                className={
                  userData?.active_on_discord_web
                    ? "text-online"
                    : "text-offline"
                }
              >
                <span className="icon-font material-symbols-outlined">
                  globe
                </span>
              </p>
              <p
                className={
                  userData?.active_on_discord_mobile
                    ? "text-online"
                    : "text-offline"
                }
              >
                <span className="icon-font material-symbols-outlined">
                  mobile
                </span>
              </p>
              <p
                className={
                  userData?.active_on_discord_embedded
                    ? "text-online"
                    : "text-offline"
                }
              >
                <span className="icon-font material-symbols-outlined">
                  keep
                </span>
              </p>
            </div>
          </div>
        </div>
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 z-1 h-full object-cover! object-right! rounded-xl"
          src={`https://cdn.discordapp.com/assets/collectibles/${userData?.discord_user.collectibles.nameplate.asset}asset.webm`}
        ></video>
      </div>
      {/* Body Container */}
      <div className="p-4">
        {/* Activities */}
        <div>
          <h1 className="text-lg font-bold underline">Activity</h1>
          {/* NavBar */}
          <div className="w-full flex flex-row gap-2 border-b-2 border-solid border-glass-border">
            {userData?.activities.map((act, i) => {
              if (act.name !== "Hang Status") {
                return (
                  <button
                    className="w-fit px-4 py-2 rounded-t-lg border-2 border-solid border-b-0!  hover:cursor-pointer hover:opacity-80"
                    key={act.id}
                    onClick={() => setActID(i)}
                  >
                    {act.name}
                  </button>
                );
              }
            })}
          </div>
          {/* Content */}
          {userData.activities[actID].name === "Spotify" ? (
            <ActivityCard
              data={userData?.activities[actID]}
              spotify={userData.spotify}
            />
          ) : (
            <ActivityCard data={userData?.activities[actID]} />
          )}
        </div>
        {/* Footer */}
        <div>
          <a
            className="w-full block text-center bg-linear-to-tr from-0% from-transparent to-100% to-glass-drop border-2 border-l-0! border-b-0! border-solid border-glass-border p-4 text-whitesmoke rounded-md hover:cursor-pointer hover:scale-95"
            href={`https://discord.com/users/${userID}`}
          >
            Make a Contact // See Real Profile
          </a>
        </div>
      </div>
    </div>
  );
};
