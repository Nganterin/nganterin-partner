import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const BaseContainer = ({
  children,
  title,
  description,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  description?: string;
}>) => {
  return (
    <Card className="w-full h-full bg-slate-50 rounded-lg p-2 shadow-lg shadow-sky-800/30">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
