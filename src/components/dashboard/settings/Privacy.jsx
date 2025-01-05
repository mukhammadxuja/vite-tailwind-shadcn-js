import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Trash } from 'lucide-react';
import React from 'react';

import { useTranslation } from 'react-i18next';

function Privacy() {
  const { t } = useTranslation();

  return (
    <div className="space-y-2 md:space-y-3">
      <div className="flex items-start justify-between">
        <div className="mb-2 lg:mb-3">
          <h2 className="text-base font-medium">{t('profileVisibility')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('profileVisibilityDescription')}
          </p>
        </div>
        <Switch />
      </div>
      <div className="flex items-start justify-between">
        <div className="mb-2 lg:mb-3">
          <h2 className="text-base font-medium">{t('activityStatus')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('activityStatusDescription')}
          </p>
        </div>
        <Switch />
      </div>
      <div className="flex items-start justify-between">
        <div className="mb-2 lg:mb-3">
          <h2 className="text-base font-medium">{t('collectedData')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('collectedDataDescription')}
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="border-red-500 text-red-500 hover:text-red-600 hover:bg-transparent"
        >
          {t('clearAllData')}
        </Button>
      </div>
      <div className="flex items-start justify-between">
        <div className="mb-2 lg:mb-3">
          <h2 className="text-base font-medium">{t('deleteAccount')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('deleteAccountDescription')}
          </p>
        </div>
        <Button size="sm" variant="destructive">
          {t('deleteAccount')}
        </Button>
      </div>
    </div>
  );
}

export default Privacy;
