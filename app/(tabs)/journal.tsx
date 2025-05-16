import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {IconSymbol} from '@/components/ui/IconSymbol';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {LinearGradient} from 'expo-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Experience, Ingestion} from "@/constants/DataTypes";

const sampleData = require('@/constants/localdata/experiences.json');

const substanceColors: Record<string, string> = {
  "Unknown": '#BDBDBD'
}; // Replace with your actual substance colors

export default function JournalScreen() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;
  const textColor = colorScheme === 'dark' ? '#fff' : '#000';
  const searchBgColor = colorScheme === 'dark' ? '#1c1c1e' : '#f2f2f2';
  const searchPlaceholderColor = colorScheme === 'dark' ? '#666' : '#8e8e93';


  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Experience[]>([]); // Initialize as empty array
  const navigation = useNavigation();

  // --- Data Processing Functions (Adjust to your data structure) ---
  const formatDateTime = (unixTimestamp: number): string => {
    const date = new Date(unixTimestamp);
    return `${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()]}, ${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  };

  const extractSubstanceNames = (ingestions: Ingestion[]): string[] => {
    return [...new Set(ingestions.map(ingestion => ingestion.substanceName))];
  };

  const extractConsumerNames = (ingestions: Ingestion[]): string[] => {
    const consumers = ingestions
        .filter(ingestion => ingestion.consumerName && ingestion.consumerName !== 'null')
        .map(ingestion => ingestion.consumerName as string);

    return [...new Set(consumers)];
  };

  const determineGradientColors = (substanceNames: string[]): [string, string] => {
    const colors = substanceNames.map(
        (substance) => substanceColors[substance] || substanceColors["Unknown"]
    );

    if (colors.length === 0) return [substanceColors["Unknown"], substanceColors["Unknown"]];
    if (colors.length === 1) return [colors[0], colors[0]];
    return [colors[0], colors[1]];
  };

  const formatSubstances = (substances: string[]): string => {
    if (!substances.length) return "Unknown";
    if (substances.length === 1) return substances[0];
    const substancesCopy = [...substances];
    const lastSubstance = substancesCopy.pop();
    return `${substancesCopy.join(', ')}, and ${lastSubstance}`;
  };

  // --- Effects ---
  useEffect(() => {
    // Sort data (newest first)
    const sortedData = [...sampleData].sort((a, b) => (b.sortDate || b.creationDate) - (a.sortDate || a.creationDate));

    // Filter data
    if (!searchQuery.trim()) {
      setFilteredData(sortedData);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    // Filters first by title, then by location, then by substance, and finally by consumer name
    const filtered = sortedData.filter((experience) => {
      if (experience.title && experience.title.toLowerCase().includes(query)) return true;
      if (experience.location?.name && experience.location.name.toLowerCase().includes(query)) return true;
      const substanceMatch = experience.ingestions.some((ingestion: Ingestion) => ingestion.substanceName.toLowerCase().includes(query));
      if (substanceMatch) return true;
      const consumerMatch = experience.ingestions.some((ingestion: Ingestion) => ingestion.consumerName && ingestion.consumerName.toLowerCase().includes(query));
      if (consumerMatch) return true;
      return false;
    });

    setFilteredData(filtered);

  }, [searchQuery]);

  /**
   * Shorthand to navigate to the experience details page.
   * @param {Experience} experience - takes in an experience interface object to pass along to the ExperienceDetails screen
   */
  const openExperienceDetail = (experience: Experience) => {
    // @ts-ignore some weirdness about navigations. Remove if update.
    navigation.navigate('screens/ExperienceDetails', { experience }); // todo: link this to another experience details screen
  };


  // --- Render Item ---
  const renderItem = ({ item }: { item: Experience }) => {
    const substanceNames = extractSubstanceNames(item.ingestions);
    const consumerNames = extractConsumerNames(item.ingestions);

    const consumerText = consumerNames.length && consumerNames[0] !== 'null'
        ? `${consumerNames.join(', ')}`
        : '';

    const locationText = item.location?.name
        ? `${item.location.name}`
        : '';

    const gradientColors = determineGradientColors(substanceNames);
    const startTime = formatDateTime(item.sortDate || item.creationDate);

    return (
        <TouchableOpacity
            style={[styles.itemContainer, { backgroundColor: searchBgColor}]}
            onPress={() => openExperienceDetail(item)}
        >
          {/* Vertical gradient bar on the left */}
          <LinearGradient colors={gradientColors} style={styles.gradientBar} />

          {/* Content section */}
          <View style={styles.content}>
            {/* Title and Substances */}
            <Text style={[styles.listTitle, {color: textColor}]}>{item.title || "Unnamed Experience"}</Text>
            <Text style={styles.substances}>
              {formatSubstances(substanceNames)}
            </Text>

            {/* Consumers and Location */}
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {consumerText ? (
                    <>
                      <IconSymbol
                          name="person.2.fill"
                          color={Colors[colorScheme ?? 'light'].metaText}
                          size={20}
                          style={styles.icon}
                      />
                      <Text
                          style={[
                            styles.meta,
                            {
                              color: Colors[colorScheme ?? 'light'].metaText,
                              marginLeft: 4,
                              alignSelf: 'flex-start', // Crucial for text alignment
                            },
                          ]}
                      >
                        {consumerText}
                      </Text>
                    </>
                ) : (
                    <View style={{ width: 24 }} /> // Placeholder for icon space
                )}
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={[styles.date, { color: Colors[colorScheme ?? 'light'].dateText, flex: 1 }]}>{startTime}</Text>
                {locationText ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <IconSymbol name="mappin" size={16} color={textColor} />
                      <Text
                          style={[
                            styles.meta,
                            {
                              color: Colors[colorScheme ?? 'light'].metaText,
                              marginLeft: 4,
                              alignSelf: 'flex-start', // Crucial for text alignment
                            },
                          ]}
                      >
                        {locationText}
                      </Text>
                    </View>
                ) : null}
              </View>
            </View>
          </View>
          {/* Arrow Icon */}
          <IconSymbol name="chevron.forward" size={24} color="#aaa" />
        </TouchableOpacity>
    );
  };


  const searchBarStyle = useMemo(() => [
    styles.searchContainer,
    {
      backgroundColor: searchBgColor,
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? '#2c2c2e' : '#e5e5ea',
    }
  ], [searchBgColor, colorScheme]);

  return (

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>Journal</Text>
          <View style={styles.leftIcons}>
            <Pressable style={styles.iconButton}>
              <IconSymbol
                  name="star"
                  size={28}
                  color={tintColor}
                  style={styles.icon}
              />
            </Pressable>
            <Pressable style={styles.iconButton}>
              <IconSymbol
                  name="stopwatch"
                  size={28}
                  color={tintColor}
                  style={styles.icon}
              />
            </Pressable>
            <Pressable style={styles.iconButton}>
              <IconSymbol
                  name="calendar"
                  size={28}
                  color={tintColor}
              />
            </Pressable>
          </View>
        </View>

        {/* Search Bar */}
        <View style={searchBarStyle}>
          <IconSymbol
              name="magnifyingglass"
              size={20}
              color={searchPlaceholderColor}
              style={styles.searchIcon}
          />
          <TextInput
              style={[styles.searchInput, { color: textColor }]}
              placeholder="Search experiences"
              placeholderTextColor={searchPlaceholderColor}
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="while-editing"
          />
        </View>

        {/* Results Count */}
        <Text style={styles.resultCount}>
          {filteredData.length} experience{filteredData.length !== 1 ? 's' : ''}
        </Text>

        {/* Experiences List */}
        <FlatList
            data={filteredData}
            keyExtractor={(item) => item.creationDate.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={true}
        />
        {/* add experience button */}
        <TouchableOpacity
            style={[styles.fab]}
            onPress={() => {}}
        >
          <IconSymbol
              name="plus"
              size={28}
              color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  icon: {
    marginRight: 2,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2,
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    fontWeight: '400',
    ...Platform.select({
      web: {
        outline: 'none',
      },
    }),
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom:4
  },
  resultCount: {
    marginLeft: 16,
    marginVertical: 8,
    fontSize: 14,
    color: '#777',
  },
  listContainer: {
    paddingBottom: 150, // add extra so row doesnt get hidden by tabs
    paddingHorizontal: 2,
    paddingTop: 0,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  gradientBar: {
    width: 6,
    height: '100%',
    borderRadius: 4,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  substances: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    marginTop: 6,
  },
  fab: {
    position: 'absolute',
    bottom: 95,
    left: '50%',
    marginLeft: -28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
    zIndex: 1000,
  },
});