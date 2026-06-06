import { useEffect, useState } from "react";
import type { Activity, Spotify } from "../modules/interface/payload";

interface ChildInterface {
  data: Activity;
  spotify?: Spotify;
}

export const ActivityCard = (child: ChildInterface) => {
  const { data, spotify } = child;

  console.log(data);

  if (spotify !== undefined) {
    const [totalTime, setTotalTime] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [progress, setProgress] = useState<string>("");

    const current = () => {
      if (spotify.timestamps.end === undefined) {
        return;
      }

      let time = new Date().getTime() - spotify.timestamps.start;
      let endTime = spotify.timestamps.end - spotify.timestamps.start;

      setCurrentTime(time);
      setTotalTime(endTime);

      setProgress(`${String((time / endTime) * 100)}%`);
    };

    const timeParsing = (time: number) => {
      let finalTime = "";

      const tempDate = new Date(time);

      finalTime = `${
        String(tempDate.getMinutes()).length < 2
          ? `0${tempDate.getMinutes()}`
          : tempDate.getMinutes()
      }:${
        String(tempDate.getSeconds()).length < 2
          ? `0${tempDate.getSeconds()}`
          : tempDate.getSeconds()
      }`;

      return finalTime;
    };

    useEffect(() => {
      let id = setInterval(() => {
        current();
      }, 1000);
      return () => clearInterval(id);
    }, [spotify.timestamps.start]);

    return (
      <>
        <div className="w-full p-4 my-4">
          <div className="w-full flex flex-row gap-2">
            {/* Image */}
            <img
              src={spotify.album_art_url}
              className="aspect-square w-25 rounded"
            />
            {/* Data */}
            <div>
              <p className="opacity-75 text-sm">{data.name}</p>
              <p className="text-xl font-bold">{spotify.song}</p>
              <p className="text-sm opacity-60">{spotify.artist}</p>
              <p className="text-sm opacity-60">{spotify.album}</p>
            </div>
          </div>
          <br />
          {/* ProgressBar */}
          <div className="flex gap-2 justify-center items-center">
            <span>{timeParsing(currentTime)}</span>
            <div className="w-full border-2 border-solid border-glass-drop rounded-xl">
              <div
                className="rounded-xl h-2 bg-glass-border"
                style={{ width: progress }}
              ></div>
            </div>
            <span>{timeParsing(totalTime)}</span>
          </div>
        </div>
      </>
    );
  } else if (data.id === "custom") {
    return (
      <>
        <div className="w-full p-3 flex gap-2">
          <div>
            <p className="text-xl">{data.name}</p>
            <p className="text-md opacity-70">
              {data.emoji !== undefined ? (
                <span className="emoji mr-1">{data.emoji.name}</span>
              ) : (
                ""
              )}
              <span>{data.state}</span>
            </p>
          </div>
        </div>
      </>
    );
  } else {
    const regex = /^mp:external\/.*$/g;

    return (
      <>
        <div className="w-full p-3 flex gap-2">
          {/* Image */}
          {data.assets === undefined ? (
            ""
          ) : !regex.test(data.assets.large_image) ? (
            <img
              src={`https://cdn.discordapp.com/app-assets/${data.application_id}/${data.assets.large_image}.png`}
              className="aspect-square w-25 rounded"
            />
          ) : (
            <img
              src={`https://media.discordapp.net/${data.assets?.large_image.replace(
                "mp:",
                "",
              )}`}
              className="aspect-square w-25 rounded"
            />
          )}
          {/* Data */}
          <div>
            <p className="text-xl">{data.name}</p>
            <p className="text-md opacity-70">{data.details}</p>
            <p className="text-md opacity-70">{data.state}</p>
          </div>
        </div>
      </>
    );
  }
};
