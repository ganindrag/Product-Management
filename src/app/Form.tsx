"use client";

import { Form as AntdForm, App, Button, Input, InputNumber } from "antd";
import { useRouter } from "next/navigation";
import { TProduct } from "./types/product";

const { Item } = AntdForm;

type TFormProps = {
  actions: (payload: TProduct) => void;
  data?: TProduct;
};

export default function Form({ actions, data }: TFormProps) {
  const router = useRouter();
  const { message } = App.useApp();
  return (
    <AntdForm
      layout="vertical"
      onFinish={(values: TProduct) => {
        actions(values);
        message.success(`${data ? "Update" : "Simpan"} Berhasil`);
        router.push("/");
      }}
      initialValues={data}
    >
      <Item name="name" label="Nama Produk" rules={[{ required: true }]}>
        <Input placeholder="cth. Air Mineral" />
      </Item>
      <Item name="price" label="Harga Produk" rules={[{ required: true }]}>
        <InputNumber prefix="Rp." style={{ width: "100%" }} controls={false} />
      </Item>
      <Item name="stock" label="Stok Produk" rules={[{ required: true }]}>
        <InputNumber style={{ width: "100%" }} controls={false} />
      </Item>
      <div className="flex justify-center gap-3 mt-10 flex-col md:flex-row">
        <Button onClick={router.back}>Batal</Button>
        <Button type="primary" htmlType="submit">
          Simpan
        </Button>
      </div>
    </AntdForm>
  );
}
