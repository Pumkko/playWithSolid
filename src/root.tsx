// @refresh reload
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
  useLocation,
} from "solid-start";
import "./root.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function Root() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - With TailwindCSS</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
              <nav class="bg-sky-800">
                <ul class="container flex items-center p-3 text-gray-200">
                  <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
                    <A href="/">Home</A>
                  </li>
                  <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
                    <A href="/about">About</A>
                  </li>
                  <li class={`border-b-2 ${active("/grid")} mx-1.5 sm:mx-6`}>
                    <A href="/grid">Grid</A>
                  </li>
                </ul>
              </nav>
              <Routes>
                <FileRoutes />
              </Routes>
            </QueryClientProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
