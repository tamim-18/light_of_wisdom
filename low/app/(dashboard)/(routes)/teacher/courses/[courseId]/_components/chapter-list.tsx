"use client";
import React, { useEffect, useState } from "react";
import { Chapter } from "@prisma/client";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
interface ChapterListProps {
  item: Chapter[];
  onReorder: (updateData: { id: string; order: number }[]) => void;
  onEdit: (id: string) => void;
}
const ChapterList = ({ item, onReorder, onEdit }: ChapterListProps) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const [chapters, setChapters] = useState(item);
  useEffect(() => {
    setIsMounted(true);
    //what is this doing? This is solving the hydration problem. What is it?  Hydration is the process of re-rendering the server-rendered HTML on the client side.
  }, []);

  useEffect(() => {
    setChapters(item);
    // Rehydrate the state
  }, [item]);

  if (!isMounted) return null;
  return <div>ChapterList</div>;
};

export default ChapterList;
