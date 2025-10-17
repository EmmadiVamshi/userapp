import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
export default function PrivacySecurityScreen({ navigation }: any) {

  const handleContactPrivacy = () => {
    Linking.openURL('mailto:privacy@camelq.in');
  };

  const handleContactSupport = () => {
    Linking.openURL('mailto:info@camelq.in');
  };

  const handleViewFullPolicy = () => {
    Linking.openURL('https://privacy-policy-dev.up.railway.app/');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy & Security</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentCard}>
          <Text style={styles.lastUpdated}>Last Updated: January 2025</Text>
          
          <Text style={styles.introText}>
            At Roqet Bike Taxi, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy & Security section explains how we collect, use, and safeguard your data.
          </Text>

          <Text style={styles.sectionTitle}>🔒 Information We Collect</Text>
          
          <Text style={styles.subsectionTitle}>📍 Location Information</Text>
          <Text style={styles.text}>
            • Precise GPS coordinates for ride matching and navigation{'\n'}
            • Real-time location during rides for safety and tracking{'\n'}
            • Pickup and drop-off locations for fare calculation{'\n'}
            • Location data is collected only when the app is active
          </Text>

          <Text style={styles.subsectionTitle}>👤 Personal Information</Text>
          <Text style={styles.text}>
            • Name, email address, and phone number{'\n'}
            • Profile pictures (with your permission){'\n'}
            • Payment information (securely processed via Razorpay){'\n'}
            • Ride history and preferences
          </Text>

          <Text style={styles.subsectionTitle}>📱 Device Information</Text>
          <Text style={styles.text}>
            • Device identifiers and specifications{'\n'}
            • Operating system version{'\n'}
            • App usage statistics{'\n'}
            • Network connectivity information
          </Text>

          <Text style={styles.sectionTitle}>🛡️ How We Protect Your Data</Text>
          
          <Text style={styles.subsectionTitle}>🔐 Security Measures</Text>
          <Text style={styles.text}>
            • All data transmission encrypted using HTTPS/TLS{'\n'}
            • Secure storage using expo-secure-store{'\n'}
            • Limited access on a need-to-know basis{'\n'}
            • Regular security audits and vulnerability testing
          </Text>

          <Text style={styles.subsectionTitle}>📅 Data Retention</Text>
          <Text style={styles.text}>
            • Account data: Retained while account is active{'\n'}
            • Location data: Trip locations retained for 7 years{'\n'}
            • Payment records: As required by financial regulations{'\n'}
            • Communication logs: Retained for 2 years
          </Text>

          <Text style={styles.sectionTitle}>🔗 Information Sharing</Text>
          <Text style={styles.text}>
            We may share limited information with:{'\n'}
            • Matched drivers (name and pickup location only){'\n'}
            • Payment processors (Razorpay) for secure transactions{'\n'}
            • Mapping services (Google Maps) for navigation{'\n'}
            • Legal authorities when required by law
          </Text>

          <Text style={styles.text}>
            <Text style={styles.boldText}>We DO NOT:</Text>{'\n'}
            • Sell your personal information to third parties{'\n'}
            • Share location data with advertisers{'\n'}
            • Use your data for unrelated commercial purposes{'\n'}
            • Store payment card details on our servers
          </Text>

          <Text style={styles.sectionTitle}>👥 Your Privacy Rights</Text>
          <Text style={styles.text}>
            You have the right to:{'\n'}
            • Access your personal information{'\n'}
            • Correct or update your data{'\n'}
            • Request deletion of your account{'\n'}
            • Opt-out of non-essential data processing{'\n'}
            • Control location permissions{'\n'}
            • Unsubscribe from marketing communications
          </Text>

          <Text style={styles.sectionTitle}>📱 App Permissions</Text>
          <Text style={styles.text}>
            Our app uses these permissions:{'\n'}
            • <Text style={styles.boldText}>CAMERA:</Text> Profile pictures and document verification{'\n'}
            • <Text style={styles.boldText}>LOCATION:</Text> Ride matching and navigation{'\n'}
            • <Text style={styles.boldText}>INTERNET:</Text> App connectivity and real-time updates{'\n'}
            • <Text style={styles.boldText}>VIBRATE:</Text> Notification alerts{'\n'}
            • <Text style={styles.boldText}>WAKE_LOCK:</Text> Keep app active during rides for safety
          </Text>

          <Text style={styles.sectionTitle}>🌍 International Compliance</Text>
          <Text style={styles.text}>
            Our privacy practices comply with:{'\n'}
            • Google Play Store requirements{'\n'}
            • Information Technology Rules, 2011 (India){'\n'}
            • General Data Protection Regulation (GDPR){'\n'}
            • California Consumer Privacy Act (CCPA)
          </Text>

          <Text style={styles.sectionTitle}>👶 Children's Privacy</Text>
          <Text style={styles.text}>
            Our service is not intended for users under 18 years of age. We do not knowingly collect personal information from children under 18.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleViewFullPolicy}>
              <Ionicons name="document-text-outline" size={20} color={Colors.white} />
              <Text style={styles.buttonText}>View Full Privacy Policy</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton} onPress={handleContactPrivacy}>
              <Ionicons name="mail-outline" size={20} color={Colors.primary} />
              <Text style={styles.secondaryButtonText}>Contact Privacy Team</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton} onPress={handleContactSupport}>
              <Ionicons name="help-circle-outline" size={20} color={Colors.primary} />
              <Text style={styles.secondaryButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>📞 Contact Information</Text>
            <Text style={styles.contactText}>
              <Text style={styles.boldText}>Privacy Inquiries:</Text> privacy@camelq.in{'\n'}
              <Text style={styles.boldText}>Customer Support:</Text> info@camelq.in{'\n'}
              <Text style={styles.boldText}>Phone:</Text> 040-276126{'\n'}
              <Text style={styles.boldText}>Hours:</Text> Mon-Fri, 9:00 AM - 6:00 PM
            </Text>
          </View>
        </View>

        {/* Bottom Margin */}
        <View style={styles.bottomMargin} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backButton: {
    padding: Layout.spacing.sm,
  },
  headerTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentCard: {
    backgroundColor: Colors.white,
    margin: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  lastUpdated: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: Layout.spacing.md,
    textAlign: 'center',
  },
  introText: {
    fontSize: Layout.fontSize.md,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: Layout.spacing.lg,
    textAlign: 'justify',
  },
  sectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    marginTop: Layout.spacing.lg,
    marginBottom: Layout.spacing.sm,
  },
  subsectionTitle: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
    color: Colors.text,
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.xs,
  },
  text: {
    fontSize: Layout.fontSize.md,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Layout.spacing.md,
    textAlign: 'justify',
  },
  boldText: {
    fontWeight: '600',
    color: Colors.text,
  },
  buttonContainer: {
    marginTop: Layout.spacing.xl,
    gap: Layout.spacing.md,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.md,
    gap: Layout.spacing.sm,
  },
  buttonText: {
    color: Colors.white,
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.md,
    gap: Layout.spacing.sm,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
  contactInfo: {
    marginTop: Layout.spacing.xl,
    padding: Layout.spacing.md,
    backgroundColor: Colors.gray50,
    borderRadius: Layout.borderRadius.md,
  },
  contactTitle: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.sm,
  },
  contactText: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  bottomMargin: {
    height: Layout.spacing.xl,
  },
}); 