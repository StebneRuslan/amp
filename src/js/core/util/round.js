export function moveTowardsLength(movingPoint, targetPoint, amount) {
  var width = (targetPoint.x - movingPoint.x);
  var height = (targetPoint.y - movingPoint.y);
  
  var distance = Math.sqrt(width*width + height*height);
  
  return moveTowardsFractional(movingPoint, targetPoint, Math.min(1, amount / distance));
}

export function getPathParts (pathString) {
  return pathString
    .split(/[,\s]/)
    .reduce((parts, part) => {
      const match = part.match('([a-zA-Z])(.+)');
      if (match) {
        parts.push(match[1]);
        parts.push(match[2]);
      } else {
        parts.push(part);
      }
      return parts;
    }, []);
}

export function getPathPartsCommand (pathParts) {
  return pathParts.reduce(function(commands, part) {
    if (parseFloat(part) == part && commands.length) {
      commands[commands.length - 1].push(part);
    } else {
      commands.push([part]);
    }
    return commands;
  }, []);
}

export function pointForCommand(cmd) {
  return {
    x: parseFloat(cmd[cmd.length - 2]),
    y: parseFloat(cmd[cmd.length - 1])
  };
}

export function moveTowardsFractional(movingPoint, targetPoint, fraction) {
  return {
    x: movingPoint.x + (targetPoint.x - movingPoint.x) * fraction,
    y: movingPoint.y + (targetPoint.y - movingPoint.y) * fraction
  };
}

export function adjustCommand(cmd, newPoint) {
  if (cmd.length > 2) {
    cmd[cmd.length - 2] = newPoint.x;
    cmd[cmd.length - 1] = newPoint.y;
  }
}

export function roundShape(pathString, radius, useFractionalRadius = false) {
  const pathParts = getPathParts(pathString)
  const commands = getPathPartsCommand(pathParts)
  let resultCommands = [];
  
  if (commands.length > 1) {
    let startPoint = pointForCommand(commands[0]);
    // Handle the close path case with a "virtual" closing line
    let virtualCloseLine = null;
    if (commands[commands.length - 1][0] === 'Z' && commands[0].length > 2) {
      virtualCloseLine = ['L', startPoint.x, startPoint.y];
      commands[commands.length - 1] = virtualCloseLine;
    }
    // We always use the first command (but it may be mutated)
    resultCommands.push(commands[0]);
    
    for (let cmdIndex = 1; cmdIndex < commands.length; cmdIndex++) {
      let prevCmd = resultCommands[resultCommands.length - 1];
      
      let curCmd = commands[cmdIndex];
      let nextCmd = (curCmd === virtualCloseLine) ? commands[1] : commands[cmdIndex + 1];
      if (nextCmd && prevCmd && (prevCmd.length > 2) && curCmd[0] === 'L' && nextCmd.length > 2 && nextCmd[0] === 'L') {
        let prevPoint = pointForCommand(prevCmd);
        let curPoint = pointForCommand(curCmd);
        let nextPoint = pointForCommand(nextCmd);
        // The start and end of the cuve are just our point moved towards the previous and next points, respectivly
        let curveStart, curveEnd;
        
        if (useFractionalRadius) {
          curveStart = moveTowardsFractional(curPoint, prevCmd.origPoint || prevPoint, radius);
          curveEnd = moveTowardsFractional(curPoint, nextCmd.origPoint || nextPoint, radius);
        } else {
          curveStart = moveTowardsLength(curPoint, prevPoint, radius);
          curveEnd = moveTowardsLength(curPoint, nextPoint, radius);
        }
        adjustCommand(curCmd, curveStart);
        curCmd.origPoint = curPoint;
        resultCommands.push(curCmd);
        
        let startControl = moveTowardsFractional(curveStart, curPoint, .5);
        let endControl = moveTowardsFractional(curPoint, curveEnd, .5);
        
        let curveCmd = ['C', startControl.x, startControl.y, endControl.x, endControl.y, curveEnd.x, curveEnd.y];
        // Save the original point for fractional calculations
        curveCmd.origPoint = curPoint;
        resultCommands.push(curveCmd);
      } else {
        resultCommands.push(curCmd);
      }
    }
    if (virtualCloseLine) {
      let newStartPoint = pointForCommand(resultCommands[resultCommands.length-1]);
      resultCommands.push(['Z']);
      adjustCommand(resultCommands[0], newStartPoint);
    }
  } else {
    resultCommands = commands;
  }
  return resultCommands.reduce(function(str, c){ return str + c.join(' ') + ' '; }, '');
}
