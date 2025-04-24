import { View, Text, StyleSheet, TextInput, Pressable, Animated } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useMemo } from 'react';

export default function JournalScreen() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;
  const textColor = colorScheme === 'dark' ? '#fff' : '#000';
  const searchBgColor = colorScheme === 'dark' ? '#1c1c1e' : '#f2f2f2';
  const searchPlaceholderColor = colorScheme === 'dark' ? '#666' : '#8e8e93';

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
        </View>
        
        <Pressable style={styles.iconButton}>
          <IconSymbol 
            name="calendar" 
            size={28} 
            color={tintColor} 
          />
        </Pressable>
      </View>

      <Text style={[styles.title, { color: textColor }]}>Journal</Text>
      
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
        />
      </View>

      <Pressable 
        style={[styles.fab, { backgroundColor: tintColor }]}
        onPress={() => {}}
      >
        <IconSymbol 
          name="plus" 
          size={28}
          color="#FFFFFF"
        />
      </Pressable>
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
    marginRight: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
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
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    fontWeight: '400',
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