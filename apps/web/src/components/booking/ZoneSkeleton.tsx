import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ZoneSkeleton: React.FC = () => (
  <Card className="animate-pulse">
    <CardContent className="p-4">
      <div className="flex justify-between items-center mb-2">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-6 w-1/4" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full col-span-2" />
      </div>
    </CardContent>
  </Card>
);