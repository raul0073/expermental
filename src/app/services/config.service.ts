export const setUserTeamService = async (slug: string) => {
    await fetch("/api/config", {
        method: "POST",
        body: JSON.stringify({ slug }),
        headers: { "Content-Type": "application/json" },
    });
};