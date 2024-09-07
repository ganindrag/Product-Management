"use client";

import Form from "@/app/Form";
import { useAppDispatch } from "@/app/redux/hooks";
import { create } from "@/app/redux/slices/product";

export default function Create() {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Tambah Produk</h1>
      <Form actions={(values) => dispatch(create(values))} />
    </div>
  );
}
