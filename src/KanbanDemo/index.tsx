import React, { useState } from "react";
import type { KanbanColumnConfig, KanbanItem } from "../KanbanBoard";
import KanbanBoard from "../KanbanBoard";

// Mock avatar URLs - using placeholder images
const avatars = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
];

// Mock data for the Kanban board demo
const initialColumns: KanbanColumnConfig<KanbanItem>[] = [
  {
    id: "new",
    title: "New Task",
    allowAdd: true,
    showMenu: true,
    items: [
      {
        id: "task-001",
        refNo: "TASK-001",
        title: "Auditing information architecture",
        description: "Create content for peceland",
        tag: {
          label: "Research",
          color: "var(--color-kanban-tag-research)",
          bgColor: "var(--color-kanban-tag-research-bg)",
        },
        date: new Date("2021-08-20"),
        assignees: [
          { id: "user-1", name: "John Doe" },
          { id: "user-2", name: "Jane Smith" },
        ],
        progress: { completed: 0, total: 8 },
      },
      {
        id: "task-002",
        refNo: "TASK-002",
        title: "Auditing information architecture",
        description: "Create content for peceland",
        tag: {
          label: "Research",
          color: "var(--color-kanban-tag-research)",
          bgColor: "var(--color-kanban-tag-research-bg)",
        },
        date: new Date("2021-08-20"),
        assignees: [
          { id: "user-1", name: "John Doe", avatar: avatars[0] },
          { id: "user-2", name: "Jane Smith", avatar: avatars[1] },
        ],
        progress: { completed: 0, total: 8 },
      },
    ],
  },
  {
    id: "active",
    title: "Active Task",
    allowAdd: true,
    showMenu: true,
    items: [
      {
        id: "task-003",
        refNo: "TASK-003",
        title: "Auditing information architecture",
        description: "Create content for peceland",
        tag: {
          label: "Research",
          color: "var(--color-kanban-tag-research)",
          bgColor: "var(--color-kanban-tag-research-bg)",
        },
        date: new Date("2021-08-20"),
        assignees: [
          { id: "user-1", name: "John Doe", avatar: avatars[0] },
          { id: "user-2", name: "Jane Smith", avatar: avatars[1] },
        ],
        progress: { completed: 0, total: 8 },
      },
      {
        id: "task-004",
        refNo: "TASK-004",
        title: "Auditing information architecture",
        description: "Create content for peceland",
        tag: {
          label: "Research",
          color: "var(--color-kanban-tag-research)",
          bgColor: "var(--color-kanban-tag-research-bg)",
        },
        date: new Date("2021-08-20"),
        assignees: [
          { id: "user-1", name: "John Doe", avatar: avatars[0] },
          { id: "user-2", name: "Jane Smith", avatar: avatars[1] },
        ],
        progress: { completed: 0, total: 8 },
      },
    ],
  },
  {
    id: "in-progress",
    title: "In-Progress",
    allowAdd: true,
    showMenu: true,
    items: [
      {
        id: "task-005",
        refNo: "TASK-005",
        title: "Listing deliverables checklist",
        description: "Create content for peceland App",
        tag: {
          label: "Planning",
          color: "var(--color-kanban-tag-planning)",
          bgColor: "var(--color-kanban-tag-planning-bg)",
        },
        date: new Date("2021-09-20"),
        assignees: [
          { id: "user-3", name: "Bob Wilson", avatar: avatars[2] },
          { id: "user-4", name: "Alice Brown", avatar: avatars[3] },
        ],
        comments: 4,
        attachments: 11,
      },
      {
        id: "task-006",
        refNo: "TASK-006",
        title: "Auditing information architecture",
        description: "Create content for peceland",
        tag: {
          label: "Research",
          color: "var(--color-kanban-tag-research)",
          bgColor: "var(--color-kanban-tag-research-bg)",
        },
        date: new Date("2021-08-20"),
        assignees: [
          { id: "user-1", name: "John Doe", avatar: avatars[0] },
          { id: "user-2", name: "Jane Smith", avatar: avatars[1] },
        ],
        progress: { completed: 0, total: 8 },
      },
      {
        id: "task-007",
        refNo: "TASK-007",
        title: "Auditing information architecture",
        description: "Create content for peceland",
        tag: {
          label: "Research",
          color: "var(--color-kanban-tag-research)",
          bgColor: "var(--color-kanban-tag-research-bg)",
        },
        date: new Date("2021-08-20"),
        assignees: [
          { id: "user-1", name: "John Doe", avatar: avatars[0] },
          { id: "user-2", name: "Jane Smith", avatar: avatars[1] },
        ],
        progress: { completed: 0, total: 8 },
      },
    ],
  },
  {
    id: "resolved",
    title: "Resolved",
    allowAdd: true,
    showMenu: true,
    items: [
      {
        id: "task-008",
        refNo: "TASK-008",
        title: "Auditing information architecture",
        description: "Create content for peceland",
        tag: {
          label: "Research",
          color: "var(--color-kanban-tag-research)",
          bgColor: "var(--color-kanban-tag-research-bg)",
        },
        date: new Date("2021-08-20"),
        assignees: [
          { id: "user-1", name: "John Doe", avatar: avatars[0] },
          { id: "user-2", name: "Jane Smith", avatar: avatars[1] },
        ],
        progress: { completed: 0, total: 8 },
      },
    ],
  },
  {
    id: "closed",
    title: "Closed",
    allowAdd: true,
    showMenu: true,
    items: [
      {
        id: "task-009",
        refNo: "TASK-009",
        title: "Auditing information architecture",
        description: "Create content for peceland",
        tag: {
          label: "Research",
          color: "var(--color-kanban-tag-research)",
          bgColor: "var(--color-kanban-tag-research-bg)",
        },
        date: new Date("2021-08-20"),
        assignees: [
          { id: "user-1", name: "John Doe", avatar: avatars[0] },
          { id: "user-2", name: "Jane Smith", avatar: avatars[1] },
        ],
        progress: { completed: 0, total: 8 },
      },
    ],
  },
];

