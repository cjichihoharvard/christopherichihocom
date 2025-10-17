import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { Lock, RotateCcw, FileText } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Card = {
  suit: string;
  value: string;
  numValue: number;
};

type GameState = "betting" | "playing" | "dealer-turn" | "game-over";

export default function ResumeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameState, setGameState] = useState<GameState>("betting");
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [resultMessage, setResultMessage] = useState("");

  const suits = ["♠", "♥", "♦", "♣"];
  const values = [
    { value: "A", numValue: 11 },
    { value: "2", numValue: 2 },
    { value: "3", numValue: 3 },
    { value: "4", numValue: 4 },
    { value: "5", numValue: 5 },
    { value: "6", numValue: 6 },
    { value: "7", numValue: 7 },
    { value: "8", numValue: 8 },
    { value: "9", numValue: 9 },
    { value: "10", numValue: 10 },
    { value: "J", numValue: 10 },
    { value: "Q", numValue: 10 },
    { value: "K", numValue: 10 },
  ];

  const getRandomCard = (): Card => {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const cardValue = values[Math.floor(Math.random() * values.length)];
    return {
      suit,
      value: cardValue.value,
      numValue: cardValue.numValue,
    };
  };

  const getRiggedCard = (currentTotal: number, shouldBust: boolean): Card => {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    
    if (shouldBust) {
      // Give a card that will bust them
      const bustValues = values.filter(v => currentTotal + v.numValue > 21);
      if (bustValues.length > 0) {
        const bustCard = bustValues[Math.floor(Math.random() * bustValues.length)];
        return { suit, value: bustCard.value, numValue: bustCard.numValue };
      }
    }
    
    // Otherwise give a random card
    return getRandomCard();
  };

  const calculateScore = (hand: Card[]): { score: number; isSoft: boolean; displayScore: string } => {
    let score = 0;
    let aces = 0;

    hand.forEach((card) => {
      score += card.numValue;
      if (card.value === "A") aces++;
    });

    let usableAces = aces;
    while (score > 21 && usableAces > 0) {
      score -= 10;
      usableAces--;
    }

    // Check if this is a soft hand (ace counted as 11)
    const isSoft = usableAces > 0 && score <= 21;
    
    // Display both values if soft hand and different
    let displayScore = score.toString();
    if (isSoft && aces > 0) {
      const hardScore = score - 10;
      if (hardScore !== score) {
        displayScore = `${hardScore}/${score}`;
      }
    }

    return { score, isSoft, displayScore };
  };

  const startNewGame = () => {
    const initialPlayerHand = [getRandomCard(), getRandomCard()];
    const initialDealerHand = [getRandomCard()]; // Dealer shows one card

    setPlayerHand(initialPlayerHand);
    setDealerHand(initialDealerHand);
    setPlayerScore(calculateScore(initialPlayerHand).score);
    setDealerScore(calculateScore(initialDealerHand).score);
    setGameState("playing");
    setResultMessage("");
  };

  const hit = () => {
    if (gameState !== "playing") return;

    const newPlayerHand = [...playerHand];
    const currentResult = calculateScore(newPlayerHand);
    
    // Rigged: If player has 12+, higher chance of bust card
    // If player has 17-20, almost guaranteed bust
    let newCard: Card;
    
    if (currentResult.score >= 17 && currentResult.score <= 20) {
      // Definitely give them a bust card
      newCard = getRiggedCard(currentResult.score, true);
    } else if (currentResult.score >= 12) {
      // 70% chance of getting a card that pushes toward bust range
      if (Math.random() < 0.7) {
        // Give them a high card (7-10) to push them closer to busting
        const highCards = values.filter(v => v.numValue >= 7);
        const highCard = highCards[Math.floor(Math.random() * highCards.length)];
        newCard = { 
          suit: suits[Math.floor(Math.random() * 4)], 
          value: highCard.value, 
          numValue: highCard.numValue 
        };
      } else {
        newCard = getRandomCard();
      }
    } else {
      newCard = getRandomCard();
    }
    
    newPlayerHand.push(newCard);
    setPlayerHand(newPlayerHand);
    
    const newResult = calculateScore(newPlayerHand);
    setPlayerScore(newResult.score);

    if (newResult.score > 21) {
      setGameState("game-over");
      setResultMessage(`Bust! You lose with ${newResult.score}`);
    }
  };

  const stand = () => {
    if (gameState !== "playing") return;
    
    setGameState("dealer-turn");
    
    const finalPlayerResult = calculateScore(playerHand);
    const finalPlayerScore = finalPlayerResult.score;
    
    // Build a rigged dealer hand that beats the player
    const riggedDealerHand = [...dealerHand];
    
    // Add second card (revealing hole card)
    riggedDealerHand.push(getRandomCard());
    setDealerHand(riggedDealerHand);
    
    let currentHand = [...riggedDealerHand];
    let drawCount = 0;
    
    // Dealer draws until they beat player or reach hard 17+
    const dealerDrawInterval = setInterval(() => {
      const currentResult = calculateScore(currentHand);
      const currentScore = currentResult.score;
      
      // Check if dealer must hit (less than 17 OR soft 17)
      const mustHit = currentScore < 17 || (currentScore === 17 && currentResult.isSoft);
      
      // Check if dealer has won
      const hasWon = currentScore > finalPlayerScore && currentScore <= 21;
      const hasTied = currentScore === finalPlayerScore && currentScore === 21;
      
      if ((hasWon || hasTied) && !mustHit) {
        // Dealer wins legitimately!
        clearInterval(dealerDrawInterval);
        setDealerHand(currentHand);
        setDealerScore(currentScore);
        setGameState("game-over");
        
        if (currentScore > finalPlayerScore) {
          setResultMessage(`Dealer wins ${currentScore} to ${finalPlayerScore}!`);
        } else {
          setResultMessage(`Push at ${currentScore}. House wins ties!`);
        }
        return;
      }
      
      // Safety check - prevent infinite loop
      if (drawCount > 10) {
        clearInterval(dealerDrawInterval);
        setDealerHand(currentHand);
        setDealerScore(currentScore);
        setGameState("game-over");
        setResultMessage(`Dealer wins ${currentScore} to ${finalPlayerScore}! (House always wins)`);
        return;
      }
      
      // RIGGED: Calculate the perfect card to give dealer
      let perfectCard: Card | null = null;
      
      // Target: Get dealer to beat player with score between 17-21
      // Priority 1: Try to get exactly playerScore + 1 (or 21 if player has 21)
      const idealTarget = finalPlayerScore === 21 ? 21 : Math.min(21, finalPlayerScore + 1);
      const idealNeeded = idealTarget - currentScore;
      
      if (idealNeeded >= 1 && idealNeeded <= 11) {
        if (idealNeeded === 11) {
          perfectCard = { suit: suits[0], value: "A", numValue: 11 };
        } else if (idealNeeded === 1) {
          perfectCard = { suit: suits[0], value: "A", numValue: 1 };
        } else if (idealNeeded <= 10) {
          const matchVal = values.find(v => v.numValue === idealNeeded);
          if (matchVal) {
            perfectCard = { suit: suits[0], value: matchVal.value, numValue: matchVal.numValue };
          }
        }
      }
      
      // Priority 2: Try any winning score between 17-21
      if (!perfectCard) {
        for (let target = 21; target >= 17; target--) {
          if (target > finalPlayerScore || (target === 21 && finalPlayerScore === 21)) {
            const needed = target - currentScore;
            if (needed >= 1 && needed <= 11) {
              if (needed === 11 || needed === 1) {
                perfectCard = { suit: suits[0], value: "A", numValue: needed };
                break;
              } else if (needed <= 10) {
                const matchVal = values.find(v => v.numValue === needed);
                if (matchVal) {
                  perfectCard = { suit: suits[0], value: matchVal.value, numValue: matchVal.numValue };
                  break;
                }
              }
            }
          }
        }
      }
      
      // Priority 3: Give a small card to keep drawing (2-4)
      if (!perfectCard) {
        const smallCards = values.filter(v => v.numValue >= 2 && v.numValue <= 4);
        const smallCard = smallCards[Math.floor(Math.random() * smallCards.length)];
        perfectCard = { suit: suits[0], value: smallCard.value, numValue: smallCard.numValue };
      }
      
      // Add the rigged card
      currentHand = [...currentHand, perfectCard];
      setDealerHand([...currentHand]);
      setDealerScore(calculateScore(currentHand).score);
      drawCount++;
    }, 800);
  };

  return (
    <section
      id="resume"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-8 py-24"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full space-y-8"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl font-heading font-light text-foreground tracking-wide text-center"
        >
          Resume
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Lock className="w-6 h-6 text-primary" data-testid="icon-lock" />
                <CardTitle className="text-2xl">Locked Content</CardTitle>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Beat the dealer at Blackjack to unlock the resume
              </p>
              <div className="text-left max-w-md mx-auto bg-muted/30 rounded-lg p-3">
                <p className="text-xs font-semibold text-foreground mb-2">Rules:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Get as close to 21 as possible without going over</li>
                  <li>• Dealer must hit soft 17</li>
                </ul>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Blackjack Game */}
              <div className="space-y-4">
                {/* Dealer's Hand */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    Dealer's Hand {gameState !== "betting" && dealerHand.length > 0 && `(${calculateScore(dealerHand).displayScore})`}
                  </h3>
                  <div className="flex gap-2 flex-wrap min-h-[80px]" data-testid="dealer-hand">
                    {dealerHand.map((card, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.2 }}
                        className="w-16 h-24 bg-background border-2 border-foreground rounded-lg flex flex-col items-center justify-center text-2xl font-bold"
                      >
                        <span>{card.value}</span>
                        <span className={card.suit === "♥" || card.suit === "♦" ? "text-red-500" : ""}>
                          {card.suit}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Player's Hand */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    Your Hand {gameState !== "betting" && playerHand.length > 0 && `(${calculateScore(playerHand).displayScore})`}
                  </h3>
                  <div className="flex gap-2 flex-wrap min-h-[80px]" data-testid="player-hand">
                    {playerHand.map((card, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.2 }}
                        className="w-16 h-24 bg-background border-2 border-foreground rounded-lg flex flex-col items-center justify-center text-2xl font-bold"
                      >
                        <span>{card.value}</span>
                        <span className={card.suit === "♥" || card.suit === "♦" ? "text-red-500" : ""}>
                          {card.suit}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Game Result */}
                {resultMessage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <p className="text-xl font-bold text-destructive" data-testid="text-game-result">
                      {resultMessage}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      The house always wins... Try again? 😏
                    </p>
                  </motion.div>
                )}

                {/* Controls */}
                <div className="flex gap-3 justify-center pt-4">
                  {gameState === "betting" ? (
                    <Button
                      onClick={startNewGame}
                      size="lg"
                      className="gap-2"
                      data-testid="button-deal"
                    >
                      <FileText className="w-4 h-4" />
                      Deal Cards
                    </Button>
                  ) : gameState === "playing" ? (
                    <>
                      <Button
                        onClick={hit}
                        size="lg"
                        variant="default"
                        data-testid="button-hit"
                      >
                        Hit
                      </Button>
                      <Button
                        onClick={stand}
                        size="lg"
                        variant="outline"
                        data-testid="button-stand"
                      >
                        Stand
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={startNewGame}
                      size="lg"
                      className="gap-2"
                      data-testid="button-play-again"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Play Again
                    </Button>
                  )}
                </div>
              </div>

              {/* Locked Resume Preview - Full Page */}
              <div className="relative mt-8 p-8 bg-muted/50 rounded-lg backdrop-blur-sm min-h-[600px]">
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg z-10">
                  <Lock className="w-20 h-20 text-muted-foreground/30" />
                </div>
                <div className="blur-sm select-none opacity-50">
                  {/* Resume Header */}
                  <div className="text-center mb-8 border-b pb-6">
                    <h3 className="text-3xl font-bold mb-2">Christopher James Ichiho</h3>
                    <p className="text-lg mb-3">Software Engineer | Full-Stack Developer | Tech Innovator</p>
                    <p className="text-sm text-muted-foreground">
                      contact@example.com | (555) 123-4567 | Los Angeles, CA | linkedin.com/in/example
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold mb-3 uppercase tracking-wide">Professional Summary</h4>
                    <p className="text-sm leading-relaxed">
                      Innovative software engineer with extensive experience in full-stack development, 
                      cloud architecture, and scalable systems. Proven track record of leading high-impact 
                      projects and delivering robust solutions. Expert in modern web technologies, microservices, 
                      and agile methodologies with a passion for creating exceptional user experiences.
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold mb-3 uppercase tracking-wide">Professional Experience</h4>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-baseline mb-1">
                        <p className="font-semibold">Senior Software Engineer</p>
                        <p className="text-sm text-muted-foreground">2021 - Present</p>
                      </div>
                      <p className="text-sm italic mb-2">Tech Innovations Inc. | San Francisco, CA</p>
                      <ul className="text-sm space-y-1 ml-5 list-disc">
                        <li>Led development of cloud-native applications serving 2M+ users</li>
                        <li>Architected microservices infrastructure reducing latency by 60%</li>
                        <li>Mentored team of 8 junior developers in best practices</li>
                        <li>Implemented CI/CD pipelines improving deployment efficiency by 75%</li>
                      </ul>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-baseline mb-1">
                        <p className="font-semibold">Full-Stack Developer</p>
                        <p className="text-sm text-muted-foreground">2018 - 2021</p>
                      </div>
                      <p className="text-sm italic mb-2">Digital Solutions Corp | Boston, MA</p>
                      <ul className="text-sm space-y-1 ml-5 list-disc">
                        <li>Developed responsive web applications using React and Node.js</li>
                        <li>Optimized database queries reducing load times by 45%</li>
                        <li>Collaborated with UX team to enhance user engagement by 30%</li>
                        <li>Integrated third-party APIs for payment processing and analytics</li>
                      </ul>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold mb-3 uppercase tracking-wide">Education</h4>
                    
                    <div className="mb-3">
                      <div className="flex justify-between items-baseline mb-1">
                        <p className="font-semibold">Master of Science in Computer Science</p>
                        <p className="text-sm text-muted-foreground">2016 - 2018</p>
                      </div>
                      <p className="text-sm">Harvard University | Cambridge, MA</p>
                      <p className="text-xs text-muted-foreground">GPA: 3.9/4.0 | Focus: Distributed Systems</p>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <p className="font-semibold">Bachelor of Science in Computer Science</p>
                        <p className="text-sm text-muted-foreground">2012 - 2016</p>
                      </div>
                      <p className="text-sm">Boston University | Boston, MA</p>
                      <p className="text-xs text-muted-foreground">GPA: 3.8/4.0 | Magna Cum Laude</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold mb-3 uppercase tracking-wide">Technical Skills</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm font-semibold mb-1">Languages:</p>
                        <p className="text-xs">JavaScript, TypeScript, Python, Java, Go, SQL</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-1">Frameworks:</p>
                        <p className="text-xs">React, Node.js, Express, Django, Spring Boot</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-1">Cloud & DevOps:</p>
                        <p className="text-xs">AWS, Docker, Kubernetes, Jenkins, Terraform</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-1">Databases:</p>
                        <p className="text-xs">PostgreSQL, MongoDB, Redis, DynamoDB</p>
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h4 className="text-lg font-bold mb-3 uppercase tracking-wide">Certifications</h4>
                    <ul className="text-sm space-y-1">
                      <li>• AWS Certified Solutions Architect - Professional</li>
                      <li>• Google Cloud Professional Developer</li>
                      <li>• Certified Kubernetes Administrator (CKA)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
