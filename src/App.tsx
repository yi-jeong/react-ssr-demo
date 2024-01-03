import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/home";
import PostPage from "./pages/post";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {
    const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/post" element={<PostPage />}></Route>
          </Routes>
        </div>
      </QueryClientProvider>
  );
}

export default App;
