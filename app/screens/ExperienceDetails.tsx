import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Experience, Ingestion } from '@/constants/DataTypes';
import { useRoute, useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import {IconSymbol} from "@/components/ui/IconSymbol";

const { width } = Dimensions.get('window');
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";
interface ExperienceDetailsRouteProps {
  params: {
    experience: Experience;
  };
}

export default function ExperienceDetails() {
  // @ts-ignore
  const route = useRoute<ExperienceDetailsRouteProps>();
  const { experience } = route.params;
  const navigation = useNavigation();

  if (!experience) {
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: Colors[useColorScheme() ?? 'light'].background }]}>
          <View style={[styles.header, { borderColor: Colors[useColorScheme() ?? 'light'].border}]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
              <IconSymbol name="chevron.left" size={28} color="" />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, {color: Colors[useColorScheme() ?? 'light'].text }]}>How did we get here?</Text>
          </View>
          <ScrollView style={styles.scrollView}>
            <Text>Hmmm... No experience was found</Text>
            {/* Bottom spacer */}
            <View style={{ height: 80 }} />
          </ScrollView>
        </SafeAreaView>
    );
  }

  // Group ingestions by consumers

  return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors[useColorScheme() ?? 'light'].background }]}>
        <View style={[styles.header, { borderColor: Colors[useColorScheme() ?? 'light'].border}]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <IconSymbol name="chevron.left" size={28} color="" />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, {color: Colors[useColorScheme() ?? 'light'].text }]}>{experience.title || 'Unnamed Experience'}</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <Text style={[styles.headerTitle, {color:Colors[useColorScheme() ?? 'light'].text }]}>TODO: Make this page</Text>

          {/* Bottom spacer */}
          <View style={{ height: 80 }} />
        </ScrollView>
      </SafeAreaView>
  );
}

// Placeholder function for interaction data (keep this as is or implement your logic)
function getInteractionInfo(substances: string[]) {
  if (substances.length <= 1) {
    return [];
  }

  const interactions = [
    {
      substances: ['MDMA', 'Alcohol'],
      title: 'MDMA + Alcohol: Caution',
      description: 'Alcohol can dehydrate you further when combined with MDMA, increasing risk of overheating and neurotoxicity. Alcohol can also mask the effects of MDMA, leading to excessive consumption.',
      recommendation: 'Avoid combining these substances. If using both, limit alcohol intake significantly and ensure proper hydration.',
      colorStart: '#FF7043',
      colorEnd: '#AB47BC',
      riskLevel: 'high',
    },
    {
      substances: ['Alcohol', 'Ketamine'],
      title: 'Alcohol + Ketamine: Dangerous',
      description: 'This combination significantly increases the risk of nausea, vomiting, and respiratory depression. Both substances are CNS depressants.',
      recommendation: 'Avoid this combination entirely.',
      colorStart: '#FF7043',
      colorEnd: '#42A5F5',
      riskLevel: 'high',
    },
    {
      substances: ['LSD', 'MDMA'],
      title: 'LSD + MDMA: Candy Flip',
      description: 'This combination intensifies both experiences and can increase body load, potential for anxiety, and risk of dehydration.',
      recommendation: 'Use lower doses than you would with either substance alone. Stay hydrated and ensure you have a safe environment.',
      colorStart: '#EF5350',
      colorEnd: '#AB47BC',
      riskLevel: 'moderate',
    },
  ];

  return interactions.filter(interaction => {
    return interaction.substances.every(s => substances.includes(s));
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  closeButton: {
    padding: 8,
    marginRight: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  dateText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
  },
  locationName: {
    fontSize: 16,
    marginBottom: 8,
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 8,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  consumerBlock: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
  },
  consumerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ingestionItem: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  substanceIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  ingestionContent: {
    flex: 1,
  },
  substanceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  doseInfo: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  doseText: {
    fontSize: 14,
    color: '#444',
    marginRight: 2,
  },
  routeText: {
    fontSize: 14,
    color: '#767676',
    fontStyle: 'italic',
  },
  notesText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    fontStyle: 'italic',
  },
  stomachFullnessText: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  graphPlaceholder: {
    height: 200,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphPlaceholderText: {
    color: '#999',
    fontStyle: 'italic',
  },
  interactionCard: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  interactionCardGradient: {
    padding: 16,
  },
  interactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  interactionDescription: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  interactionRecommendation: {
    fontSize: 14,
  },
  experienceText: {
    fontSize: 15,
    lineHeight: 22,
  },
});