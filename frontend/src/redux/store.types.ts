/* eslint-disable no-unused-vars */
import { AsyncThunk, ThunkAction } from '@reduxjs/toolkit';

import { store } from './store';

import type {
  PayloadAction as LibPayloadAction,
  Action as LibAction,
} from '@reduxjs/toolkit';
import type { Dispatch as LibDispatch } from 'redux';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  LibAction<string>
>;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type Action<Payload = any> = (
  payload: Payload,
) => LibPayloadAction<Payload>;

export type Dispatch<Payload> = LibDispatch<PayloadAction<Payload>>;

export type DispatchAction<Payload> = Extract<Payload, undefined> extends never
  ? (payload: Payload) => PayloadAction<Payload> | AppThunk<Payload>
  : (payload?: Payload) => PayloadAction<Payload> | AppThunk<Payload>;

export type Payload<A extends Action> = Parameters<A>[0];

type PayloadAction<P> = {
  payload: P;
  type: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UniversalDispatchAction = Action | AsyncThunk<any, any, any>;

export type LoadingStatus = 'idle' | 'pending' | 'succeded' | 'failed';

export interface IErrorMessage {
  message: string;
}
