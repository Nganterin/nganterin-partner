"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

type AuthProps = {
  [key: string]: any;
};

const AUTH_COOKIE_NAME = "partner_jwt";
const LOGIN_ROUTE = "/auth/login";

const checkIfAuthenticated = (): boolean => {
  try {
    const token = Cookies.get(AUTH_COOKIE_NAME);
    return Boolean(token);
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

export function withAuth<T extends AuthProps>(
  Component: React.ComponentType<T>
): React.FC<T> {
  return function WithAuthComponent(props: T) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const authStatus = checkIfAuthenticated();
      setIsAuthenticated(authStatus);
      setIsLoading(false);

      if (!authStatus) {
        const currentPath = pathname;
        if (currentPath !== LOGIN_ROUTE) {
          router.push(LOGIN_ROUTE);
        }
      }
    }, [pathname, router]);

    if (isLoading) {
      return null;
    }

    return isAuthenticated ? <Component {...props} /> : null;
  };
}
