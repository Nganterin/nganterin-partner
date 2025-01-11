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
  className,
}: Readonly<{
  children?: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}>) => {
  return (
    <Card
      className={`${className} ${
        !className?.includes("w-full") && "w-max"
      } flex-grow h-max bg-slate-50 rounded-lg p-2 shadow-lg shadow-sky-800/30`}
    >
      <CardHeader className={!title && !description ? "hidden" : ""}>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className={!title && !description ? "mt-5" : ""}>
        {children}
      </CardContent>
    </Card>
  );
};
