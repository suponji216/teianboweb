"use client";
import { ResponsivePie } from "@nivo/pie";
import { Browser, Robot } from "@phosphor-icons/react";
import Tooltip from "./Tooltip";
import { useRouter } from "next/navigation";

export type Data = {
  id: string;
  label: string;
  value: number;
};

export default function Graph(props: { data: Data[] }) {
  const router = useRouter();
  return (
    <div className="h-screen relative">
      <div className="absolute z-10">
        <Tooltip text="github">
          <Browser
            className="m-1"
            size={32}
            weight="bold"
            onClick={() =>
              router.push("https://github.com/suponji216/teianboweb")
            }
          />
        </Tooltip>
        <Tooltip text="github">
          <Robot
            className="m-1"
            size={32}
            weight="bold"
            onClick={() =>
              router.push("https://github.com/suponji216/teianbot")
            }
          />
        </Tooltip>
      </div>
      <div className="absolute bottom-0 right-0 mb-10 mr-10">単位：分</div>
      <ResponsivePie
        data={props.data}
        colors={{ scheme: "set3" }}
        innerRadius={0.5}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        sortByValue={true}
        defs={[
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {},
            id: "lines",
          },
        ]}
      />
    </div>
  );
}
