export interface Festival {
  id: number;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  img: string;
  url_slug: string;
  past?: boolean;
}
