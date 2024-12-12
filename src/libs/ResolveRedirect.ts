"use server";

const ResolveRedirect = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
    });
    console.log(response.url);
    return response.url;
  } catch (error) {
    console.error("Error resolving redirect:", error);
    return "null";
  }
};

export { ResolveRedirect };
