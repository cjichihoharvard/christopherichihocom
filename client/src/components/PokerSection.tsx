import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingDown, TrendingUp } from "lucide-react";

//todo: remove mock functionality
const mockHands = [
  {
    id: 1,
    hand: "A♠ A♥",
    situation: "All-in pre-flop",
    opponent: "K♣ K♦",
    board: "K♠ 9♣ 2♦ 5♥ 7♣",
    result: "lost",
    stakes: "$500",
    date: "March 20, 2025",
  },
  {
    id: 2,
    hand: "Q♦ Q♠",
    situation: "Called all-in on river",
    opponent: "8♥ 3♥",
    board: "9♥ 6♥ 2♣ K♠ 4♥",
    result: "lost",
    stakes: "$350",
    date: "March 18, 2025",
  },
  {
    id: 3,
    hand: "7♣ 2♦",
    situation: "Bluff gone right",
    opponent: "A♣ K♠",
    board: "5♥ 9♦ J♣ 3♠ 6♥",
    result: "won",
    stakes: "$200",
    date: "March 15, 2025",
  },
];

export default function PokerSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [filter, setFilter] = useState<"all" | "won" | "lost">("all");

  const filteredHands = mockHands.filter(
    (hand) => filter === "all" || hand.result === filter
  );

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-8 py-24"
      id="poker"
    >
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl md:text-5xl font-heading font-light text-foreground tracking-wide mb-8 text-center"
        >
          Aaaargh Poker!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground mb-12"
        >
          A collection of memorable hands—both triumphs and disasters
        </motion.p>

        <div className="flex justify-center gap-4 mb-12">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            data-testid="filter-all"
          >
            All Hands
          </Button>
          <Button
            variant={filter === "won" ? "default" : "outline"}
            onClick={() => setFilter("won")}
            data-testid="filter-won"
          >
            Wins
          </Button>
          <Button
            variant={filter === "lost" ? "default" : "outline"}
            onClick={() => setFilter("lost")}
            data-testid="filter-lost"
          >
            Bad Beats
          </Button>
        </div>

        <div className="space-y-6">
          {filteredHands.map((hand, index) => (
            <motion.div
              key={hand.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              data-testid={`poker-hand-${hand.id}`}
            >
              <Card className="p-6 hover-elevate">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-mono font-bold text-foreground">
                        {hand.hand}
                      </h3>
                      <Badge variant={hand.result === "won" ? "default" : "destructive"}>
                        {hand.result === "won" ? (
                          <><TrendingUp className="w-3 h-3 mr-1" /> Win</>
                        ) : (
                          <><TrendingDown className="w-3 h-3 mr-1" /> Loss</>
                        )}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{hand.date}</span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-semibold text-foreground">Situation:</span> {hand.situation}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-semibold text-foreground">Opponent:</span>{" "}
                        <span className="font-mono">{hand.opponent}</span>
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-semibold text-foreground">Board:</span>{" "}
                        <span className="font-mono">{hand.board}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">{hand.stakes}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
