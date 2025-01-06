import Cookies from "js-cookie";

const fetchWithAuth = async (url: string, options: any) => {
  const token = Cookies.get("partner_jwt");

  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  options.headers = { 
    ...options.headers,
    cache: "no-store",
  };    

  const response = await fetch(url, options);
  return response;
};

export default fetchWithAuth;