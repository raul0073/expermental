
import TeamLogo from "./TeamLogo";

type Props = {
  teamName?: string;
  leagueName?: string;
};



const TeamHeader: React.FC<Props> = ({
  teamName = "Top 5 Leagues Mental Ranking",
  leagueName = "Visualize a team mental strength, balance and key performers across leagues.",
}) => {
   
  
  return (
      <header className="flex flex-col">
            {/* Title + Subtitle */}
            <div className="p-1  gap-6 md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex justify-between gap-3 items-center leading-tight tracking-tighter">
                     <div className="header flex items-center gap-2">
                         <span> {<TeamLogo teamName={teamName} league={leagueName} size="lg" />}</span>
                       <h1 className="text-xl md:text-4xl font-bold tracking-tight
                       bg-gradient-to-r from-stone-800 to-zinc-600 bg-clip-text text-transparent
                       dark:bg-gradient-to-r dark:from-stone-300 dark:to-zinc-400
                       ">
                     {teamName} Mental Ranking
                </h1>
                     </div>
              
                </div>
              
                
            </div>
        </header>
   
  );
};

export default TeamHeader;
