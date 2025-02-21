import { motion } from "motion/react";

const mainText = "Вітаємо!";
const subText = "Очікуйте, на вашу персональну спортивну программу...";

const WelcomePage = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const subtitle = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: [0, 1, 1, 0],
      y: [10, 0, 0, -10],
      transition: {
        times: [0, 0.2, 0.8, 1],
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 1,
      },
    },
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8 p-6">
      <motion.div
        className="overflow-hidden flex text-6xl font-bold text-primary lg:text-8xl"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {mainText.split("").map((letter, index) => (
          <motion.span
            key={index}
            variants={child}
            className={letter === " " ? "mr-4" : ""}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        className="text-xl text-muted-foreground lg:text-2xl text-center"
        initial="initial"
        animate="animate"
        variants={subtitle}
      >
        {subText}
      </motion.div>
    </div>
  );
};

export default WelcomePage;
