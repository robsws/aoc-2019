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
export function runIntcode(program: number[]) {
  let pointer = 0;
  let test_program = program.slice();
  while (test_program[pointer] !== 99) {
    switch (test_program[pointer]) {
      case 1:
        test_program[test_program[pointer+3]] = test_program[test_program[pointer+1]] + test_program[test_program[pointer+2]];
        break;
      case 2:
        test_program[test_program[pointer+3]] = test_program[test_program[pointer+1]] * test_program[test_program[pointer+2]];
        break;
      default:
        alert('Unknown opcode: '+test_program[pointer]);
    } 
    pointer += 4;
  }
  return test_program[0];
}
export function findNounAndVerb(program: number[]) {
  const target = 19690720;
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      let test_program = program.slice();
      test_program[1] = noun;
      test_program[2] = verb;
      console.log(test_program);
      if (runIntcode(test_program) === target) {
        return 100 * noun + verb;
      }
    }
  }
  return -1;
}