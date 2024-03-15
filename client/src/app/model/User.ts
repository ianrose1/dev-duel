export default interface User {
    avatar_url: string,
    bio: string,
    username: string,
    name: string,
    location: string,
    titles: string[],
    ["favorite-language"]: string,
    ["total-stars"]: number,
    ["highest-starred"]: number,
    ["public-repos"]: number,
    ["perfect-repos"]: number,
    followers: number,
    following: number
    winner: boolean
}