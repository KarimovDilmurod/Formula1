import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Driver, RaceResult } from '../../types/data';

export const fetchDriversAction = createAsyncThunk<
  Driver[],
  { offset: number }
>('drivers/fetchDrivers', async ({ offset }, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://ergast.com/api/f1/drivers.json?limit=20&offset=${offset}`
    );
    return response.data.MRData.DriverTable.Drivers;
  } catch (e) {
    return thunkAPI.rejectWithValue('error');
  }
});

export const fetchDriverByIdAction = createAsyncThunk<
  Driver, string
>(
  'drivers/fetchById',
  async (driverId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://ergast.com/api/f1/drivers/${driverId}.json`
      );

      const driver = response.data.MRData.DriverTable.Drivers[0];

      if (!driver) {
        return rejectWithValue(`${driverId} not found`);
      }

      return driver as Driver;
    } catch (error: any) {
      return rejectWithValue(error.message || 'error');
    }
  }
);

export const fetchDriverResultsAction = createAsyncThunk<
  RaceResult[],
  string,
  { rejectValue: string }
>(
  'drivers/fetchResults',
  async (driverId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://ergast.com/api/f1/drivers/${driverId}/results.json`
      );

      const races = response.data.MRData.RaceTable.Races;

      const results: RaceResult[] = races.map((race: any) => ({
        raceName: race.raceName,
        round: race.round,
        date: race.date,
        position: race.Results[0].position,
        Constructor: race.Results[0].Constructor,
        circuitName: race.Circuit.circuitName,
      }));

      return results;
    } catch (error: any) {
      return rejectWithValue(error.message || 'error');
    }
  }
);

export const getMoreDriversAction = createAsyncThunk<
  Driver[],
  { offset: number },
  { rejectValue: string }
>(
  'drivers/fetchMoreDrivers',
  async ({ offset }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://ergast.com/api/f1/drivers.json?limit=${20}&offset=${offset}`
      );

      const drivers = response.data.MRData.DriverTable.Drivers;

      return drivers as Driver[];
    } catch (error: any) {
      return rejectWithValue('error');
    }
  }
);

