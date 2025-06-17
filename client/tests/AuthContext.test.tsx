// src/__tests__/AuthContext.test.tsx
// import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { AuthProvider, AuthContext } from "../src/context/AuthContext.tsx";
import { useContext } from "react";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach } from "@jest/globals";
// import { act } from "react";

const TestComponent = () => {
  const context = useContext(AuthContext);
  if (!context) return <p>No context</p>;

  return (
    <>
      <p>{context.isAuthenticated ? "Logged In" : "Logged Out"}</p>
      <button onClick={context.logout}>Logout</button>
    </>
  );
};

const mockUser = {
  id: "123",
  email: "test@example.com",
  name: "Test User",
};

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should show 'Logged Out' when no token is in localStorage", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByText("Logged Out")).toBeTruthy();
  });

  it("should show 'Logged In' when token and user data are in localStorage", () => {
    localStorage.setItem("token", "dummy-token");
    localStorage.setItem("user", JSON.stringify(mockUser));
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByText("Logged In")).toBeTruthy();
  });

  it("should logout the user and clear both token and user data", async () => {
    localStorage.setItem("token", "dummy-token");
    localStorage.setItem("user", JSON.stringify(mockUser));
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText("Logged In")).toBeTruthy();

    fireEvent.click(screen.getByText("Logout"));

    await waitFor(() => {
      expect(screen.getByText("Logged Out")).toBeTruthy();
      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("user")).toBeNull();
    });
  });

  it("should not authenticate with only token but no user data", () => {
    localStorage.setItem("token", "dummy-token");
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByText("Logged Out")).toBeTruthy();
  });
});
