import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Home from "./pages/home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Home />
      </div>
    </QueryClientProvider>
  );
}

export default App;
