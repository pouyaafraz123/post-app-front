import { useEffect, useRef, useState } from "react";

/* eslint-disable react-hooks/exhaustive-deps */

/** Cordinates Interface for draggable element */
export interface Position {
  x: number | string;
  y: number | string;
}

/** useDraggable hook for handling draggable element movements  */
export default function useDraggable<T extends HTMLElement>(
  initialPosition: Position = { x: "50%", y: "50%" }
) {
  const ref = useRef<T>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>(initialPosition);

  /** When mouse is moving */
  const handleMouseMove = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (!isDragging) return;
    if (!ref.current) return;

    setPosition({
      // x: event.movementX + ref.current.offsetLeft,
      // y: event.movementY + ref.current.offsetTop,
      x: Math.max(
        ref.current.offsetWidth / 2,
        event.movementX + ref.current.offsetLeft
      ),
      y: Math.max(
        ref.current.offsetHeight / 2,
        event.movementY + ref.current.offsetTop
      ),
    });
  };

  /** When mouse button is released  */
  function handleMouseUp(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();

    setIsDragging(false);
  }

  /** When mouse button is pressed */
  function handleMouseDown(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);

    if (!ref.current) return;

    // setPosition({
    //   x: event.x - ref.current.offsetWidth,
    //   y: event.y - ref.current.offsetHeight,
    // });
  }

  useEffect(() => {
    ref.current?.addEventListener("mousedown", handleMouseDown);

    return () => {
      ref.current?.removeEventListener("mousedown", handleMouseDown);
    };
  }, [ref.current]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mousemove", handleMouseMove);
    } else {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    }
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);

  return [ref, position, isDragging] as const;
}
