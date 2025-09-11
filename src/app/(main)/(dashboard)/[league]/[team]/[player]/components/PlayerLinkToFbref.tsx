import { Player } from '@/app/(main)/(dashboard)/utils/types'

function PlayerLinkToFbref({player}: {player: Player}) {
    if(!player.fbref_url) return <p>Link broken</p>
  return (
     
          <p>
            <a
              href={player.fbref_url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-1 bottom-1 text-blue-600 hover:underline font-medium text-sm"
            >
              View on FBref
            </a>
          </p>
        
  )
}

export default PlayerLinkToFbref
