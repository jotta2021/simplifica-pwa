"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DatePicker } from "../../_components/datePicker";

const HeaderFilter: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [dateEnd, setDateEnd] = React.useState<Date | undefined>(undefined);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);

    if (date) {
      params.set("startDate", date.toISOString());
    } else {
      params.delete("startDate");
    }

    if (dateEnd) {
      params.set("endDate", dateEnd.toISOString());
    } else {
      params.delete("endDate");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 items-end max-md:flex-col max-md:items-start">
      <DatePicker date={date} setDate={setDate} label="Data Inicial" />
      <DatePicker date={dateEnd} setDate={setDateEnd} label="Data Final" />
      <button
        className="bg-primary text-white px-4 py-2 rounded"
        onClick={handleFilter}
      >
        Filtrar
      </button>
    </div>
  );
};

export default HeaderFilter;
