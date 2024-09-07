"use client";

import { useQuery } from "@tanstack/react-query";
import { GetProp, Table, TableProps } from "antd";
import { useState } from "react";

const limit = 20;

export default function Pokemon() {
  const [currentPage, setCurrPage] = useState(1);
  const { data, isSuccess } = useQuery({
    queryKey: ["list", "pokemon", currentPage],
    queryFn: async () => {
      const offset = (currentPage - 1) * limit;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      return await response.json();
    },
  });

  const columns: GetProp<TableProps, "columns"> = [
    {
      title: "#",
      render(_, __, idx) {
        return (currentPage - 1) * limit + (idx + 1);
      },
      align: "center",
    },
    {
      title: "Nama Pokemon",
      dataIndex: "name",
    },
  ];

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">List Pokemon</h1>
      <Table
        columns={columns}
        dataSource={data?.results}
        scroll={{ x: "max-content" }}
        pagination={{
          total: data?.count,
          pageSize: 20,
          onChange(page) {
            setCurrPage(page);
          },
          showSizeChanger: false,
        }}
        size="small"
      />
    </div>
  );
}
