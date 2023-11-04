import reactLogo from '@/assets/react.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import './App.css';

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-red-600">
        Tailwind css working!
      </h1>
      <div className='flex gap-2 mt-2'>
        <Button>Button</Button>
        <Input placeholder="Search" />
      </div>
    </>
  );
}

export default App;
