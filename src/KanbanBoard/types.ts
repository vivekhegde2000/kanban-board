import React from "react";

/**
 * Assignee information for Kanban items
 */
export interface KanbanAssignee {
  id: string;
  name: string;
  avatar?: string;
}

/**
 * Tag/label configuration for Kanban items
 */
export interface KanbanTag {
  label: string;
  /** CSS variable name for tag text color (e.g., "var(--color-kanban-tag-research)") */
  color?: string;
  /** CSS variable name for tag background color */
  bgColor?: string;
}

/**
 * Progress tracking for Kanban items
 */
export interface KanbanProgress {
  completed: number;
  total: number;
}

/**
 * Base item that can be displayed in Kanban board.
 * Generic interface supporting tasks, activities, goals, or any similar items.
 */
export interface KanbanItem {
  /** Unique identifier */
  id: string;
  /** Reference number displayed on card (e.g., "TASK-001", "ACT-123") */
  refNo?: string;
  /** Main title */
  title: string;
  /** Subtitle or description */
  description?: string;
  /** Tag/label with colors */
  tag?: KanbanTag;
  /** Due date or created date */
  date?: Date | string;
  /** Assigned users */
  assignees?: KanbanAssignee[];
  /** Progress indicator (e.g., subtasks completed) */
  progress?: KanbanProgress;
  /** Number of comments */
  comments?: number;
  /** Number of attachments */
  attachments?: number;
  /** Extensible metadata field for custom data */
  metadata?: Record<string, unknown>;
}

/**
 * Column configuration for Kanban board
 */
export interface KanbanColumnConfig<T extends KanbanItem = KanbanItem> {
  /** Unique column identifier */
  id: string;
  /** Column header title */
  title: string;
  /** Items in this column */
  items: T[];
  /** Show add button in column header */
  allowAdd?: boolean;
  /** Show column menu button */
  showMenu?: boolean;
}

/**
 * Event handlers for Kanban board interactions
 */
export interface KanbanEventHandlers<T extends KanbanItem = KanbanItem> {
  /** Called when an item is moved between columns */
  onItemMove?: (
    itemId: string,
    fromColumnId: string,
    toColumnId: string,
    newIndex: number
  ) => void;
  /** Called when an item is reordered within the same column */
  onItemReorder?: (
    columnId: string,
    itemId: string,
    oldIndex: number,
    newIndex: number
  ) => void;
  /** Called when an item card is clicked */
  onItemClick?: (item: T) => void;
  /** Called when edit button on item is clicked */
  onItemEdit?: (item: T) => void;
  /** Called when add button in column header is clicked */
  onAddItem?: (columnId: string) => void;
  /** Called when column menu button is clicked */
  onColumnMenu?: (columnId: string) => void;
  /** Called when delete action is triggered on an item */
  onItemDelete?: (item: T) => void;
}

/**
 * Main props for KanbanBoard component
 */
export interface KanbanBoardProps<T extends KanbanItem = KanbanItem>
  extends KanbanEventHandlers<T> {
  /** Array of column configurations */
  columns: KanbanColumnConfig<T>[];
  /** Custom card renderer for complete customization */
  renderCard?: (item: T, defaultCard: React.ReactNode) => React.ReactNode;
  /** Additional CSS class for the board container */
  className?: string;
  /** Inline styles for the board container */
  style?: React.CSSProperties;
  /** Whether drag and drop is enabled */
  draggable?: boolean;
}

/**
 * Props for KanbanColumn component
 */
export interface KanbanColumnProps<T extends KanbanItem = KanbanItem> {
  column: KanbanColumnConfig<T>;
  onItemClick?: (item: T) => void;
  onItemEdit?: (item: T) => void;
  onAddItem?: (columnId: string) => void;
  onColumnMenu?: (columnId: string) => void;
  renderCard?: (item: T, defaultCard: React.ReactNode) => React.ReactNode;
  draggable?: boolean;
}

/**
 * Props for KanbanCard component
 */
export interface KanbanCardProps<T extends KanbanItem = KanbanItem> {
  item: T;
  onClick?: (item: T) => void;
  onEdit?: (item: T) => void;
  isDragging?: boolean;
}
