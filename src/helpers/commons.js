export const calculateOffset = (index, spread = 1) => {
  spread = index * 0.36;
  spread += 2;
  const goldenAngle = Math.PI * (1.5 - Math.sqrt(5)); //un peu modifié, 2 au lieu de 3
  const pseudoRandom = (Math.sin(index * 2) * 43758) % 1; // Génère une valeur pseudo-aléatoire stable
  const angleVariation = (pseudoRandom - 1) * 0.05;
  const radiusVariation = (pseudoRandom - 0.2) * spread * 0.05;

  const radius = spread * Math.sqrt(index) + radiusVariation + 40; // Ajoute une légère variation
  const angle = index * goldenAngle + angleVariation; // Décale légèrement l’angle

  const x = Math.round(radius * Math.cos(angle));
  const y = Math.round(radius * Math.sin(angle));

  return { x, y };
};

// collision
export const intersects = (a, b) => {
  let aBox = a.getBounds();
  let bBox = b.getBounds();

  return (
    aBox.x + aBox.width > bBox.x &&
    aBox.x < bBox.x + bBox.width &&
    aBox.y + aBox.height > bBox.y &&
    aBox.y < bBox.y + bBox.height
  );
};

// pseudo random
export const pseudoRandom = (seed) => {
  seed = seed ^ 61 ^ (seed >> 16);
  seed = seed + (seed << 3);
  seed = seed ^ (seed >> 4);
  seed = seed * 0x27d4eb2d;
  seed = seed ^ (seed >> 15);
  return ((seed % 10000) / 10000);
};
