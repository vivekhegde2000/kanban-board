import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  HiOutlinePencil,
  HiOutlineChatBubbleLeft,
  HiOutlinePaperClip,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import type { KanbanCardProps, KanbanItem } from "./types";

/**
 * Format date to display string
 */
const formatDate = (date: Date | string | undefined): string => {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * KanbanCard - Individual card component for Kanban board
 * Displays item details with tag, title, description, date, assignees, and progress
 */
function KanbanCard<T extends KanbanItem = KanbanItem>({
  item,
  onClick,
  onEdit,
  isDragging = false,
}: KanbanCardProps<T>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: item.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  const handleCardClick = (_e: React.MouseEvent) => {
    // Don't trigger click when dragging
    if (!isSortableDragging && onClick) {
      onClick(item);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(item);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`kanban-card ${
        isDragging || isSortableDragging ? "kanban-card--dragging" : ""
      }`}
      onClick={handleCardClick}
    >
      {/* Card Header with Tag and Actions */}
      <div className="kanban-card__header">
        {item.tag && (
          <span
            className="kanban-card__tag"
            style={{
              color: item.tag.color || "var(--color-kanban-tag-default)",
              backgroundColor:
                item.tag.bgColor || "var(--color-kanban-tag-default-bg)",
            }}
          >
            {item.tag.label}
          </span>
        )}
        <div className="kanban-card__actions">
          {item.refNo && <span className="kanban-card__ref">{item.refNo}</span>}
          <button
            className="kanban-card__edit-btn"
            onClick={handleEditClick}
            title="Edit"
          >
            <HiOutlinePencil />
          </button>
        </div>
      </div>

      {/* Card Title */}
      <h4 className="kanban-card__title">{item.title}</h4>

      {/* Card Description */}
      {item.description && (
        <p className="kanban-card__description">{item.description}</p>
      )}

      {/* Date */}
      {item.date && (
        <div className="kanban-card__date">{formatDate(item.date)}</div>
      )}

      {/* Footer with Assignees and Meta */}
      <div className="kanban-card__footer">
        {/* Assignees */}
        <div className="kanban-card__assignees">
          {item.assignees?.slice(0, 3).map((assignee, index) => (
            <div
              key={assignee.id}
              className="kanban-card__avatar"
              title={assignee.name}
              style={{
                zIndex: item.assignees!.length - index,
              }}
            >
              {assignee.avatar ? (
                <img src={assignee.avatar} alt={assignee.name} />
              ) : (
                <span className="kanban-card__avatar-fallback">
                  {assignee.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          ))}
          {item.assignees && item.assignees.length > 3 && (
            <div className="kanban-card__avatar kanban-card__avatar--more">
              +{item.assignees.length - 3}
            </div>
          )}
        </div>

        {/* Meta info - comments, attachments, progress */}
        <div className="kanban-card__meta">
          {item.comments !== undefined && item.comments > 0 && (
            <span className="kanban-card__meta-item">
              <HiOutlineChatBubbleLeft />
              {item.comments} Comment{item.comments > 1 ? "s" : ""}
            </span>
          )}
          {item.attachments !== undefined && item.attachments > 0 && (
            <span className="kanban-card__meta-item">
              <HiOutlinePaperClip />
              {item.attachments} file{item.attachments > 1 ? "s" : ""}
            </span>
          )}
          {item.progress && (
            <span className="kanban-card__progress">
              <HiOutlineCheckCircle />
              {item.progress.completed}/{item.progress.total}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default KanbanCard;
