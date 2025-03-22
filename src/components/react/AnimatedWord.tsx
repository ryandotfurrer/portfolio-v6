import { useEffect, useState } from 'react';

const words = [
  'amazing',
  'awesome',
  'creative',
  'delightful',
  'fantastic',
  'fun',
  'incredible',
  'inspiring',
  'memorable',
  'rad',
  'remarkable',
  'special',
  'unique',
  'wonderful',
];

const getRandomWord = (exclude?: string) => {
  const available = exclude ? words.filter((w) => w !== exclude) : words;
  return available[Math.floor(Math.random() * available.length)];
};

export default function AnimatedWord() {
  const [word, setWord] = useState(() => getRandomWord());
  const [key, setKey] = useState(0);

  useEffect(() => {
    const updateWord = () => {
      setWord((prev) => getRandomWord(prev));
      setKey((k) => k + 1);
    };

    const intervalId = setInterval(updateWord, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <span
      key={key}
      className="from-accent via-accent animate-[blur_.5s_ease-in_forwards] bg-gradient-to-r to-amber-500 bg-clip-text text-transparent"
    >
      {word}
    </span>
  );
}
