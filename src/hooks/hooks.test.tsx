import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { useAppDispatch, useAppSelector } from "./hooks";
 
const mockStore = configureStore([]);

describe("Redux hooks", () => {
  const initialState = {
    movieList: {
      searchQuery: "Avengers",
      movies: [],
      filter: {
        category: "popular",
        page: 1,
      },
    },
  };

  const store = mockStore(initialState);

  const wrapper = ({ children }: any) => (
    <Provider store={store}>{children}</Provider>
  );

  it("should return dispatch from useAppDispatch", () => {
    const { result } = renderHook(() => useAppDispatch(), { wrapper });
    expect(typeof result.current).toBe("function");
  });

  it("should return selected state from useAppSelector", () => {
    const { result } = renderHook(
      () => useAppSelector((state) => state.movieList.searchQuery),
      { wrapper }
    );
    expect(result.current).toBe("Avengers");
  });
});
