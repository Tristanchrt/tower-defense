import type { PartyToCreate } from '@/party/domain/PartyToCreate'
import type { PartiesRepository } from '@/party/domain/PartiesRepository'
import type { PartyCreated } from '@/party/domain/PartyCreated'
import type { Party } from '@/party/domain/Party'
import type { PartyPlayersToPlay } from '@/party/domain/PartyPlayersToPlay'
import type { PartyMonstersToPlay } from '@/party/domain/PartyMonsterToPlay'

export class PartyHandler {
  constructor(private partiesRepository: PartiesRepository) {}

  public createParty(partyToCreate: PartyToCreate): PartyCreated {
    const partyCreated = partyToCreate.create()
    this.partiesRepository.saveParty(partyCreated)
    return partyCreated
  }

  public getParties(): Party[] {
    return this.partiesRepository.getParties()
  }

  public getPartyById(id: string): Party {
    return this.partiesRepository.getPartyById(id)
  }

  public toCreateParty(party: PartyCreated): PartyPlayersToPlay {
    const partyPlayerToPlay = party.toPlayersToPlay()
    this.partiesRepository.saveParty(partyPlayerToPlay)
    return partyPlayerToPlay
  }

  public toMonsterParty(party: PartyPlayersToPlay): PartyMonstersToPlay {
    const partyMonsterToPlay = party.toMonsterToPlay()
    this.partiesRepository.saveParty(partyMonsterToPlay)
    return partyMonsterToPlay
  }

  public monsterPlay(party: PartyMonstersToPlay): PartyPlayersToPlay {
    const partyPlayerToPlay = party.play()
    this.partiesRepository.saveParty(partyPlayerToPlay)
    return partyPlayerToPlay
  }
}
