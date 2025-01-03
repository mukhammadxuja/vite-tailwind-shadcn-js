import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Box,
  ChartLine,
  ChartPie,
  KeyRound,
  Lock,
  PanelsTopLeft,
  Settings,
  Share2,
  UserRoundPen,
  UsersRound,
  WandSparkles,
} from 'lucide-react';
import General from './general';
import ProfileHeader from './ProfileHeader';
import Appearance from './Appearance';

function SettingsPage() {
  const [imageSrc, setImageSrc] = useState();
  const [imageSelected, setImageSelected] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);

  return (
    <div className="my-4">
      <ProfileHeader
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
        imageSelected={imageSelected}
        setImageSelected={setImageSelected}
        setIsFormChanged={setIsFormChanged}
      />
      <Tabs defaultValue="general" className="mt-4">
        <ScrollArea>
          <TabsList className="mb-3 h-auto gap-2 rounded-none border-b border-border bg-transparent px-0 py-1 text-foreground">
            <TabsTrigger
              value="general"
              className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
            >
              <UserRoundPen
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              General
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
            >
              <WandSparkles
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Appearance
              <Badge className="ms-1.5">New</Badge>
            </TabsTrigger>
            <TabsTrigger
              value="tab-4"
              className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
            >
              <Lock
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Privacy
            </TabsTrigger>
            <TabsTrigger
              value="tab-2"
              className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
            >
              <KeyRound
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Password
            </TabsTrigger>
            <TabsTrigger
              value="tab-5"
              className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
            >
              <ChartPie
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Insights
            </TabsTrigger>
            <TabsTrigger
              value="tab-6"
              className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
            >
              <Share2
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Share
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="general" className="max-w-2xl">
          <General
            photo={imageSrc}
            isFormChanged={isFormChanged}
            setIsFormChanged={setIsFormChanged}
            setImageSelected={setImageSelected}
          />
        </TabsContent>
        <TabsContent value="tab-2">
          <p className="pt-1 text-center text-xs text-muted-foreground">
            Content for Tab 2
          </p>
        </TabsContent>
        <TabsContent value="appearance" className="max-w-2xl">
          <Appearance />
        </TabsContent>
        <TabsContent value="tab-4">
          <p className="pt-1 text-center text-xs text-muted-foreground">
            Content for Tab 4
          </p>
        </TabsContent>
        <TabsContent value="tab-5">
          <p className="pt-1 text-center text-xs text-muted-foreground">
            Content for Tab 5
          </p>
        </TabsContent>
        <TabsContent value="tab-6">
          <p className="pt-1 text-center text-xs text-muted-foreground">
            Content for Tab 6
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SettingsPage;
