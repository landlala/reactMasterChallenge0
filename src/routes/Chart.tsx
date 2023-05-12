import ApexChart from "react-apexcharts";
import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: string;
}

interface ChartProps {
  coinId: string;
}

function Chart({coinId}: ChartProps) {
  const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => 
    fetchCoinHistory(coinId),
    {
        refetchInterval: 10000                                              
    }
  );
  const exceptData = data ?? [];
  
  const chartData= exceptData?.map(i => {
    return {
      x: i.time_close,
      y: [i.open, i.high, i.low, i.close]
    };
  });


  return (
    <div>
      {isLoading ? "Loading..." : 
        <>
          <ApexChart
            type = "area"
            series = {[
              {
                data: chartData
              }
            ]}
            options = {{
              theme: {
                mode: "dark"
              },
              chart: {
                toolbar: {
                  show: false
                },
                height: 300,
                width: 500,
                background: "transparent"
              },
              grid: {
                show: false
              },
              xaxis: {
                type: "datetime"
              },
              yaxis: {
                show: false,
              }
            }}
          />
          <ApexChart
            type = "candlestick"
            series = {[
              {
                data: chartData
              }
            ]}
            options = {{
              theme: {
                mode: "dark"
              },
              chart: {
                toolbar: {
                  show: false
                },
                height: 300,
                width: 500,
                background: "transparent"
              },
              grid: {
                show: false
              },
              xaxis: {
                type: "datetime"
              },
              yaxis: {
                show: false,
              }
            }}
          />
        </>
      }
    </div>
  );
}

export default Chart;