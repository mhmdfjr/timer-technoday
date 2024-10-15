"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Flag, Refresh } from "iconsax-react";

const teams = [
  "Patrick",
  "Jayendra",
  "Siput Lincah",
  "ZRF_Hayabusa",
  "Krabby Patty",
  "ZRF_sepuh",
  "RR Vendeta",
  "RR YKZ",
  "RR ALKAUTSAR",
  "RR Nova",
  "KSATRIA",
  "MALIO",
  "RR Fearless",
  "Alpha Zero One",
  "GTR - Lavender Mekar",
  "Sumber Rezeki",
  "DOA IBU_AYAH",
  "GTR INSPIRATECH",
  "GTR-FreshLemon",
  "Karawang Pride",
  "ZRF_SadBot",
  "aselole",
  "sabira",
  "thariqatul jannah",
  "Squad Muria",
  "Elektro Muria",
  "Thursina IIBS A",
  "Manduwo Taichann",
  "Manduwo Enigma",
  "Manduwo Ligma",
  "Thursina IIBS B",
  "MANDUWO_KapalKaram",
  "manduwo_o",
  "GM- Drak Road Race",
  "GM-Brigade Code",
  "GM - Arindama",
  "GM-sugus",
  "GM-VintageGTR ",
  "GM-KURAKURANINJA",
  "GM-GladhiRacing",
  "TracerBot",
  "YPF ARSY",
  "SMP IDN",
  "ADI SANGGORO",
  "UNY Robot Team",
  "MicroLine",
];

const Timer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [team1, setTeam1] = useState<string>("");
  const [team2, setTeam2] = useState<string>("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!isRunning && timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const handleStartStop = useCallback(() => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  }, []);

  const handleReset = () => {
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  const handleLap = useCallback(() => {
    if (isRunning) {
      setLaps((prevLaps) => [...prevLaps, time]);
    }
  }, [isRunning, time]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab" && isRunning) {
        event.preventDefault();
        handleLap();
      } else if (event.key === "Backspace") {
        event.preventDefault();
        handleReset();
      } else if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        handleStartStop();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRunning, handleLap, handleStartStop]);

  const formatTime = (milliseconds: number) => {
    const getMilliseconds = `0${Math.floor((milliseconds % 1000) / 10)}`.slice(
      -2
    );
    const seconds = Math.floor(milliseconds / 1000);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    return `${getMinutes}:${getSeconds}.${getMilliseconds}`;
  };

  return (
    <div className="w-full h-full min-h-screen px-4 py-4 sm:py-2 bg-gradient-to-t from-[#131213] to-[#214177] flex flex-col justify-between">
      <div className="w-full flex flex-col gap-10 lg:gap-6 md:gap-4">
        <div className="w-full flex flex-col gap-6 lg:gap-4 justify-center items-center">
          <p className="text-white text-3xl lg:text-2xl sm:text-md font-bold russo-one">
            TECHNODAY 2024
          </p>

          <div className="flex lg:flex-col justify-center items-center gap-10 lg:gap-4">
            <div className="w-full flex sm:flex-col justify-center items-center gap-6 lg:gap-4">
              <select
                value={team1}
                onChange={(e) => setTeam1(e.target.value)}
                className="text-lg font-bold py-2 px-4 lg:px-2 rounded-lg bg-transparent text-white border-4 lg:border-2 border-[#FFD900]/50 hover:border-[#FFD900]"
              >
                <option value="" className="text-sm sm:text-xs" disabled>
                  Choose a team
                </option>
                {teams.map((team) => (
                  <option
                    key={team}
                    value={team}
                    className="text-sm sm:text-xs"
                  >
                    {team}
                  </option>
                ))}
              </select>
              <select
                value={team2}
                onChange={(e) => setTeam2(e.target.value)}
                className="text-lg font-bold py-2 px-4 lg:px-2 rounded-lg bg-transparent text-white border-4 lg:border-2 border-[#FFD900]/50 hover:border-[#FFD900]"
              >
                <option value="" className="text-sm sm:text-xs" disabled>
                  Choose a team
                </option>
                {teams.map((team) => (
                  <option
                    key={team}
                    value={team}
                    className="text-sm sm:text-xs"
                  >
                    {team}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex md:flex-col gap-14 md:gap-4 justify-center items-start">
          <div className="w-full flex flex-col gap-6 sm:gap-4 justify-start items-center">
            <div className="w-3/5 aspect-square p-2 border-8 lg:border-4 border-[#FFD900] rounded-full">
              <div className="w-full h-full flex justify-center items-center border-4 lg:border-2 border-dashed border-[#FFD900] rounded-full">
                <p className="text-start text-6xl xl:text-4xl lg:text-2xl sm:text-sm text-white font-bold geist-mono">
                  {formatTime(time)}
                </p>
              </div>
            </div>

            <div className="flex gap-4 text-md">
              <button
                onClick={handleReset}
                className="flex gap-2 py-4 px-6 sm:py-2 sm:px-4 text-white font-bold border-4 lg:border-2 border-[#FFD900]/50 hover:border-[#FFD900] rounded-2xl"
              >
                <Refresh size="24" color="#FFFFFF" /> <p>Reset</p>
              </button>
              <button
                onClick={handleStartStop}
                className="flex gap-2 py-4 px-6 sm:py-2 sm:px-4 text-white font-bold border-4 lg:border-2 border-[#FFD900]/50 hover:border-[#FFD900] rounded-2xl"
              >
                {isRunning ? (
                  <Pause size="24" color="#FFFFFF" />
                ) : (
                  <Play size="24" color="#FFFFFF" />
                )}
                <p>{isRunning ? "Stop" : "Start"}</p>
              </button>
              <button
                onClick={handleLap}
                className="flex gap-2 py-4 px-6 sm:py-2 sm:px-4 text-white font-bold border-4 lg:border-2 border-[#FFD900]/50 hover:border-[#FFD900] rounded-2xl"
                disabled={!isRunning}
              >
                <Flag size="24" color="#FFFFFF" /> <p>Lap</p>
              </button>
            </div>
          </div>

          <div className="w-full px-20 lg:px-10 sm:px-5 flex justify-center items-center">
            <div className="w-full flex flex-col gap-4 sm:gap-2">
              {/* here */}

              <div className="flex p-4 justify-start items-center border-b-4 border-[#FFD900] text-white text-3xl lg:text-2xl sm:text-sm font-semibold">
                <p className="w-full">Laps</p>
                <p className="w-full">Times</p>
              </div>

              {laps.length > 0 && (
                <div className="w-full p-4 flex justify-start items-center">
                  <ul className="w-full text-white text-3xl lg:text-2xl sm:text-md font-bold">
                    {laps.map((lap, index) => (
                      <li
                        key={index}
                        className="flex justify-start items-center py-2 geist-mono"
                      >
                        <p className="w-full">{`Lap ${index + 1}`}</p>
                        <p className="w-full">{formatTime(lap)}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <p className="text-white text-sm font-extralight">
          Made with love by Technoday <span>&copy;</span> 2024
        </p>
      </div>
    </div>
  );
};

export default Timer;
