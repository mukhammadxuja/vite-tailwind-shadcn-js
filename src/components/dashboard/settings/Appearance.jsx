import React, { useEffect, useState } from 'react';
import { useTheme } from '@/provider/ThemeProvider';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Check, Minus } from 'lucide-react';
import { useFont } from '@/context/FontContext';
import { useTranslation } from 'react-i18next';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

function Appearance() {
  const { setTheme } = useTheme();
  const { font, setFont } = useFont();
  const { t, i18n } = useTranslation();
  const [selectedColor, setSelectedColor] = useState(() => {
    return localStorage.getItem('selectedColor') || 'black';
  });

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

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
        foregroundValue = '0 0% 98%';
        break;
      case 'blue':
        hslValue = '221.2 83.2% 53.3%';
        foregroundValue = '0 0% 98%';
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

  const items = [
    {
      id: 'radio-18-r1',
      value: 'light',
      label: `${t('light')}`,
      image: '/assets/ui-light.png',
    },
    {
      id: 'radio-18-r2',
      value: 'dark',
      label: `${t('dark')}`,
      image: '/assets/ui-dark.png',
    },
    {
      id: 'radio-18-r3',
      value: 'system',
      label: `${t('system')}`,
      image: '/assets/ui-system.png',
    },
  ];

  return (
    <div className="space-y-3 lg:space-y-5">
      <div>
        <div className="mb-2 lg:mb-3">
          <h2 className="text-base font-medium">{t('appearanceTitle')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('appearanceDescription')}
          </p>
        </div>
        <fieldset className="space-y-4">
          <RadioGroup
            className="grid grid-cols-1 md:grid-cols-3 items-center gap-2 md:gap-3"
            defaultValue="light"
          >
            {items.map((item) => (
              <label key={item.id}>
                <RadioGroupItem
                  id={item.id}
                  value={item.value}
                  onClick={() => setTheme(item.value)}
                  className="peer sr-only after:absolute after:inset-0"
                />
                <img
                  src={item.image}
                  alt={item.label}
                  className="relative w-full h-auto cursor-pointer overflow-hidden rounded-lg border border-input shadow-sm shadow-black/5 outline-offset-2 transition-colors peer-[:focus-visible]:outline peer-[:focus-visible]:outline-2 peer-[:focus-visible]:outline-ring/70 peer-data-[disabled]:cursor-not-allowed peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-accent peer-data-[disabled]:opacity-50"
                />
                <span className="group mt-2 flex items-center gap-1 peer-data-[state=unchecked]:text-muted-foreground/70">
                  <Check
                    size={16}
                    strokeWidth={2}
                    className="peer-data-[state=unchecked]:group-[]:hidden"
                    aria-hidden="true"
                  />
                  <Minus
                    size={16}
                    strokeWidth={2}
                    className="peer-data-[state=checked]:group-[]:hidden"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-medium">{item.label}</span>
                </span>
              </label>
            ))}
          </RadioGroup>
        </fieldset>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-2 lg:mb-3">
          <h2 className="text-base font-medium">{t('accentColor')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('accentColorDescription')}
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
          <h2 className="text-base font-medium">{t('fontStyle')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('fontStyleDescription')}
          </p>
        </div>
        <Select onValueChange={handleFontChange} value={font}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder={t('fontStyle')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="'Segoe UI', 'San Francisco', 'Roboto', 'Arial', sans-serif">
              Segoe UI
            </SelectItem>
            <SelectItem value="inter">Inter</SelectItem>
            <SelectItem value="manrope">Manrope</SelectItem>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
            <SelectItem value="'Open Sans', sans-serif">Open Sans</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-2 lg:mb-3">
          <h2 className="text-base font-medium">{t('languagesTitle')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('languagesDescription')}
          </p>
        </div>
        <Select onValueChange={changeLanguage} value={i18n.language}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder={t('languagesTitle')} />
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
