import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { PieChart, Pie, Sector } from "recharts";

import { assetsState } from "../store/atoms";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.label}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${payload.name} ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${percent.toFixed(1)}%)`}
      </text>
    </g>
  );
};

const AssetChart = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [assets] = useRecoilState(assetsState);

  return (
    <div className="card card-body mt-1">
      <div className="row">
        <div className="col">
          <PieChart width={400} height={400}>
            <Pie
              data={assets}
              cx={200}
              cy={200}
              innerRadius={60}
              outerRadius={80}
              fill="#0d6efd"
              dataKey="amount"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={(data, index) => setActiveIndex(index)}
            />
          </PieChart>
        </div>
        <div className="col">
          <PieChart width={400} height={400}>
            <Pie
              data={assets}
              cx={200}
              cy={200}
              innerRadius={60}
              outerRadius={80}
              fill="#0d6efd"
              dataKey="idealAmount"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={(data, index) => setActiveIndex(index)}
            />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AssetChart;
