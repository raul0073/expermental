import { Player } from '@/app/(main)/(dashboard)/utils/types'

function PlayerLinkToFbref({player}: {player: Player}) {
    if(!player.fbref_url) return <p>Link broken</p>
  return (
     
          <p>
            <a
              href={player.fbref_url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-1 top-0 text-blue-600 hover:underline font-medium"
            >
              View on FBref
            </a>
          </p>
        
  )
}

export default PlayerLinkToFbref
