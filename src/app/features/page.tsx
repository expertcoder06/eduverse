
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <Card className="text-center transition-transform transform hover:scale-105 hover:shadow-lg">
    <CardHeader className="items-center">
      <div className="rounded-full bg-primary/10 p-4 text-primary">
        {icon}
      </div>
      <CardTitle className="pt-4">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
