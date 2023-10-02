"use client";
import { ResponsivePie } from "@nivo/pie";

export type Data = {
  id: string;
  label: string;
  value: number;
};

export default function Graph(props: { data: Data[] }) {
  return (
    <div className="h-screen">
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
