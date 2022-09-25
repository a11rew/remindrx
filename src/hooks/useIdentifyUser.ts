import cuid from "cuid";
import Cookies from "js-cookie";
import { useEffect } from "react";

export function useIdentifyUser() {
  useEffect(() => {
    // Check if there is a user id in the cookies
    const userId = Cookies.get("user");

    if (!userId) {
      // If there's no user create a collision resistant id
      Cookies.set("user", cuid(), { expires: 365 });
    }
  }, []);
}
