import { NextUIProvider } from "@nextui-org/system";

export const Provider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    )
  }