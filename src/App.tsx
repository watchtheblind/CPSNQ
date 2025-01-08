import "./App.css";
import { LoginForm } from "./components/login-form";
function App() {
  return (
    <main className="container">
      <div className="flex min-h-svh flex-col items-center justify-center bg-zinc-100 p-6 md:p-10 dark:bg-zinc-800">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}

export default App;
