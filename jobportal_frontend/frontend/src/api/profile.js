export const getMyProfile = async() => {
    const res = await fetch("http://127.0.0.1:8000/api/profiles/my-profile/");

    const data = await res.json();
    console.log("PROFILE DATA:", data);

    return data;
};