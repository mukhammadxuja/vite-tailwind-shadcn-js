import reactLogo from '@/assets/react.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import './App.css';

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-red-600">
        Hello world!
      </h1>
      <img src={reactLogo} alt="" />
      <Button>Button</Button>
      <Input placeholder="Search" />
    </>
  );
}

export default App;
