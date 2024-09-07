"use client";

import uniqid from "uniqid";
import { createAppSlice } from "@/app/redux/createAppSlice";
import { getListData, setListData } from "@/app/services/product";
import { TProduct } from "@/app/types/product";
import { PayloadAction } from "@reduxjs/toolkit";

type TInitState = {
  list: TProduct[];
};

const initialState: TInitState = {
  list: getListData(),
};

export const productSlice = createAppSlice({
  name: "product",
  initialState,
  reducers({ reducer }) {
    return {
      create: reducer((state, { payload }: PayloadAction<TProduct>) => {
        state.list.push({ ...payload, id: uniqid() });
        setListData(state.list);
      }),
      update: reducer(
        (state, { payload }: PayloadAction<{ id: string; data: TProduct }>) => {
          const idx = state.list.findIndex(({ id }) => payload.id === id);
          state.list[idx] = { ...state.list[idx], ...payload.data };
          setListData(state.list);
        }
      ),
      deleteData: reducer((state, { payload }: PayloadAction<string>) => {
        state.list = state.list.filter(({ id }) => payload !== id);
        setListData(state.list);
      }),
    };
  },
});

// Action creators are generated for each case reducer function.
export const { create, update, deleteData } = productSlice.actions;
