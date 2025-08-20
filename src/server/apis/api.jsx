import axios from 'axios';

export const api = axios.create({
  baseURL: "https://kihari.shop",
  timeout: 20000,
});

export async function get(url, config = {}) {
  const response = await api.get(url, config);
  return response.data;
}

const clean = (v) => (v==="null" ? "" : v ?? "");

function normalize (data = {}){
  return {
    id: data.id ?? null,
    name: clean(data.name),
    phoneNumber: clean(data.phoneNumber),
    address: clean(data.address),
    openTime: clean(data.openTime),
    info: clean(data.info),
    marketImg: clean(data.marketImg),
    marketLogo: clean(data.marketLogo),
    foodMenuImg: clean(data.foodMenuImg),
    color: clean(data.color),
    history: clean(data.history),
    raw: clean(data),
  };
}

export async function getMarketInfo(marketId, {select}={}) {
  const {data} = await api.get(`/market/info/${encodeURIComponent(marketId)}`);
  const normalized = normalize(data);
  return select ? select(normalized) : normalized;
}