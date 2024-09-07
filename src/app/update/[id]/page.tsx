"use client";

import Form from "@/app/Form";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { update } from "@/app/redux/slices/product";

export default function Update({ params: { id } }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const data = useAppSelector(
    ({ product }) => product.list.filter((data) => data.id === id)[0]
  );
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Ubah Produk</h1>
      <Form
        actions={(values) => dispatch(update({ id, data: values }))}
        data={data}
      />
    </div>
  );
}
