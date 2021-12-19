export type Perk = {
  id: number;
  campaign_id: number;
  active: boolean;
  title: string;
  image_url: string;
  price: number;
  included_items: string;
  description: string;
  quantity_available: number;
};
