const calculateOffset = (index, spread = 10) => {
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

export default calculateOffset;
