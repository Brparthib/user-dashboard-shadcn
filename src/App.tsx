import { toast } from "sonner";
import { ModeToggle } from "./components/modeToggler";
import { Button } from "./components/ui/button";
import { Link } from "react-router";

function App() {
  return (
    <>
      <div className="flex min-h-svh items-center justify-center gap-4">
        <Link to="/dashboard">
          <Button variant="outline" className="text-primary active:scale-95 cursor-pointer">
            Go To Dashboar
          </Button>
        </Link>
        <ModeToggle />
        <Button className="cursor-pointer" onClick={() => toast.success("My first toast")}>
          Give me a toast
        </Button>
      </div>
    </>
  );
}

export default App;
