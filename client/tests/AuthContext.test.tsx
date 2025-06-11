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

  it("should show 'Logged In' when token is in localStorage", () => {
    localStorage.setItem("token", "dummy-token");
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByText("Logged In")).toBeTruthy();
  });

  it("should logout the user", async () => {
    localStorage.setItem("token", "dummy-token");
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText("Logged In")).toBeTruthy();

    fireEvent.click(screen.getByText("Logout"));

    await waitFor(() => {
      expect(screen.getByText("Logged Out")).toBeTruthy();
    });
  });
});
