import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  FlatList, 
  Alert 
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusPill from '../components/StatusPill';

interface SyncItem {
  id: string;
  type: string;
  workerId: string;
  timestamp: string;
  status: 'pending' | 'syncing' | 'failed';
}

export default function SyncQueueScreen() {
  const [lang] = useState<'en' | 'hi'>('en');
  const t = TRANSLATIONS[lang];

  const [isSyncing, setIsSyncing] = useState(false);
  const [items, setItems] = useState<SyncItem[]>([
    { id: '1', type: 'VERIFICATION_AUDIT', workerId: 'NHAI-2026-0812', timestamp: '2026-05-25 10:42:15', status: 'pending' },
    { id: '2', type: 'NEW_ENROLLMENT', workerId: 'NHAI-2026-0901', timestamp: '2026-05-25 10:30:00', status: 'pending' },
    { id: '3', type: 'VERIFICATION_AUDIT', workerId: 'NHAI-2026-0552', timestamp: '2026-05-25 09:55:20', status: 'failed' },
    { id: '4', type: 'VERIFICATION_AUDIT', workerId: 'NHAI-2026-0104', timestamp: '2026-05-25 09:12:02', status: 'pending' },
  ]);

  const handleManualSync = () => {
    if (items.length === 0) {
      Alert.alert('Info', t.sync.noPending);
      return;
    }

    setIsSyncing(true);
    // Simulate reading SQLite queue, packaging JSON payloads, and calling AWS Lambda
    setTimeout(() => {
      setIsSyncing(false);
      setItems([]);
      Alert.alert(t.common.success, 'Successfully synchronized all records with AWS DynamoDB.');
    }, 2500);
  };

  const renderSyncItem = ({ item }: { item: SyncItem }) => (
    <Card style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <View>
          <Text style={styles.itemType}>{item.type}</Text>
          <Text style={styles.itemWorker}>Worker ID: {item.workerId}</Text>
        </View>
        <StatusPill 
          label={item.status === 'failed' ? 'RETRY' : item.status.toUpperCase()} 
          type={item.status === 'failed' ? 'danger' : 'warning'} 
        />
      </View>
      <Text style={styles.itemTime}>{item.timestamp} UTC</Text>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.summaryArea}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>{t.sync.pendingRecords}</Text>
          <Text style={styles.summaryVal}>{items.length}</Text>
          
          <Button 
            label={isSyncing ? 'Syncing with AWS...' : t.sync.syncBtn}
            variant="primary"
            loading={isSyncing}
            onPress={handleManualSync}
            style={styles.syncBtn}
          />
        </Card>
      </View>

      <Text style={styles.listTitle}>Sync Transaction Queue</Text>
      
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{t.sync.noPending}</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderSyncItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  summaryArea: {
    padding: SPACING.lg,
  },
  summaryCard: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  summaryLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
  },
  summaryVal: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 48,
    color: COLORS.primary,
    marginVertical: SPACING.xs,
  },
  syncBtn: {
    width: '100%',
    marginTop: SPACING.sm,
  },
  listTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textSecondary,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  itemCard: {
    padding: SPACING.md,
    marginVertical: SPACING.xs,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemType: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textPrimary,
  },
  itemWorker: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  itemTime: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textLight,
    marginTop: SPACING.sm,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xxl,
  },
  emptyText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
