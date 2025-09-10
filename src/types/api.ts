interface Coordinates {
  longitude: number;
  latitude: number;
}

interface WorkType {
  id: number;
  name: string;
  nameGt5: string;
  nameLt5: string;
  nameOne: string;
}

interface ApiReqObjectType {
  id: string;
  logo: string;
  coordinates: Coordinates;
  address: string;
  companyName: string;
  dateStartByCity: string;
  timeStartByCity: string;
  timeEndByCity: string;
  currentWorkers: number;
  planWorkers: number;
  workTypes: WorkType[];
  priceWorker: number;
  bonusPriceWorker: number;
  customerFeedbacksCount: string;
  customerRating: number;
  isPromotionEnabled: boolean;
}

export type { ApiReqObjectType };