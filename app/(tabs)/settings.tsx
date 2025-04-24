import { View, Text, StyleSheet, Pressable, Switch, ScrollView } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Constants from 'expo-constants';
import { BlurView } from 'expo-blur';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;
  const textColor = colorScheme === 'dark' ? '#fff' : '#000';
  const sectionBgColor = colorScheme === 'dark' ? 'rgba(28,28,30,0.8)' : 'rgba(255,255,255,0.8)';
  const sectionHeaderColor = colorScheme === 'dark' ? '#666' : '#8e8e93';
  const separatorColor = colorScheme === 'dark' ? 'rgba(44,44,46,0.5)' : 'rgba(229,229,234,0.5)';

  // Get version from app.json via Expo Constants
  const version = Constants.expoConfig?.version || '0.0.0';

  const renderSettingRow = (text: string, icon?: string, rightElement?: React.ReactNode, onPress?: () => void) => (
    <Pressable 
      style={({pressed}) => [
        styles.settingRow,
        pressed && {opacity: 0.7, backgroundColor: colorScheme === 'dark' ? '#2c2c2e' : '#e5e5ea'}
      ]}
      onPress={onPress}
    >
      <View style={styles.settingWithIcon}>
        {icon && (
          <IconSymbol name={icon} size={24} color={tintColor} style={styles.settingIcon} />
        )}
        <Text style={[
          styles.settingText, 
          { color: textColor },
          !icon && { marginLeft: 36 } // Align text when no icon
        ]}>
          {text}
        </Text>
      </View>
      {rightElement}
    </Pressable>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#f2f2f7' }]}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: textColor }]}>Settings</Text>

        <Text style={[styles.sectionHeader, { color: sectionHeaderColor }]}>PRIVACY</Text>
        <BlurView intensity={20} style={[styles.section, { backgroundColor: sectionBgColor }]}>
          {renderSettingRow(
            'Require App Unlock',
            'lock',
            <Switch 
              value={true} 
              onValueChange={() => {}}
              ios_backgroundColor={colorScheme === 'dark' ? '#3a3a3c' : '#e5e5ea'}
            />
          )}
          {renderSettingRow('After 5 minutes', 'clock', 
            <IconSymbol name="chevron.right" size={20} color={sectionHeaderColor} />
          )}
        </BlurView>

        <Text style={[styles.sectionHeader, { color: sectionHeaderColor }]}>UI</Text>
        <View style={[styles.section, { backgroundColor: sectionBgColor }]}>
          <Pressable style={styles.settingRow}>
            <View style={styles.settingWithIcon}>
              <IconSymbol name="paintpalette" size={24} color={tintColor} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: textColor }]}>Edit Substance Colors</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={sectionHeaderColor} />
          </Pressable>
          <Pressable style={styles.settingRow}>
            <View style={styles.settingWithIcon}>
              <IconSymbol name="ruler" size={24} color={tintColor} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: textColor }]}>Custom Units</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={sectionHeaderColor} />
          </Pressable>
          <View style={styles.settingRow}>
            <Text style={[styles.settingText, { color: textColor }]}>Hide dosage dots</Text>
            <Switch value={false} onValueChange={() => {}} />
          </View>
          <View style={styles.settingRow}>
            <Text style={[styles.settingText, { color: textColor }]}>Hide tolerance chart</Text>
            <Switch value={false} onValueChange={() => {}} />
          </View>
          <View style={styles.settingRow}>
            <Text style={[styles.settingText, { color: textColor }]}>Hide substance info</Text>
            <Switch value={false} onValueChange={() => {}} />
          </View>
          <View style={styles.settingRow}>
            <Text style={[styles.settingText, { color: textColor }]}>Draw redoses individually</Text>
            <Switch value={false} onValueChange={() => {}} />
          </View>
          <View style={styles.settingRow}>
            <Text style={[styles.settingText, { color: textColor }]}>Independent substance heights</Text>
            <Switch value={false} onValueChange={() => {}} />
          </View>
          <View style={styles.settingRow}>
            <Text style={[styles.settingText, { color: textColor }]}>Automatic live activities</Text>
            <Switch value={true} onValueChange={() => {}} />
          </View>
        </View>

        <Text style={[styles.sectionHeader, { color: sectionHeaderColor }]}>JOURNAL DATA</Text>
        <View style={[styles.section, { backgroundColor: sectionBgColor }]}>
          <Pressable style={styles.settingRow}>
            <Text style={[styles.settingText, { color: tintColor }]}>Export Data</Text>
          </Pressable>
          <Pressable style={styles.settingRow}>
            <Text style={[styles.settingText, { color: tintColor }]}>Import Data</Text>
          </Pressable>
          <Pressable style={styles.settingRow}>
            <Text style={[styles.settingText, { color: '#FF3B30' }]}>Delete Everything</Text>
          </Pressable>
        </View>

        <Text style={[styles.sectionHeader, { color: sectionHeaderColor }]}>COMMUNICATION</Text>
        <View style={[styles.section, { backgroundColor: sectionBgColor }]}>
          <Pressable style={styles.settingRow}>
            <View style={styles.settingWithIcon}>
              <IconSymbol name="person.2" size={24} color={tintColor} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: textColor }]}>Share App</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={sectionHeaderColor} />
          </Pressable>
          <Pressable style={styles.settingRow}>
            <Text style={[styles.settingText, { color: tintColor }]}>Question, Bug Report</Text>
          </Pressable>
          <Pressable style={styles.settingRow}>
            <View style={styles.settingWithIcon}>
              <IconSymbol name="questionmark.circle" size={24} color={tintColor} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: textColor }]}>Frequently Asked Questions</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={sectionHeaderColor} />
          </Pressable>
          <Pressable style={styles.settingRow}>
            <Text style={[styles.settingText, { color: tintColor }]}>Source Code</Text>
          </Pressable>
        </View>

        <View style={[styles.section, { backgroundColor: sectionBgColor, marginTop: 20 }]}>
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <Text style={[styles.settingText, { color: sectionHeaderColor }]}>Version {version}</Text>
          </View>
          <View style={[styles.settingRow, { borderBottomWidth: 0, paddingTop: 0 }]}>
            <Text style={[styles.creditText, { color: sectionHeaderColor }]}>
              Built with ❤️ by SubstanceSearch contributors
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 60,
    paddingBottom: 100,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  section: {
    marginBottom: 20,
    borderRadius: 16,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginBottom: 8,
    marginTop: 8,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2c2c2e',
  },
  settingWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
    width: 24,
  },
  settingText: {
    fontSize: 17,
    flex: 1,
  },
  creditText: {
    fontSize: 13,
    textAlign: 'center',
    width: '100%',
    paddingVertical: 4,
    opacity: 0.8,
  },
}); 