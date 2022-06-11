import React from 'react';
import {PieChart, Pie, Cell, Tooltip} from 'recharts';

const COLORS = ['#f44336', '#2196f3', '#8bc34a', '#9e9e9e', '#ff9800', '#3f51b5', '#9c27b0', '#cddc39', '#795548'];

let total = 0;

let renderLabel = function(entry) {
  return entry.name + ': $' + entry.value;
}

const CustomTooltip = ({ active, payload, label }) => {
	if (active) {
		return (
      <div className="custom-tooltip">
        <p className="percent">{`${Math.floor(((payload[0].value)/total)*100)}%`}</p>
			</div>
		);
	}
	return null;
};

const ChartView = (props) => (
    <PieChart width={730} height={500} >
      <Pie data={props.categories} dataKey="value" fill="#8884d8" label={renderLabel} labelLine={false} >
        {total = props.total}
        {
          props.categories.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]}/>
          ))

        }
      </Pie>
      <Tooltip content={CustomTooltip} wrapperStyle={{ backgroundColor: "white", padding: '0px 12px' }}/>
    </PieChart>
)

export default ChartView;