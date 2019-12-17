import { runIntcode } from "./Intcode";

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

// Day two
export function runBasicIntcode(program: number[]) {
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
      if (runBasicIntcode(p) === target) {
        return 100 * noun + verb;
      }
    }
  }
  return -1;
}

// Day three
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

// Day four
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

// Day six
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

// Day seven
function permutations(list: number[]) {
  if (list.length === 1) {
    return [list];
  }
  const p: number[][] = [];
  list.forEach((num, i) => {
    const rest = list.slice();
    rest.splice(i, 1);
    permutations(rest).forEach((rest_p) => {
      p.push([num, ...rest_p]);
    });
  });
  return p;
}

export function maximumOutputSignal(program: number[]): number {
  let max_output_signal = 0;
  const phase_settings = permutations([0, 1, 2, 3, 4]);
  phase_settings.forEach((settings) => {
    let signal = 0;
    settings.forEach((phase) => {
      const intcode = runIntcode(program.slice(), [phase, signal]);
      for (const result of intcode) {
        signal = result;
      }
    });
    max_output_signal = Math.max(max_output_signal, signal);
  });
  return max_output_signal;
}

export function maximumOutputSignalWithFeedbackLoop(program: number[]): number {
  let max_output_signal = 0;
  const phase_settings = permutations([5, 6, 7, 8, 9]);
  phase_settings.forEach((settings) => {
    const input_qs: number[][] = [];
    let final_output: number = 0;
    settings.forEach((phase) => {
      input_qs.push([phase]);
    });
    input_qs[0].push(0);
    const amps: Generator<number>[] = [];
    input_qs.forEach((q) => {
      amps.push(runIntcode(program.slice(), q));
    });
    let result: IteratorResult<number> = {value: 0, done: false};
    do {
      amps.forEach((amp, i) => {
        result = amp.next()
        if (result.done) {
          return;
        }
        if (i === amps.length - 1) {
          final_output = result.value;
          input_qs[0].push(result.value);
        } else {
          input_qs[i+1].push(result.value);
        }
      });
    } while(!result.done)
    max_output_signal = Math.max(max_output_signal, final_output);
  });
  return max_output_signal;
}

function loadSpaceImage(image_encoded: string, width: number, height: number) {
  const layers: number[][][] = [];
  const layer_digits: {[digit: number]: number}[] = [];
  for (let i = 0; i < image_encoded.length; i++) {
    const layer = Math.floor(i / (width * height));
    if (layer > layers.length - 1) {
      layers.push([]);
      layer_digits.push({});
    }
    const offset = i % (width * height);
    // const x = offset % width;
    const y = Math.floor(offset / width);
    if (y > layers[layer].length - 1) {
      layers[layer].push([]);
    }
    const digit = parseInt(image_encoded[i]);
    layers[layer][y].push(digit);
    if (!(digit in layer_digits[layer])) {
      layer_digits[layer][digit] = 0;
    }
    layer_digits[layer][digit] += 1;
  }
  return {'layers': layers, 'layer_digits': layer_digits};
}

export function validateSpaceImage(image_encoded: string, width: number, height: number) {
  const image = loadSpaceImage(image_encoded, width, height);
  const least_zeros = image.layer_digits.reduce((acc, layer) => {
    if (layer[0] < acc[0]) {
      return layer;
    } else {
      return acc;
    }
  });
  return least_zeros[1] * least_zeros[2];
}

export function drawSpaceImageFunction(image_encoded: string, width: number, height: number) {
  const image = loadSpaceImage(image_encoded, width, height);
  return (canvas: CanvasRenderingContext2D, scale: number) => {
    image.layers.reverse().forEach((layer) => {
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          let colour = 200;
          if (layer[y][x] === 0) {
            colour = 0;
          }
          else if (layer[y][x] === 2) {
            continue;
          }
          canvas.fillStyle = "rgba("+colour+","+colour+","+colour+",255)";
          canvas.fillRect( x*scale, y*scale, scale, scale );
        }
      }
    });
  };
}

function gcd(a:number, b:number): number {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

function visibleAsteroids(x: number, y: number, map:string[][]) {
  const visible: number[][] = [];
  map.forEach((probe_row, probe_y) => {
    probe_row.forEach((probe, probe_x) => {
      if (!(probe_x === x && probe_y === y) && probe === '#') {
        const unit_x_offset = -(probe_x - x) / Math.abs(gcd((probe_x - x), (probe_y - y)));
        const unit_y_offset = -(probe_y - y) / Math.abs(gcd((probe_x - x), (probe_y - y)));
        let x_offset = 0;
        let y_offset = 0;
        while (map[probe_y+y_offset][probe_x+x_offset] !== '#' || (x_offset === 0 && y_offset === 0)) {
          x_offset += unit_x_offset;
          y_offset += unit_y_offset;
          if (probe_x + x_offset === x && probe_y + y_offset === y) {
            visible.push([probe_x, probe_y]);
            break;
          }
        }
      }
    });
  });
  return visible;
}

export function bestStationLocation(map: string[][]) {
  let most_visible = 0;
  let station = [-1, -1];
  map.forEach((row, y) => {
    row.forEach((space, x) => {
      if (space === '#') {
        const visible = visibleAsteroids(x, y, map);
        if (visible.length > most_visible) {
          station = [x, y];
          most_visible = visible.length;
        } 
      }
    });
  });
  return {'x': station[0], 'y': station[1], 'visible': most_visible};
}

export function twoHundredthAsteroid(x: number, y: number, map: string[][]) {
  // Won't do a second loop around, but that's fine on my puzzle input.
  const visible = visibleAsteroids(x, y, map);
  let visible_with_angles = visible.map((location) => {
    let angle = Math.atan2(location[1]-y, location[0]-x);
    if (angle < -Math.PI/2) {
      angle = 2*Math.PI + angle;
    }
    return {
      'x': location[0], 'y': location[1], 'angle': angle
    };
  });
  visible_with_angles.sort((a, b) => {
    return a.angle - b.angle;  
  });
  console.log(visible_with_angles);
  const two_hundredth = visible_with_angles[199];
  return two_hundredth.x * 100 + two_hundredth.y;
}