import { IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react'
import "./pokemonCards.css"

interface PokemonProps {
    pokemon: {
        id: number,
        name: string,
        sprites: {
            other: {
                home: {
                    front_default: string
                }
            }
        },
        weight: number,
        height: number,
        base_experience: number,
        abilities: {
            ability: {
                name: string
            }
        }[],
    }
}

export const PokemonCards: React.FC<PokemonProps> = ({ pokemon }) => {
    return (
        <IonCard className='ion-text-center'>
            <img width={100} src={pokemon.sprites.other.home.front_default} alt={pokemon.name} />
            <IonCardHeader>
                <IonCardTitle className='card-title'>{pokemon.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className='card-content' >
                <section>
                    Weight: {pokemon.weight} | Height: {pokemon.height} | Experience: {pokemon.base_experience}
                </section>
                <section className='abilities'>
                    {pokemon.abilities.map(({ ability }) => (
                        <IonBadge key={ability.name} >{ability.name}</IonBadge>
                    ))}
                </section>
            </IonCardContent>
        </IonCard>
    )
}
