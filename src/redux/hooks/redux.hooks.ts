import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { Action, Payload } from '../store.types';

import type {
  RootState,
  AppDispatch,
  UniversalDispatchAction,
} from '../store.types';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSuperDispatch = (action: UniversalDispatchAction) => {
  const dispatch = useAppDispatch();
  return (payload?: Payload<Action>) => dispatch(action(payload));
};
