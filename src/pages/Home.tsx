import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCol,
  IonGrid,
  IonRow,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail
} from '@ionic/react';
import { chevronDownCircleOutline } from 'ionicons/icons';

import { useEffect, useState } from 'react';
import './Home.css';
import { PokemonCards } from '../components/PokemonCards';
const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([])
  const [offset, setOffset] = useState<number>(0)
  const [actualPage, setActualPage] = useState<number>(1)

  const API_URL = "https://pokeapi.co/api/v2/pokemon"
  useEffect(() => {
    fetchData()
  }, [offset])

  const fetchData = async (limit = 20): Promise<void> => {
    try {
      const res = await fetch(`${API_URL}?limit=${limit}&offset=${offset}`)
      const resJson = await res.json()

      const promises = resJson.results.map(async (pokemon: { name: string, url: string }) => {
        const res = await fetch(pokemon.url)
        const resJson = await res.json()
        return resJson
      })

      const results = await Promise.all(promises)

      setPokemons(results)

    } catch (error) {
      console.log(error)
    }
  }

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    fetchData()
    event.detail.complete()
}
return (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>PokemonAPP</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className='ion-padding'>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent
          pullingIcon={chevronDownCircleOutline}
          pullingText="Pull to refresh pokemons"
          refreshingSpinner="circles"
          refreshingText="Refreshing..."
        ></IonRefresherContent>
      </IonRefresher>
      <IonGrid>
        <IonRow className='ion-justify-content-center'>
          {
            pokemons.map((pokemon) => (
              <PokemonCards key={pokemon.id} pokemon={pokemon} />
            ))
          }
        </IonRow>
        <IonRow className='ion-text-center ion-align-items-center'>
          <IonCol>
            <IonButton onClick={() => {
              if (offset > 0) {
                setOffset(offset - 20)
                setActualPage(actualPage - 1)
              }
            }}>Prev</IonButton>
            <span className='ion-padding '>{actualPage}</span>
            <IonButton onClick={() => {
              setOffset(offset + 20)
              setActualPage(actualPage + 1)
            }}>
              Next
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
);
};

export default Home;
