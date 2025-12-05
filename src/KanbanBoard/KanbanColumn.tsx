import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { HiOutlineEllipsisHorizontal, HiOutlinePlus } from "react-icons/hi2";
import KanbanCard from "./KanbanCard";
import type { KanbanColumnProps, KanbanItem } from "./types";

/**
 * KanbanColumn - Column container component with drop zone
 * Contains a list of KanbanCards and handles column-level actions
 */
function KanbanColumn<T extends KanbanItem = KanbanItem>({
  column,
  onItemClick,
  onItemEdit,
  onAddItem,
  onColumnMenu,
  renderCard,
  draggable = true,
}: KanbanColumnProps<T>) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const handleAddClick = () => {
    if (onAddItem) {
      onAddItem(column.id);
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onColumnMenu) {
      onColumnMenu(column.id);
    }
  };

  const itemIds = column.items.map((item) => item.id);

  return (
    <div className={`kanban-column ${isOver ? "kanban-column--over" : ""}`}>
      {/* Column Header */}
      <div className="kanban-column__header">
        <div className="kanban-column__title-wrapper">
          <h3 className="kanban-column__title">{column.title}</h3>
          <span className="kanban-column__count">{column.items.length}</span>
        </div>
        <div className="kanban-column__actions">
          {column.showMenu !== false && (
            <button
              className="kanban-column__menu-btn"
              onClick={handleMenuClick}
              title="Column options"
            >
              <HiOutlineEllipsisHorizontal />
            </button>
          )}
          {column.allowAdd !== false && (
            <button
              className="kanban-column__add-btn"
              onClick={handleAddClick}
              title="Add item"
            >
              <HiOutlinePlus />
            </button>
          )}
        </div>
      </div>

      {/* Column Content - Scrollable area with cards */}
      <div ref={setNodeRef} className="kanban-column__content">
        <SortableContext
          items={itemIds}
          strategy={verticalListSortingStrategy}
          disabled={!draggable}
        >
          {column.items.map((item) => {
            const defaultCard = (
              <KanbanCard
                key={item.id}
                item={item}
                onClick={onItemClick}
                onEdit={onItemEdit}
              />
            );

            if (renderCard) {
              return (
                <React.Fragment key={item.id}>
                  {renderCard(item, defaultCard)}
                </React.Fragment>
              );
            }

            return defaultCard;
          })}
        </SortableContext>

        {/* Empty state */}
        {column.items.length === 0 && (
          <div className="kanban-column__empty">
            <p>No items</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default KanbanColumn;