/**
 * KanbanDemo - Demo page showcasing the reusable Kanban component
 */
const KanbanDemo: React.FC = () => {
  const [columns, setColumns] =
    useState<KanbanColumnConfig<KanbanItem>[]>(initialColumns);

  // Handle item move between columns
  const handleItemMove = (
    itemId: string,
    fromColumnId: string,
    toColumnId: string,
    newIndex: number
  ) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];

      // Find source column and item
      const sourceColIndex = newColumns.findIndex(
        (col) => col.id === fromColumnId
      );
      const targetColIndex = newColumns.findIndex(
        (col) => col.id === toColumnId
      );

      if (sourceColIndex === -1 || targetColIndex === -1) return prevColumns;

      const sourceItems = [...newColumns[sourceColIndex].items];
      const itemIndex = sourceItems.findIndex((item) => item.id === itemId);

      if (itemIndex === -1) return prevColumns;

      // Remove from source
      const [movedItem] = sourceItems.splice(itemIndex, 1);
      newColumns[sourceColIndex] = {
        ...newColumns[sourceColIndex],
        items: sourceItems,
      };

      // Add to target
      const targetItems = [...newColumns[targetColIndex].items];
      targetItems.splice(newIndex, 0, movedItem);
      newColumns[targetColIndex] = {
        ...newColumns[targetColIndex],
        items: targetItems,
      };

      console.log(`Moved ${itemId} from ${fromColumnId} to ${toColumnId}`);
      return newColumns;
    });
  };

  // Handle item reorder within same column
  const handleItemReorder = (
    columnId: string,
    itemId: string,
    oldIndex: number,
    newIndex: number
  ) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      const colIndex = newColumns.findIndex((col) => col.id === columnId);

      if (colIndex === -1) return prevColumns;

      const items = [...newColumns[colIndex].items];
      const [movedItem] = items.splice(oldIndex, 1);
      items.splice(newIndex, 0, movedItem);

      newColumns[colIndex] = {
        ...newColumns[colIndex],
        items,
      };

      console.log(
        `Reordered ${itemId} in ${columnId}: ${oldIndex} -> ${newIndex}`
      );
      return newColumns;
    });
  };

  // Handle item click
  const handleItemClick = (item: KanbanItem) => {
    console.log("Item clicked:", item);
    alert(`Clicked: ${item.title}\nID: ${item.id}\nRef: ${item.refNo}`);
  };

  // Handle item edit
  const handleItemEdit = (item: KanbanItem) => {
    console.log("Edit item:", item);
    alert(`Edit: ${item.title}\nID: ${item.id}`);
  };

  // Handle add item
  const handleAddItem = (columnId: string) => {
    const newId = `task-${Date.now()}`;
    const newItem: KanbanItem = {
      id: newId,
      refNo: `TASK-${Math.floor(Math.random() * 1000)}`,
      title: "New Task",
      description: "Click to edit this task",
      tag: {
        label: "Planning",
        color: "var(--color-kanban-tag-planning)",
        bgColor: "var(--color-kanban-tag-planning-bg)",
      },
      date: new Date(),
      assignees: [],
      progress: { completed: 0, total: 5 },
    };

    setColumns((prevColumns) => {
      return prevColumns.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            items: [...col.items, newItem],
          };
        }
        return col;
      });
    });

    console.log(`Added new item to column: ${columnId}`);
  };

  // Handle column menu
  const handleColumnMenu = (columnId: string) => {
    console.log("Column menu clicked:", columnId);
    alert(
      `Column menu: ${columnId}\n\nOptions:\n- Add item\n- Clear column\n- Delete column`
    );
  };

  return (
    <div className="kanban-demo-page">
      <div className="kanban-demo-header">
        <h1>Kanban Board Demo</h1>
        <p>Drag and drop tasks between columns to change their status.</p>
      </div>

      <KanbanBoard
        columns={columns}
        onItemMove={handleItemMove}
        onItemReorder={handleItemReorder}
        onItemClick={handleItemClick}
        onItemEdit={handleItemEdit}
        onAddItem={handleAddItem}
        onColumnMenu={handleColumnMenu}
      />

      <style>{`
        .kanban-demo-page {
          padding: 24px;
          background-color: var(--color-body-bg);
          min-height: 100vh;
        }
        .kanban-demo-header {
          margin-bottom: 24px;
        }
        .kanban-demo-header h1 {
          font-size: var(--font-size-24);
          font-weight: var(--font-weight-700);
          color: var(--color-primary);
          margin: 0 0 8px 0;
        }
        .kanban-demo-header p {
          font-size: var(--font-size-14);
          color: var(--color-text-grey);
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default KanbanDemo;
