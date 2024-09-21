import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ClubSkeleton: React.FC = () => (
  <Card>
    <CardContent className="p-4">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <div className="flex space-x-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </CardContent>
  </Card>
);