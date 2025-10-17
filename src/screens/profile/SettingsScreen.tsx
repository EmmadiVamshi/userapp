import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../i18n/LanguageContext';
import NotificationPreferencesService, { NotificationPreferences } from '../../services/notificationPreferencesService';
import NotificationService from '../../services/notificationService';
import { showRatingPrompt } from '../../utils/appRating';

export default function SettingsScreen({ navigation }: any) {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    pushNotifications: true,
    locationServices: true,
    autoPayment: false,
    shareData: false,
    lastUpdated: Date.now(),
  });
  const [loading, setLoading] = useState(true);
  const [showTerms, setShowTerms] = useState(false);

  const preferencesService = NotificationPreferencesService.getInstance();
  const notificationService = NotificationService.getInstance();

  // Load preferences on component mount
  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const currentPreferences = await preferencesService.getPreferences();
      setPreferences(currentPreferences);
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceChange = async (key: keyof NotificationPreferences, value: boolean) => {
    try {
      const updatedPreferences = await preferencesService.updatePreference(key, value);
      setPreferences(updatedPreferences);

      // Handle notification service changes
      if (key === 'pushNotifications') {
        await notificationService.onNotificationPreferenceChanged(value);
        
        if (value) {
          Alert.alert(
            t('common.success', 'Success'),
            t('common.notificationsEnabled', 'Notifications have been enabled. You will now receive ride updates and important alerts.'),
            [{ text: t('common.ok', 'OK') }]
          );
        } else {
          Alert.alert(
            t('common.notificationsDisabled', 'Notifications Disabled'),
            t('common.notificationsDisabledMessage', 'You will no longer receive push notifications. You can re-enable them anytime in settings.'),
            [{ text: t('common.ok', 'OK') }]
          );
        }
      }
    } catch (error) {
      console.error('Error updating preference:', error);
      Alert.alert(
        t('common.error', 'Error'),
        t('common.errorUpdatingSettings', 'Failed to update settings. Please try again.'),
        [{ text: t('common.ok', 'OK') }]
      );
    }
  };


  const getCurrentLanguageName = () => {
    const languageMap: { [key: string]: string } = {
      'en': 'English',
      'es': 'Español',
      'fr': 'Français',
      'hi': 'हिंदी',
      'ar': 'العربية'
    };
    return languageMap[currentLanguage] || currentLanguage.toUpperCase();
  };

  const handleContactSupport = () => {
    Linking.openURL('mailto:info@camelq.in');
  };

  const handleViewFullPolicy = () => {
    Linking.openURL('https://privacy-policy-dev.up.railway.app/');
  };

  const settingSections = [
    {
      title: t('profile.preferences', 'Preferences'),
      items: [
        {
          icon: 'language-outline',
          title: t('profile.language'),
          subtitle: `Current: ${getCurrentLanguageName()}`,
          action: () => navigation.navigate('LanguageSettings'),
        },
        {
          icon: 'notifications-outline',
          title: t('common.pushNotifications'),
          subtitle: t('common.receiveRideUpdates'),
          toggle: true,
          value: preferences.pushNotifications,
          onToggle: (value: boolean) => handlePreferenceChange('pushNotifications', value),
        },
      ],
    },
    {
      title: t('support.helpSupport', 'Support'),
      items: [
        {
          icon: 'star-outline',
          title: t('common.rateApp'),
          subtitle: t('common.shareYourFeedback'),
          action: () => showRatingPrompt(),
        },
      ],
    },
    {
      title: t('profile.legal', 'Legal'),
      items: [
        {
          icon: 'document-text-outline',
          title: t('common.termsOfService'),
          subtitle: t('common.readTermsAndConditions'),
          action: () => setShowTerms(!showTerms),
        },
      ],
    },
  ];

  const renderSettingItem = (item: any, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.settingItem}
      onPress={item.action}
      disabled={item.toggle}
    >
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <Ionicons name={item.icon} size={20} color={Colors.gray600} />
        </View>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      <View style={styles.settingRight}>
        {item.toggle ? (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: Colors.gray300, true: Colors.primary }}
            thumbColor={Colors.white}
          />
        ) : (
          <Ionicons name="chevron-forward" size={20} color={Colors.gray400} />
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('navigation.settings')}</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t('common.loading', 'Loading...')}</Text>
        </View>
      </SafeAreaView>
    );
  }

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
        <Text style={styles.headerTitle}>{t('navigation.settings')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
            </View>
          </View>
        ))}

        {/* Terms of Service Content */}
        {showTerms && (
          <View style={styles.termsSection}>
            <Text style={styles.termsSectionTitle}>Terms of Service</Text>
            <View style={styles.termsCard}>
              <Text style={styles.termsLastUpdated}>Last Updated: January 2025</Text>
              
              <Text style={styles.termsIntroText}>
                Welcome to Roqet Bike Taxi. These Terms of Service ("Terms") govern your use of our mobile application and services. By using our app, you agree to be bound by these Terms.
              </Text>

              <Text style={styles.termsSectionTitle}>1. Acceptance of Terms</Text>
              <Text style={styles.termsText}>
                By downloading, installing, or using the Roqet Bike Taxi app, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
              </Text>

              <Text style={styles.termsSectionTitle}>2. Service Description</Text>
              <Text style={styles.termsText}>
                Roqet Bike Taxi is a transportation service that connects riders with drivers for bike taxi services. We provide a platform for booking rides, processing payments, and facilitating transportation services.
              </Text>

              <Text style={styles.termsSectionTitle}>3. User Eligibility</Text>
              <Text style={styles.termsText}>
                • You must be at least 18 years old to use our services{'\n'}
                • You must provide accurate and complete information during registration{'\n'}
                • You must have a valid payment method on file{'\n'}
                • You must comply with all applicable laws and regulations
              </Text>

              <Text style={styles.termsSectionTitle}>4. Account Registration</Text>
              <Text style={styles.termsText}>
                • You are responsible for maintaining the confidentiality of your account{'\n'}
                • You must provide accurate, current, and complete information{'\n'}
                • You are responsible for all activities that occur under your account{'\n'}
                • You must notify us immediately of any unauthorized use of your account
              </Text>

              <Text style={styles.termsSectionTitle}>5. Use of Services</Text>
              <Text style={styles.termsText}>
                You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:{'\n'}
                • Use the service for any illegal or unauthorized purpose{'\n'}
                • Interfere with or disrupt the service or servers{'\n'}
                • Attempt to gain unauthorized access to any part of the service{'\n'}
                • Use the service to harass, abuse, or harm others{'\n'}
                • Violate any applicable laws or regulations
              </Text>

              <Text style={styles.termsSectionTitle}>6. Location Services</Text>
              <Text style={styles.termsText}>
                Our app requires access to your location to provide ride matching and navigation services. By using our app, you consent to the collection and use of your location data as described in our Privacy Policy.
              </Text>

              <Text style={styles.termsSectionTitle}>7. Payment Terms</Text>
              <Text style={styles.termsText}>
                • All payments are processed securely through Razorpay{'\n'}
                • Fares are calculated based on distance, time, and applicable rates{'\n'}
                • You are responsible for all charges incurred under your account{'\n'}
                • We reserve the right to change our pricing at any time{'\n'}
                • Refunds are subject to our refund policy
              </Text>

              <Text style={styles.termsSectionTitle}>8. Safety and Conduct</Text>
              <Text style={styles.termsText}>
                • You must treat drivers and other users with respect{'\n'}
                • You are responsible for your own safety during rides{'\n'}
                • Report any safety concerns immediately{'\n'}
                • Follow all applicable traffic laws and regulations{'\n'}
                • Do not engage in any behavior that could endanger others
              </Text>

              <Text style={styles.termsSectionTitle}>9. Privacy and Data Protection</Text>
              <Text style={styles.termsText}>
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information. By using our services, you consent to the collection and use of your data as described in our Privacy Policy.
              </Text>

              <Text style={styles.termsSectionTitle}>10. Contact Information</Text>
              <Text style={styles.termsText}>
                If you have any questions about these Terms of Service, please contact us:{'\n\n'}
                <Text style={styles.contactInfo}>
                  Email: info@camelq.in{'\n'}
                  Phone: 040-276126{'\n'}
                  Address: CamelQ Software Solutions{'\n'}
                  2nd Floor, Uptown Cyberabad Building{'\n'}
                  100 ft Road, Madhapur{'\n'}
                  Hyderabad, Telangana, India
                </Text>
              </Text>

              <View style={styles.termsButtonContainer}>
                <TouchableOpacity style={styles.termsContactButton} onPress={handleContactSupport}>
                  <Ionicons name="mail-outline" size={20} color={Colors.white} />
                  <Text style={styles.termsButtonText}>Contact Support</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.termsPrivacyButton} onPress={handleViewFullPolicy}>
                  <Ionicons name="shield-outline" size={20} color={Colors.primary} />
                  <Text style={styles.termsPrivacyButtonText}>View Privacy Policy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}


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
  section: {
    marginTop: Layout.spacing.lg,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.sm,
    marginHorizontal: Layout.spacing.lg,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    marginHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Layout.spacing.md,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  settingSubtitle: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  settingRight: {
    marginLeft: Layout.spacing.md,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.xl,
  },
  appVersion: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textSecondary,
  },
  appBuild: {
    fontSize: Layout.fontSize.xs,
    color: Colors.textLight,
    marginTop: Layout.spacing.xs,
  },
  bottomMargin: {
    height: Layout.spacing.xl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: Layout.fontSize.md,
    color: Colors.textSecondary,
  },
  // Terms of Service Styles
  termsSection: {
    marginTop: Layout.spacing.lg,
  },
  termsSectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.sm,
    marginHorizontal: Layout.spacing.lg,
  },
  termsCard: {
    backgroundColor: Colors.white,
    marginHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  termsLastUpdated: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: Layout.spacing.md,
    textAlign: 'center',
  },
  termsIntroText: {
    fontSize: Layout.fontSize.md,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: Layout.spacing.lg,
    textAlign: 'justify',
  },
  termsText: {
    fontSize: Layout.fontSize.md,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Layout.spacing.md,
    textAlign: 'justify',
  },
  contactInfo: {
    fontSize: Layout.fontSize.md,
    color: Colors.text,
    fontWeight: '500',
    lineHeight: 22,
  },
  termsButtonContainer: {
    marginTop: Layout.spacing.xl,
    gap: Layout.spacing.md,
  },
  termsContactButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.md,
    gap: Layout.spacing.sm,
  },
  termsButtonText: {
    color: Colors.white,
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
  termsPrivacyButton: {
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
  termsPrivacyButtonText: {
    color: Colors.primary,
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
});
