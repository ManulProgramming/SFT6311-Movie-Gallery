import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useFetch from "../useFetch";

describe("useFetch", () => {

  it("fetches data successfully", async () => {

    const mockData = { id: 1, title: "Movie" };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData)
      })
    );

    const { result } = renderHook(() => useFetch('http://127.0.0.1:8000/movies?i='));

    await act(async () => {
      await result.current.fetchData(1);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

});