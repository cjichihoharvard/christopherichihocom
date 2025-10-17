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

        <motion.div 
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {[
            { value: "all", label: "All Hands", testId: "filter-all" },
            { value: "won", label: "Wins", testId: "filter-won" },
            { value: "lost", label: "Bad Beats", testId: "filter-lost" },
          ].map((item) => (
            <motion.div
              key={item.value}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={filter === item.value ? "default" : "outline"}
                onClick={() => setFilter(item.value as any)}
                data-testid={item.testId}
              >
                {item.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <div className="space-y-6">
          {filteredHands.map((hand, index) => (
            <motion.div
              key={hand.id}
              initial={{ opacity: 0, rotateX: -20, y: 50 }}
              animate={isInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 80
              }}
              whileHover={{ scale: 1.03 }}
              style={{ transformStyle: "preserve-3d" }}
              data-testid={`poker-hand-${hand.id}`}
            >
              <Card className="p-6 hover-elevate relative overflow-hidden">
                <motion.div
                  className={`absolute inset-0 ${hand.result === "won" ? "bg-primary/5" : "bg-destructive/5"}`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="flex items-start justify-between gap-4 flex-wrap relative z-10">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <motion.h3 
                        className="text-2xl font-mono font-bold text-foreground"
                        whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
                      >
                        {hand.hand}
                      </motion.h3>
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Badge variant={hand.result === "won" ? "default" : "destructive"}>
                          {hand.result === "won" ? (
                            <><TrendingUp className="w-3 h-3 mr-1" /> Win</>
                          ) : (
                            <><TrendingDown className="w-3 h-3 mr-1" /> Loss</>
                          )}
                        </Badge>
                      </motion.div>
                      <span className="text-sm text-muted-foreground">{hand.date}</span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <motion.p 
                        className="text-muted-foreground"
                        whileHover={{ x: 5 }}
                      >
                        <span className="font-semibold text-foreground">Situation:</span> {hand.situation}
                      </motion.p>
                      <motion.p 
                        className="text-muted-foreground"
                        whileHover={{ x: 5 }}
                      >
                        <span className="font-semibold text-foreground">Opponent:</span>{" "}
                        <span className="font-mono">{hand.opponent}</span>
                      </motion.p>
                      <motion.p 
                        className="text-muted-foreground"
                        whileHover={{ x: 5 }}
                      >
                        <span className="font-semibold text-foreground">Board:</span>{" "}
                        <span className="font-mono">{hand.board}</span>
                      </motion.p>
                    </div>
                  </div>
                  
                  <motion.div 
                    className="text-right"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <p className="text-2xl font-bold text-foreground">{hand.stakes}</p>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
