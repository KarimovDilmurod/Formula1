import { 
  fetchDriversAction,
  fetchDriverByIdAction,
  fetchDriverResultsAction,
  getMoreDriversAction,
} from './action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersistConfig, persistReducer } from 'redux-persist';
import { DriversState } from './types';
import { Driver, RaceResult } from '../../types/data';
import { uniqBy } from 'lodash';

export const initialStateDrivers: DriversState = {
  getDriverLoading: false,
  driversData: [],
  selectedDriverItem: null,
  driverResultsLoading: false,
  driverResults: [],
  moreLoading: false,
  offset: 0,
  limit: 20,
};

const driversSlice = createSlice({
  name: 'drivers',
  initialState: initialStateDrivers,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDriversAction.pending, state => {
        state.getDriverLoading = true;
      })
      .addCase(
        fetchDriversAction.fulfilled,
        (state, action: PayloadAction<Driver[]>) => {
          state.driversData = action.payload;
          state.getDriverLoading = false;
        },
      )
      .addCase(fetchDriversAction.rejected, state => {
        state.getDriverLoading = false;
      });

    builder
    .addCase(fetchDriverByIdAction.pending, state => {
      state.getDriverLoading = true;
    })
    .addCase(
      fetchDriverByIdAction.fulfilled,
      (state, action: PayloadAction<Driver>) => {
        state.getDriverLoading = false;
        state.selectedDriverItem = action.payload;
      }
    )
    .addCase(fetchDriverByIdAction.rejected, state => {
      state.getDriverLoading = false;
    });

    builder
    .addCase(fetchDriverResultsAction.pending, state => {
      state.driverResultsLoading = true;
    })
    .addCase(
      fetchDriverResultsAction.fulfilled,
      (state, action: PayloadAction<RaceResult[]>) => {
        state.driverResults = action.payload;
        state.driverResultsLoading = false;
      }
    )
    .addCase(fetchDriverResultsAction.rejected, state => {
      state.driverResultsLoading = false;
    });

    builder
      .addCase(getMoreDriversAction.pending, state => {
        state.moreLoading = true;
      })
      .addCase(getMoreDriversAction.fulfilled, (state, action: PayloadAction<Driver[]>) => {
        state.moreLoading = false;
        state.driversData = uniqBy([...state.driversData, ...action.payload], 'driverId');
        state.offset += action.payload.length;
      })
      .addCase(getMoreDriversAction.rejected, state => {
        state.moreLoading = false;
      });
  },
})

const persistConfig: PersistConfig<DriversState> = {
  key: 'drivers',
  storage: AsyncStorage,
  whitelist: ['driversData', 'selectedDriverItem', 'driverResults'],
};

export const driversReducer = persistReducer(persistConfig, driversSlice.reducer);
export const driversActions = driversSlice.actions;
