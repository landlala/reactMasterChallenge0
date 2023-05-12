import styled from "styled-components";
import moment from "moment";
import {fetchCoinTickers} from "../api";
import {useQuery} from "react-query";



const Container = styled.div`
  max-width: 500px;
  padiing: 0px 20px;
  margin: 0px auto;
`;

const Overview = styled.div`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span`
  height: 15vh;
  text-align: center;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: white;
`;

interface IPrice {
  coinId: string;
}

interface priceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: { 
      ath_date: string; 
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}


function Price({coinId}: IPrice) {
  const {isLoading, data} = useQuery<priceData>(["price", coinId], () => fetchCoinTickers(coinId));

  return(
    <Container>
      {isLoading ? "Loading..." : 
      <>
        <Overview>
          <span>
            {moment(data?.quotes.USD.ath_date.substr(0, 10), "YYYY-MM-DD").format("YYYY.MM.DD")}
            <br />
            {data?.quotes.USD.ath_date.substr(11, 8)}
          </span>
          <span>{data?.quotes.USD.ath_price.toFixed(3)}</span>
        </Overview>
        <Tabs>
          <Tab>
            <span>1시간 전보다</span>
            <span>{data?.quotes.USD.percent_change_1h.toFixed(1)}%</span>
          </Tab>
          <Tab>
            <span>6시간 전보다</span>
            <span>{data?.quotes.USD.percent_change_6h.toFixed(1)}%</span>
          </Tab>
          <Tab>
            <span>12시간 전보다</span>
            <span>{data?.quotes.USD.percent_change_12h.toFixed(1)}%</span>
          </Tab>
          <Tab>
            <span>24시간 전보다</span>
            <span>{data?.quotes.USD.percent_change_24h.toFixed(1)}%</span>
          </Tab>
        </Tabs>
      </>
      }
    </Container>

  );
}

export default Price;