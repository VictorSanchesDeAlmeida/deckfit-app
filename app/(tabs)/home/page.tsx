import { Container } from "@/components/ui/container";
import { SearchBar } from "@/components/ui/search-bar";
import { Section } from "@/components/ui/section";
import { useUser } from "@/context/user-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type Deck = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  countCards: number;
};

const mockDecks: Deck[] = [
  {
    id: "1",
    title: "Treino de Jiu-Jitsu",
    description: "Focado em quedas e drills",
    icon: "cards",
    countCards: 42,
  },
  {
    id: "2",
    title: "Café da manhã",
    description: "Focado em refeições matinais",
    icon: "silverware-fork-knife",
    countCards: 15,
  },
  {
    id: "3",
    title: "Rotina de estudos",
    description: "Focado em revisão de matérias",
    icon: "book-open-variant",
    countCards: 30,
  },
  {
    id: "4",
    title: "Treino de corrida",
    description: "Focado em resistência e velocidade",
    icon: "run",
    countCards: 25,
  },
  {
    id: "5",
    title: "Rotina de meditação",
    description: "Focado em mindfulness e relaxamento",
    icon: "meditation",
    countCards: 10,
  },
  {
    id: "6",
    title: "Treino de musculação",
    description: "Focado em hipertrofia e força",
    icon: "dumbbell",
    countCards: 35,
  },
  {
    id: "7",
    title: "Rotina de leitura",
    description: "Focado em livros e artigos",
    icon: "book",
    countCards: 20,
  },
  {
    id: "8",
    title: "Treino de yoga",
    description: "Focado em flexibilidade e equilíbrio",
    icon: "yoga",
    countCards: 18,
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const { user } = useUser();
  const [filteredDecks, setFilteredDecks] = useState<Deck[]>(mockDecks);

  useMemo(() => {
    const filteredDecks = mockDecks.filter(
      (deck) =>
        deck.title.toLowerCase().includes(search.toLowerCase()) ||
        deck.description.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredDecks(filteredDecks);
  }, [search]);

  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>
          Bem vindo de volta, <Text style={styles.name}>{user?.name}</Text>!
        </Text>
        <Text style={styles.subtitle}>
          Vizualize um deck ou comece sua rotina.
        </Text>
        <SearchBar
          placeholder="Pesquisar decks"
          value={search}
          onChange={setSearch}
        />
      </View>
      <Section title="Meus decks">
        {filteredDecks.map((deck) => (
          <View
            key={deck.id}
            style={{
              borderWidth: 1,
              borderColor: "rgba(135, 171, 255, 0.42)",
              borderRadius: 14,
              padding: 12,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 12,

              // Effeito de neon
              backgroundColor: "rgba(132, 223, 255, 0.1)",
              // boxShadow: "0px 0px 10px 0px rgba(185, 236, 255, 0.46)",
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons name={deck.icon} size={20} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#fff" }}>
                {deck.title}
              </Text>
              <Text style={{ fontSize: 14, color: "#b8dfff" }}>
                {deck.description}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "rgba(132, 223, 255, 0.2)",
                borderRadius: 12,
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}
            >
              <Text style={{ fontSize: 12, color: "#84dfff" }}>
                {deck.countCards} cards
              </Text>
            </View>
          </View>
        ))}
      </Section>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    borderWidth: 1,
    borderColor: "transparent",
    // borderBottomColor: "rgba(173, 179, 255, 0.59)",
    boxShadow: "0px 10px 10px -8px rgba(173, 179, 255, 0.59)",
    borderRadius: 14,
    padding: 18,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  name: {
    color: "#84dfff",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#fff",
  },
});
