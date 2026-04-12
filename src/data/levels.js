export const LEVELS = [
  {
    id: 1,
    name: "Guardia 1: El Taco de Tripa y la NOC",
    duration: 60,
    spawnRate: 4200,
    beds: 3,
    uce: 0,
    goal: 300,
    meal: "🌮 Tres tacos de canasta de frijol (sudados)",
    premio: "🎁 Un bote de pomada de la campana + un vale para un café de olla"
  },
  {
    id: 2,
    name: "Guardia 2: El Pico de Influenza",
    duration: 75,
    spawnRate: 3800,
    beds: 3,
    uce: 2,
    goal: 600,
    meal: "🥪 Tortas de tamal con atole de fresa",
    premio: "💊 Una caja de naproxeno genérico y un estetoscopio que sí sirve"
  },
  {
    id: 3,
    name: "Guardia 3: Suturas en Vela (y sin café)",
    duration: 90,
    spawnRate: 3400,
    beds: 3,
    uce: 2,
    goal: 900,
    meal: "🍲 Pozole rojo con tostadas y cueritos",
    premio: "🖊️ Un paquete de plumas Bic que no se pierden"
  },
  {
    id: 4,
    name: "Guardia 4: El Dr. Simi y la Receta Mágica",
    duration: 100,
    spawnRate: 3000,
    beds: 4,
    uce: 3,
    goal: 1300,
    meal: "🍛 Chilaquiles verdes con pollo y frijoles",
    premio: "🩺 Un martillo de reflejos que no es de juguete"
  },
  {
    id: 5,
    name: "Guardia 5: Código Infarto (área de choque cerrada)",
    duration: 110,
    spawnRate: 2500,
    beds: 4,
    uce: 4,
    goal: 1800,
    meal: "🌯 Burrito de machaca con salsa roja bien picosita",
    premio: "🩹 Una dotación de parches para ojeras de R1"
  },
  {
    id: 6,
    name: "Guardia 6: La Noche de las Episiotomías",
    duration: 120,
    spawnRate: 2000,
    beds: 5,
    uce: 5,
    goal: 2500,
    meal: "🥘 Barbacoa de borrego con consomé y cebollitas",
    premio: "🎒 Una mochila con compartimiento térmico para tu torta"
  },
  {
    id: 7,
    name: "Guardia 7: La Auditoría",
    duration: 130,
    spawnRate: 1800,
    beds: 5,
    uce: 6,
    goal: 3800,
    meal: "🦞 Enchiladas de jaiba con crema y queso fresco",
    premio: "🧴 Un kit de skin-care para ocultar el cansancio"
  },
  {
    id: 8,
    name: "Final: El Director General y su Caja de Seguros",
    duration: 150,
    spawnRate: 1500,
    beds: 6,
    uce: 8,
    goal: 5500,
    meal: "🥂 Mole poblano con arroz y mezcal artesanal",
    premio: "🏆 Título de Especialista y el respeto de las enfermeras"
  },
];

export function getMealEmoji(mealName) {
  if (mealName.includes("🌮")) return "🌮";
  if (mealName.includes("🥪")) return "🥪";
  if (mealName.includes("🍲")) return "🍲";
  if (mealName.includes("🍛")) return "🍛";
  if (mealName.includes("🌯")) return "🌯";
  if (mealName.includes("🥘")) return "🥘";
  if (mealName.includes("🦞")) return "🦞";
  if (mealName.includes("🥂")) return "🥂";
  return "😋";
}
