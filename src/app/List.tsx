"use client";
import {
  App,
  Button,
  Divider,
  GetProp,
  Input,
  Popconfirm,
  Table,
  TableProps,
} from "antd";
import { useRouter } from "next/navigation";
import { deleteData } from "@/app/redux/slices/product";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import Link from "next/link";
import useDebounce from "./hooks/useDebounce";
import { useState } from "react";

export default function List() {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((s) => s.product);
  const router = useRouter();
  const { message } = App.useApp();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const columns: GetProp<TableProps, "columns"> = [
    {
      title: "#",
      render(_, __, idx) {
        return idx + 1;
      },
      align: "center",
    },
    {
      title: "Nama",
      dataIndex: "name",
    },
    {
      title: "Harga",
      dataIndex: "price",
      align: "right",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Stok",
      dataIndex: "stock",
      align: "right",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Aksi",
      render(_, record) {
        return (
          <>
            <Link href={`/update/${record.id}`}>Ubah</Link>
            <Divider type="vertical" />
            <Popconfirm
              title="Hapus Product"
              description="Anda yakin mau hapus produk ini?"
              onConfirm={() => {
                dispatch(deleteData(record.id));
                message.success(`Produk ${record.name} berhasil dihapus!`);
              }}
              okText="Ya"
              cancelText="Tidak"
            >
              <Link href="#">Hapus</Link>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Daftar Produk</h1>
      <div className="flex justify-between flex-col-reverse md:flex-row gap-3">
        <div>
          <Input
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            placeholder="Pencarian.."
          />
        </div>
        <Button type="primary" onClick={() => router.push("/create")}>
          Tambah
        </Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={
          debouncedSearch.length === 0
            ? list
            : list.filter((data) =>
                data.name.toLowerCase().includes(debouncedSearch)
              )
        }
        bordered
        scroll={{ x: "max-content" }}
      />
    </div>
  );
}
