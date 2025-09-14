import axios from 'axios';
import type { ApiReqObjectType } from '../types/api';
import { apiBaseUrl } from '../consts';

const uriConstructor = (lat: number, lot: number): string | null => {
  if (lat !== 0 && lot !== 0)
    return `${apiBaseUrl}?latitude=${lat.toFixed(6)}&longitude=${lot.toFixed(
      6,
    )}`;
  else return null;
};

const req = async (
  lat: number,
  lot: number,
): Promise<ApiReqObjectType[] | null> => {
  const uri = uriConstructor(lat, lot);
  if (!uri) return null;
  try {
    const result = await axios(uri);
    return [...result.data.data];
  } catch (err) {
    console.log(err);
    return null;
  }
};

const Api = {
  upd: req,
};

export default Api;
