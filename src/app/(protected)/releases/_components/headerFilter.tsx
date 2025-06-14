"use client";

import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface Props{
  filter?: string | undefined
}
const HeaderFilter = ({filter}:Props) => {
const router = useRouter()
const searchParams = useSearchParams()

const handleChange = (value:string)=> {
  const params  = new URLSearchParams(searchParams.toString())
  if(value){
    params.set('filter', value);
  }else{
    params.delete('filter')
  }
  router.replace(`?${params.toString()}`)
}
  return (
    <div className="flex justify-end items-end">
      <ToggleGroup type="single" value={filter}  onValueChange={handleChange} className="max-md:hidden">
        <ToggleGroupItem value="now">Hoje</ToggleGroupItem>
        <ToggleGroupItem value="yesterday">Ontem</ToggleGroupItem>
        <ToggleGroupItem value="7days">7 dias</ToggleGroupItem>
        <ToggleGroupItem value="30days">30 dias</ToggleGroupItem>
        <ToggleGroupItem value="90days">90 dias</ToggleGroupItem>
      </ToggleGroup>
      <Select value={filter} onValueChange={handleChange}   >
        <SelectTrigger className="hidden max-md:flex">
          <SelectValue placeholder="Filtrar por período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="now">Hoje</SelectItem>
          <SelectItem value="yesterday">Ontem</SelectItem>
          <SelectItem value="7days">7 dias</SelectItem>
          <SelectItem value="30days">30 dias</SelectItem>
          <SelectItem value="90days">90 dias</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default HeaderFilter;
