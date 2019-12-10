
function log_debug(message: string, on: boolean = false) {
  if (on) {
    console.log(message);
  }
}

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
  let p = program.slice();
  while (p[pointer] !== 99) {
    switch (p[pointer]) {
      case 1:
        p[p[pointer+3]] = p[p[pointer+1]] + p[p[pointer+2]];
        break;
      case 2:
        p[p[pointer+3]] = p[p[pointer+1]] * p[p[pointer+2]];
        break;
      default:
        alert('Unknown opcode: '+p[pointer]);
    } 
    pointer += 4;
  }
  return p[0];
}

export function findNounAndVerb(program: number[]) {
  const target = 19690720;
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      let p = program.slice();
      p[1] = noun;
      p[2] = verb;
      if (runIntcode(p) === target) {
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
      lowest_delay = signal_delay;
    }
  });
  return lowest_delay;
}

export function numberOfPasswords(min: number, max: number, part: number) {
  let double_digit_pattern;
  if (part === 1) {
    double_digit_pattern = new RegExp('(.)\\1');
  } else {
    double_digit_pattern = new RegExp('(?:^(.)\\1(?!\\1))|(?:(.)((?!\\2).)\\3(?!\\3))');
  }
  let passwords = 0;
  password_loop:
  for (let i = min+1; i < max; i++) {
    const password = i.toString()
    if (double_digit_pattern.test(password)) {
      let last_digit = 0;
      for (let j = 0; j < password.length; j++) {
        const digit = parseInt(password[j]);
        if (digit < last_digit) {
          continue password_loop;
        }
        last_digit = digit;
      }
      passwords += 1;
    }
  }
  return passwords;
}

const OPCODES = [
  {
    'NAME': 'NULL',
    'ARGS': 0
  },
  {
    'NAME': 'ADD',
    'ARGS': 3
  },
  {
    'NAME': 'MULTIPLY',
    'ARGS': 3
  },
  {
    'NAME': 'ASSIGN',
    'ARGS': 1
  },
  {
    'NAME': 'RETURN',
    'ARGS': 1
  },
  {
    'NAME': 'JUMP-IF-TRUE',
    'ARGS': 2
  },
  {
    'NAME': 'JUMP-IF-FALSE',
    'ARGS': 2
  },
  {
    'NAME': 'LESS-THAN',
    'ARGS': 3
  },
  {
    'NAME': 'EQUALS',
    'ARGS': 3
  }
];

const PARAM_MODES = {
  'POSITION': 0,
  'IMMEDIATE': 1
}

