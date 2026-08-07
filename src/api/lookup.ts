import axios from 'axios';
import BASE_URL from './config';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Country {
  _id: string;
  name: string;
  code: string;
  phoneCode: string;
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
}

export interface Major {
  _id: string;
  name: string;
  field?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  results: number;
}

// ─── API Functions ─────────────────────────────────────────────────────────────

export const getCountries = async (): Promise<Country[]> => {
  const res = await axios.get<PaginatedResponse<Country>>(
    `${BASE_URL}/countries`
  );
  return res.data.data;
};

export const getMajors = async (): Promise<Major[]> => {
  const res = await axios.get<PaginatedResponse<Major>>(`${BASE_URL}/majors`);
  return res.data.data;
};
