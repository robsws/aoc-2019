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
      if (runIntcode(test_program) === target) {
        return 100 * noun + verb;
      }
    }
  }
  return -1;
}

export function getClosestIntersectionPointDistance(commands: string[][]) {
  const command_regex = new RegExp('^([L|R|U|D])(\\d+)$');
  const visited = new Set();
  const intersections: number[][] = [];
  let position = [0, 0];
  commands[0].forEach((command) => {
    var match = command_regex.exec(command);
    if (match) {
      for (var i = 0; i < parseInt(match[2]); i++) {
        switch(match[1]) {
          case 'L':
            position[0] -= 1; break;
          case 'R':
            position[0] += 1; break;
          case 'U':
            position[1] -= 1; break;
          case 'D':
            position[1] += 1; break;
        }
        visited.add(position.toString());
      }
    }
  });
  position = [0, 0];
  commands[1].forEach((command) => {
    var match = command_regex.exec(command);
    if (match) {
      for (var i = 0; i < parseInt(match[2]); i++) {
        switch(match[1]) {
          case 'L':
            position[0] -= 1; break;
          case 'R':
            position[0] += 1; break;
          case 'U':
            position[1] -= 1; break;
          case 'D':
            position[1] += 1; break;
        }
        if (visited.has(position.toString())) {
          intersections.push(position.slice());
        }
      }
    }
  });
  let closest_distance = 9999999999;
  intersections.forEach((intersection) => {
    let distance = Math.abs(intersection[0]) + Math.abs(intersection[1]);
    if (distance < closest_distance) {
      closest_distance = distance;
    }
  });
  return closest_distance;
}

export function getMinimalSignalDelay(commands: string[][]) {
  const command_regex = new RegExp('^([L|R|U|D])(\\d+)$');
  const visited: {[pos: string]: number} = {};
  const intersections: {pos: number[], delay: number}[] = [];
  let position = [0, 0];
  let step: number = 0;
  commands[0].forEach((command) => {
    let match = command_regex.exec(command);
    if (match) {
      for (var i = 0; i < parseInt(match[2]); i++) {
        step += 1
        switch(match[1]) {
          case 'L':
            position[0] -= 1; break;
          case 'R':
            position[0] += 1; break;
          case 'U':
            position[1] -= 1; break;
          case 'D':
            position[1] += 1; break;
        }
        if (!visited[position.toString()]) {
          visited[position.toString()] = step;
        }
      }
    }
  });
  position = [0, 0];
  step = 0;
  commands[1].forEach((command) => {
    var match = command_regex.exec(command);
    if (match) {
      for (var i = 0; i < parseInt(match[2]); i++) {
        step += 1
        switch(match[1]) {
          case 'L':
            position[0] -= 1; break;
          case 'R':
            position[0] += 1; break;
          case 'U':
            position[1] -= 1; break;
          case 'D':
            position[1] += 1; break;
        }
        if (position.toString() in visited) {
          intersections.push({pos: position.slice(), delay: step});
        }
      }
    }
  });
  let lowest_delay = 9999999999;
  intersections.forEach((intersection) => {
    let signal_delay = visited[intersection["pos"].toString()] + intersection["delay"];
    if (signal_delay < lowest_delay) {
      console.log(visited[intersection["pos"].toString()]);
      console.log(intersection["delay"]);
      console.log('--');
      lowest_delay = signal_delay;
    }
  });
  return lowest_delay;
}