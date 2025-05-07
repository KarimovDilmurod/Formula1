import { Driver, RaceResult } from '../../types/data';

export type DriversState = {
  getDriverLoading?: boolean
  driversData: Driver[]
  selectedDriverItem: Driver | null
  driverResultsLoading: boolean
  driverResults: RaceResult[]
}
