import React, { useState, useEffect, useRef } from "react";
import truckImage from "../assets/truck.png";

const DeliverySimulation = () => {
  const [pinCode, setPinCode] = useState("");
  const [path, setPath] = useState([]);
  const [turns, setTurns] = useState([]);
  const [isPathGenerated, setIsPathGenerated] = useState(false);
  const [message, setMessage] = useState("");
  const [truckPosition, setTruckPosition] = useState({ x: 0, y: 0, angle: 0 });
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const truckImageRef = useRef(null);
  const backgroundRef = useRef({ positions: [], lines: [] });

  // Store paths based on pin codes
  const pathMap = useRef({});

  // Seeded random number generator
  const seededRandom = (seed) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  useEffect(() => {
    // Load truck image
    const img = new Image();
    img.src = truckImage;
    img.onload = () => {
      truckImageRef.current = img;
    };
  }, []);

  const generateBackground = (pin) => {
    let seed = parseInt(pin, 10);
    const positions = [];
    const lines = [];

    // Generate grid positions
    const gridCount = 600;
    const maxSize = 40;
    const minSize = 5;

    for (let i = 0; i < gridCount; i++) {
      const size = seededRandom(seed++) * (maxSize - minSize) + minSize;
      const x = seededRandom(seed++) * (800 - size);
      const y = seededRandom(seed++) * (600 - size);
      positions.push({ x, y, size });
    }

    // Generate random lines
    for (let i = 0; i < 10; i++) {
      const startX = seededRandom(seed++) < 0.5 ? 0 : 800;
      const startY = seededRandom(seed++) * 600;
      const midX = startX + (seededRandom(seed++) * 400 - 200);
      const midY = seededRandom(seed++) * 600;
      const endX = midX + (seededRandom(seed++) * 200 - 100);

      lines.push({
        startX,
        startY,
        midX,
        midY,
        endX,
      });
    }

    return { positions, lines };
  };

  const generateSimulation = (pin) => {
    if (pathMap.current[pin]) {
      setPath(pathMap.current[pin].path);
      setTurns(pathMap.current[pin].turns);
      setMessage(`Using existing simulation for pin code: ${pin}`);
    } else {
      generatePath(pin);
      setMessage(`Simulation generated for pin code: ${pin}`);
    }
    // Generate and store background for this pin
    backgroundRef.current = generateBackground(pin);
    setIsPathGenerated(true);
    // Reset truck to start position
    if (path.length > 0) {
      setTruckPosition({ x: path[0].x, y: path[0].y, angle: 0 });
    }
  };

  const generatePath = (pin) => {
    const pathPoints = [];
    const turnPoints = [];
    const startX = 50;
    const startY = 50;
    const endX = Math.random() * 700 + 50;
    const endY = Math.random() * 500 + 50;

    pathPoints.push({ x: startX, y: startY });
    let currentX = startX;
    let currentY = startY;

    while (currentX !== endX || currentY !== endY) {
      if (Math.random() < 0.5) {
        currentX =
          currentX < endX
            ? Math.min(currentX + 50, endX)
            : Math.max(currentX - 50, endX);
      } else {
        currentY =
          currentY < endY
            ? Math.min(currentY + 50, endY)
            : Math.max(currentY - 50, endY);
      }
      pathPoints.push({ x: currentX, y: currentY });

      if (pathPoints.length > 1) {
        turnPoints.push({ x: currentX, y: currentY });
      }
    }

    pathPoints.push({ x: endX, y: endY });
    pathMap.current[pin] = { path: pathPoints, turns: turnPoints };
    setPath(pathPoints);
    setTurns(turnPoints);
  };

  const calculateAngle = (start, end) => {
    return Math.atan2(end.y - start.y, end.x - start.x);
  };

  const animateTruck = () => {
    let currentPathIndex = 0;
    let progress = 0;
    const speed = 0.02;

    const animate = () => {
      if (currentPathIndex >= path.length - 1) {
        cancelAnimationFrame(animationRef.current);
        return;
      }

      const start = path[currentPathIndex];
      const end = path[currentPathIndex + 1];
      const angle = calculateAngle(start, end);

      const newX = start.x + (end.x - start.x) * progress;
      const newY = start.y + (end.y - start.y) * progress;

      setTruckPosition({ x: newX, y: newY, angle });

      progress += speed;
      if (progress >= 1) {
        currentPathIndex++;
        progress = 0;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animate);
  };

  const resetSimulation = () => {
    setPath([]);
    setTurns([]);
    setIsPathGenerated(false);
    setPinCode("");
    setMessage("");
    cancelAnimationFrame(animationRef.current);
    backgroundRef.current = { positions: [], lines: [] };
  };

  const handlePinCodeChange = (e) => {
    setPinCode(e.target.value);
  };

  const handleEnterPinCode = () => {
    if (/^\d{6}$/.test(pinCode.trim())) {
      generateSimulation(pinCode);
    } else {
      setMessage("Please enter a valid 6-digit pin code.");
    }
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw background grid using stored positions
    backgroundRef.current.positions.forEach(({ x, y, size }) => {
      ctx.fillStyle = `rgba(169, 169, 169, 0.6)`;
      ctx.fillRect(x, y, size, size);
    });

    // Draw stored background lines
    backgroundRef.current.lines.forEach(
      ({ startX, startY, midX, midY, endX }) => {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(midX, startY);
        ctx.lineTo(midX, midY);
        ctx.lineTo(endX, midY);
        ctx.stroke();
      }
    );

    if (isPathGenerated) {
      // Draw the path
      ctx.strokeStyle = "white";
      ctx.lineWidth = 15;
      ctx.beginPath();
      path.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();

      // Draw endpoint
      const lastPoint = path[path.length - 1];
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(lastPoint.x, lastPoint.y, 10, 0, Math.PI * 2);
      ctx.fill();

      // Draw turn markers
      turns.forEach((turn) => {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(turn.x, turn.y, 5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw truck with increased size (3.5x)
      if (truckImageRef.current) {
        ctx.save();
        ctx.translate(truckPosition.x, truckPosition.y);
        ctx.rotate(truckPosition.angle);
        // Increased size to 105x70 pixels (3.5x original size of 30x20)
        ctx.drawImage(truckImageRef.current, -52.5, -35, 105, 70);
        ctx.restore();
      }
    }
  }, [path, turns, isPathGenerated, truckPosition]);

  // Start animation when path is generated
  useEffect(() => {
    if (isPathGenerated && path.length > 0) {
      animateTruck();
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPathGenerated, path]);

  return (
    <div className="flex flex-col items-center p-4 bg-yellow-200">
      <h1 className="text-2xl font-bold mb-4">Seeded-IoT Map Simulation</h1>
      <div className="mb-2 text-red-600">{message}</div>
      <input
        type="text"
        value={pinCode}
        onChange={handlePinCodeChange}
        placeholder="Enter 6-Digit Pin Code"
        className="border p-2 rounded mb-4 w-1/3"
      />
      <button
        onClick={handleEnterPinCode}
        className="bg-green-500 text-white p-2 rounded mb-2 hover:bg-green-600 transition duration-200"
      >
        Enter Pin Code
      </button>
      <button
        onClick={resetSimulation}
        className="bg-red-500 text-white text-sm p-2 rounded hover:bg-red-600 transition duration-200"
      >
        Reset
      </button>
      <div className="relative w-full max-w-[800px] h-[600px] border mt-4 bg-[rgba(11,21,10,0.8)]">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="absolute top-0 left-0"
        />
        {turns.map((turn, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              left: turn.x - 10,
              top: turn.y - 10,
              width: "20px",
              height: "20px",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
            onMouseEnter={() => setMessage("Collecting water here")}
            onMouseLeave={() => setMessage("")}
          />
        ))}
      </div>
    </div>
  );
};

export default DeliverySimulation;
