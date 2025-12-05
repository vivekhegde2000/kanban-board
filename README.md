<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/dnd--kit-6.3-FF6B6B?style=for-the-badge" alt="dnd-kit" />
</p>

<h1 align="center">🗂️ React Kanban Board</h1>

<p align="center">
  <strong>A modern, fully-featured, and reusable Kanban Board component built with React 19, TypeScript, and dnd-kit.</strong>
</p>

<p align="center">
  Drag-and-drop task management with smooth animations, customizable cards, and full TypeScript support.
</p>

---

## ✨ Features

| Feature                      | Description                                                         |
| ---------------------------- | ------------------------------------------------------------------- |
| 🎯 **Drag & Drop**           | Smooth drag-and-drop powered by dnd-kit with keyboard accessibility |
| 📦 **Reusable Components**   | Modular KanbanBoard, KanbanColumn, and KanbanCard components        |
| 🎨 **Customizable Styling**  | CSS variables for easy theming and SCSS architecture                |
| 📝 **TypeScript First**      | Full type safety with exported interfaces for all components        |
| 🔄 **Item Reordering**       | Move items between columns or reorder within the same column        |
| 👥 **Assignee Avatars**      | Display team member avatars with overflow handling                  |
| 🏷️ **Tags & Labels**         | Colorful tags with customizable colors                              |
| 📊 **Progress Tracking**     | Visual progress indicators for subtasks                             |
| 💬 **Metadata Display**      | Show comments, attachments, and due dates                           |
| 🎭 **Custom Card Rendering** | Override default card rendering with your own components            |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/kanban-board.git

# Navigate to the project
cd kanban-board

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 📖 Usage

### Basic Implementation

```tsx
import KanbanBoard from "./KanbanBoard";
import type { KanbanColumnConfig, KanbanItem } from "./KanbanBoard";

const columns: KanbanColumnConfig[] = [
  {
    id: "todo",
    title: "To Do",
    items: [
      {
        id: "task-1",
        title: "Design homepage",
        description: "Create mockups for the landing page",
        tag: { label: "Design", color: "#e65100", bgColor: "#fff3e0" },
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    items: [],
  },
  {
    id: "done",
    title: "Done",
    items: [],
  },
];

function App() {
  const handleItemMove = (itemId, fromColumn, toColumn, newIndex) => {
    console.log(`Moved ${itemId} from ${fromColumn} to ${toColumn}`);
  };

  return (
    <KanbanBoard
      columns={columns}
      onItemMove={handleItemMove}
      onItemClick={(item) => console.log("Clicked:", item)}
      onAddItem={(columnId) => console.log("Add to:", columnId)}
    />
  );
}
```

---

## 🧩 Component API

### `<KanbanBoard />`

The main board component that orchestrates columns and drag-and-drop.

| Prop            | Type                                      | Default      | Description                               |
| --------------- | ----------------------------------------- | ------------ | ----------------------------------------- |
| `columns`       | `KanbanColumnConfig[]`                    | **required** | Array of column configurations            |
| `onItemMove`    | `(itemId, fromCol, toCol, index) => void` | -            | Callback when item moves between columns  |
| `onItemReorder` | `(colId, itemId, oldIdx, newIdx) => void` | -            | Callback when item reorders within column |
| `onItemClick`   | `(item) => void`                          | -            | Callback when card is clicked             |
| `onItemEdit`    | `(item) => void`                          | -            | Callback when edit button is clicked      |
| `onAddItem`     | `(columnId) => void`                      | -            | Callback when add button is clicked       |
| `onColumnMenu`  | `(columnId) => void`                      | -            | Callback when column menu is clicked      |
| `renderCard`    | `(item, defaultCard) => ReactNode`        | -            | Custom card renderer                      |
| `className`     | `string`                                  | `""`         | Additional CSS class                      |
| `draggable`     | `boolean`                                 | `true`       | Enable/disable drag and drop              |