export function runExtendedIntcode(program: number[], inputs: number[]): number[] {
  let outputs: number[] = [];
  let pointer = 0;
  let p = program.slice();
  while (p[pointer] !== 99) {
    const opcode = p[pointer] % 100;
    const param_modes_str = (Math.floor(p[pointer] - p[pointer] % 100) / 100).toString();
    const param_modes = new Array(OPCODES[opcode].ARGS).fill(0);
    let index = 0;
    for (let i = param_modes_str.length - 1; i >= 0; i--) {
      param_modes[index] = parseInt(param_modes_str.charAt(i));
      index += 1;
    }
    const params: number[] = [];
    param_modes.forEach((mode, index) => {
      if (mode === PARAM_MODES.POSITION) {
        params.push(p[pointer + index + 1]);
      } else {
        params.push(pointer + index + 1);
      }
    });
    log_debug('pointer: '+pointer)
    log_debug('intcode: '+p[pointer]+' opcode: '+opcode+' param modes: '+param_modes.toString()+' params: '+params.toString());
    switch (OPCODES[opcode].NAME) {
      case 'ADD':
        log_debug('ADD: '+p[params[0]]+' + '+p[params[1]]+' --> '+params[2]);
        p[params[2]] = p[params[0]] + p[params[1]];
        pointer += params.length + 1;
        break;
      case 'MULTIPLY':
        log_debug('MULTIPLY: '+p[params[0]]+' * '+p[params[1]]+' --> '+params[2]);
        p[params[2]] = p[params[0]] * p[params[1]];
        pointer += params.length + 1;
        break;
      case 'ASSIGN':
        log_debug('ASSIGN: '+inputs[0]+' --> '+params[0]);
        p[params[0]] = inputs.shift()!;
        pointer += params.length + 1;
        break;
      case 'RETURN':
        log_debug('RETURN: '+p[params[0]]+' --> OUTPUT');
        outputs.push(p[params[0]]);
        pointer += params.length + 1;
        break;
      case 'JUMP-IF-TRUE':
        if (p[params[0]] !== 0) {
          log_debug('JUMP-IF-TRUE: '+p[params[0]]+' TRUE --> '+p[params[1]]);
          pointer = p[params[1]];
        } else {
          log_debug('JUMP-IF-TRUE: '+p[params[0]]+' FALSE');
          pointer += params.length + 1;
        }
        break;
      case 'JUMP-IF-FALSE':
        if (p[params[0]] === 0) {
          log_debug('JUMP-IF-FALSE: '+p[params[0]]+' FALSE --> '+p[params[1]]);
          pointer = p[params[1]];
        } else {
          log_debug('JUMP-IF-FALSE: '+p[params[0]]+' TRUE');
          pointer += params.length + 1;
        }
        break;
      case 'LESS-THAN':
        if (p[params[0]] < p[params[1]]) {
          log_debug('LESS-THAN: '+p[params[0]]+' < '+p[params[1]]+'. TRUE --> '+p[params[2]]);
          p[params[2]] = 1;
        } else {
          log_debug('LESS-THAN: '+p[params[0]]+' < '+p[params[1]]+'. FALSE --> '+p[params[2]]);
          p[params[2]] = 0;
        }
        pointer += params.length + 1;
        break;
      case 'EQUALS':
        if (p[params[0]] === p[params[1]]) {
          log_debug('EQUALS: '+p[params[0]]+' = '+p[params[1]]+'. TRUE --> '+p[params[2]]);
          p[params[2]] = 1;
        } else {
          log_debug('EQUALS: '+p[params[0]]+' = '+p[params[1]]+'. FALSE --> '+p[params[2]]);
          p[params[2]] = 0;
        }
        pointer += params.length + 1;
        break;
      default:
        alert('Unknown opcode: '+opcode+', raw int: '+p[pointer]);
    } 
  }
  return outputs;
}

export function totalOrbits(orbit_strs: string[]) {
  const orbit_pattern = new RegExp('(\\w+)\\)(\\w+)');
  const planets: {[id: string]: string[]} = {};
  orbit_strs.forEach((orbit_str) => {
    let match = orbit_pattern.exec(orbit_str)!;
    if (!(match[1] in planets)) {
      planets[match[1]] = [];
    }
    if (!(match[2] in planets)) {
      planets[match[2]] = [];
    }
    planets[match[1]].push(match[2]);
  });
  let orbits = 0;
  let shell = 0;
  let shell_planets = ['COM'];
  while (shell_planets.length > 0) {
    orbits += shell_planets.length * shell;
    let next_shell_planets: string[] = [];
    shell_planets.forEach((planet) => {
      next_shell_planets = next_shell_planets.concat(planets[planet]);
    });
    shell_planets = next_shell_planets;
    shell += 1;
  }
  return orbits;
}

export function orbitalTransfers(orbit_strs: string[]) {
  const orbit_pattern = new RegExp('(\\w+)\\)(\\w+)');
  const planets: {[id: string]: string} = {};
  orbit_strs.forEach((orbit_str) => {
    let match = orbit_pattern.exec(orbit_str)!;
    planets[match[2]] = match[1];
  });

  let planet = 'YOU';
  let distance = 0;
  const path: {[id: string]: number} = {planet: distance};
  while (planet !== 'COM') {
    planet = planets[planet];
    distance += 1;
    path[planet] = distance;
  }

  planet = 'SAN';
  distance = 0;
  while (!(planet in path)) {
    planet = planets[planet];
    distance += 1;
  }
  return distance + path[planet] - 2;
}