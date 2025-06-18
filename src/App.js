import ListToDo from "./Components/ListToDo";
import ReduceList from "./Context/ReduceContext";
import { SnackProvider } from "./Context/SnackContext";

export default function App() {
  return (
    <>
      <SnackProvider >
        <ReduceList>
          <ListToDo/>
        </ReduceList>
      </SnackProvider>
    </>
  );
}
