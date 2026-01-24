export const LEVELS = [
    { id: 1, name: "Guardia 1: La Era de la Maruchan", duration: 60, spawnRate: 4200, beds: 3, uce: 0, goal: 300, meal: "Sopa instantánea con jamón" },
    { id: 2, name: "Guardia 2: El Sueño de la Torta", duration: 75, spawnRate: 3800, beds: 3, uce: 2, goal: 600, meal: "Torta de puesto (cubana)" },
    { id: 3, name: "Guardia 3: Trampas Clínicas", duration: 90, spawnRate: 3400, beds: 3, uce: 2, goal: 900, meal: "Tacos al Pastor (5 con todo)" },
    { id: 4, name: "Guardia 4: Caos Hospitalario", duration: 100, spawnRate: 3000, beds: 4, uce: 3, goal: 1300, meal: "Pizza Gigante Caliente" },
    { id: 5, name: "Final: Código Negro", duration: 110, spawnRate: 2500, beds: 4, uce: 4, goal: 1800, meal: "Sushi Deluxe & Sake" },
];

export function getMealEmoji(mealName) {
    switch (mealName) {
        case "Sopa instantánea con jamón": return "🍜";
        case "Torta de puesto (cubana)": return "🥪";
        case "Tacos al Pastor (5 con todo)": return "🌮";
        case "Pizza Gigante Caliente": return "🍕";
        case "Sushi Deluxe & Sake": return "🍣";
        default: return "😋";
    }
}
