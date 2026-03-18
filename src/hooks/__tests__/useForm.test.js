import { renderHook, act } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import useForm from "../useForm"

describe("useForm hook", () => {

  it("updates field value", () => {

    const { result } = renderHook(() =>
      useForm({
      title: "",
      date: "",
      genre: "",
      rating: "",
      poster: ""
    })
    )

    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "Batman" }
      })
    })

    expect(result.current.form.name).toBe("Batman")
  })

  it("resets form", () => {

    const { result } = renderHook(() =>
      useForm({ name: "" })
    )

    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "Spiderman" }
      })
    })

    act(() => {
      result.current.reset()
    })

    expect(result.current.form.name).toBe("")
  })

})