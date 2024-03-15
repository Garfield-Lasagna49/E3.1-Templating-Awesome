export interface Pokemon {
    id: number;
    name: string;
    type: string;
    imageSRC: string;
}

export const database: Pokemon[] = [
    { id: 1, name: "Aquatic Beaver", type: "cool", imageSRC: "images/beaverDiver.png" },
    { id: 2, name: "Big frickin' Beaver", type: "cool", imageSRC: "images/Giant_Beaver_front.webp" },
    { id: 3, name: "Reilly the Beaver", type: "fire", imageSRC: "images/Reilly_the_Beaver.webp" },
    { id: 4, name: "Confusing Beaver", type: "snow",  imageSRC: "images/confusingBeaver.jpeg" },
];
