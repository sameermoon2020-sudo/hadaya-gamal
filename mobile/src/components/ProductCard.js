import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../utils/colors';

const ProductCard = ({ product, onPress, onAddToCart }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image || 'https://via.placeholder.com/200' }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.ratingBadge}>
          <MaterialIcons name="star" size={14} color={COLORS.warning} />
          <Text style={styles.ratingText}>4.5</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>${product.price}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAddToCart(product)}
          >
            <MaterialIcons name="add-circle" size={28} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: SPACING.sm,
    marginVertical: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  content: {
    padding: SPACING.md,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  description: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  addButton: {
    padding: 4,
  },
});

export default ProductCard;