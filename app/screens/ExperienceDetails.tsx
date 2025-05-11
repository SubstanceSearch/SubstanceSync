import React from 'react';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {Experience} from '@/constants/DataTypes';
import {useNavigation, useRoute} from '@react-navigation/native';
import {IconSymbol} from "@/components/ui/IconSymbol";
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";

const { width } = Dimensions.get('window');

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
})