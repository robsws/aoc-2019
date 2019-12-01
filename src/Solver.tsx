// Day One
export function totalFuelRequired(masses: number[]) {
  const fuel_required: number[] = masses.map((mass) => {
    return Math.floor(mass / 3) - 2;
  });
  return fuel_required.reduce((a, b) => {return a + b});
}
export function totalFuelWithFuelRequired(masses: number[]) {
  const fuel_required: number[] = masses.map((mass) => {
    let total_fuel = 0;
    let added_fuel = Math.floor(mass / 3) - 2;
    while (added_fuel >= 0) {
      total_fuel += added_fuel;
      added_fuel = Math.floor(added_fuel / 3) - 2;
    }
    return total_fuel;
  });
  return fuel_required.reduce((a, b) => {return a + b});
}