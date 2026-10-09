from rest_framework import serializers
from .models import Category, Product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(read_only=True)  # Muestra el nombre en el GET
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )  # Recibe el ID en POST/PUT

    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'price', 'category', 'category_id')