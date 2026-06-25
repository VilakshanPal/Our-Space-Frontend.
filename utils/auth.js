import { cookies } from "next/headers";

const auth = async() => {
      const cookieStore = await cookies();

   const response = await fetch(
    "http://localhost:5000/user",
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null
  }

  const user = await response.json();

  return user;
}

export default auth
