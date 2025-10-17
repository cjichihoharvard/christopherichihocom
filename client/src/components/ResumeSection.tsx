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
    
    // Dealer reveals hidden card and draws
    const newDealerHand = [...dealerHand];
    newDealerHand.push(getRandomCard()); // Second card
    setDealerHand(newDealerHand);
    
    const finalPlayerResult = calculateScore(playerHand);
    const finalPlayerScore = finalPlayerResult.score;
    
    // Dealer draws until they reach hard 17 or more (must hit on soft 17)
    let dealerDrawInterval = setInterval(() => {
      setDealerHand(current => {
        const currentResult = calculateScore(current);
        const currentScore = currentResult.score;
        
        // Dealer must hit on soft 17, must stand on hard 17+
        const mustHit = currentScore < 17 || (currentScore === 17 && currentResult.isSoft);
        
        // Dealer must stand on hard 17+ (17-21)
        if (!mustHit) {
          clearInterval(dealerDrawInterval);
          setGameState("game-over");
          setDealerScore(currentScore);
          
          // REAL blackjack outcomes only - dealer must beat player legitimately
          if (currentScore > finalPlayerScore) {
            setResultMessage(`Dealer wins ${currentScore} to ${finalPlayerScore}!`);
          } else if (currentScore === finalPlayerScore) {
            // Push - dealer wins in this rigged game
            setResultMessage(`Push at ${currentScore}. House wins ties!`);
          } else {
            // This should NEVER happen with proper rigging
            setResultMessage(`ERROR: Dealer has ${currentScore}, you have ${finalPlayerScore}`);
          }
          return current;
        }
        
        // Dealer must hit - RIGGED to get perfect card to beat or tie player within 17-21
        let newCard: Card | undefined;
        
        // If player has 21, dealer must get exactly 21 to push (and win the push)
        // If player has less, dealer must get higher than player but ≤21
        const targetScore = finalPlayerScore === 21 ? 21 : Math.min(21, finalPlayerScore + 1);
        
        // Try to hit the exact target score first
        const neededValue = targetScore - currentScore;
        
        if (neededValue >= 1 && neededValue <= 11) {
          // We can reach target with a single card
          if (neededValue === 11) {
            newCard = { suit: suits[Math.floor(Math.random() * 4)], value: "A", numValue: 11 };
          } else if (neededValue === 1) {
            newCard = { suit: suits[Math.floor(Math.random() * 4)], value: "A", numValue: 1 };
          } else if (neededValue <= 10) {
            const matchingValue = values.find(v => v.numValue === neededValue);
            if (matchingValue) {
              newCard = { suit: suits[Math.floor(Math.random() * 4)], value: matchingValue.value, numValue: matchingValue.numValue };
            }
          }
        }
        
        // If we can't hit exact target, try to get into 17-21 range that beats player
        if (!newCard) {
          // Try any score from 21 down to max(17, playerScore+1)
          const minAcceptable = Math.max(17, finalPlayerScore + 1);
          for (let tryScore = 21; tryScore >= minAcceptable; tryScore--) {
            const tryValue = tryScore - currentScore;
            if (tryValue >= 1 && tryValue <= 11) {
              if (tryValue === 11 || tryValue === 1) {
                newCard = { suit: suits[Math.floor(Math.random() * 4)], value: "A", numValue: tryValue };
                break;
              } else if (tryValue <= 10) {
                const matchingValue = values.find(v => v.numValue === tryValue);
                if (matchingValue) {
                  newCard = { suit: suits[Math.floor(Math.random() * 4)], value: matchingValue.value, numValue: matchingValue.numValue };
                  break;
                }
              }
            }
          }
        }
        
        // If still no card found (shouldn't happen), give a low card to keep drawing
        if (!newCard) {
          const lowCard = values.find(v => v.numValue <= 4);
          newCard = lowCard 
            ? { suit: suits[0], value: lowCard.value, numValue: lowCard.numValue }
            : getRandomCard();
        }
        
        const newHand = [...current, newCard];
        const newResult = calculateScore(newHand);
        setDealerScore(newResult.score);
        return newHand;
      });
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

              {/* Locked Resume Preview */}
              <div className="relative mt-8 p-6 bg-muted/50 rounded-lg backdrop-blur-sm">
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
                  <Lock className="w-16 h-16 text-muted-foreground/30" />
                </div>
                <div className="blur-sm select-none opacity-50">
                  <h3 className="text-xl font-bold mb-4">Christopher James Ichiho</h3>
                  <p className="text-sm mb-2">Software Engineer | Full-Stack Developer</p>
                  <div className="space-y-2">
                    <p className="text-xs">Education: Harvard University, Boston University</p>
                    <p className="text-xs">Skills: React, TypeScript, Node.js, Python...</p>
                    <p className="text-xs">Experience: Senior Developer at...</p>
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
