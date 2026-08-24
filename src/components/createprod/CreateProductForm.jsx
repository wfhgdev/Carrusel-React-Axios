import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateProductForm.css';

const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

const INITIAL_FORM_STATE = {
    title: '',
    price: '',
    description: '',
    categoryId: '',
    imageUrl: ''
};

const CreateProductForm = () => {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to load categories:', error);
                setApiError('Failed to load product categories. Please refresh the page.');
            }
        };

        fetchCategories();
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.price || Number(formData.price) <= 0) {
            newErrors.price = 'Price must be a number greater than 0';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.categoryId) {
            newErrors.categoryId = 'Please select a category';
        }

        if (!formData.imageUrl.trim()) {
            newErrors.imageUrl = 'Image URL is required';
        } else {
            try {
                new URL(formData.imageUrl);
            } catch (_) {
                newErrors.imageUrl = 'Please enter a valid URL (e.g., https://...)';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');

        if (!validateForm()) return;

        setIsSubmitting(true);

        const payload = {
            title: formData.title,
            price: Number(formData.price),
            description: formData.description,
            categoryId: Number(formData.categoryId),
            images: [formData.imageUrl]
        };

        try {
            await axios.post(`${API_BASE_URL}/products`, payload);
            navigate('/products');
        } catch (error) {
            console.error('Error creating product:', error);
            setApiError('Failed to create product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="product-form-container">
            <h2 className="product-form-title">Create New Product</h2>

            {apiError && <div className="api-error-alert">{apiError}</div>}

            <form onSubmit={handleSubmit} className="product-form" noValidate>
                {/* Title */}
                <div className="form-group">
                    <label htmlFor="title" className="form-label">
                        Product Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`form-input ${errors.title ? 'input-error' : ''}`}
                        placeholder="e.g. Wireless Headphones"
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                {/* Price & Category Grid */}
                <div className="form-row">
                    {/* Price */}
                    <div className="form-group">
                        <label htmlFor="price" className="form-label">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            min="1"
                            value={formData.price}
                            onChange={handleChange}
                            className={`form-input ${errors.price ? 'input-error' : ''}`}
                            placeholder="e.g. 99"
                        />
                        {errors.price && <span className="error-message">{errors.price}</span>}
                    </div>

                    {/* Category */}
                    <div className="form-group">
                        <label htmlFor="categoryId" className="form-label">
                            Category
                        </label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className={`form-select ${errors.categoryId ? 'input-error' : ''}`}
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.categoryId && (
                            <span className="error-message">{errors.categoryId}</span>
                        )}
                    </div>
                </div>

                {/* Image URL */}
                <div className="form-group">
                    <label htmlFor="imageUrl" className="form-label">
                        Image URL
                    </label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className={`form-input ${errors.imageUrl ? 'input-error' : ''}`}
                        placeholder="https://i.imgur.com/QkIa5tT.jpeg"
                    />
                    {errors.imageUrl && (
                        <span className="error-message">{errors.imageUrl}</span>
                    )}
                </div>

                {/* Description */}
                <div className="form-group">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className={`form-textarea ${errors.description ? 'input-error' : ''}`}
                        placeholder="Detailed product description..."
                    />
                    {errors.description && (
                        <span className="error-message">{errors.description}</span>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-button"
                >
                    {isSubmitting ? 'Creating Product...' : 'Create Product'}
                </button>
            </form>
        </div>
    );
};

export default CreateProductForm;