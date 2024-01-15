'use clinet'

import { useRef, useMemo, useState } from "react";
import { Point } from "pixi.js";
import { Stage, SimpleRope, useTick, Container, Graphics } from "@pixi/react";

const width = 500;
const height = 240;
const backgroundColor = 0x1d2330;
const ropeLength = 45;

const SnakePoints = ({points}) => {
  return (
    <Graphics 
      x={30}
      y={height / 2} 
      scale={0.4}
      draw={g => {
        g.clear()
        g.lineStyle(2, 0xffc2c2)
        g.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          g.lineTo(points[i].x, points[i].y);
        }
        for (let i = 1; i < points.length; i++) {
          g.beginFill(0xff0022);
          g.drawCircle(points[i].x, points[i].y, 10);
          g.endFill();
        }
      }}
    />
  )
}

const Snake = () => {
  const i = useRef(0)

  const initialPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < 25; i++) {
      points.push(new Point(i * ropeLength, 0))
    }
    return points
  }, [])

  const [showPoints, setShowPoints] = useState(true)
  const [points, setPoints] = useState(initialPoints)

  useTick(delta => {
    const iter = i.current += 0.1 * delta
    const np = [...points]

    for (let j = 0; j < np.length; j++) {
      np[j].x = j * ropeLength + Math.cos((j * 0.3) + iter) * 20;
      np[j].y = Math.sin((j * 0.5) + iter) * 30;
    }

    setPoints(np)
  })

  return <Container
    interactive={true}
    pointerdown={() => setShowPoints(show => !show)}
  >
    <SimpleRope 
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/snake.png"
      points={points}
      scale={0.4}
      x={30}
      y={height / 2}
    />
    {showPoints && <SnakePoints points={points} />}
  </Container>
}


export default function SimpleRopePage() {
  return (
    <Stage
      width={width}
      height={height}
      options={{
        autoDensity: true,
        backgroundColor,
      }}
    >
      <Snake />
    </Stage>
  )
}