import React, { Fragment, useEffect, useState } from "react";
import CustomChart from "../Graph/CustomChart";
import { OptionTable } from "./OptionTable";
import CONSTANT from "../../utils/CONSTANT";
import out_2 from "../../utils/out_2.json";

function transpose(a = []) {
  return Object.keys(a[0]).map(function (c) {
    return a.map(function (r) {
      return r[c];
    });
  });
}

export function Option() {
  const [OptionData, setOptionData] = useState([]);
  const [OptionHeading, setOptionHeading] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chartLables, setChartLables] = useState([]);
  const [dataSets, setDataSets] = useState([]);

  const [colors, setColors] = useState([]);

  useEffect(() => {
    let OptionDataTabale = [];
    const lable = Object.keys(out_2);

    Object.values(out_2).map((data, index) => {
      let columeData = [];
      Object.values(data).map((value) => {
        columeData.push(value);
      });
      OptionDataTabale.push(columeData);
    });
    let localColors = {};
    OptionDataTabale[0].map((data) => {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      localColors[data] = { r, g, b };
    });
    setColors(localColors);

    setOptionHeading(
      lable.map((heading, index) => {
        return {
          field: index,
          headerName: heading,
          width: index == 0 ? 200 : 100,
        };
      })
    );
    const a = [];
    transpose(OptionDataTabale).map((row, index) => {
      const b = {};
      b.id = index;
      row.map((data, index) => {
        b[index] = data;
      });
      a.push(b);
    });
    setOptionData(a);
    setIsLoaded(true);
    setChartLables(lable.slice(1, lable.length));
  }, []);

  const optionDataRowSelectHandler = (selectedRow) => {
    console.log("hi", selectedRow);

    setDataSets(
      selectedRow.map((index) => {
        const row = Object.values(OptionData[index]);
        return {
          label: row[0],
          data: row.slice(1, OptionData.length),
          borderColor:
            "rgb(" +
            colors[row[0]].r +
            "," +
            colors[row[0]].g +
            "," +
            colors[row[0]].b +
            ")",
          backgroundColor:
            "rgba(" +
            colors[row[0]].r +
            "," +
            colors[row[0]].g +
            "," +
            colors[row[0]].b +
            ", 0.5)",
        };
      })
    );

    // for (let i = 0; i < OptionData.length; i++) {
    //   if (selectedOption.has(OptionData[i][0])) {
    //     const lable = OptionData[i][0];
    //     localDataSet.push();
    //   }
    // }
    // setDataSets(localDataSet);
  };

  return (
    <Fragment>
      <div className="container" style={{ padding: "50px 0 0" }}>
        <div className="offset-0 col-12">
          <OptionTable
            OptionHeading={OptionHeading}
            OptionData={OptionData}
            tableHeading={CONSTANT.OPTION_TABLE_TITLE}
            isLoaded={isLoaded}
            optionDataRowSelectHandler={optionDataRowSelectHandler}
          />
        </div>
      </div>

      <CustomChart
        title="Invex Chart"
        chartLables={chartLables}
        dataSets={dataSets}
      />
    </Fragment>
  );
}
