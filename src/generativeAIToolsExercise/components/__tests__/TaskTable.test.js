// components/__tests__/TaskTable.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskTable from "../TaskTable";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

describe("TaskTable Component", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  const mockTasks = [
    {
      id: "1",
      title: "Test Task 1",
      description: "Test Description 1",
      status: "pending",
      due_date: "2024-12-31"
    },
    {
      id: "2",
      title: "Test Task 2",
      description: "Test Description 2",
      status: "completed",
      due_date: "2024-11-30"
    }
  ];

  test("renders task table with no tasks", () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<TaskTable />);

    expect(screen.getByText("Task Management")).toBeInTheDocument();
    expect(
      screen.getByText("No tasks found. Create your first task!")
    ).toBeInTheDocument();
  });

  test("renders task table with tasks", () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockTasks));
    render(<TaskTable />);

    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Test Task 2")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  test("opens create task modal", () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<TaskTable />);

    const createButton = screen.getByText("Create Task");
    fireEvent.click(createButton);

    expect(screen.getByText("Create New Task")).toBeInTheDocument();
  });

  test("opens edit task modal", () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockTasks));
    render(<TaskTable />);

    const editButtons = screen.getAllByLabelText("edit");
    fireEvent.click(editButtons[0]);

    expect(screen.getByText("Edit Task")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Task 1")).toBeInTheDocument();
  });

  test("opens delete confirmation dialog", () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockTasks));
    render(<TaskTable />);

    const deleteButtons = screen.getAllByLabelText("delete");
    fireEvent.click(deleteButtons[0]);

    expect(screen.getByText("Confirm Delete")).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to delete the task/)
    ).toBeInTheDocument();
  });

  test("creates a new task with valid data", async () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<TaskTable />);

    // Open create modal
    fireEvent.click(screen.getByText("Create Task"));

    // Fill form
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New Task" }
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "New Description" }
    });
    fireEvent.change(screen.getByLabelText("Due Date"), {
      target: { value: "2024-12-31" }
    });

    // Submit form
    fireEvent.click(screen.getByText("Create"));

    await waitFor(() => {
      expect(screen.getByText("New Task")).toBeInTheDocument();
    });
  });

  test("shows validation errors for empty fields", async () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<TaskTable />);

    // Open create modal
    fireEvent.click(screen.getByText("Create Task"));

    // Submit without filling form
    fireEvent.click(screen.getByText("Create"));

    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument();
      expect(screen.getByText("Description is required")).toBeInTheDocument();
      expect(screen.getByText("Due date is required")).toBeInTheDocument();
    });
  });

  test("deletes a task", async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockTasks));
    render(<TaskTable />);

    // Open delete confirmation
    const deleteButtons = screen.getAllByLabelText("delete");
    fireEvent.click(deleteButtons[0]);

    // Confirm deletion
    fireEvent.click(screen.getByText("Delete"));

    await waitFor(() => {
      expect(screen.queryByText("Test Task 1")).not.toBeInTheDocument();
      expect(screen.getByText("Test Task 2")).toBeInTheDocument();
    });
  });

  test("validates due date not in past", async () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<TaskTable />);

    // Open create modal
    fireEvent.click(screen.getByText("Create Task"));

    // Fill form with past date
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New Task" }
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "New Description" }
    });
    fireEvent.change(screen.getByLabelText("Due Date"), {
      target: { value: "2020-01-01" }
    });

    // Submit form
    fireEvent.click(screen.getByText("Create"));

    await waitFor(() => {
      expect(
        screen.getByText("Due date cannot be in the past")
      ).toBeInTheDocument();
    });
  });
});

// Utility functions tests
describe("TaskTable Utility Functions", () => {
  test("formats date correctly", () => {
    const { getByText } = render(<TaskTable />);
    // This would test the formatDate function - you might want to extract it for better testability
  });
});
