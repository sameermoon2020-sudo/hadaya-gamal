import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../utils/colors';
import CustomButton from '../../components/CustomButton';
import { AuthContext } from '../../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, signOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      'تسجيل الخروج',
      'هل أنت متأكد من رغبتك في تسجيل الخروج؟',
      [
        { text: 'إلغاء', onPress: () => {} },
        {
          text: 'تسجيل الخروج',
          onPress: async () => {
            try {
              setLoading(true);
              await signOut();
              navigation.navigate('Login');
            } catch (error) {
              Alert.alert('خطأ', 'فشل تسجيل الخروج');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <MaterialIcons name="account-circle" size={80} color={COLORS.primary} />
          </View>
          <Text style={styles.userName}>{user?.email || 'المستخدم'}</Text>
          <Text style={styles.userEmail}>{user?.displayName || 'اسم المستخدم'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الحساب</Text>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="person" size={24} color={COLORS.primary} />
            <Text style={styles.menuText}>تعديل الملف الشخصي</Text>
            <MaterialIcons name="chevron-right" size={24} color={COLORS.textLight} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="lock" size={24} color={COLORS.primary} />
            <Text style={styles.menuText}>تغيير كلمة المرور</Text>
            <MaterialIcons name="chevron-right" size={24} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الطلبات</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Orders')}
          >
            <MaterialIcons name="shopping-bag" size={24} color={COLORS.primary} />
            <Text style={styles.menuText}>طلباتي</Text>
            <MaterialIcons name="chevron-right" size={24} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>التطبيق</Text>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="info" size={24} color={COLORS.primary} />
            <Text style={styles.menuText}>حول التطبيق</Text>
            <MaterialIcons name="chevron-right" size={24} color={COLORS.textLight} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="help" size={24} color={COLORS.primary} />
            <Text style={styles.menuText}>المساعدة والدعم</Text>
            <MaterialIcons name="chevron-right" size={24} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        <View style={styles.logoutContainer}>
          <CustomButton
            title="تسجيل الخروج"
            onPress={handleLogout}
            loading={loading}
            variant="danger"
            size="large"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatar: {
    marginBottom: SPACING.md,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: SPACING.sm,
  },
  section: {
    marginVertical: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    marginLeft: SPACING.lg,
  },
  logoutContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
});

export default ProfileScreen;