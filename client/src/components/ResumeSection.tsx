import { useState, useEffect } from "react";
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

type GameResult = "win" | "lose" | "push" | null;

export default function ResumeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameResult, setGameResult] = useState<GameResult>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);

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

  const calculateScore = (hand: Card[]): number => {
    let score = 0;
    let aces = 0;

    hand.forEach((card) => {
      score += card.numValue;
      if (card.value === "A") aces++;
    });

    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }

    return score;
  };

  const simulateGame = () => {
    setIsSimulating(true);
    setGameResult(null);

    // Deal initial hands
    const initialPlayerHand = [getRandomCard(), getRandomCard()];
    const initialDealerHand = [getRandomCard(), getRandomCard()];

    setPlayerHand(initialPlayerHand);
    setDealerHand(initialDealerHand);

    let currentPlayerHand = [...initialPlayerHand];
    let currentDealerHand = [...initialDealerHand];

    setTimeout(() => {
      // Player's turn - rigged to make decent but losing hands
      let playerTotal = calculateScore(currentPlayerHand);
      
      // Player might hit once or twice but won't beat dealer
      while (playerTotal < 17 && Math.random() > 0.3) {
        const newCard = getRandomCard();
        currentPlayerHand.push(newCard);
        playerTotal = calculateScore(currentPlayerHand);
        setPlayerHand([...currentPlayerHand]);
      }

      setTimeout(() => {
        // Dealer's turn - rigged to always win
        let dealerTotal = calculateScore(currentDealerHand);
        
        // If player busted, dealer wins immediately
        if (playerTotal > 21) {
          setPlayerScore(playerTotal);
          setDealerScore(dealerTotal);
          setGameResult("lose");
          setIsSimulating(false);
          return;
        }

        // Dealer keeps hitting until they beat player (but not bust if possible)
        while (dealerTotal < playerTotal || (dealerTotal === playerTotal && dealerTotal < 21)) {
          const newCard = getRandomCard();
          currentDealerHand.push(newCard);
          dealerTotal = calculateScore(currentDealerHand);
          setDealerHand([...currentDealerHand]);
          
          // If dealer would bust, give them a perfect card instead (rigged!)
          if (dealerTotal > 21 && dealerTotal < 31) {
            // Replace last card with a perfect card
            const needed = 21 - calculateScore(currentDealerHand.slice(0, -1));
            const perfectCard = {
              suit: suits[Math.floor(Math.random() * suits.length)],
              value: needed <= 10 ? needed.toString() : needed === 11 ? "A" : "K",
              numValue: needed,
            };
            currentDealerHand[currentDealerHand.length - 1] = perfectCard;
            dealerTotal = calculateScore(currentDealerHand);
            setDealerHand([...currentDealerHand]);
          }
        }

        setPlayerScore(playerTotal);
        setDealerScore(dealerTotal);

        // Dealer always wins (rigged!)
        if (dealerTotal > playerTotal && dealerTotal <= 21) {
          setGameResult("lose");
        } else if (dealerTotal === playerTotal) {
          // Even on a push, make dealer win by giving them one more perfect card
          const perfectCard = {
            suit: suits[0],
            value: "A",
            numValue: 1,
          };
          currentDealerHand.push(perfectCard);
          setDealerHand([...currentDealerHand]);
          setDealerScore(dealerTotal + 1);
          setGameResult("lose");
        } else {
          setGameResult("lose");
        }

        setIsSimulating(false);
      }, 1500);
    }, 1000);
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
              <p className="text-muted-foreground text-sm">
                Beat the dealer at Blackjack to unlock the resume
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Blackjack Game */}
              <div className="space-y-4">
                {/* Dealer's Hand */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    Dealer's Hand {dealerScore > 0 && `(${dealerScore})`}
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
                    Your Hand {playerScore > 0 && `(${playerScore})`}
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
                {gameResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <p className="text-xl font-bold text-destructive" data-testid="text-game-result">
                      You Lose! Dealer wins {dealerScore} to {playerScore}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      The house always wins... Try again? 😏
                    </p>
                  </motion.div>
                )}

                {/* Controls */}
                <div className="flex gap-3 justify-center pt-4">
                  <Button
                    onClick={simulateGame}
                    disabled={isSimulating}
                    size="lg"
                    className="gap-2"
                    data-testid="button-play-blackjack"
                  >
                    {isSimulating ? (
                      <>
                        <RotateCcw className="w-4 h-4 animate-spin" />
                        Simulating...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4" />
                        {gameResult ? "Try Again" : "Play Blackjack"}
                      </>
                    )}
                  </Button>
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
