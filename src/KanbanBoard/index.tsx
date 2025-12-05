import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import KanbanColumn from "./KanbanColumn";
import KanbanCard from "./KanbanCard";
import type { KanbanBoardProps, KanbanItem, KanbanColumnConfig } from "./types";
import "./KanbanBoard.scss";

// Re-export types for convenience
export type {
  KanbanItem,
  KanbanColumnConfig,
  KanbanBoardProps,
  KanbanTag,
  KanbanAssignee,
  KanbanProgress,
  KanbanEventHandlers,
  KanbanCardProps,
  KanbanColumnProps,
} from "./types";

/**
 * KanbanBoard - Main reusable Kanban board component
 *
 * Features:
 * - Drag and drop items between columns
 * - Reorder items within columns
 * - Customizable card rendering
 * - Event handlers for item/column actions
 * - Support for tasks, activities, goals, or any similar items
 *
 * @example
 * ```tsx
 * <KanbanBoard
 *   columns={columns}
 *   onItemMove={(itemId, fromCol, toCol, index) => handleMove(itemId, fromCol, toCol, index)}
 *   onItemClick={(item) => console.log('Clicked:', item)}
 *   onAddItem={(columnId) => console.log('Add to:', columnId)}
 * />
 * ```
 */
function KanbanBoard<T extends KanbanItem = KanbanItem>({
  columns,
  onItemMove,
  onItemReorder,
  onItemClick,
  onItemEdit,
  onAddItem,
  onColumnMenu,
  onItemDelete: _onItemDelete,
  renderCard,
  className = "",
  style,
  draggable = true,
}: KanbanBoardProps<T>) {
  const [activeItem, setActiveItem] = useState<T | null>(null);

  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Find which column contains a specific item
  const findColumnByItemId = (
    itemId: string
  ): KanbanColumnConfig<T> | undefined => {
    return columns.find((col) => col.items.some((item) => item.id === itemId));
  };

  // Find item by ID across all columns
  const findItemById = (itemId: string): T | undefined => {
    for (const col of columns) {
      const item = col.items.find((i) => i.id === itemId);
      if (item) return item;
    }
    return undefined;
  };

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const item = findItemById(active.id as string);
    if (item) {
      setActiveItem(item);
    }
  };

  // Handle drag over (for visual feedback)
  const handleDragOver = (_event: DragOverEvent) => {
    // Could be used for visual feedback during drag
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find source column
    const sourceColumn = findColumnByItemId(activeId);
    if (!sourceColumn) return;

    // Determine target column
    let targetColumn = findColumnByItemId(overId);

    // If overId is a column ID (not an item), use that column
    if (!targetColumn) {
      targetColumn = columns.find((col) => col.id === overId);
    }

    if (!targetColumn) return;

    const sourceIndex = sourceColumn.items.findIndex(
      (item) => item.id === activeId
    );

    // Same column - reorder
    if (sourceColumn.id === targetColumn.id) {
      const targetIndex = targetColumn.items.findIndex(
        (item) => item.id === overId
      );

      if (sourceIndex !== targetIndex && targetIndex !== -1) {
        if (onItemReorder) {
          onItemReorder(sourceColumn.id, activeId, sourceIndex, targetIndex);
        }
      }
    } else {
      // Different column - move
      const targetIndex =
        overId === targetColumn.id
          ? targetColumn.items.length // Dropped on empty column
          : targetColumn.items.findIndex((item) => item.id === overId);

      if (onItemMove) {
        onItemMove(
          activeId,
          sourceColumn.id,
          targetColumn.id,
          targetIndex === -1 ? targetColumn.items.length : targetIndex
        );
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={`kanban-board ${className}`} style={style}>
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onItemClick={onItemClick}
            onItemEdit={onItemEdit}
            onAddItem={onAddItem}
            onColumnMenu={onColumnMenu}
            renderCard={renderCard}
            draggable={draggable}
          />
        ))}
      </div>

      {/* Drag Overlay - Shows the card being dragged */}
      <DragOverlay>
        {activeItem ? (
          <div className="kanban-card kanban-card--overlay">
            <KanbanCard item={activeItem} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default KanbanBoard;
