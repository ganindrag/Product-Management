"use client";

import { TProduct } from "../types/product";

const key = "products";

export function getListData() {
  return JSON.parse(
    typeof window !== "undefined"
      ? window.localStorage.getItem(key) || "[]"
      : "[]"
  );
}

export function setListData(data: TProduct[]) {
  return window.localStorage.setItem(key, JSON.stringify(data));
}
