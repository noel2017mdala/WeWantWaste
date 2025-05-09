export interface Skip {
  id: number;
  size: number;
  image: string;
  description: string;
  hirePeriod: number;
  hire_period_days: number;
  price: number;
  price_before_vat: number;
  vat: number;
  per_tonne_cost: number | null;
  transport_cost: number | null;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  forbidden: boolean;
  postcode: string;
  area: string;
  created_at: string;
  updated_at: string;
}
