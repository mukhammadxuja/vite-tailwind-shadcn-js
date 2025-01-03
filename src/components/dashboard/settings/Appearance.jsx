import React, { useEffect, useState } from 'react';
import { useTheme } from '@/provider/ThemeProvider';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Check } from 'lucide-react';
import { useFont } from '@/context/FontContext';

function Appearance() {
  const { theme, setTheme } = useTheme();
  const { font, setFont } = useFont();
  const [selectedColor, setSelectedColor] = useState(() => {
    return localStorage.getItem('selectedColor') || 'black';
  });

  const handleFontChange = (value) => {
    setFont(value);
    localStorage.setItem('selectedFont', value);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    localStorage.setItem('selectedColor', color);

    let hslValue, foregroundValue;
    switch (color) {
      case 'red':
        hslValue = '0 72.2% 50.6%';
        foregroundValue = '0 0% 98%'; // Adjust for readability
        break;
      case 'blue':
        hslValue = '221.2 83.2% 53.3%';
        foregroundValue = '0 0% 98%'; // Adjust for readability
        break;
      case 'orange':
        hslValue = '24.6 95% 53.1%';
        foregroundValue = '0 0% 98%';
        break;
      case 'green':
        hslValue = '142.1 76.2% 36.3%';
        foregroundValue = '0 0% 98%';
        break;
      case 'yellow':
        hslValue = '47.9 95.8% 53.1%';
        foregroundValue = '0 0% 98%';
        break;
      default:
        hslValue = '240 5.9% 10%';
        foregroundValue = '0 0% 98%';
    }

    document.documentElement.style.setProperty('--primary', hslValue);
    document.documentElement.style.setProperty(
      '--primary-foreground',
      foregroundValue
    );

    const darkTheme = document.querySelector('.dark');
    if (darkTheme) {
      darkTheme.style.setProperty('--primary', foregroundValue);
      darkTheme.style.setProperty('--primary-foreground', hslValue);
    }
  };

  useEffect(() => {
    const savedColor = localStorage.getItem('selectedColor');

    if (savedColor) {
      handleColorChange(savedColor);
    }
  }, []);

  return (
    <div className="space-y-3 lg:space-y-5">
      <div>
        <div className="mb-2 lg:mb-3">
          <h2 className="text-lg font-semibold">Appearance</h2>
          <p className="text-sm text-muted-foreground">
            Customize the look and feel of your dashboard.
          </p>
        </div>
        <div className="grid grid-cols-3 items-center gap-2">
          <img
            onClick={() => setTheme('system')}
            className={`w-full h-auto rounded-xl cursor-pointer p-0.5 border-2 hover:border-primary duration-200 ${
              theme === 'system' ? 'border-primary' : ''
            }`}
            src="/assets/ui-system.png"
            alt="System theme image"
          />
          <img
            onClick={() => setTheme('light')}
            className={`w-full h-auto rounded-xl cursor-pointer p-0.5 border-2 hover:border-primary duration-200 ${
              theme === 'light' ? 'border-primary' : ''
            }`}
            src="/assets/ui-light.png"
            alt="Light theme image"
          />
          <img
            onClick={() => setTheme('dark')}
            className={`w-full h-auto rounded-xl cursor-pointer p-0.5 border-2 hover:border-primary duration-200 ${
              theme === 'dark' ? 'border-primary' : ''
            }`}
            src="/assets/ui-dark.png"
            alt="Dark theme image"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-2 lg:mb-3">
          <h2 className="text-lg font-semibold">Accent color</h2>
          <p className="text-sm text-muted-foreground">
            Choose a color that suits your style.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            onClick={() => handleColorChange('black')}
            className="relative w-5 h-5 rounded-full bg-black ring-2 ring-black dark:ring-white cursor-pointer"
          >
            {selectedColor === 'black' && (
              <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white" />
            )}
          </div>
          <div
            onClick={() => handleColorChange('red')}
            className="relative w-5 h-5 rounded-full bg-red-500 ring-2 ring-red-500 cursor-pointer"
          >
            {selectedColor === 'red' && (
              <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white" />
            )}
          </div>
          <div
            onClick={() => handleColorChange('orange')}
            className="relative w-5 h-5 rounded-full bg-orange-500 ring-2 ring-orange-500 cursor-pointer"
          >
            {selectedColor === 'orange' && (
              <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white" />
            )}
          </div>
          <div
            onClick={() => handleColorChange('blue')}
            className="relative w-5 h-5 rounded-full bg-blue-500 ring-2 ring-blue-500 cursor-pointer"
          >
            {selectedColor === 'blue' && (
              <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white" />
            )}
          </div>
          <div
            onClick={() => handleColorChange('green')}
            className="relative w-5 h-5 rounded-full bg-green-500 ring-2 ring-green-500 cursor-pointer"
          >
            {selectedColor === 'green' && (
              <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white" />
            )}
          </div>
          <div
            onClick={() => handleColorChange('yellow')}
            className="relative w-5 h-5 rounded-full bg-yellow-500 ring-2 ring-yellow-500 cursor-pointer"
          >
            {selectedColor === 'yellow' && (
              <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white" />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-2 lg:mb-3">
          <h2 className="text-lg font-semibold">Font style</h2>
          <p className="text-sm text-muted-foreground">
            Choose a font style that suits your preference.
          </p>
        </div>
        <Select onValueChange={handleFontChange} value={font}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Font style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inter">Inter</SelectItem>
            <SelectItem value="manrope">Manrope</SelectItem>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
            <SelectItem value="'Open Sans', sans-serif">Open Sans</SelectItem>
            <SelectItem value="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif">
              Apple System
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-2 lg:mb-3">
          <h2 className="text-lg font-semibold">Languages</h2>
          <p className="text-sm text-muted-foreground">
            Choose a language that suits your preference.
          </p>
        </div>
        <Select onValueChange="" value="">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Languages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="de">German</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default Appearance;
