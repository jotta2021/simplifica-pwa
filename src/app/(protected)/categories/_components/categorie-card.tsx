"use client";

import React, { useState } from "react";
import { ICONES_CATEGORIAS } from "../_constants/icones";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UpsertCategorieForm from "./upsert-categorie";
import { Category } from "@/app/@types/category";

// import { Container } from './styles';

interface CategoryCardProps {
  category: Category;
}
const CategoryCard = ({ category }: CategoryCardProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      key={category.id}
      className="flex flex-row gap-2 items-center border-b pb-2 justify-between"
    >
      <div className="flex flex-row gap-2 items-center">
        <Avatar
          className="bg-gray-300 w-10 h-10 items-center justify-center"
          style={{ backgroundColor: category.color }}
        >
          {ICONES_CATEGORIAS[category.icon as keyof typeof ICONES_CATEGORIAS]
            ? React.createElement(
                ICONES_CATEGORIAS[
                  category.icon as keyof typeof ICONES_CATEGORIAS
                ],
                { className: "w-5 h-5 text-white" }
              )
            : null}
        </Avatar>
        <h1 className="font-medium text-gray-700 text-sm">{category.name}</h1>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-400 text-white hover:bg-blue-500">
            Editar
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto max-md:w-[90%]">
          <UpsertCategorieForm category={category} onSuccess={() => {
            setOpen(false);
          }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryCard;
