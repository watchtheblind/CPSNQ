import "./App.css";
import { Welcomescreen } from "./components/WelcomeScreen";
import { ThemeProvider } from "@/components/theme-provider";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main>
        <div className="flex min-h-svh flex-col items-center justify-center">
          <div className="w-full max-w-sm md:max-w-3xl">
            <Welcomescreen />
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
