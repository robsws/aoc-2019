let DEBUG = false;

export function toggle_debug() {
  DEBUG = !DEBUG;
}

function log_debug(...args: any[]) {
  if (DEBUG) {
    console.log(args);
  }
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
    'NAME': 'CONSUME',
    'ARGS': 1
  },
  {
    'NAME': 'EMIT',
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
  },
  {
    'NAME': 'SET-BASE',
    'ARGS': 1
  }
];

const PARAM_MODES = {
  'POSITION': 0,
  'IMMEDIATE': 1,
  'RELATIVE': 2
}

interface IntcodeParam {
  address: number,
  value: number
}

export function* runIntcode(program: number[], input_q: number[], max_cycles: number = Infinity): Generator<number> {
  let pointer = 0;
  let relative_base = 0;
  let p = program.slice();
  let iterations = 0;
  while (p[pointer] !== 99 && iterations <= max_cycles) {
    const opcode = p[pointer] % 100;
    const param_modes_str = (Math.floor(p[pointer] - p[pointer] % 100) / 100).toString();
    const param_modes = new Array(OPCODES[opcode].ARGS).fill(0);
    let index = 0;
    for (let i = param_modes_str.length - 1; i >= 0; i--) {
      param_modes[index] = parseInt(param_modes_str.charAt(i));
      index += 1;
    }
    const params: IntcodeParam[] = [];
    param_modes.forEach((mode, index) => {
      let param = {
        'value': 0,
        'address': 0
      };
      if (mode === PARAM_MODES.IMMEDIATE) {
        param.address = p[pointer + index + 1];
        param.value = p[pointer + index + 1];
      } else {
        param.address = p[pointer + index + 1];
        if (mode === PARAM_MODES.RELATIVE) {
          param.address = relative_base + param.address;
        }
        if (param.address < 0) {
          alert('Negative address given: '+param.address);
        }
        while (param.address > p.length - 1) {
          p.push(...new Array(p.length).fill(0));
          log_debug('Extended program to '+p.length.toString()+' ints.');
        }
        param.value = p[param.address];
      }
      params.push(param);
    });
    log_debug('pointer: '+pointer);
    log_debug('intcode: '+p[pointer]+' opcode: '+opcode+' param modes: '+param_modes.toString()+' params: ', params);
    switch (OPCODES[opcode].NAME) {
      case 'ADD':
        log_debug('ADD: '+params[0].value+' + '+params[1].value+' --> @'+params[2].address);
        p[params[2].address] = params[0].value + params[1].value;
        pointer += params.length + 1;
        break;
      case 'MULTIPLY':
        log_debug('MULTIPLY: '+params[0].value+' * '+params[1].value+' --> @'+params[2].address);
        p[params[2].address] = params[0].value * params[1].value;
        pointer += params.length + 1;
        break;
      case 'CONSUME':
        p[params[0].address] = input_q.shift()!;
        log_debug('CONSUME: '+p[params[0].address]+' --> @'+params[0].address);
        pointer += params.length + 1;
        break;
      case 'EMIT':
        log_debug('EMIT: '+params[0].value);
        yield params[0].value;
        pointer += params.length + 1;
        break;
      case 'JUMP-IF-TRUE':
        if (params[0].value !== 0) {
          log_debug('JUMP-IF-TRUE: '+params[0].value+' TRUE. @'+params[1].value+' --> POINTER');
          pointer = params[1].value;
        } else {
          log_debug('JUMP-IF-TRUE: '+params[0].value+' FALSE.');
          pointer += params.length + 1;
        }
        break;
      case 'JUMP-IF-FALSE':
        if (params[0].value === 0) {
          log_debug('JUMP-IF-FALSE: '+params[0].value+' FALSE. @'+params[1].value+' --> POINTER');
          pointer = params[1].value;
        } else {
          log_debug('JUMP-IF-FALSE: '+params[0].value+' TRUE.');
          pointer += params.length + 1;
        }
        break;
      case 'LESS-THAN':
        if (params[0].value < params[1].value) {
          log_debug('LESS-THAN: '+params[0].value+' < '+params[1].value+'. 1 --> @'+params[2].address);
          p[params[2].address] = 1;
        } else {
          log_debug('LESS-THAN: '+params[0].value+' < '+params[1].value+'. 0 --> @'+params[2].address);
          p[params[2].address] = 0;
        }
        pointer += params.length + 1;
        break;
      case 'EQUALS':
        if (params[0].value === params[1].value) {
          log_debug('EQUALS: '+params[0].value+' = '+params[1].value+'. 1 --> @'+params[2].address);
          p[params[2].address] = 1;
        } else {
          log_debug('EQUALS: '+params[0].value+' = '+params[1].value+'. 0 --> @'+params[2].address);
          p[params[2].address] = 0;
        }
        pointer += params.length + 1;
        break;
      case 'SET-BASE':
        log_debug('SET-BASE: '+params[0].value);
        relative_base += params[0].value;
        pointer += params.length + 1;
        break;
      default:
        alert('Unknown opcode: '+opcode+', raw int: '+p[pointer]);
    }
    iterations++;
  }
}