import { useState, useEffect } from "react"

const useCountdownTimer = (initialSeconds) => {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isActive, setIsActive] = useState(true)
  const ZERO = 0;

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > ZERO) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1)
      }, 1000)
    } else if (seconds === ZERO) {
      setIsActive(false)
      if (interval) clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, seconds])

  const resetTimer = () => {
    setSeconds(initialSeconds)
    setIsActive(true)
  }

  return { seconds, isActive, resetTimer }
}


export default useCountdownTimer;