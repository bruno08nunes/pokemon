const generations = [
    { start: 1, end: 151 },
    { start: 152, end: 251 },
    { start: 252, end: 386 },
    { start: 387, end: 494 },
    { start: 494, end: 649 },
    { start: 650, end: 721 },
    { start: 722, end: 809 },
    { start: 810, end: 905 },
    { start: 906, end: 1025 },
];

export const generateNumber = (gens) => {
    if (gens[0] === undefined) {
        gens.push(0);
    }
    const currentGens = gens.map((gen) => generations[gen]);
    const gen = currentGens[Math.floor(Math.random() * currentGens.length)];
    const number = Math.floor(Math.random() * (gen.end - gen.start + 1)) + gen.start;
    return number;
};
