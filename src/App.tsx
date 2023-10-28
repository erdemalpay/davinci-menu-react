import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Header />
        <Home />
      </div>
    </QueryClientProvider>
  );
}

export default App;
