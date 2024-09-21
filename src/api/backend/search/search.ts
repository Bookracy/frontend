import { useQuery } from "@tanstack/react-query";
import { BaseResponse, client } from "../base";
import { BookItem } from "../types";
import { SearchParams } from "./types";
import { getExternalDownloads } from "../downloads/external";

export const getBooks = (params: SearchParams) => {
  return client<BaseResponse<BookItem>>("/books", {
    query: params,
  });
};

export const useGetBooksQuery = (params: SearchParams) =>
  useQuery({
    queryKey: ["search", params],
    queryFn: () => getBooks(params),
    enabled: params.query !== "",
  });

export const useGetBooksQueryWithExternalDownloads = (params: SearchParams) => {
  return useQuery({
    queryKey: ["search", params],
    queryFn: async () => {
      const books = await getBooks(params);
      const externalDownloads = await getExternalDownloads(books.results.map((book) => book.md5));
      return {
        ...books,
        results: books.results.map((book) => ({
          ...book,
          externalDownloads: externalDownloads.find((b) => b.md5 === book.md5)?.external_downloads,
          ipfs: externalDownloads.find((b) => b.md5 === book.md5)?.ipfs,
        })),
      };
    },
    enabled: params.query !== "",
  });
};
