"use client";

import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
const HeaderFilter: React.FC = () => {

  return (
    <div className="flex gap-2 items-end max-md:flex-col max-md:items-start">
   
       
   <ToggleGroup type="single">
  <ToggleGroupItem value="a">Hoje</ToggleGroupItem>
  <ToggleGroupItem value="b">Ontem</ToggleGroupItem>
  <ToggleGroupItem value="c">7 dias</ToggleGroupItem>
  <ToggleGroupItem value="c">30 dias</ToggleGroupItem>
  <ToggleGroupItem value="c">90 dias</ToggleGroupItem>
</ToggleGroup>
    </div>
  );
};

export default HeaderFilter;