---

## 📋 Type Definitions

### `KanbanItem`

```typescript
interface KanbanItem {
  id: string; // Unique identifier
  refNo?: string; // Reference number (e.g., "TASK-001")
  title: string; // Main title
  description?: string; // Card description
  tag?: KanbanTag; // Tag with label and colors
  date?: Date | string; // Due date
  assignees?: KanbanAssignee[]; // Assigned team members
  progress?: KanbanProgress; // Subtask progress
  comments?: number; // Comment count
  attachments?: number; // Attachment count
  metadata?: Record<string, unknown>; // Custom data
}
```

### `KanbanColumnConfig`

```typescript
interface KanbanColumnConfig<T extends KanbanItem = KanbanItem> {
  id: string; // Unique column identifier
  title: string; // Column header title
  items: T[]; // Items in this column
  allowAdd?: boolean; // Show add button (default: true)
  showMenu?: boolean; // Show menu button (default: true)
}
```

### `KanbanTag`

```typescript
interface KanbanTag {
  label: string; // Tag text
  color?: string; // Text color (CSS variable or value)
  bgColor?: string; // Background color
}
```

### `KanbanAssignee`

```typescript
interface KanbanAssignee {
  id: string;
  name: string;
  avatar?: string; // URL to avatar image
}
```

---

## 🎨 Theming

The component uses CSS variables for easy customization. Override these in your CSS:

```css
:root {
  /* Column Colors */
  --color-kanban-column-bg: #f5f5f5;
  --color-kanban-column-hover-bg: #ebebeb;

  /* Card Colors */
  --color-kanban-card-bg: #ffffff;
  --color-kanban-card-shadow: rgba(0, 0, 0, 0.08);
  --color-kanban-card-border: #e8e8e8;

  /* Text Colors */
  --color-kanban-header-text: #333333;
  --color-kanban-description-text: #888888;
  --color-kanban-progress-text: #999999;

  /* Tag Colors */
  --color-kanban-tag-research: #1b5e20;
  --color-kanban-tag-research-bg: #e8f5e9;
  --color-kanban-tag-planning: #0d47a1;
  --color-kanban-tag-planning-bg: #e3f2fd;
  --color-kanban-tag-design: #e65100;
  --color-kanban-tag-design-bg: #fff3e0;
  --color-kanban-tag-development: #4a148c;
  --color-kanban-tag-development-bg: #f3e5f5;
}
```

---

## 📁 Project Structure

```
kanban-board/
├── src/
│   ├── KanbanBoard/          # Main Kanban components
│   │   ├── index.tsx         # KanbanBoard main component
│   │   ├── KanbanColumn.tsx  # Column container component
│   │   ├── KanbanCard.tsx    # Individual card component
│   │   ├── KanbanBoard.scss  # Component styles
│   │   └── types.ts          # TypeScript interfaces
│   │
│   ├── KanbanDemo/           # Demo implementation
│   │   └── index.tsx         # Demo page with sample data
│   │
│   ├── _variables.scss       # CSS variables & design tokens
│   ├── index.scss            # Global styles
│   ├── main.tsx              # Application entry point
│   └── App.tsx               # Root component
│
├── public/                   # Static assets
├── index.html                # HTML template
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite configuration
```

---

## 🛠️ Scripts

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build for production                     |
| `npm run preview` | Preview production build                 |
| `npm run lint`    | Run ESLint for code quality              |

---

## 🔧 Tech Stack

| Technology         | Purpose                              |
| ------------------ | ------------------------------------ |
| **React 19**       | UI framework with latest features    |
| **TypeScript 5.9** | Type safety and developer experience |
| **Vite 7**         | Fast build tool and dev server       |
| **dnd-kit**        | Modern drag-and-drop toolkit         |
| **SCSS**           | CSS preprocessing with variables     |
| **react-icons**    | Heroicons 2 icon set                 |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ using React and TypeScript
</p>
