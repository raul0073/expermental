"use client";

import { Player } from "@/app/(main)/(dashboard)/utils/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { ROLES_FULL_TEXT } from "@/lib/labels/labels";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TeamLogo from "../../components/header/TeamLogo";
import PlayerInfoAndStats from "./PlayerInfoAndStats";
import PlayerLinkToFbref from "./PlayerLinkToFbref";

type PlayerHeaderProps = {
  player: Player;
  league?: string;
};

const PlayerHeader: React.FC<PlayerHeaderProps> = ({ player }) => {
  const { ref, inView } = useInView({
    threshold: 0.3, // triggers when 30% of info section visible
    triggerOnce: false,
  });

  return (
    <>
      {/* Sticky Header */}
      <motion.div
        initial={false}
        animate={{
          paddingTop: inView ? "1rem" : "0.5rem",
          paddingBottom: inView ? "1rem" : "0.5rem",
          backgroundColor: "hsl(var(--background) / 0.9)",
          backdropFilter: "blur(12px)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="sticky top-0 z-20 border-b"
      >
        <CardHeader className="relative w-full flex flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <motion.div
              animate={{
                width: inView ? "6rem" : "3rem",
                height: inView ? "6rem" : "3rem",
              }}
              transition={{ duration: 0.3 }}
            >
              <Avatar className="h-full w-full shadow-lg ring-2 ring-primary dark:ring-primary/50">
                <AvatarImage src={player.profile_img as string} alt={player.name} />
                <AvatarFallback className="text-xl sm:text-2xl font-bold">
                  {player.name[0]}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <motion.div
              animate={{
                fontSize: inView ? "1.5rem" : ".7rem",
                lineHeight: inView ? "2rem" : "1rem",
              }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-start "
            >
              <CardDescription className={cn("font-extrabold", inView && "text-xl")}>
                {player.name} {!inView && (
                  <span className="text-muted-foreground font-thin text-xs">({player.foot})</span>
                )}
              </CardDescription>
              <div>
                {!inView && (
                  <div className=" w-full flex justify-between items-center">
                    <div className="info text-muted-foreground">
                      {player.role && <p className="text-foreground/80">{ROLES_FULL_TEXT[player.role] || player.role}, {player.age} years old.</p>}
                    </div>
                    {player.__meta__?.team && (
                      <div className="opacity-45 absolute right-3 top-1/2 -translate-y-1/2">
                        <TeamLogo
                          teamName={player.__meta__?.team}
                          league={player.__meta__?.league}
                          size="sm"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              {!inView && <PlayerLinkToFbref player={player} />}
            </motion.div>
          </div>
        </CardHeader>
      </motion.div>

      {/* Player info and stats */}
      <div ref={ref} className="w-full px-4 sm:px-6 lg:px-8 my-4">
        <PlayerInfoAndStats player={player} />
      </div>
    </>
  );
};

export default PlayerHeader;
